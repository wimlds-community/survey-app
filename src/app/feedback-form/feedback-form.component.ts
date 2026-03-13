import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedbackFormComponent {

}
