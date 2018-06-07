"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const admin = require("firebase-admin");
const guid = require('../../tools'); // needs to be referenced this way
// This is the router which will be imported in our
// api hub (the index.ts which will be sent to Firebase Functions).
exports.whiskeyBottleRouter = express.Router();
let dataTreeName = 'whiskeybottles'; //name of node for objects
// Now that we have a router, we can define routes which this router
// will handle. Please look into the Express documentation for more info.
exports.whiskeyBottleRouter.get('/:uid', function getBottle(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const uid = req.params.uid;
        let db = admin.database().ref(dataTreeName);
        db
            .once('value')
            .then(snap => {
            snap.forEach((child) => {
                console.log('iterate object:' + child.key);
                const childKey = child.key; // <- here you get the key of each child of the '/account/' + userId node
                if (child.key == uid) {
                    console.log('return:' + JSON.parse(JSON.stringify(child)));
                    res.status(200).send(JSON.parse(JSON.stringify(child)));
                }
            });
            res.status(404).send('object not found');
        })
            .catch(error => {
            let errorStringify = JSON.parse(JSON.stringify(error));
            console.log('errorStringify.code ', errorStringify.code);
            res.status(400).send(errorStringify);
        });
    });
});
exports.whiskeyBottleRouter.get('/', function listBottles(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        //TODO Check Parameter
        console.log('list all whiskey bottles');
        yield admin
            .database()
            .ref(dataTreeName)
            .once('value')
            .then(snap => {
            let members = snap.val();
            console.log('fetched whiskey bottles:' + members);
            res.status(200).send(members);
        })
            .catch(error => {
            let errorStringify = JSON.parse(JSON.stringify(error));
            console.log('errorStringify.code ', errorStringify.code);
            res.status(400).send(errorStringify);
        });
    });
});
// POST method route
exports.whiskeyBottleRouter.post('/', function (req, res) {
    console.log('create new whiskey bottle');
    let db = admin.database().ref(dataTreeName);
    let newObjRef = db.push();
    newObjRef
        .set(req.body)
        .then(snap => {
        console.log('created whiskey bottle:' + snap);
        res.status(200).send(snap);
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
        let errorStringify = JSON.parse(JSON.stringify(error));
        console.log('errorStringify.code ', errorStringify.code);
        res.status(400).send(errorStringify);
    });
});
// Useful: Let's make sure we intercept un-matched routes and notify the client with a 404 status code
exports.whiskeyBottleRouter.get('*', (req, res) => __awaiter(this, void 0, void 0, function* () {
    res.status(404).send('This route does not exist for whiskeybottles.');
}));
