import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations'
import { AuthService } from '../shared/services'
import * as firebase from 'firebase'

import { User, Profile, AlertService } from '../shared'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [
    trigger('imageAnimation', [
      state(
        'small',
        style({
          transform: 'scale(1)'
        })
      ),
      state(
        'large',
        style({
          transform: 'scale(2)'
        })
      ),

      transition(
        'small <=> large',
        animate(
          '500ms ease-in',
          keyframes([
            style({ opacity: 0, transform: 'translateY(-80%)', offset: 0 }),
            style({ opacity: 1, transform: 'translateY(25px)', offset: 1 })
          ])
        )
      )
    ])
  ]
})
export class ProfileComponent implements OnInit {
  uid = firebase.auth().currentUser.uid

  fullImagePath: string
  profileTitle: string = 'My profile'
  displayName: string = 'Your username'
  bio: any = 'Your bio'

  state = 'small'

  constructor(private authService: AuthService, private route: ActivatedRoute, private alertService: AlertService) {
    this.fullImagePath = '/assets/img/mb-bg-04.png'
  }

  ngOnInit() {
    firebase
      .database()
      .ref()
      .child('users/' + this.uid)
      .once('value')
      .then(snap => {
        ;(this.displayName = snap.val().displayName), (this.bio = snap.val().bio)
      })
  }

  animateImage() {
    this.state = this.state === 'small' ? 'large' : 'small'
  }

  userEmail() {
    return this.authService.email
  }

  onPasswordReset() {
    this.authService.resetPassword(this.userEmail())
    //this.userService.sendUserPasswordResetEmail()
    this.alertService.showToaster('Reset password is sent to your email')
  }
}
