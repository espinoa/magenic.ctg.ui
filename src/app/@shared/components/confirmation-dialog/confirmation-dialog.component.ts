import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.less']
})
export class ConfirmationDialogComponent {

  title: string;
  message: string;
  checkboxMessage: string;
  btnCancel: string;
  btnConfirmation: string;
  private isDialogCheked = false;

  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.title = data.title !== undefined ? data.title : '';
      this.message = data.message !== undefined ? data.message : '';
      this.checkboxMessage = data.checkboxMessage !== undefined ? data.checkboxMessage : '';
      this.btnCancel = data.btnCancel !== undefined ? data.btnCancel : '';
      this.btnConfirmation = data.btnConfirmation !== undefined ? data.btnConfirmation : '';
    }

  selectionChange(checkboxValue): void{
    this.isDialogCheked = checkboxValue;
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onConfirmation(): void {
    if (this.isDialogCheked) {
      this.dialogRef.close({ userConfirmed: this.isDialogCheked })
    }
  }
}
