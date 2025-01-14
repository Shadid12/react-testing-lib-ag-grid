import React from "react";

// This is a very basic custom cell renderer for displaying numeric values as currency.
function PriceCellRenderer(props: any) {
  const { value } = props; // 'value' is the cell value. AG Grid automatically passes it in.

  // Convert the price into a formatted string. For instance, "$15,774"
  // In a real project, you might want more robust i18n or advanced formatting.
  const formattedValue =
    typeof value === "number"
      ? value.toLocaleString("en-US", { style: "currency", currency: "USD" })
      : "";

  return <span>{formattedValue}</span>;
}

export default PriceCellRenderer;
