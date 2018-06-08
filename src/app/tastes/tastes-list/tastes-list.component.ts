import { Component, OnInit } from '@angular/core'
import { TastesService } from '../tastes.service'
import { Observable } from 'rxjs'

@Component({
  selector: 'tastes-list',
  templateUrl: './tastes-list.component.html',
  styleUrls: ['./tastes-list.component.scss']
})
export class TastesListComponent implements OnInit {
  tastes: Observable<any[]>
  content: string

  constructor(private tastesService: TastesService) {}

  ngOnInit() {
    this.tastes = this.tastesService.getData()
  }

  clickHandler() {
    this.tastesService.createTaste(this.content)
    this.content = ''
  }
}
