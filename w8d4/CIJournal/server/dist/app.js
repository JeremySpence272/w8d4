"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const model_1 = require("./model");
const cors_1 = __importDefault(require("cors"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const app = (0, express_1.default)();
const PORT = 3004;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const user = yield model_1.User.findOne({ username });
        if (!user) {
            return res.status(404).send("invalid username");
        }
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (isMatch)
            return res.send("success");
        else
            res.status(401).send("Invalid credentials");
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error.message);
        }
    }
}));
app.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const newUser = new model_1.User({ username: username, password: password });
        yield newUser.save();
        res.status(201).send("successfully registered");
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error.message);
        }
    }
}));
app.get("/posts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield model_1.Post.find({});
        if (response) {
            res.status(200).send(response);
        }
        else {
            res.status(404).send("couldn't get anyfin");
        }
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).send(error.message);
        }
    }
}));
app.post("/new", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, title, body } = req.body;
    if (title === "" || body === "") {
        res.status(400).send("empty post");
        return;
    }
    try {
        const newPost = new model_1.Post({ date, title, body });
        const posted = yield newPost.save();
        res.status(201).send({ newId: posted._id });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).send(error.message);
        }
    }
}));
app.put("/update/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { title, body } = req.body;
    try {
        const queryFor = { id: id };
        const newVals = { $set: { title, body } };
        const response = yield model_1.Post.findOneAndUpdate(queryFor, newVals, {
            new: true,
        });
        if (response) {
            res.status(200).send("Updated post");
        }
        else {
            res.status(404).send("Post not found");
        }
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).send(error.message);
        }
    }
}));
app.delete("/delete/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const delQuery = { _id: id };
        const response = yield model_1.Post.deleteOne(delQuery);
        if (response) {
            res.status(200).send("deleted post");
        }
        else {
            res.status(404).send("post not found");
        }
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).send(error.message);
        }
    }
}));
app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
});
module.exports = app;
