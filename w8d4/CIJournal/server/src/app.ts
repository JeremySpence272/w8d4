import express from "express";
import mongoose from "mongoose";
import Post from "./model";
import cors from "cors";

const app = express();
const PORT = 3004;
const mongoURI =
	"mongodb+srv://jeremyspence272:XXcctPB8g2tlOLH9@cijournal-cluster.nr4u260.mongodb.net/records";

app.use(cors());
app.use(express.json());

mongoose
	.connect(mongoURI)
	.then(() => console.log("connectedtoDB!!!"))
	.catch((err) => console.log(err));

app.get("/posts", async (req, res) => {
	try {
		const response = await Post.find({});
		if (response) {
			res.status(200).send(response);
		} else {
			res.status(404).send("couldn't get anyfin");
		}
	} catch (error) {
		if (error instanceof Error) {
			res.status(400).send(error.message);
		}
	}
});

app.post("/new", async (req, res) => {
	const { id, date, title, body } = req.body;

	try {
		const newPost = new Post({ id, date, title, body });
		await newPost.save();
		res.status(201).send("added post");
	} catch (error) {
		if (error instanceof Error) {
			res.status(400).send(error.message);
		}
	}
});

app.put("/update/:id", async (req, res) => {
	const id = req.params.id;
	const { title, body } = req.body;
	try {
		const queryFor = { id: id };
		const newVals = { $set: { title, body } };
		const response = await Post.findOneAndUpdate(queryFor, newVals, {
			new: true,
		});
		if (response) {
			res.status(200).send("Updated post");
		} else {
			res.status(404).send("Post not found");
		}
	} catch (error) {
		if (error instanceof Error) {
			res.status(400).send(error.message);
		}
	}
});

app.delete("/delete/:id", async (req, res) => {
	const id = req.params.id;

	try {
		const delQuery = { id: id };
		const response = await Post.deleteOne(delQuery);
		if (response) {
			res.status(200).send("deleted post");
		} else {
			res.status(404).send("post not found");
		}
	} catch (error) {
		if (error instanceof Error) {
			res.status(400).send(error.message);
		}
	}
});

app.listen(PORT, () => {
	console.log(`server running on ${PORT}`);
});
