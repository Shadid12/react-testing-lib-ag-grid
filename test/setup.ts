import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";

// Mock AG Grid CSS
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

// Ensure cleanup after each test
afterEach(() => {
  cleanup();
});