import React, { useEffect, useState } from "react";
import tableData from "./dataBase";
import Table from "./Table";
import "./App.scss";
import { createColumnHelper } from "@tanstack/react-table";

export default function App() {
  const columnHelper = createColumnHelper();
  const sortedData = tableData.sort((a, b) =>
    a.category < b.category ? -1 : a.category > b.category ? 1 : 0
  );
  const dataFromLocalStorage = JSON.parse(localStorage.getItem("editedDate"));

  const [initialData, setInitialData] = useState(sortedData);
  
  const [data, setData] = useState(
    dataFromLocalStorage ? dataFromLocalStorage : sortedData
  );

  function handleSave() {
    localStorage.setItem("editedDate", JSON.stringify(data));
  }

  function handleReset() {
    setData(initialData);
  }

  function handleChange(event) {
    const priceSet = event.target.value;
    setData((tableData) =>
      tableData.map((data) => {
        return data.price !== priceSet ? { ...data, price: priceSet } : data;
      })
    );
  }

  const columns = [
    // columnHelper.accessor("image", {
    //   header: "",
    //   cell: (info) => info.getValue(),
    //   enableSorting: false,
    // }),
    columnHelper.accessor("name", {
      header: "Name",
      cell: (info) => info.getValue(),
      enableSorting: true,
    }),
    columnHelper.accessor("category", {
      header: "Category",
      cell: (info) => info.getValue(),
      enableSorting: false,
    }),
    columnHelper.accessor("label", {
      header: "Label",
      cell: (info) => info.getValue(),
      enableSorting: false,
    }),
    columnHelper.accessor("price", {
      header: () => "Price",
      cell: (info) => <input onChange={handleChange} value={info.getValue()} />,
      enableSorting: true,
    }),
    // columnHelper.accessor("description", {
    //   header: "Description",
    //   cell: (info) => info.getValue(),
    //   enableSorting: false,
    // }),
  ];

  console.log(tableData);
  return (
    <div className="table-container">
      <div className="buttons-container">
        <button onClick={handleSave} className="button">
          Save
        </button>
        <button onClick={handleReset} className="button">
          Reset
        </button>
      </div>
      <Table columns={columns} data={data} />
    </div>
  );
}
