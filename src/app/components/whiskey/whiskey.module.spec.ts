import { WhiskeyModule } from './whiskey.module'

describe('WhiskeyModule', () => {
  let whiskeyModule: WhiskeyModule

  beforeEach(() => {
    whiskeyModule = new WhiskeyModule()
  })

  it('should create an instance', () => {
    expect(whiskeyModule).toBeTruthy()
  })
})
