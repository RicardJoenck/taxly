import type { TaxData } from "@/services/tax-rates/types";
import axios from "axios";

const getTaxRates = async (year: string): Promise<TaxData> => {
  const { data } = await axios(
    // The URL would be pulled from .env files
    `http://localhost:5001/tax-calculator/tax-year/${year}`
  );
  return data;
};
export { getTaxRates };
