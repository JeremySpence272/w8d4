import mongoose from "mongoose";
import { userDb, recordsDb } from "./dbConnections";
import bcrypt from "bcryptjs";

const postSchema = new mongoose.Schema({
	date: { type: String, required: true },
	title: { type: String, required: true },
	body: { type: String, required: true },
});

export const Post = recordsDb.model("Post", postSchema);

const userSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
});

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();

	this.password = await bcrypt.hash(this.password, 12);
	next();
});

export const User = userDb.model("User", userSchema);
