// Import required modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const fs = require("fs");
const PlayHT = require("playht");
const scrapeNewsContent = require("./scraper");
// Load environment variables
dotenv.config();

// Initialize PlayHT client
PlayHT.init({
  userId: process.env.PLAYHT_USER_ID,
  apiKey: process.env.PLAYHT_API_KEY,
});

// Initialize Express app
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors({ origin: "http://127.0.0.1:5500" })); // CORS yapılandırması

// Endpoint to scrape the news content
app.post("/api/scrape", async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    // Placeholder for extracted text (Replace with actual web scraping logic)
    const newsContent = await scrapeNewsContent(url);

    // Convert text to speech using PlayHT
    const stream = await PlayHT.stream(newsContent, {
      voiceEngine: "PlayHT2.0",
      voice: "en-US-Adolfo",
    });
    // Generate a random file name
    const randomFileName = `output_${Date.now()}_${Math.floor(
      Math.random() * 1000
    )}.mp3`;
    const filePath = `./audio/${randomFileName}`;
    const writeStream = fs.createWriteStream(filePath);

    stream.on("data", (chunk) => {
      writeStream.write(chunk);
    });

    stream.on("end", () => {
      writeStream.end();
      res
        .status(200)
        .json({ audioUrl: `http://localhost:${PORT}/audio/${randomFileName}` });
    });
  } catch (error) {
    console.error("Error:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while processing the request" });
  }
});

// Serve audio files
app.use("/audio", express.static("audio"));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
