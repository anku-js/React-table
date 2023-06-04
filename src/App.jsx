import React, { useState, useMemo } from "react";
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
    localStorage.removeItem("editedDate");
    setData(initialData);
  }

  const handlePriceChange = (row, value) => {
    const updatedData = data.map((product, index) => {
      if (index === row.index) {
        return { ...product, price: Number(value) };
      }
      return product;
    });
    setData(updatedData);
  };

  const columns = useMemo(
    () => [
      columnHelper.accessor("category", {
        header: "Category",
        cell: (info) => info.getValue(),
        enableSorting: false,
        grouping: true
        // getGroupingValue: row => `${row.category}
      }),
      columnHelper.accessor("name", {
        header: "Name",
        cell: (info) => info.getValue(),
        enableSorting: true,
        grouping: false
      }),
      columnHelper.accessor("label", {
        header: "Label",
        cell: (info) => info.getValue(),
        enableSorting: false,
        grouping: false
      }),
      columnHelper.accessor("price", {
        header: () => "Price",
        cell: ({ row, getValue }) => (
          <div>
            <input
              type="number"
              value={getValue()}
              onChange={(e) => handlePriceChange(row, e.target.value)}
            />
          </div>
        ),
        enableSorting: true,
        grouping: false
      }),
      columnHelper.accessor("description", {
        header: "Description",
        cell: (info) => info.getValue(),
        enableSorting: false,
        grouping: false
      }),
    ],
    []
  );
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
