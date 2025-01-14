import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; // For additional matchers
import App from "./App";
import PriceCellRenderer from "./components/PriceCellRenderer";

describe("AG Grid component rendering", () => {
  test("renders the AG Grid container", () => {
    render(<App />);
    
    // Verify the grid container is rendered
    const gridContainer = screen.getByRole("grid");
    expect(gridContainer).toBeInTheDocument();
  });

  test("renders the correct number of rows", async () => {
    render(<App />);
    
    // Wait for rows to render
    const rows = await screen.findAllByRole("row");
    // Header row + 6 data rows = 7 rows in total
    expect(rows).toHaveLength(7);
  });

  test("renders the correct column headers", async () => {
    const { container } = render(<App />);

    // Find all header text elements using querySelector
    const headerTexts = 
        Array.from(container.getElementsByClassName('ag-header-cell-text')) as HTMLElement[];
    const expectedHeaders = ["Make", "Model", "Price", "Electric"];

    headerTexts.forEach((header, index) => {
        expect(header.innerText).toBe(expectedHeaders[index]);
    });
  });

  test("renders the correct row data", async () => {
    render(<App />);
    
    // Check if the specific row data is rendered
    const makeCell = await screen.findByText("Tesla");
    const modelCell = await screen.findByText("Model Y");

    // Verify row data is displayed
    expect(makeCell).toBeInTheDocument();
    expect(modelCell).toBeInTheDocument();
  });
});


describe("PriceCellRenderer", () => {
  test("renders a numeric price as USD currency", () => {
    // Render the cell renderer with props.value = 65000
    render(<PriceCellRenderer value={65000} />);

    // Expect the text content to match "$65,000.00"
    // The exact output may differ if your locale settings differ.
    expect(screen.getByText("$65,000.00")).toBeInTheDocument();
  });

  test("renders nothing if the value is not a number", () => {
    // Suppose we pass a non-numeric or undefined value
    render(<PriceCellRenderer value="N/A" />);

    // We expect it to return an empty string or some fallback
    expect(screen.queryByText("N/A")).not.toBeInTheDocument();
    // Or if you choose to display "N/A", you can change the expectation accordingly.
  });
});