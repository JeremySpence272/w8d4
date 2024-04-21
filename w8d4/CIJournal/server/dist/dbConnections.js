"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDb = exports.recordsDb = void 0;
const mongoose = require("mongoose");
const recordsURI = "mongodb+srv://jeremyspence272:XXcctPB8g2tlOLH9@cijournal-cluster.nr4u260.mongodb.net/records?retryWrites=true&w=majority&ssl=true";
const userURI = "mongodb+srv://jeremyspence272:XXcctPB8g2tlOLH9@cijournal-cluster.nr4u260.mongodb.net/user?retryWrites=true&w=majority&ssl=true";
exports.recordsDb = mongoose.createConnection(recordsURI);
exports.userDb = mongoose.createConnection(userURI);
