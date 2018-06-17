import { Component, Input } from '@angular/core'

import { WhiskeyService } from '../whiskey.service'

@Component({
  selector: 'whiskey-detail',
  templateUrl: './whiskey-detail.component.html',
  styleUrls: ['./whiskey-detail.component.scss']
})
export class WhiskeyDetailComponent {
  @Input() WhiskeyBottle: any

  constructor(private whiskeyService: WhiskeyService) {}

  addHeartToWhiskey() {
    if (this.WhiskeyBottle.id) {
      this.WhiskeyBottle.hearts += 1
      this.whiskeyService.updateWhiskey(this.WhiskeyBottle.id, this.WhiskeyBottle)
    } else {
      console.error('whiskey missing ID!')
    }
  }
  tasteWhiskey() {
    this.whiskeyService.tasteWhiskey(this.WhiskeyBottle)
  }
}
