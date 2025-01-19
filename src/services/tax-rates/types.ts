type TaxBracket = {
  min: number;
  max?: number;
  rate: number;
};

type TaxData = {
  tax_brackets: TaxBracket[];
};
export type { TaxData };
