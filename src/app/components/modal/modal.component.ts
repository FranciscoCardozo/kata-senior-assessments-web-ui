import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

export interface MaterialDialogData {
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
}

@Component({
  selector: 'app-material-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <div class="material-dialog-header">
      <div class="dialog-icon">
        <mat-icon>info</mat-icon>
      </div>
      <h2 mat-dialog-title>{{ data.title }}</h2>
      <button mat-icon-button mat-dialog-close aria-label="Cerrar modal" class="close-button">
        <mat-icon>close</mat-icon>
      </button>
    </div>

    <mat-dialog-content>
      <p>{{ data.description }}</p>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-stroked-button color="primary" mat-dialog-close>
        {{ data.cancelLabel || 'Cerrar' }}
      </button>
      <button mat-flat-button color="primary" (click)="confirm()">
        {{ data.confirmLabel || 'Aceptar' }}
      </button>
    </mat-dialog-actions>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .material-dialog-header {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 16px 16px 0;
      }

      .dialog-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 42px;
        height: 42px;
        border-radius: 12px;
        background: rgba(79, 142, 247, 0.12);
        color: #1d4ed8;
      }

      h2 {
        flex: 1;
        margin: 0;
        font-size: 1.5rem;
        color: #1f2a37;
      }

      .close-button {
        color: #52607a;
      }

      mat-dialog-content {
        padding: 16px 16px 0;
        color: #52607a;
        line-height: 1.7;
      }

      mat-dialog-content p {
        margin: 0;
      }

      mat-dialog-actions {
        padding: 16px;
        gap: 12px;
      }
    `
  ]
})
export class MaterialDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MaterialDialogData,
    private readonly dialogRef: MatDialogRef<MaterialDialogComponent>
  ) {}

  confirm() {
    this.dialogRef.close(true);
  }
}

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input() title = 'Información';
  @Input() description = 'Aquí va la descripción de la modal.';
  @Input() triggerLabel = 'Abrir modal';
  @Input() confirmLabel = 'Aceptar';
  @Input() cancelLabel = 'Cerrar';
  @Output() closed = new EventEmitter<void>();

  constructor(private readonly dialog: MatDialog) {}

  open() {
    const ref = this.dialog.open(MaterialDialogComponent, {
      width: 'min(90vw, 480px)',
      panelClass: 'app-material-dialog-panel',
      data: {
        title: this.title,
        description: this.description,
        confirmLabel: this.confirmLabel,
        cancelLabel: this.cancelLabel
      }
    });

    ref.afterClosed().subscribe(() => {
      this.closed.emit();
    });
  }

  closeModalHandler() {
    this.closed.emit();
  }
}
