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
  cols = 6
  ngOnInit() {
    this.whiskeyBottles$ = this.whiskeyService.getWhiskeyBottles()
  }
  onResize(event) {
    const element = event.target.innerWidth
    console.log(element)

    if (element < 950) {
      this.cols = 3
    }

    if (element > 950) {
      this.cols = 6
    }

    if (element < 750) {
      this.cols = 1
    }
  }

  whiskeyBottles() {
    let bottles = this.whiskeyService.getWhiskeyBottles()
    console.log('show bottles')
    return bottles
  }

  onNoClick(): void {
    //this.dialogRef.close()
  }
  openDialog() {}
}
