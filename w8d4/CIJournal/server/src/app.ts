import express from "express";
import { Post, User } from "./model";
import cors from "cors";
import bcrypt from "bcryptjs";

const app = express();
const PORT = 3004;

app.use(cors());
app.use(express.json());

app.post("/login", async (req, res) => {
	const { username, password } = req.body;

	try {
		const user = await User.findOne({ username });
		if (!user) {
			return res.status(404).send("invalid username");
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (isMatch) return res.send("success");
		else res.status(401).send("Invalid credentials");
	} catch (error) {
		if (error instanceof Error) {
			res.status(500).send(error.message);
		}
	}
});

app.post("/register", async (req, res) => {
	const { username, password } = req.body;

	try {
		const newUser = new User({ username: username, password: password });
		await newUser.save();
		res.status(201).send("successfully registered");
	} catch (error) {
		if (error instanceof Error) {
			res.status(500).send(error.message);
		}
	}
});

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
	const { date, title, body } = req.body;

	try {
		const newPost = new Post({ date, title, body });
		const posted = await newPost.save();
		res.status(201).send({ newId: posted._id });
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
		const delQuery = { _id: id };
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
