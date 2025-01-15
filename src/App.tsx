import { useState, useMemo } from "react";
import { AllCommunityModule, ColDef, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import PriceCellRenderer from "./components/PriceCellRenderer";
import { IDataType } from "./components/api";

export type ICar = {
  make: string;
  model: string;
  price: number;
  electric: boolean;
}


// import AsyncDataTable from "./components/AsyncDataTable"; // Uncomment this line to use the AsyncDataTable component.

ModuleRegistry.registerModules([AllCommunityModule]);

function App() {
  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState<IDataType[]>([
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    { make: "Mercedes", model: "EQA", price: 48890, electric: true },
    { make: "Fiat", model: "500", price: 15774, electric: false },
    { make: "Nissan", model: "Juke", price: 20675, electric: false },
  ]);

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState<ColDef<ICar>[]>([
    { field: 'make', editable: true, filter: true },
    { field: 'model' },
    { field: 'price', editable: true, cellRenderer: PriceCellRenderer },
    { field: 'electric' },
  ]);
  

  const defaultColDef = useMemo(() => { 
    return {
      flex: 1
    };
  }, []);

  // Container: Defines the grid's theme & dimensions.
  return (
    <div style={{ width: "100%", height: '100vh' }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs as any}
        defaultColDef={defaultColDef}
      />
      {/* Uncomment the below line and comment the line above to test AsyncDataTable component.*/}
      {/* <AsyncDataTable /> */}
    </div>
  );
}

export default App