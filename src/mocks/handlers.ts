import { http, HttpResponse } from "msw";

const handlers = [
  http.get("http://localhost:5001/tax-calculator/tax-year/:year", () => {
    // Future improvement would be to give a couple options for years to improve test reliability
    return HttpResponse.json({
      tax_brackets: [
        {
          min: 0,
          max: 50000,
          rate: 0.15,
        },
        { min: 50001, rate: 0.4 },
      ],
    });
  }),
];

export { handlers };
