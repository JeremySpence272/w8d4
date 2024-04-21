const request = require("supertest");
const app = require("../dist/app"); // Ensure this path correctly points to the compiled app

describe("POST /new", () => {
	test("should respond with 400 status if title or body is missing", async () => {
		const response = await request(app).post("/new").send({
			date: "04/21/2024",
			title: "",
			body: "Sample body",
		});
		expect(response.statusCode).toBe(400);
	});
	test("should handle long text inputs", async () => {
		const longTitle = "lorem ipsum".repeat(5000);
		const response = await request(app).post("/new").send({
			date: "04/21/2024",
			title: longTitle,
			body: "Sample body",
		});
		expect(response.statusCode).toBe(201);
	}, 10000);
	test("should handle special characters in input", async () => {
		const response = await request(app).post("/new").send({
			date: "04/21/2024",
			title: "Title with special characters 😊 <script>",
			body: "Body with emojis 😂 and symbols @#$%",
		});
		expect(response.statusCode).toBe(201);
	}, 10000);
});
