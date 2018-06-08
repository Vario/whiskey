import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { AuthGuard } from './core/auth.guard'
import { UserLoginComponent } from './ui/user-login/user-login.component'
import { HomePageComponent } from './ui/home-page/home-page.component'
import { WhiskeyListComponent } from './whiskey/whiskey-list/whiskey-list.component'
import { UserDetailComponent } from './user/user-detail/user-detail.component'
import { UploadPageComponent } from './uploads/upload-page/upload-page.component'

import { SsrPageComponent } from './ui/ssr-page/ssr-page.component'

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: UserLoginComponent },
  { path: 'whiskey', component: WhiskeyListComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserDetailComponent, canActivate: [AuthGuard] },
  { path: 'uploads', component: UploadPageComponent, canActivate: [AuthGuard] },
  { path: 'ssr', component: SsrPageComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
