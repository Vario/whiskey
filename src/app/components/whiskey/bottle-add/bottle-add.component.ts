import { Component, OnInit, Inject } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { WhiskeyService } from '../../shared/services/whiskey.service'
//import { FileUploadComponent } from '../../file/upload/upload.component'
@Component({
  selector: 'bottle-add',
  templateUrl: './bottle-add.component.html',
  styleUrls: ['./bottle-add.component.scss']
})
export class WhiskeyBottleAddComponent {
  public _whiskeyForm: FormGroup
  submitted = false

  constructor(
    private _formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<WhiskeyBottleAddComponent>,
    private _whiskeyService: WhiskeyService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this._whiskeyForm = this._formBuilder.group({
      Name: ['', Validators.required],
      Price: ['', Validators.required],
      Size: ['', Validators.required],
      Brand: ['', Validators.required]
    })
  }

  onNoClick(): void {
    this.dialogRef.close()
  }
  // convenience getter for easy access to form fields
  get f() {
    return this._whiskeyForm.controls
  }

  onSubmit() {
    this.submitted = true
    // stop here if form is invalid
    if (this._whiskeyForm.invalid) {
      return
    }

    console.log('create whiskey')
    this._whiskeyService.createWhiskey(
      this._whiskeyForm.get('Name').value,
      this._whiskeyForm.get('Brand').value,
      this._whiskeyForm.get('Price').value,
      this._whiskeyForm.get('Size').value
    )
    this.dialogRef.close()
  }
}
