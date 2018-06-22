import { Component, Input } from '@angular/core'
import { MatCard, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { WhiskeyService } from '../../shared/services/whiskey.service'

@Component({
  selector: 'bottle-detail',
  templateUrl: './bottle-detail.component.html',
  styleUrls: ['./bottle-detail.component.scss']
})
export class WhiskeyBottleDetailComponent {
  @Input() WhiskeyBottle: any

  constructor(private whiskeyService: WhiskeyService) {}

  taste() {
    console.log('taste start')
    this.whiskeyService.tasteWhiskey(this.WhiskeyBottle)
  }
}
