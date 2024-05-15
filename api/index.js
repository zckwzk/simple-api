// index.js
const express = require("express");
const cors = require("cors");

const bodyParser = require("body-parser");
const learningPlanSchema = require("../schema");
const { ZodError } = require("zod");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Allow all origins
app.use(cors());

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Route for handling form submissions
app.post("/submit-form", (req, res) => {
  try {
    const formData = req.body;
    learningPlanSchema.parse(formData);
    res.json({ message: "Form data is valid!", data: formData });
  } catch (error) {
    console.log(error);
    if (error instanceof ZodError) {
      const errorMessages = error.errors.map((issue) => ({
        message: `${issue.path.join(".")} is ${issue.message}`,
      }));
      res.status(400).json({ error: errorMessages });
    } else {
      console.error("Error parsing form data:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
