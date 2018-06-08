import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { WhiskeyDetailComponent } from './whiskey-detail.component'
import { WhiskeyService } from '../whiskey.service'
import { FormsModule } from '@angular/forms'

xdescribe('WhiskeyDetailComponent', () => {
  let component: WhiskeyDetailComponent
  let fixture: ComponentFixture<WhiskeyDetailComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WhiskeyDetailComponent],
      providers: [{ provide: WhiskeyService, useValue: {} }]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(WhiskeyDetailComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
