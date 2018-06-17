import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { AuthGuard } from './core/auth.guard'
import { UserLoginComponent } from './ui/user-login/user-login.component'
import { HomePageComponent } from './ui/home-page/home-page.component'
import { WhiskeyBottleListComponent } from './whiskey/whiskey-bottlelist/whiskey-bottlelist.component'
import { UploadPageComponent } from './uploads/upload-page/upload-page.component'

import { SsrPageComponent } from './ui/ssr-page/ssr-page.component'

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: UserLoginComponent },
  { path: 'whiskeys', component: WhiskeyBottleListComponent, canActivate: [AuthGuard] },
  { path: 'uploads', component: UploadPageComponent, canActivate: [AuthGuard] }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
