import { Component } from '@angular/core'
import * as firebase from 'firebase'

import { AuthService, AlertService } from '../../services'

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  title = ''
  angularImage: string

  menuItems: Array<Object> = [
    /*{
      icon: 'description',
      title: 'Title',
      link: ''
    },*/
  ]

  constructor(public authService: AuthService, private alertService: AlertService) {
    this.angularImage = '/assets/img/angular2.png'
  }

  userUid() {
    return this.authService.userID
  }

  userEmail() {
    return this.authService.email
  }

  userName() {
    return this.authService.name
  }

  onLogout() {
    this.authService.signOut()
    this.alertService.showToaster('Logout succesful')
  }
}
