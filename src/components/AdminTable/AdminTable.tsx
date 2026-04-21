import type { ReactNode } from "react";
import styles from "./AdminTable.module.css";

type AdminTableProps = {
  headers: string[];
  rows: ReactNode[][];
  caption?: string;
};

export function AdminTable({ headers, rows, caption }: AdminTableProps) {
  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        {caption ? <caption>{caption}</caption> : null}
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header} scope="col">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={`row-${rowIndex}`}>
              {row.map((cell, cellIndex) => (
                <td key={`cell-${rowIndex}-${cellIndex}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
