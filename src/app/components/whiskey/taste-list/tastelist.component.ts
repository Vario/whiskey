import { Component } from '@angular/core'
import { animate, state, style, transition, trigger } from '@angular/animations'
import { WhiskeyTasteService } from '../../shared/services/whiskeytaste.service'
import { AuthService } from '../../shared/services/auth.service'
import { Observable } from 'rxjs'

/**
 * @title Table with expandable rows
 */
@Component({
  selector: 'taste-list',
  styleUrls: ['./tastelist.component.scss'],
  templateUrl: './tastelist.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])
  ]
})
export class WhiskeyTasteListComponent {
  constructor(private whiskeyTasteService: WhiskeyTasteService, private authService: AuthService) {}
  myWhiskeyTastes$: Observable<any[]>
  otherTastesForMyWhiskeys$: Observable<any[]>
  expandedElement: any

  ngOnInit() {
    this.otherTastesForMyWhiskeys$ = this.whiskeyTasteService.getOthersTastesForMyWhiskeyCollection()
    this.myWhiskeyTastes$ = this.whiskeyTasteService.getMyWhiskeysToTasteCollection()
  }
  paid(taste: any) {
    this.whiskeyTasteService.setWhiskeyTastePaid(taste)
  }
}
