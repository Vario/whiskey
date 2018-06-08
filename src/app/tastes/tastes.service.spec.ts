import { TestBed, inject } from '@angular/core/testing'

import { TastesService } from './tastes.service'

xdescribe('TastesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TastesService]
    })
  })

  it('should be created', inject([TastesService], (service: TastesService) => {
    expect(service).toBeTruthy()
  }))
})
