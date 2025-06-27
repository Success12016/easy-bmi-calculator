const express = require("express");
const bodyparser = require("body-parser");
const path = require("path");

const app = express();
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public"))); // CSS/JS อยู่ใน public/

app.set("view engine", "ejs"); // ใช้ EJS
app.set("views", path.join(__dirname, "/views")); // มองหาไฟล์ .ejs ใน /views

app.get("/", function (req, res) {
	res.render("index", { result: null, weight: "", height: "" });
});

app.post("/", function (req, res) {
	const weight = parseFloat(req.body.weight);
	const height = parseFloat(req.body.height) / 100;

	if (isNaN(weight) || isNaN(height) || height === 0) {
		return res.render("index", {
			result: "Invalid input. Please enter valid numbers.",
			weight: req.body.weight,
			height: req.body.height
		});
	}

	const bmi = weight / (height * height);
	const rounded = bmi.toFixed(2);

	let category = "";
	if (bmi < 18.5) category = "Underweight";
	else if (bmi < 24.9) category = "Normal weight";
	else if (bmi < 29.9) category = "Overweight";
	else category = "Obese";

	const resultText = `Your BMI is ${rounded}. Category: ${category}.`;

	res.render("index", {
		result: resultText,
		weight: req.body.weight,
		height: req.body.height
	});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
