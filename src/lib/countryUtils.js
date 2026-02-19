import getSymbolFromCurrency from "currency-symbol-map";

/**
 * Comprehensive country to currency code mapping
 * Based on ISO 4217 currency codes
 */
export const COUNTRY_TO_CURRENCY = {
  // Asia
  afghanistan: { name: "Afghanistan", code: "AFN" },
  bangladesh: { name: "Bangladesh", code: "BDT" },
  india: { name: "India", code: "INR" },
  pakistan: { name: "Pakistan", code: "PKR" },
  china: { name: "China", code: "CNY" },
  japan: { name: "Japan", code: "JPY" },
  "south korea": { name: "South Korea", code: "KRW" },
  korea: { name: "South Korea", code: "KRW" },
  thailand: { name: "Thailand", code: "THB" },
  vietnam: { name: "Vietnam", code: "VND" },
  singapore: { name: "Singapore", code: "SGD" },
  malaysia: { name: "Malaysia", code: "MYR" },
  indonesia: { name: "Indonesia", code: "IDR" },
  philippines: { name: "Philippines", code: "PHP" },
  nepal: { name: "Nepal", code: "NPR" },
  "sri lanka": { name: "Sri Lanka", code: "LKR" },
  myanmar: { name: "Myanmar", code: "MMK" },
  cambodia: { name: "Cambodia", code: "KHR" },
  laos: { name: "Laos", code: "LAK" },

  // Middle East
  uae: { name: "United Arab Emirates", code: "AED" },
  "united arab emirates": { name: "United Arab Emirates", code: "AED" },
  "saudi arabia": { name: "Saudi Arabia", code: "SAR" },
  qatar: { name: "Qatar", code: "QAR" },
  kuwait: { name: "Kuwait", code: "KWD" },
  bahrain: { name: "Bahrain", code: "BHD" },
  oman: { name: "Oman", code: "OMR" },
  israel: { name: "Israel", code: "ILS" },
  turkey: { name: "Turkey", code: "TRY" },
  jordan: { name: "Jordan", code: "JOD" },
  lebanon: { name: "Lebanon", code: "LBP" },

  // Europe
  uk: { name: "United Kingdom", code: "GBP" },
  "united kingdom": { name: "United Kingdom", code: "GBP" },
  britain: { name: "United Kingdom", code: "GBP" },
  england: { name: "United Kingdom", code: "GBP" },

  // Eurozone countries
  germany: { name: "Germany", code: "EUR" },
  france: { name: "France", code: "EUR" },
  italy: { name: "Italy", code: "EUR" },
  spain: { name: "Spain", code: "EUR" },
  netherlands: { name: "Netherlands", code: "EUR" },
  belgium: { name: "Belgium", code: "EUR" },
  austria: { name: "Austria", code: "EUR" },
  portugal: { name: "Portugal", code: "EUR" },
  greece: { name: "Greece", code: "EUR" },
  ireland: { name: "Ireland", code: "EUR" },
  finland: { name: "Finland", code: "EUR" },
  luxembourg: { name: "Luxembourg", code: "EUR" },

  // Non-Euro European countries
  poland: { name: "Poland", code: "PLN" },
  sweden: { name: "Sweden", code: "SEK" },
  norway: { name: "Norway", code: "NOK" },
  denmark: { name: "Denmark", code: "DKK" },
  switzerland: { name: "Switzerland", code: "CHF" },
  czechia: { name: "Czech Republic", code: "CZK" },
  "czech republic": { name: "Czech Republic", code: "CZK" },
  hungary: { name: "Hungary", code: "HUF" },
  romania: { name: "Romania", code: "RON" },
  bulgaria: { name: "Bulgaria", code: "BGN" },
  croatia: { name: "Croatia", code: "HRK" },
  russia: { name: "Russia", code: "RUB" },
  ukraine: { name: "Ukraine", code: "UAH" },

  // Americas
  usa: { name: "United States", code: "USD" },
  us: { name: "United States", code: "USD" },
  "united states": { name: "United States", code: "USD" },
  america: { name: "United States", code: "USD" },

  canada: { name: "Canada", code: "CAD" },
  mexico: { name: "Mexico", code: "MXN" },
  brazil: { name: "Brazil", code: "BRL" },
  argentina: { name: "Argentina", code: "ARS" },
  chile: { name: "Chile", code: "CLP" },
  colombia: { name: "Colombia", code: "COP" },
  peru: { name: "Peru", code: "PEN" },
  venezuela: { name: "Venezuela", code: "VES" },
  ecuador: { name: "Ecuador", code: "USD" },
  bolivia: { name: "Bolivia", code: "BOB" },
  paraguay: { name: "Paraguay", code: "PYG" },
  uruguay: { name: "Uruguay", code: "UYU" },

  // Oceania
  australia: { name: "Australia", code: "AUD" },
  "new zealand": { name: "New Zealand", code: "NZD" },
  fiji: { name: "Fiji", code: "FJD" },

  // Africa
  "south africa": { name: "South Africa", code: "ZAR" },
  nigeria: { name: "Nigeria", code: "NGN" },
  egypt: { name: "Egypt", code: "EGP" },
  kenya: { name: "Kenya", code: "KES" },
  morocco: { name: "Morocco", code: "MAD" },
  algeria: { name: "Algeria", code: "DZD" },
  tunisia: { name: "Tunisia", code: "TND" },
  ghana: { name: "Ghana", code: "GHS" },
  ethiopia: { name: "Ethiopia", code: "ETB" },
  tanzania: { name: "Tanzania", code: "TZS" },
  uganda: { name: "Uganda", code: "UGX" },

  // Special cases
  remote: { name: "Remote (Global)", code: "USD" },
  global: { name: "Global", code: "USD" },
  europe: { name: "Europe", code: "EUR" },
  worldwide: { name: "Worldwide", code: "USD" },
};

/**
 * Get country data with currency symbol
 * @param {string} region - Country/region name
 * @returns {object} Country data with name, currency code, and symbol
 */
export const getCountryData = (region) => {
  if (!region) {
    return {
      value: "remote",
      label: "Remote (Global)",
      currency: "USD",
      symbol: getSymbolFromCurrency("USD") || "$",
    };
  }

  const normalizedRegion = region.toLowerCase().trim();

  // Direct match
  if (COUNTRY_TO_CURRENCY[normalizedRegion]) {
    const country = COUNTRY_TO_CURRENCY[normalizedRegion];
    return {
      value: normalizedRegion,
      label: country.name,
      currency: country.code,
      symbol: getSymbolFromCurrency(country.code) || "$",
    };
  }

  // Partial match (fuzzy matching)
  const partialMatch = Object.keys(COUNTRY_TO_CURRENCY).find(
    (key) => key.includes(normalizedRegion) || normalizedRegion.includes(key)
  );

  if (partialMatch) {
    const country = COUNTRY_TO_CURRENCY[partialMatch];
    return {
      value: partialMatch,
      label: country.name,
      currency: country.code,
      symbol: getSymbolFromCurrency(country.code) || "$",
    };
  }

  // Fallback to USD if not found
  return {
    value: normalizedRegion,
    label: region.charAt(0).toUpperCase() + region.slice(1),
    currency: "USD",
    symbol: getSymbolFromCurrency("USD") || "$",
  };
};

/**
 * Get all available countries sorted alphabetically
 * @returns {array} Array of country objects
 */
export const getAllCountries = () => {
  return Object.entries(COUNTRY_TO_CURRENCY)
    .filter(
      ([key]) => !["remote", "global", "europe", "worldwide"].includes(key)
    )
    .map(([key, value]) => ({
      value: key,
      label: value.name,
      currency: value.code,
      symbol: getSymbolFromCurrency(value.code) || "$",
    }))
    .sort((a, b) => a.label.localeCompare(b.label));
};

/**
 * Get popular/featured countries
 * @returns {array} Array of popular country objects
 */
export const getPopularCountries = () => {
  const popularKeys = [
    "remote",
    "india",
    "bangladesh",
    "usa",
    "uk",
    "canada",
    "germany",
    "australia",
    "singapore",
    "uae",
  ];

  return popularKeys.map((key) => {
    const country = COUNTRY_TO_CURRENCY[key];
    return {
      value: key,
      label: country.name,
      currency: country.code,
      symbol: getSymbolFromCurrency(country.code) || "$",
    };
  });
};

/**
 * Format currency amount with symbol
 * @param {number} amount - Amount to format
 * @param {string} currencyCode - ISO currency code (e.g., "USD", "INR")
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, currencyCode = "USD") => {
  if (!amount || amount === 0)
    return `${getSymbolFromCurrency(currencyCode) || "$"}0`;

  const symbol = getSymbolFromCurrency(currencyCode) || "$";
  const formattedAmount = amount.toLocaleString();

  return `${symbol}${formattedAmount}`;
};

/**
 * Get currency symbol from code
 * @param {string} currencyCode - ISO currency code
 * @returns {string} Currency symbol
 */
export const getCurrencySymbol = (currencyCode) => {
  return getSymbolFromCurrency(currencyCode) || "$";
};

/**
 * Validate if a currency code exists
 * @param {string} currencyCode - ISO currency code
 * @returns {boolean} True if valid currency code
 */
export const isValidCurrency = (currencyCode) => {
  return !!getSymbolFromCurrency(currencyCode);
};
