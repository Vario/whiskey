import { Component, OnInit } from '@angular/core'
import { WhiskeyService } from '../whiskey.service'
import { Observable } from 'rxjs'

@Component({
  selector: 'whiskey-bottlelist',
  templateUrl: './whiskey-bottlelist.component.html',
  styleUrls: ['./whiskey-bottlelist.component.scss']
})
export class WhiskeyBottleListComponent implements OnInit {
  whiskeybottles$: Observable<any[]>

  constructor(private whiskeyService: WhiskeyService) {}

  ngOnInit() {
    this.whiskeybottles$ = this.whiskeyService.getWhiskeyBottles()
    console.log('init whiskey bottle list')
  }
  addNewWhiskeyBottle() {
    this.whiskeyService.createWhiskey('whiskey', 'brand').then(
      whiskey => {
        console.log('Whiskey added')
      },
      () => console.log('Task Errored!')
    )
  }
}
