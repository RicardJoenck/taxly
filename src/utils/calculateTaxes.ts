import type { TaxData } from "@/services/tax-rates/types";
import { formatCurrency } from "@/utils/formatCurrency";

const calculateTaxes = (income: number, brackets: TaxData["tax_brackets"]) => {
  let totalTaxes = 0;
  let effectiveRate = "";
  const taxesPerBand: Array<{ band: string; tax: number }> = [];

  if (income === 0) {
    return { totalTaxes, effectiveRate, taxesPerBand };
  }

  for (const bracket of brackets) {
    const max = bracket.max ?? Number.MAX_SAFE_INTEGER;
    if (income > bracket.min) {
      const taxableIncome = Math.min(income, max) - bracket.min;
      const taxForBand = taxableIncome * bracket.rate;

      const formattedMin = bracket.min > 0 ? formatCurrency(bracket.min) : 0;
      const formattedMax =
        max !== Number.MAX_SAFE_INTEGER ? formatCurrency(max) : "∞";

      taxesPerBand.push({
        band: `${formattedMin} - ${formattedMax}`,
        tax: taxForBand,
      });

      totalTaxes += taxForBand;

      if (income <= max) {
        break;
      }
    }
  }

  effectiveRate = `${((totalTaxes / income) * 100).toFixed(2)}%`;

  return { totalTaxes, taxesPerBand, effectiveRate };
};

export { calculateTaxes };
