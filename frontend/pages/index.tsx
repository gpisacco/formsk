import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CustomTable from './table/table';
import Header from './table/header';
import axios from 'axios';
import { useQuery } from 'react-query';


export default function Index() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(3);
  const [order, setOrder] = React.useState('');
  const [search, setSearch] = React.useState('');

  const { data } = useQuery(["Products", page, rowsPerPage, order, search], () => axios.get(`http://localhost:8080/products?max_results=${rowsPerPage}&offset=${page * rowsPerPage}${order ? '&order=' + order : ''}${search ? '&search=' + search : ''}`), {
    staleTime: 600000
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Container maxWidth="lg">
      <Box >
        <Header
          search={search}
          setSearch={(e: React.ChangeEvent<HTMLInputElement>) => {
            e.preventDefault()
            e.stopPropagation()
            setSearch(e.target.value)
          }}
        ></Header>
        <CustomTable setOrder={setOrder}
          order={order}
          data={data}
          rowsPerPage={rowsPerPage}
          page={page}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        ></CustomTable>
      </Box>
    </Container>
  );
}
