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
const users = require("./users");
const whiskeyBottle = require("./whiskeybottles");
const openWhiskeyBottle = require("./openwhiskeybottles");
// This is the router which will be imported in our
// api hub (the index.ts which will be sent to Firebase Functions).
exports.api1Router = express.Router();
// Any requests to /api/users will be routed to the user router!
exports.api1Router.use('/users', users.userRouter);
exports.api1Router.use('/whiskeybottles', whiskeyBottle.whiskeyBottleRouter);
exports.api1Router.use('/openwhiskeybottles', openWhiskeyBottle.openWhiskeyBottleRouter);
// Useful: Let's make sure we intercept un-matched routes and notify the client with a 404 status code
exports.api1Router.get('*', (req, res) => __awaiter(this, void 0, void 0, function* () {
    res.status(404).send('This route for api1 does not exist.');
}));
