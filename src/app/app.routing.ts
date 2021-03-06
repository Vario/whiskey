// Modules 3rd party
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

// Main
import { AppComponent } from './app.component'

// 404 page
import { PageNotFoundComponent } from './components/not-found/not-found.component'

// Pages
import { HomeComponent } from './components/home/home.component'
import { MiscComponent } from './components/misc/misc.component'
import { WhiskeyDashboardComponent } from './components/whiskey/whiskeydashboard.component'
import { WhiskeyTasteListComponent } from './components/whiskey/taste-list/tastelist.component'

// Components
import { SignupComponent } from './components/auth/signup.component'
import { SigninComponent } from './components/auth/signin.component'
import { ProfileComponent } from './components/profile/profile.component'
import { ProfileSettingsComponent } from './components/profile/profile-settings.component'
import { MessagesComponent } from './components/messages/messages.component'

// Protected
import { AuthGuardService } from './components/shared'

// Routing
const appRoutes: Routes = [
  // Public pages
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  //{ path: 'misc', loadChildren: './components/misc/misc.module#MiscModule' },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: SigninComponent },

  // Protected pages
  // { path: 'profile/:uid/:name', component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: 'profile-settings', component: ProfileSettingsComponent, canActivate: [AuthGuardService] },
  { path: 'whiskey', component: WhiskeyDashboardComponent, canActivate: [AuthGuardService] },
  { path: 'tastes', component: WhiskeyTasteListComponent, canActivate: [AuthGuardService] },
  { path: 'messages', component: MessagesComponent, canActivate: [AuthGuardService] },
  { path: '**', component: PageNotFoundComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
