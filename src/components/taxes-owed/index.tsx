import { DataListItem, DataListRoot } from "@/components/chakra/data-list";
import { useTaxRates } from "@/hooks";
import { formatCurrency } from "@/utils/formatCurrency";
import { Card, Center, Heading, Stack } from "@chakra-ui/react";
import { Skeleton } from "@/components/skeleton";
import { calculateTaxes } from "@/utils/calculateTaxes";

type TaxesOwedProps = {
  income: number;
  year: string;
};

const TaxesOwed = ({ income, year }: TaxesOwedProps) => {
  const { data } = useTaxRates({
    year,
    enabled: true,
  });

  if (!data) {
    return <Skeleton />;
  }

  const taxes = calculateTaxes(income, data.tax_brackets);

  return (
    <Card.Root>
      <Card.Body>
        <Stack>
          <Center>
            <DataListRoot
              orientation="horizontal"
              divideY="1px"
              maxW="md"
              flex={1}
            >
              <DataListItem
                pt="4"
                label="Total Tax"
                value={formatCurrency(taxes.totalTaxes)}
              />
              <DataListItem
                pt="4"
                label={"Effective Rate"}
                value={taxes.effectiveRate}
              />
              <Center paddingTop="" style={{ paddingTop: "1rem" }}>
                <Heading size="sm">Tax Band Breakdown</Heading>
              </Center>
              {taxes.taxesPerBand.map((v) => {
                return (
                  <DataListItem
                    pt="4"
                    info="Tax band"
                    key={v.band}
                    label={v.band}
                    value={formatCurrency(v.tax)}
                  />
                );
              })}
            </DataListRoot>
          </Center>
        </Stack>
      </Card.Body>
    </Card.Root>
  );
};

export { TaxesOwed };
