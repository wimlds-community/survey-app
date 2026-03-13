import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feedback-form',
  imports: [CommonModule],
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedbackFormComponent {
  public taste = signal<number | null>(null);
  public health = signal<number | null>(null);
  public visual = signal<number | null>(null);
  public fusion = signal<number | null>(null);
  public quality = signal<number | null>(null);
  public cost = signal('');
  public oneWord = signal('');

  setTaste(value: string) {
    console.log('Taste rating selected:', value);
    this.taste.set(Number(value));
  }

  setHealth(value: string) {
    console.log('Health rating selected:', value);
    this.health.set(Number(value));
  }

  setVisual(value: string) {
    console.log('Visual rating selected:', value);
    this.visual.set(Number(value));
  }

  setFusion(value: string) {
    console.log('Fusion rating selected:', value);
    this.fusion.set(Number(value));
  }

  setQuality(value: string) {
    console.log('Quality rating selected:', value);
    this.quality.set(Number(value));
  }

  setCost(event: Event) {
    const target = event.target as HTMLInputElement;
    console.log('Cost input changed:', target.value);
    this.cost.set(target.value);
  }

  setOneWord(event: Event) {
    const target = event.target as HTMLInputElement;
    console.log('One Word input changed:', target.value);
    this.oneWord.set(target.value);
  }

  submitFeedback(event: Event): void {
    event.preventDefault(); // Prevent default form submission
    console.log('Submit button clicked');

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

    console.log('Feedback Submitted:', feedbackData);
    alert('Thank you for your feedback!');
    
    // Reset form
    console.log('Resetting form...');
    this.taste.set(null);
    this.health.set(null);
    this.visual.set(null);
    this.fusion.set(null);
    this.quality.set(null);
    this.cost.set('');
    this.oneWord.set('');
    console.log('Form reset complete.');
  }
}
