import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { WhiskeyListComponent } from './whiskey-list.component'

xdescribe('WhiskeyListComponent', () => {
  let component: WhiskeyListComponent
  let fixture: ComponentFixture<WhiskeyListComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WhiskeyListComponent]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(WhiskeyListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
