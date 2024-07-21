// import { Card } from "@mui/material";
// import { AgGridReact } from "ag-grid-react";
// import React from "react";

// function DrugTable() {
//   const rows = [
//     { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
//     { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
//     { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
//     { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
//     { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
//     { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
//     { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
//     { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
//     { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
//   ];

//   const columns: any[] = [
//     {
//       field: "id",
//       headerName: "ID",
//       width: 70,
//     },
//     {
//       field: "firstName",
//       headerName: "FirstName",
//       width: 130,
//     },
//     {
//       field: "lastName",
//       headerName: "LastName",
//       width: 130,
//     },
//   ];

//   return (
//     <div className="">
//       <Card style={{ padding: "12px" }}>
//         <div className="ag-theme-alpine">
//           <AgGridReact rowData={rows} columnDefs={columns}></AgGridReact>
//         </div>
//       </Card>
//     </div>
//   );
// }

// export default DrugTable;

import * as React from "react";
// import { DataGrid, GridColDef } from "@mui/x-data-grid";
import 'ag-grid-community/styles/ag-grid.css'; // Import necessary styles
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Card } from "@mui/material";
import { AgGridReact } from 'ag-grid-react';
import { GridColDef } from "@mui/x-data-grid";


const columns: any[] = [
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90,
  }
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

export default function DrugTable() {
  return (
    // <div style={{ height: 400, width: "100%" }}>
    //   <DataGrid
    //     rows={rows}
    //     columns={columns}
    //     initialState={{
    //       pagination: {
    //         paginationModel: { page: 0, pageSize: 5 },
    //       },
    //     }}
    //     pageSizeOptions={[5, 10]}
    //     checkboxSelection
    //   />
    // </div>
        <div className="">
      <Card style={{ padding: "12px" }}>
        <div className="ag-theme-alpine">
          <AgGridReact rowData={rows} 
          columnDefs={columns}></AgGridReact>
        </div>
      </Card>
    </div>
  );
}
