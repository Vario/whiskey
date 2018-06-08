import { TestBed, inject } from '@angular/core/testing'

import { WhiskeyService } from './whiskey.service'

xdescribe('WhiskeyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WhiskeyService]
    })
  })

  it('should be created', inject([WhiskeyService], (service: WhiskeyService) => {
    expect(service).toBeTruthy()
  }))
})
