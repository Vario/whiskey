import { Component, OnInit } from '@angular/core'
import { WhiskeyService } from '../whiskey.service'
import { Observable } from 'rxjs'
import { MatDialog, MatDialogConfig } from '@angular/material'
import { WhiskeyAddComponent } from '../whiskey-add/whiskey-add.component'

@Component({
  selector: 'whiskey-bottlelist',
  templateUrl: './whiskey-bottlelist.component.html',
  styleUrls: ['./whiskey-bottlelist.component.scss']
})
export class WhiskeyBottleListComponent implements OnInit {
  whiskeybottles$: Observable<any[]>
  isPopupOpened = true
  constructor(private whiskeyService: WhiskeyService, private dialog: MatDialog) {}

  ngOnInit() {
    console.log('init whiskey bottle list')
    this.whiskeybottles$ = this.whiskeyService.getWhiskeyBottles()
  }
  addNewWhiskeyBottle() {
    this.isPopupOpened = true
    console.log('add new whiskey')

    const dialogConfig = new MatDialogConfig()

    dialogConfig.autoFocus = true
    dialogConfig.data = {}
    const dialogRef = this.dialog.open(WhiskeyAddComponent, dialogConfig)

    dialogRef.afterClosed().subscribe(result => {
      this.isPopupOpened = false
    })
  }
}
