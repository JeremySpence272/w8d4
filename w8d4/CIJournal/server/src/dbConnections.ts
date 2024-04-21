const mongoose = require("mongoose");

const recordsURI =
	"mongodb+srv://jeremyspence272:XXcctPB8g2tlOLH9@cijournal-cluster.nr4u260.mongodb.net/records?retryWrites=true&w=majority&ssl=true";
const userURI =
	"mongodb+srv://jeremyspence272:XXcctPB8g2tlOLH9@cijournal-cluster.nr4u260.mongodb.net/user?retryWrites=true&w=majority&ssl=true";

export const recordsDb = mongoose.createConnection(recordsURI);
export const userDb = mongoose.createConnection(userURI);
