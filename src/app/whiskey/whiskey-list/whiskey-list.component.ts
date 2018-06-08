import { Component, OnInit } from '@angular/core'
import { WhiskeyService } from '../whiskey.service'
import { Observable } from 'rxjs'

@Component({
  selector: 'whiskey-list',
  templateUrl: './whiskey-list.component.html',
  styleUrls: ['./whiskey-list.component.scss']
})
export class WhiskeyListComponent implements OnInit {
  whiskeys: Observable<any[]>
  content: string

  constructor(private whiskeyService: WhiskeyService) {}

  ngOnInit() {
    this.whiskeys = this.whiskeyService.getData()
  }

  clickHandler() {
    this.whiskeyService.createWhiskey(this.content)
    this.content = ''
  }
}
