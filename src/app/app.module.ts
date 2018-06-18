// Modules 3rd party
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {
  MatButtonModule,
  MatCheckboxModule,
  MatMenuModule,
  MatInputModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatDialogModule,
  MatSidenavModule,
  MatNativeDateModule,
  MatCardModule,
  MatTabsModule,
  MatIconModule
} from '@angular/material'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'

// AngularFire2 Modules
import { AngularFireModule } from 'angularfire2'
import { AngularFirestoreModule } from 'angularfire2/firestore'
import { AngularFireStorageModule } from 'angularfire2/storage'
import { AngularFireAuthModule } from 'angularfire2/auth'
import { AngularFireFunctionsModule } from 'angularfire2/functions'

// Modules
import { MessagesModule } from './components/messages/messages.module'
import { PipesModule } from './pipes/pipes.module'
import { BlocksModule } from './components/blocks/blocks.module'
import { AuthModule } from './components/auth/auth.module'
import { BackgroundsModule } from './components/backgrounds/backgrounds.module'
import { ProfileModule } from './components/profile/profile.module'
import { MiscModule } from './components/misc/misc.module'
import { WhiskeyModule } from './components/whiskey/whiskey.module'
// Shared
import {
  FooterComponent,
  HeaderComponent,
  AlertService,
  AuthGuardService,
  AuthService,
  WindowService
} from './components/shared'

// Main
import { AppComponent } from './app.component'
import {
  AppRoutingModule
  // routingComponents
} from './app.routing'

// Other components
import { HomeComponent } from './components/home/home.component'
import { PageNotFoundComponent } from './components/not-found/not-found.component'
import { EmailMeComponent } from './components/email-me/email-me.component'
import { environment } from '../environments/environment'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    EmailMeComponent
    // routingComponents
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase, 'whiskeyfriends'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireFunctionsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatMenuModule,
    MatInputModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatDialogModule,
    MatSidenavModule,
    MatNativeDateModule,
    MatCardModule,
    MatTabsModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MessagesModule,
    PipesModule,
    BlocksModule,
    AuthModule,
    BackgroundsModule,
    ProfileModule,
    MiscModule,
    WhiskeyModule
  ],
  providers: [AlertService, AuthGuardService, AuthService, WindowService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {}
