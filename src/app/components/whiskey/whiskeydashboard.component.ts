import { Component, OnInit } from '@angular/core'
import { WhiskeyBottleAddComponent } from './bottle-add/bottle-add.component'
import { MatDialog } from '@angular/material'
import { WhiskeyService } from '../shared/services/whiskey.service'

@Component({
  selector: 'whiskey-dashboard',
  templateUrl: 'whiskeydashboard.component.html',
  styles: [
    `
      button {
        position: fixed;
        bottom: 70px;
        float: right;
        right: 10px;
        z-index: 10;
      }
    `
  ]
})
export class WhiskeyDashboardComponent implements OnInit {
  isPopupOpened = true

  constructor(private dialog?: MatDialog, private _whiskeyService?: WhiskeyService) {}

  ngOnInit() {}

  addNewWhiskeyBottle() {
    this.isPopupOpened = true
    const dialogRef = this.dialog.open(WhiskeyBottleAddComponent, {
      data: {}
    })

    dialogRef.afterClosed().subscribe(result => {
      this.isPopupOpened = false
    })
  }
}
