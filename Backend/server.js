
const express = require('express');
const cors = require('cors');
const xlsx = require('xlsx');
const fs = require('fs');

const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

app.get('/aaa', (req, res) => {
  res.send('Hello, World!');
})

app.post('/api/feedback', (req, res) => {
  const feedbackData = req.body;
  const filePath = './feedback.xlsx';

  try {
    let workbook;
    let worksheet;

    // Check if the file already exists
    if (fs.existsSync(filePath)) {
      workbook = xlsx.readFile(filePath);
      worksheet = workbook.Sheets[workbook.SheetNames[0]];
    } else {
      workbook = xlsx.utils.book_new();
      worksheet = xlsx.utils.json_to_sheet([], { header: [] }); // Create an empty sheet with no headers initially
      xlsx.utils.book_append_sheet(workbook, worksheet, 'Feedback');
    }

    // Get the existing data from the sheet
    const existingData = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

    if (existingData.length === 0) {
        // If the sheet is empty, add headers
        const headers = Object.keys(feedbackData);
        xlsx.utils.sheet_add_aoa(worksheet, [headers], { origin: 'A1' });
        // Fetch the updated existing data with headers
        const updatedData = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
        // Append the new data in the next row
        const newRow = Object.values(feedbackData);
        xlsx.utils.sheet_add_aoa(worksheet, [newRow], { origin: -1 });
    } else {
        // If the sheet has data, just append the new row
        const newRow = Object.values(feedbackData);
        xlsx.utils.sheet_add_aoa(worksheet, [newRow], { origin: -1 });
    }


    // Write the updated workbook to the file
    xlsx.writeFile(workbook, filePath);

    res.status(200).send({ message: 'Feedback saved successfully!' });
  } catch (error) {
    console.error('Error saving feedback:', error);
    res.status(500).send({ message: 'Failed to save feedback.' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
