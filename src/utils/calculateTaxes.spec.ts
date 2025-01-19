import { describe, it, expect } from "vitest";
import { calculateTaxes } from "@/utils/calculateTaxes";

describe("calculateTaxes", () => {
  it("returns zero taxes for zero income", () => {
    const brackets = [
      { min: 0, max: 50000, rate: 0.1 },
      { min: 50000, rate: 0.2 },
    ];
    const result = calculateTaxes(0, brackets);
    expect(result).toEqual({
      totalTaxes: 0,
      effectiveRate: "",
      taxesPerBand: [],
    });
  });

  it("calculates taxes for a single bracket", () => {
    const brackets = [
      { min: 0, max: 50000, rate: 0.1 },
      { min: 50000, max: 100000, rate: 0.2 },
    ];
    const result = calculateTaxes(40000, brackets);
    expect(result.totalTaxes).toBe(4000);
    expect(result.effectiveRate).toBe("10.00%");
    expect(result.taxesPerBand).toEqual([
      { band: "0 - $50,000.00", tax: 4000 },
    ]);
  });

  it("calculates taxes across multiple brackets", () => {
    const brackets = [
      { min: 0, max: 50000, rate: 0.1 },
      { min: 50000, max: 100000, rate: 0.2 },
      { min: 100000, rate: 0.3 },
    ];
    const result = calculateTaxes(120000, brackets);
    expect(result.totalTaxes).toBe(21000);
    expect(result.effectiveRate).toBe("17.50%");
    expect(result.taxesPerBand).toEqual([
      { band: "0 - $50,000.00", tax: 5000 },
      { band: "$50,000.00 - $100,000.00", tax: 10000 },
      { band: "$100,000.00 - ∞", tax: 6000 },
    ]);
  });
});
