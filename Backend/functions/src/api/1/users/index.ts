import * as express from 'express'

// This is the router which will be imported in our
// api hub (the index.ts which will be sent to Firebase Functions).
export let userRouter = express.Router()

// Now that we have a router, we can define routes which this router
// will handle. Please look into the Express documentation for more info.
userRouter.get('/:uid', async function getUser(req: express.Request, res: express.Response) {
    // ...
    // just like before
    const uid = req.params.uid
    res.status(200).send(`You requested user with UID = ${uid}`)

    // ...
})
userRouter.post('/:uid', async function newUser(req: express.Request, res: express.Response) {
    // ...
    // just like before
    const uid = req.params.uid
    res.status(200).send(`You requested user with UID = ${uid}`)

    // ...
})

// Useful: Let's make sure we intercept un-matched routes and notify the client with a 404 status code
userRouter.get('*', async (req: express.Request, res: express.Response) => {
    res.status(404).send('This route does not exist for users.')
})
