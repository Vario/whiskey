import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { WhiskeyBottleListComponent } from './whiskey-bottlelist.component'

xdescribe('WhiskeyBottleListComponent', () => {
  let component: WhiskeyBottleListComponent
  let fixture: ComponentFixture<WhiskeyBottleListComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WhiskeyBottleListComponent]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(WhiskeyBottleListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
