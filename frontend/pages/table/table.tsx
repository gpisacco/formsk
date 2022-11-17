import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Header from './header';
import axios, { AxiosInstance } from 'axios';


interface Column {
  id: 'id' | 'code' | 'position' | 'quantity' | 'image' | 'description' | 'price';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'id', label: 'Id', minWidth: 170 },
  { id: 'code', label: 'Code', minWidth: 100 },
  {
    id: 'position',
    label: 'Position',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'quantity',
    label: 'Quantity',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'image',
    label: 'Image',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toFixed(2),
  },
  {
    id: 'description',
    label: 'Description',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'price',
    label: 'Price',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toFixed(2),
  },
];

export interface CustomTableParams {
  setOrder: (string) => void;
  order: string,
  data: any,
  rowsPerPage: number,
  page: number,
  handleChangePage: (event: unknown, newPage: number) => void,
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function CustomTable(params: CustomTableParams) {

  const { order, setOrder, data, rowsPerPage, page, handleChangePage, handleChangeRowsPerPage } = params;

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  onClick={() => {
                    let prefix = '';
                    if (order === column.id) prefix = '-';
                    setOrder(prefix + column.id)
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data && data.data
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code + row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[3, 5, 10]}
        component="div"
        count={100}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}