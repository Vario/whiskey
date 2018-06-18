import { Component, OnInit, Inject } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { FormBuilder } from '@angular/forms'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { WhiskeyService } from '../../shared/services/whiskey.service'
import { Validators } from '@angular/forms'

@Component({
  selector: 'bottle-add',
  templateUrl: './bottle-add.component.html',
  styleUrls: ['./bottle-add.component.scss']
})
export class WhiskeyBottleAddComponent {
  public _whiskeyForm: FormGroup

  constructor(
    private _formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<WhiskeyBottleAddComponent>,
    private _whiskeyService: WhiskeyService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this._whiskeyForm = this._formBuilder.group({
      Name: [this.data.Name, [Validators.required]],
      Brand: [this.data.Brand, [Validators.required]]
    })
  }
  onNoClick(): void {
    this.dialogRef.close()
  }

  onSubmit() {
    //this._contactService.addContact(this._contactForm.value)
    this._whiskeyService.createWhiskey(
      this._whiskeyForm.get('Name').value,
      this._whiskeyForm.get('Brand').value,
      65.7,
      70
    )
    this.dialogRef.close()
  }
}
