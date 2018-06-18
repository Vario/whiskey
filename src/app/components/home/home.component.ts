import { Component } from '@angular/core'
import { AuthService } from '../shared/services'

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
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
export class HomeComponent {
  constructor(public authService: AuthService) {}
  onToTop() {
    document.body.scrollTop = document.documentElement.scrollTop = 0
  }
}
