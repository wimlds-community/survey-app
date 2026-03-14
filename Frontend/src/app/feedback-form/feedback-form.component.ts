import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.css'],
  // No need for ReactiveFormsModule if we are using signals for state
  imports: [CommonModule], 
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedbackFormComponent {
  private http = inject(HttpClient);

  public taste = signal<number | null>(null);
  public health = signal<number | null>(null);
  public visual = signal<number | null>(null);
  public fusion = signal<number | null>(null);
  public quality = signal<number | null>(null);
  public cost = signal('');
  public oneWord = signal('');

  setTaste(value: string) {
    this.taste.set(Number(value));
  }

  setHealth(value: string) {
    this.health.set(Number(value));
  }

  setVisual(value: string) {
    this.visual.set(Number(value));
  }

  setFusion(value: string) {
    this.fusion.set(Number(value));
  }

  setQuality(value: string) {
    this.quality.set(Number(value));
  }

  setCost(event: Event) {
    const target = event.target as HTMLInputElement;
    this.cost.set(target.value);
  }

  setOneWord(event: Event) {
    const target = event.target as HTMLInputElement;
    this.oneWord.set(target.value);
  }

  submitFeedback(event: Event): void {
    event.preventDefault();

    if (this.taste() === null || this.health() === null || this.visual() === null || this.fusion() === null || this.quality() === null) {
      console.log('Validation failed: Not all rating questions are answered.');
      alert('Please answer all rating questions.');
      return;
    }

    const feedbackData = {
      taste: this.taste(),
      health: this.health(),
      visual: this.visual(),
      fusion: this.fusion(),
      quality: this.quality(),
      cost: this.cost(),
      oneWord: this.oneWord(),
    };

    console.log('Submitting Feedback Data:', feedbackData);

    this.http.post('http://localhost:3000/api/feedback', feedbackData)
      .subscribe({
        next: (response) => {
          console.log('Feedback saved!', response);
          alert('Thank you for your feedback!');
          
          // Reset form on successful submission
          this.taste.set(null);
          this.health.set(null);
          this.visual.set(null);
          this.fusion.set(null);
          this.quality.set(null);
          this.cost.set('');
          this.oneWord.set('');
        },
        error: (error) => {
          console.error('Error saving feedback', error);
          alert('Sorry, there was an error submitting your feedback. Please try again.');
        }
      });
  }
}
