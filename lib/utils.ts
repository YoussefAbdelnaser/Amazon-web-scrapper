export function extractPrice(...elements: any[]) {
  for (const element of elements) {
    const priceText = element.text().trim();

    if (priceText) return priceText.replace(/[^\d.]/g, "");
  }
  return "";
}

export function extractCurrency(element: any) {
  const currencyText = element.text().trim().slice(0, 3);
  for (let i = 0; i < currencyText.length - 1; i++) {
    // -1 to avoid going out of bounds with i+1
    if (currencyText[i] === currencyText[i + 1]) {
      return currencyText.slice(0, i); // return substring up to the repeated character
    }
  }
  return currencyText ? currencyText : "";
}
