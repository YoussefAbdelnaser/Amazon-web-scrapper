"use server";

import { connectToDB } from "../mongoose";
import { scrapeAmazonProduct } from "../scraper";

export async function scrapeAndStore(productURL: string) {
  if (!productURL) return;

  try {
    await connectToDB();

    const scrapedProduct = await scrapeAmazonProduct(productURL);

    if (!scrapedProduct) return;
  } catch (error: any) {
    throw new Error(`Process failed actions file: ${error.messsage}`);
  }
}
