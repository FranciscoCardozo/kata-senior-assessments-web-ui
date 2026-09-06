import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-upload-file',
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './upload-file.component.html',
  styleUrl: './upload-file.component.scss'
})
export class UploadFileComponent {
  @Input() accept = '.zip';
  @Input() disabled = false;
  @Output() fileSelected = new EventEmitter<File>();
  @Output() fileCleared = new EventEmitter<void>();

  selectedFile: File | null = null;
  isDragging = false;

  get acceptLabel(): string {
    return this.accept
      .split(',')
      .map((value) => value.trim())
      .filter(Boolean)
      .join(', ');
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    if (this.disabled) return;
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
    if (this.disabled) return;

    const file = event.dataTransfer?.files?.[0];
    if (file) {
      this.setFile(file);
    }
  }

  onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this.setFile(file);
    }
  }

  clear() {
    this.selectedFile = null;
    this.fileCleared.emit();
  }

  formatSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  private setFile(file: File) {
    this.selectedFile = file;
    this.fileSelected.emit(file);
  }
}
