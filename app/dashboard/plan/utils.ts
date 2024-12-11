// Card validation utilities
export type CardType = "visa" | "mastercard" | "amex" | "discover" | "unknown";

interface CardPattern {
  type: CardType;
  pattern: RegExp;
}

const CARD_PATTERNS: CardPattern[] = [
  { type: "visa", pattern: /^4[0-9]{12}(?:[0-9]{3})?$/ },
  { type: "mastercard", pattern: /^5[1-5][0-9]{14}$/ },
  { type: "amex", pattern: /^3[47][0-9]{13}$/ },
  { type: "discover", pattern: /^6(?:011|5[0-9]{2})[0-9]{12}$/ },
];

export const validateCard = (
  number: string
): { isValid: boolean; type: CardType } => {
  // Remove spaces and non-digit characters
  const cleanNumber = number.replace(/\D/g, "");

  // Check card type
  const cardType =
    CARD_PATTERNS.find((card) => card.pattern.test(cleanNumber))?.type ||
    "unknown";

  // Luhn algorithm validation
  let sum = 0;
  let isEven = false;

  // Loop through values starting from the rightmost digit
  for (let i = cleanNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cleanNumber.charAt(i));

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return {
    isValid: sum % 10 === 0 && cleanNumber.length >= 13,
    type: cardType,
  };
};

// Format card number with spaces
export const formatCardNumber = (value: string): string => {
  const cleanValue = value.replace(/\D/g, "");
  const groups = cleanValue.match(/.{1,4}/g) || [];
  return groups.join(" ");
};

// Validate expiry date
export const validateExpiryDate = (value: string): boolean => {
  const [month, year] = value.split("/").map((num) => parseInt(num));
  if (!month || !year) return false;

  const now = new Date();
  const currentYear = now.getFullYear() % 100;
  const currentMonth = now.getMonth() + 1;

  return (
    month >= 1 &&
    month <= 12 &&
    year >= currentYear &&
    (year > currentYear || month >= currentMonth)
  );
};
