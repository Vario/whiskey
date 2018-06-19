import { Component, OnInit, Inject } from '@angular/core'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { WhiskeyService } from '../../shared/services/whiskey.service'
import { Observable } from 'rxjs'

@Component({
  selector: 'bottle-list',
  templateUrl: './whiskeylist.component.html',
  styleUrls: ['./whiskeylist.component.scss']
})
export class WhiskeyBottleListComponent {
  constructor(private whiskeyService: WhiskeyService) {}
  whiskeyBottles$: Observable<any[]>

  whiskeyBottles() {
    let bottles = this.whiskeyService.getWhiskeyBottles()
    console.log('show bottles')
    return bottles
  }

  ngOnInit() {
    this.whiskeyBottles$ = this.whiskeyService.getWhiskeyBottles()
  }
  onNoClick(): void {
    //this.dialogRef.close()
  }
  openDialog() {}
}
