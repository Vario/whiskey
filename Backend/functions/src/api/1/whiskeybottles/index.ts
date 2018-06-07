import * as express from 'express'
import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as firebase from 'firebase'
import { DatabaseBuilder } from 'firebase-functions/lib/providers/firestore'
const guid = require('../../tools') // needs to be referenced this way
// This is the router which will be imported in our
// api hub (the index.ts which will be sent to Firebase Functions).
export let whiskeyBottleRouter = express.Router()

let dataTreeName = 'whiskeybottles' //name of node for objects

// Now that we have a router, we can define routes which this router
// will handle. Please look into the Express documentation for more info.
whiskeyBottleRouter.get('/:uid', async function getBottle(req: express.Request, res: express.Response) {
    const uid = req.params.uid

    let db = admin.database().ref(dataTreeName)
    db
        .once('value')
        .then(snap => {
            snap.forEach((child: any) => {
                console.log('iterate object:' + child.key)
                const childKey = child.key // <- here you get the key of each child of the '/account/' + userId node
                if (child.key == uid) {
                    console.log('return:' + JSON.parse(JSON.stringify(child)))
                    res.status(200).send(JSON.parse(JSON.stringify(child)))
                }
            })
            res.status(404).send('object not found')
        })
        .catch(error => {
            let errorStringify = JSON.parse(JSON.stringify(error))
            console.log('errorStringify.code ', errorStringify.code)
            res.status(400).send(errorStringify)
        })
})

whiskeyBottleRouter.get('/', async function listBottles(req: express.Request, res: express.Response) {
    //TODO Check Parameter
    console.log('list all whiskey bottles')
    await admin
        .database()
        .ref(dataTreeName)
        .once('value')
        .then(snap => {
            let members = snap.val()
            console.log('fetched whiskey bottles:' + members)
            res.status(200).send(members)
        })
        .catch(error => {
            let errorStringify = JSON.parse(JSON.stringify(error))
            console.log('errorStringify.code ', errorStringify.code)
            res.status(400).send(errorStringify)
        })
})
// POST method route
whiskeyBottleRouter.post('/', function(req, res) {
    console.log('create new whiskey bottle')
    let db = admin.database().ref(dataTreeName)
    let newObjRef = db.push()
    newObjRef
        .set(req.body)
        .then(snap => {
            console.log('created whiskey bottle:' + snap)
            res.status(200).send(snap)
            //Now we have to once and fetch data from database
            /*admin
                .database()
                .ref(dataTreeName)
                .once('value')
                .then(result => {
                    console.log('created whiseky bottle: ' + result.val())
                    res.status(200).send(JSON.parse(JSON.stringify(result.val())))
                })
                .catch(error => {
                    let errorStringify = JSON.parse(JSON.stringify(error))
                    console.log('errorStringify.code ', errorStringify.code)
                    res.status(400).send(errorStringify)
                })*/
        })
        .catch(error => {
            let errorStringify = JSON.parse(JSON.stringify(error))
            console.log('errorStringify.code ', errorStringify.code)
            res.status(400).send(errorStringify)
        })
})

// Useful: Let's make sure we intercept un-matched routes and notify the client with a 404 status code
whiskeyBottleRouter.get('*', async (req: express.Request, res: express.Response) => {
    res.status(404).send('This route does not exist for whiskeybottles.')
})
