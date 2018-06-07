import * as express from 'express'
import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import * as api1 from './api/1'
import { isUndefined } from 'util'
const adminApp = admin.initializeApp(functions.config().firebase)
const app = express()
//const API_URL = 'https://us-central1-whiskeytaste-307bd.cloudfunctions.net/api'
// https://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
app.disable('x-powered-by')

////-------------------------------------
////----------------AUTHORIZATION-----------
////-------------------------------------
// Express middleware that validates Firebase ID Tokens passed in the Authorization HTTP header.
// The Firebase ID token needs to be passed as a Bearer token in the Authorization HTTP header like this:
// `Authorization: Bearer <Firebase ID Token>`.
// when decoded successfully, the ID Token content will be added as `req.user`.
//options for cors midddleware
// Express middleware that validates Firebase ID Tokens passed in the Authorization HTTP header.
// The Firebase ID token needs to be passed as a Bearer token in the Authorization HTTP header like this:
// `Authorization: Bearer <Firebase ID Token>`.
// when decoded successfully, the ID Token content will be added as `req.user`.
const cookieParser = require('cookie-parser')()
const cors = require('cors')({ origin: true })
//app.use(cors)
//app.use(cookieParser)

const validateFirebaseIdToken = (req: express.Request, res: express.Response, next: () => void) => {
    console.log('Check if request is authorized with Firebase ID token')
    if (isUndefined(req.headers.authorization)) {
        console.error('No Authorization header found')
        res.status(403).send('Unauthorized')
        return
    } else {
        if (!req.headers.authorization.startsWith('Bearer ') && !req.cookies.__session) {
            console.error(
                'No Firebase ID token was passed as a Bearer token in the Authorization header.',
                'Make sure you authorize your request by providing the following HTTP header:',
                'Authorization: Bearer <Firebase ID Token>',
                'or by passing a "__session" cookie.'
            )
            res.status(403).send('Unauthorized')
            return
        }
    }
    let idToken
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        console.log('Found "Authorization" header')
        // Read the ID Token from the Authorization header.
        idToken = req.headers.authorization.split('Bearer ')[1]
    } else {
        console.log('Found "__session" cookie')
        // Read the ID Token from cookie.
        idToken = req.cookies.__session
    }
    admin
        .auth()
        .verifyIdToken(idToken)
        .then(decodedIdToken => {
            console.log('ID Token correctly decoded', decodedIdToken)
            //req.user = decodedIdToken
            next()
        })
        .catch(error => {
            console.error('Error while verifying Firebase ID token:', error)
            res.status(403).send('Unauthorized')
        })
}
//app.use(validateFirebaseIdToken)

////-------------------------------------
////----------------ENDPOINTS-----------
////-------------------------------------
// This HTTPS endpoints can only be accessed by your Firebase Users.
// Requests need to be authorized by providing an `Authorization` HTTP header
// with value `Bearer <Firebase ID Token>`.

// Any requests to /api/1 will be routed to the api1 router!
app.use('/1', api1.api1Router)

// Again, lets be nice and help the poor wandering servers, any requests to /api
// that are not /api/users will result in 404.
app.get('*', async (req: express.Request, res: express.Response) => {
    console.log('invalid url request:' + req.baseUrl)
    res.status(404).send('This route does not exist!')
})

// This line is important. What we are doing here is exporting ONE function with the name
// `api` which will always route
// This HTTPS endpoint can only be accessed by your Firebase Users.
// Requests need to be authorized by providing an `Authorization` HTTP header
// with value `Bearer <Firebase ID Token>`.
exports.api = functions.https.onRequest(app)
