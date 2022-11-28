function formatAmountForStripe(amount: number, currency: string): string {
  const numberFormat = new Intl.NumberFormat(['en-US'], {
    style: 'currency',
    currency,
    currencyDisplay: 'symbol'
  });

  const parts = numberFormat.formatToParts(amount);

  let zeroDecimalCurrency: boolean = true;

  for (let i = 0; i < parts.length; i += 1) {
    const part = parts[i];

    if (part.type === 'decimal') {
      zeroDecimalCurrency = false;
    }
  }

  return (zeroDecimalCurrency ? amount : Math.round(amount * 100)).toString();
}

export default formatAmountForStripe;
