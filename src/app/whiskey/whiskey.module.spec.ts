import { WhiskeyModule } from './whiskey.module'

describe('NotesModule', () => {
  let whiskeyModule: WhiskeyModule

  beforeEach(() => {
    whiskeyModule = new WhiskeyModule()
  })

  it('should create an instance', () => {
    expect(whiskeyModule).toBeTruthy()
  })
})
