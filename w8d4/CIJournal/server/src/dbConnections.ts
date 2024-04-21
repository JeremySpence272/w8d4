const mongoose = require("mongoose");

const recordsURI =
	"mongodb+srv://jeremyspence272:XXcctPB8g2tlOLH9@cijournal-cluster.nr4u260.mongodb.net/records";
const userURI =
	"mongodb+srv://jeremyspence272:XXcctPB8g2tlOLH9@cijournal-cluster.nr4u260.mongodb.net/user";

export const recordsDb = mongoose.createConnection(recordsURI);
export const userDb = mongoose.createConnection(userURI);
