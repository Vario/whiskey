import { Component, Input } from '@angular/core'

import { WhiskeyService } from '../whiskey.service'
import { WhiskeyBottle } from '../whiskeybottle.model'

@Component({
  selector: 'whiskey-detail',
  templateUrl: './whiskey-detail.component.html',
  styleUrls: ['./whiskey-detail.component.scss']
})
export class WhiskeyDetailComponent {
  @Input() WhiskeyBottle: any

  constructor(private whiskeyService: WhiskeyService) {}

  addHeartToWhiskey(val: WhiskeyBottle) {
    //if (this.whiskey.id) {
    this.WhiskeyBottle.hearts += 1
    this.whiskeyService.updateWhiskey(this.WhiskeyBottle)
    //} else {
    // console.error('whiskey missing ID!')
    //}
  }
}
