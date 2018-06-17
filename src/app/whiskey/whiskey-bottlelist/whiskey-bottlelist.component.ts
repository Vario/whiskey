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
    console.log('init whiskey bottle list')
    this.whiskeybottles$ = this.whiskeyService.getWhiskeyBottles()
    this.whiskeybottles$.subscribe(whiskey => console.log('whiskey in list' + whiskey))
  }
  addNewWhiskeyBottle() {
    /*this.whiskeyService.createWhiskey('whiskey', 'brand').then(
      whiskey => {
        console.log('Whiskey added')
      },
      () => console.log('Task Errored!')
    )*/
  }
}
