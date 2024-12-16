const axios = require("axios");
const cheerio = require("cheerio");

const scrapeNewsContent = async (url) => {
  try {
    // Fetch the webpage content
    const response = await axios.get(url);
    const html = response.data;

    // Load the HTML into Cheerio
    const $ = cheerio.load(html);

    // Extract the main content from the article (adjust selector as needed)
    const content = $("div.sc-18fde0d6-0.dlWCEZ").text().trim();

    if (!content) {
      throw new Error(
        "Could not extract article content. Please check the selector."
      );
    }

    // Return the first 500 characters of the content
    return content.substring(0, 500);
  } catch (error) {
    console.error(`Error scraping the URL: ${url}`, error);
    throw new Error("Failed to scrape the content from the provided URL.");
  }
};

module.exports = scrapeNewsContent;
