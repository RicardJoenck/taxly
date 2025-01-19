import { useState } from "react";
import { TaxesOwed, Welcome } from "@/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { Box, Card, Flex } from "@chakra-ui/react";
import { Field } from "@/components/chakra/field";
import { Button } from "@/components/chakra/button";
import {
  NativeSelectField,
  NativeSelectRoot,
} from "@/components/chakra/native-select";
import {
  formSchema,
  type FormInputData,
  type FormOutputData,
} from "@/pages/tax-form/schema";
import { CurrencyInput } from "@/components/chakra/currency-input";

const TaxForm = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputData, any, FormOutputData>({
    resolver: zodResolver(formSchema),
  });

  const [form, setForm] = useState<FormOutputData>();

  const onSubmit: SubmitHandler<FormOutputData> = (data) => {
    setForm(data);
  };

  return (
    <>
      <Welcome />
      <Flex
        direction={{ base: "column", md: "row" }}
        wrap="wrap"
        gap={4}
        justifyContent={"center"}
      >
        <Box>
          <Card.Root>
            <Card.Body>
              <form
                id="tax-form"
                onSubmit={handleSubmit(onSubmit)}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <Field
                  label="Income"
                  invalid={!!errors.income}
                  errorText={errors?.income?.message}
                >
                  <Controller
                    name="income"
                    control={control}
                    render={({ field: { ref, ...rest } }) => (
                      <CurrencyInput
                        thousandSeparator=","
                        decimalSeparator="."
                        prefix="$ "
                        decimalScale={2}
                        getInputRef={ref}
                        aria-invalid={!!errors.income}
                        {...rest}
                      />
                    )}
                  />
                </Field>

                <Field
                  label="Year"
                  invalid={!!errors.year}
                  errorText={errors?.year?.message}
                >
                  <NativeSelectRoot>
                    <NativeSelectField
                      defaultValue={"2022"}
                      id="year"
                      {...register("year")}
                    >
                      <option value="2019">2019</option>
                      <option value="2020">2020</option>
                      <option value="2021">2021</option>
                      <option value="2022">2022</option>
                    </NativeSelectField>
                  </NativeSelectRoot>
                </Field>
              </form>
            </Card.Body>

            <Card.Footer>
              <Button flex={1} form="tax-form" type="submit">
                Submit
              </Button>
            </Card.Footer>
          </Card.Root>
        </Box>
        {form && <TaxesOwed {...form} />}
      </Flex>
    </>
  );
};
export { TaxForm };
