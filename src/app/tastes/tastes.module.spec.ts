import { TastesModule } from './tastes.module'

describe('TastesModule', () => {
  let tastesModule: TastesModule

  beforeEach(() => {
    tastesModule = new TastesModule()
  })

  it('should create an instance', () => {
    expect(tastesModule).toBeTruthy()
  })
})
