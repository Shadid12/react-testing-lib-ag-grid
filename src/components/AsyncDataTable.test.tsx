import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import AsyncDataTable from "./AsyncDataTable";
import * as api from "./api";

// Step 1: Mock the entire api module
vi.mock("./api", () => ({
  fetchData: vi.fn().mockResolvedValue([
    { make: "Mocked", model: "Car", price: 10000 },
    { make: "Fake", model: "Vehicle", price: 20000 },
  ]),
}));

describe.only("AsyncDataTable", () => {
  test("displays loading state before data arrives", () => {
    const { container } = render(<AsyncDataTable />);
    const loadingElement = container.querySelector('.ag-overlay-loading-center');
    expect(loadingElement).toBeInTheDocument();
  });

  test("renders AG Grid with data after async fetch", async () => {
    render(<AsyncDataTable />);

    // Wait for mocked row data to appear
    // "Mocked" is from the array in our mockResolvedValue
    const firstRowMakeCell = await screen.findByText("Mocked");
    expect(firstRowMakeCell).toBeInTheDocument();

    // You can also look for "Fake" or "Vehicle"
    const secondRowMakeCell = await screen.findByText("Fake");
    expect(secondRowMakeCell).toBeInTheDocument();

    // The loading text should now be gone
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
  });
});