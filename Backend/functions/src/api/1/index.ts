import * as express from 'express'
import * as users from './users'
import * as whiskeyBottle from './whiskeybottles'
import * as openWhiskeyBottle from './openwhiskeybottles'
// This is the router which will be imported in our
// api hub (the index.ts which will be sent to Firebase Functions).
export let api1Router = express.Router()

// Any requests to /api/users will be routed to the user router!
api1Router.use('/users', users.userRouter)
api1Router.use('/whiskeybottles', whiskeyBottle.whiskeyBottleRouter)
api1Router.use('/openwhiskeybottles', openWhiskeyBottle.openWhiskeyBottleRouter)

// Useful: Let's make sure we intercept un-matched routes and notify the client with a 404 status code
api1Router.get('*', async (req: express.Request, res: express.Response) => {
    res.status(404).send('This route for api1 does not exist.')
})
