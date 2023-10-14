"use server";

import axios from "axios";
import * as cheerio from "cheerio";
import { extractCurrency, extractPrice } from "../utils";

export async function scrapeAmazonProduct(url: string) {
  if (!url) return;

  //BrightDate Proxy COnfiguration
  const username = String(process.env.BRIGHT_DATA_USERNAME);
  const password = String(process.env.BRIGHT_DATA_PASSWORD);
  const port = 22225;
  const session_id = (1000000 * Math.random()) | 0;

  const options = {
    auth: {
      username: `${username}-session-${session_id}`,
      password: password,
    },
    host: "brd.superproxy.io",
    port,
    rejectUnauthorized: false,
  };

  try {
    //fetch product page
    const response = await axios.get(url, options);
    const $ = cheerio.load(response.data);

    // extract product title
    const title = $("#productTitle").text().trim();
    const currentPrice = extractPrice(
      $(".priceToPay .a-price-whole"),
      $("a.size.base.a-color-prcie"),
      $(".a-button-selected .a-color-base"),
      $(".a-price.priceToPay")
    );

    const originalPrice = extractPrice(
      $("#priceblock_ourprice"),
      $(".a-price .a-text span.a-offscreen"),
      $("#listPrice"),
      $(".a-price a-text-price"),
      $("#priceblock_dealprice"),
      $(".a-size-base.a-color-price")
    );

    const outOfStock =
      $("#availability span").text().trim().toLowerCase() === "currently unavailable";

    const images =
      $("#imgBlkFront").attr("data-a-dynamic-image") ||
      $("#landingImage").attr("data-a-dynamic-image") ||
      "{}";

    const imageUrls = Object.keys(JSON.parse(images));

    const currency = extractCurrency($(".a-price-symbol"));

    console.log({ title, currentPrice, originalPrice, outOfStock, imageUrls, currency });
  } catch (error: any) {
    throw new Error(`failed to scrape scraper file: ${error.message}`);
  }
}
