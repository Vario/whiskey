import { Component, Input, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'

import { AlertService, AuthService } from '../shared'

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  @Input() loading = false

  constructor(private authService: AuthService, private alertService: AlertService) {}

  ngOnInit() {}

  onSignInGoogle(form: NgForm) {
    this.loading = true
    this.authService.googleLogin()
  }

  onSignInFacebook(form: NgForm) {
    this.loading = true
    this.authService.facebookLogin()
  }

  onSignin(form: NgForm) {
    this.loading = true
    const email = form.value.email
    const password = form.value.password
    this.authService.emailLogin(email, password)
  }
}
