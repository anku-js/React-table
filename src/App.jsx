import React, { useState } from "react";
import tableData from "./dataBase";
import Table from "./Table";
import "./App.scss";
import { createColumnHelper } from "@tanstack/react-table";
import Input from "./HandleChange";

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

  const [priceAdded, setPriceAdded] = useState("");

  function handleSave() {
    localStorage.setItem("editedDate", JSON.stringify(data));
  }

  function handleReset() {
    setData(initialData);
  }

  function handleChange(event, id) {
    const { value } = event.target;
    const priceSet = value;
    setData((tableData) =>
      tableData.map((data) => {
        return data.id === id ? { ...data, price: priceSet } : data;
      })
    );
  }
  console.log(priceAdded);
  // data.price !== priceAdded : data;
  const columns = [
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
      cell: ({ cell, getValue }) => (
        <div>
          <Input
            handleChange={(event) => handleChange(event, cell.row.original.id)}
            getValue={getValue}
          />
        </div>
      ),
      enableSorting: true,
    }),
    columnHelper.accessor("description", {
      header: "Description",
      cell: (info) => info.getValue(),
      enableSorting: false,
      size: 300,
    }),
  ];

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
{
  /* <input
type="text"
onChange={(event) => handleChange(event, cell.row.original.id)}
value={getValue()}
/>
</form> */
}
