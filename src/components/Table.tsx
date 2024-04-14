import React from "react";
import { DataTable as PrimeDataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { User } from "../utils/types";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

interface DataTableProps {
  data: User[];
  headers: string[];
}

const Table: React.FC<DataTableProps> = ({ data, headers }) => {
  const processedHeaders = headers.slice(0, 15);
  while (processedHeaders.length < 5) {
    processedHeaders.push(`Column ${processedHeaders.length + 1}`);
  }

  return (
    <>
      <PrimeDataTable
        value={data}
        stripedRows
        tableStyle={{ minWidth: "50rem" }}
      >
        <Column
          header="N"
          body={(data: number, { rowIndex }: { rowIndex: number }) =>
            rowIndex + 1
          }
        />
        {processedHeaders
          .filter((header) => header !== "id" && header !== "password")
          .map((header, index) => (
            <Column key={index} field={header} header={header} />
          ))}
      </PrimeDataTable>
    </>
  );
};

export default Table;
