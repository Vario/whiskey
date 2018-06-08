import { Component, Input } from '@angular/core'

import { WhiskeyService } from '../whiskey.service'

@Component({
  selector: 'whiskey-detail',
  templateUrl: './whiskey-detail.component.html',
  styleUrls: ['./whiskey-detail.component.scss']
})
export class WhiskeyDetailComponent {
  @Input() whiskey: any

  constructor(private whiskeyService: WhiskeyService) {}

  addHeartToWhiskey(val: number) {
    if (this.whiskey.id) {
      this.whiskeyService.updateWhiskey(this.whiskey.id, { hearts: val + 1 })
    } else {
      console.error('Whiskey missing ID!')
    }
  }

  deleteWhiskey(id: string) {
    this.whiskeyService.deleteWhiskey(id)
  }
}
