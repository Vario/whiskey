import { TestBed, async } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { AppComponent } from './app.component'
import { CoreModule } from './core/core.module'
import { UploadsModule } from './uploads/uploads.module'
import { UiModule } from './ui/ui.module'
import { TastesModule } from './tastes/tastes.module'
import { WhiskeyModule } from './whiskey/whiskey.module'
import { UserModule } from './user/user.module'
import { AngularFireModule } from 'angularfire2'
import { AngularFirestoreModule } from 'angularfire2/firestore'
import { AngularFireStorageModule } from 'angularfire2/storage'
import { AngularFireAuthModule } from 'angularfire2/auth'
import { environment } from '../environments/environment'

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        CoreModule,
        UploadsModule,
        UiModule,
        WhiskeyModule,
        UserModule,
        TastesModule,
        AngularFireModule.initializeApp(environment, 'firestarter'),
        AngularFirestoreModule,
        AngularFireAuthModule,
        AngularFireStorageModule
      ],
      declarations: [AppComponent]
    }).compileComponents()
  }))
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.debugElement.componentInstance
    expect(app).toBeTruthy()
  }))
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.debugElement.componentInstance
    expect(app.title).toEqual('app')
  }))
})
