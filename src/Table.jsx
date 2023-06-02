import { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  TiArrowSortedDown,
  TiArrowSortedUp,
  TiArrowUnsorted,
} from "react-icons/ti";

export default function Table({ data, columns }) {
  const [sorting, setSorting] = useState([]);
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="table-body">
      <table>
        <thead className="table-header-wrapper">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder ? null : (
                    <div className="table-header">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {
                        header.column.columnDef.enableSorting ? <div className="sorting-arrows">
                        {{
                          asc: (
                            <TiArrowSortedDown
                              onClick={header.column.getToggleSortingHandler()}
                            />
                          ),
                          desc: (
                            <TiArrowSortedUp
                              onClick={header.column.getToggleSortingHandler()}
                            />
                          ),
                        }[header.column.getIsSorted()] ?? (
                          <TiArrowUnsorted
                            onClick={header.column.getToggleSortingHandler()}
                          />
                        )}
                      </div> : ""
                      }
                      {/* {{
                        asc: (
                          <TiArrowSortedUp
                            onClick={header.column.getToggleSortingHandler()}
                          />
                        ),
                        desc: (
                          <TiArrowSortedDown
                            onClick={header.column.getToggleSortingHandler()}
                          />
                        ),
                      }[header.column.getIsSorted()] ?? null} */}
                    </div>
                  )}
                  {/* {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )} */}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="table-data">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
