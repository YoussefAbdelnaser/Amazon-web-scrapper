"use server";

import { scrapeAmazonProduct } from "../scraper";

export async function scrapeAndStore(productURL: string) {
  if (!productURL) return;

  try {
    const scrapedProduct = await scrapeAmazonProduct(productURL);
  } catch (error: any) {
    throw new Error(`Process failed actions file: ${error.messsage}`);
  }
}
