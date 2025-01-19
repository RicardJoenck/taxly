import styled from "@emotion/styled";
import { NumericFormat } from "react-number-format";

const CurrencyInput = styled(NumericFormat)`
  width: 100%;
  min-width: var(--input-height);
  outline: 0;
  position: relative;
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  appearance: none;
  text-align: start;
  border-radius: var(--chakra-radii-l2);
  height: var(--input-height);
  --focus-color: var(--chakra-colors-color-palette-focus-ring);
  --error-color: var(--chakra-colors-border-error);
  font-size: var(--chakra-font-sizes-sm);
  line-height: 1.25rem;
  padding-inline: var(--chakra-spacing-3);
  --input-height: var(--chakra-sizes-10);
  background: var(--chakra-colors-transparent);
  --bg-currentcolor: var(--chakra-colors-transparent);
  border-width: 1px;
  border-color: var(--chakra-colors-border);
  --focus-ring-color: var(--chakra-colors-color-palette-focus-ring);
  &:is(:focus-visible, [data-focus-visible]) {
    outline-offset: 0px;
    outline-width: var(--focus-ring-width, 1px);
    outline-color: var(--focus-ring-color);
    outline-style: var(--focus-ring-style, solid);
    border-color: var(--focus-ring-color);
  }
  &:is([data-invalid], [aria-invalid="true"], [data-state="invalid"]) {
    --focus-ring-color: var(--error-color);
    border-color: var(--error-color);
  }
`;

export { CurrencyInput };
