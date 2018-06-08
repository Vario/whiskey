import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { UserDetailComponent } from './user-detail.component'
import { UserService } from '../user.service'
import { FormsModule } from '@angular/forms'

xdescribe('UserDetailComponent', () => {
  let component: UserDetailComponent
  let fixture: ComponentFixture<UserDetailComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserDetailComponent],
      providers: [{ provide: UserService, useValue: {} }]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
