import { Component, OnInit, Inject } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { FormBuilder } from '@angular/forms'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { WhiskeyService } from '../whiskey.service'
import { Validators } from '@angular/forms'

@Component({
  selector: 'whiskey-add',
  templateUrl: './whiskey-add.component.html',
  styleUrls: ['./whiskey-add.component.scss']
})
export class WhiskeyAddComponent implements OnInit {
  public _whiskeyForm: FormGroup

  constructor(
    private _formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<WhiskeyAddComponent>,
    private _whiskeyService: WhiskeyService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close()
  }

  ngOnInit() {
    this._whiskeyForm = this._formBuilder.group({
      ID: [this.data.ID],
      Name: [this.data.name, [Validators.required]],
      Brand: [this.data.brand, [Validators.required]]
    })
  }

  onSubmit() {
    if (isNaN(this.data.ID)) {
      //this._whiskeyService.createWhiskey(this._whiskeyForm.value)
      this.dialogRef.close()
    } else {
      //this._whiskeyService.createWhiskey(this._whiskeyForm.value)
      this.dialogRef.close()
    }
  }
}
