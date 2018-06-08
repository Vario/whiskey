import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { TastesListComponent } from './tastes-list.component'

xdescribe('TastesListComponent', () => {
  let component: TastesListComponent
  let fixture: ComponentFixture<TastesListComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TastesListComponent]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(TastesListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
