import { getTaxRates } from "@/services/tax-rates";
import { useQuery } from "@tanstack/react-query";

type useTaxRates = {
  year: string;
  enabled: boolean;
};

const useTaxRates = ({ year, enabled }: useTaxRates) => {
  return useQuery({
    queryKey: ["taxRates", year],
    queryFn: () => getTaxRates(year),
    throwOnError: true,
    enabled,
  });
};

export { useTaxRates };
