import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { ServiceWorkerModule } from '@angular/service-worker'
import { environment } from '../environments/environment'

// WhiskeyWorld App Modules
import { CoreModule } from './core/core.module'
import { UploadsModule } from './uploads/uploads.module'
import { UiModule } from './ui/ui.module'
import { WhiskeyModule } from './whiskey/whiskey.module'

// AngularFire2 Modules
import { AngularFireModule } from 'angularfire2'
import { AngularFirestoreModule } from 'angularfire2/firestore'
import { AngularFireStorageModule } from 'angularfire2/storage'
import { AngularFireAuthModule } from 'angularfire2/auth'
import { AngularFireFunctionsModule } from 'angularfire2/functions'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserTransferStateModule,
    AppRoutingModule,
    CoreModule,
    UiModule,
    WhiskeyModule,
    UploadsModule,
    AngularFireModule.initializeApp(environment.firebase, 'whiskeyfriends'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireFunctionsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
