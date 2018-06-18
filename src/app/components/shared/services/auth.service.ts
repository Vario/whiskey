import { Injectable } from '@angular/core'
import { Router } from '@angular/router'

import { firebase } from '@firebase/app'
import { AngularFireAuth } from 'angularfire2/auth'
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore'

import { Observable, of } from 'rxjs'
import { switchMap } from 'rxjs/operators'

interface User {
  uid: string
  email?: string | null
  photoURL?: string
  displayName?: string
}

@Injectable()
export class AuthService {
  user: Observable<User | null>
  userID: string = ''
  email: string = ''
  name: string = ''
  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) {
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          this.userID = user.uid
          this.email = user.email
          this.name = user.displayName
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
        } else {
          this.userID = ''
          this.email = ''
          this.name = ''
          return of(null)
        }
      })
    )
  }
  ////// OAuth Methods /////

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.oAuthLogin(provider)
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider()
    return this.oAuthLogin(provider)
  }

  private oAuthLogin(provider: any) {
    return this.afAuth.auth
      .signInWithPopup(provider)
      .then(credential => {
        return this.updateUserData(credential.user)
      })
      .catch(error => this.handleError(error))
  }

  //// Email/Password Auth ////

  emailSignUp(email: string, password: string) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(credential => {
        return this.updateUserData(credential.user) // if using firestore
      })
      .catch(error => this.handleError(error))
  }

  emailLogin(email: string, password: string) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(credential => {
        return this.updateUserData(credential.user)
      })
      .catch(error => this.handleError(error))
  }

  // Sends email allowing user to reset password
  resetPassword(email: string) {
    const fbAuth = firebase.auth()

    return fbAuth.sendPasswordResetEmail(email).catch(error => this.handleError(error))
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/'])
    })
  }

  // If error, console log and notify user
  private handleError(error: Error) {
    console.error(error)
  }

  // Sets user data to firestore after succesful login
  private updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`)

    const data: User = {
      uid: user.uid,
      email: user.email || null,
      displayName: user.displayName || 'nameless user',
      photoURL: user.photoURL || 'https://goo.gl/Fz9nrQ'
    }
    return userRef.set(data)
  }
}
