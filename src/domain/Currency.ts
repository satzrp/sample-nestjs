export class CurrencyMismatchError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export enum Currency {
  USD = '$',
  INR = '₹',
  EUR = '€',
}
