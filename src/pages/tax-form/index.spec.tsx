import { render, screen } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { TaxForm } from "./index";
import { Wrapper } from "@/mocks/wrapper";

describe("TaxForm", () => {
  it("renders Tax Form Page", async () => {
    render(<TaxForm />, { wrapper: Wrapper });
    expect(await screen.findByText("Welcome to the Taxly")).toBeInTheDocument();
    expect(await screen.findByText("Income")).toBeInTheDocument();
    expect(screen.queryByText("Total Tax")).not.toBeInTheDocument();
  });

  it("displays required warning on empty submission", async () => {
    render(<TaxForm />, { wrapper: Wrapper });
    const submitButton = screen.getByRole("button", { name: "Submit" });
    await UserEvent.click(submitButton);
    expect(await screen.findByText("Required")).toBeInTheDocument();
  });

  it("displays warning for value less than or equal to 0", async () => {
    render(<TaxForm />, { wrapper: Wrapper });
    const input = screen.getByRole("textbox");
    await UserEvent.type(input, "-12345");
    const submitButton = screen.getByRole("button", { name: "Submit" });
    await UserEvent.click(submitButton);
    expect(
      await screen.findByText("You can't be that poor")
    ).toBeInTheDocument();
  });

  it("displays warning for value exceeding the maximum limit", async () => {
    render(<TaxForm />, { wrapper: Wrapper });
    const input = screen.getByRole("textbox");
    await UserEvent.type(input, "99999999999");
    const submitButton = screen.getByRole("button", { name: "Submit" });
    await UserEvent.click(submitButton);
    expect(await screen.findByText("Calm down Jeff Bezos")).toBeInTheDocument();
  });

  it("displays Taxes owed", async () => {
    render(<TaxForm />, { wrapper: Wrapper });
    const input = screen.getByRole("textbox");
    await UserEvent.type(input, "1234567");
    const submitButton = screen.getByRole("button", { name: "Submit" });
    await UserEvent.click(submitButton);
    expect(await screen.findByText("Total Tax")).toBeInTheDocument();
    expect(await screen.findByText("$481,326.40")).toBeInTheDocument();
  });
});
