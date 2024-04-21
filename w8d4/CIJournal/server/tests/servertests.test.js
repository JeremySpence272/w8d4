const request = require("supertest");
const app = require("../dist/app"); // Ensure this path correctly points to the compiled app

let server;

beforeAll((done) => {
	server = app.listen(3004, () => {
		global.agent = request.agent(server);
		done();
	});
});

afterAll((done) => {
	server.close(done);
});

describe("POST /new", () => {
	test("should respond with 400 status if title or body is missing", async () => {
		const response = await request(app).post("/new").send({
			date: "04/21/2024",
			title: "",
			body: "Sample body",
		});
		expect(response.statusCode).toBe(400);
	});
});
describe("POST /new", () => {
	test("should handle long text inputs", async () => {
		const longText = "lorem ipsum".repeat(500);
		const response = await request(app).post("/new").send({
			date: "04/21/2024",
			title: "title",
			body: longText,
		});
		expect(response.statusCode).toBe(201);
	});
});
describe("POST /new", () => {
	test("should handle special characters in input", async () => {
		const response = await request(app).post("/new").send({
			date: "04/21/2024",
			title: "Title with special characters 😊 <script>",
			body: "Body with emojis 😂 and symbols @#$%",
		});
		expect(response.statusCode).toBe(201);
	});
});
