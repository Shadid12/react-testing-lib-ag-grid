// src/components/AsyncDataTable.tsx
import { useState, useEffect, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ColDef, ModuleRegistry } from "ag-grid-community";
import { fetchData } from "./api";
import { ICar } from "../App";

// Register AG Grid modules (only once per app)
ModuleRegistry.registerModules([AllCommunityModule]);

export default function AsyncDataTable() {
  const [rowData, setRowData] = useState<any[] | null>(null);

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState<ColDef<ICar>[]>([
    { field: 'make', editable: true, filter: true },
    { field: 'model' },
    { field: 'price', editable: true, cellRenderer: PriceCellRenderer },
    { field: 'electric' },
  ]);

  // Column defs
  const defaultColDef = useMemo(() => { 
    return {
      flex: 1
    };
  }, []);

  useEffect(() => {
    fetchData().then((data) => {
      setRowData(data);
    });
  }, []);

  return (
    <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
    />
  );
}