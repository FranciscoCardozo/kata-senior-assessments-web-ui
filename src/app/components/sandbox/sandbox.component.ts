import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sandbox',
  imports: [FormsModule],
  templateUrl: './sandbox.component.html',
  styleUrl: './sandbox.component.scss'
})
export class SandboxComponent {
  code = '';
  @Output() sourceCode = new EventEmitter<string>();
  @Input() responseCode = '';

  sendCode() {
    this.sourceCode.emit(this.code);
  }
}
