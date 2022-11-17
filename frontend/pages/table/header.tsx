import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export interface HeaderParams {
  setSearch: (any) => void
  search?: string
}

export default function Header(params: HeaderParams) {
  const { setSearch } = params;
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="standard-basic"
        label="Search"
        variant="standard"
        onChange={setSearch}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault()
            e.stopPropagation()
          }
        }}
      />
    </Box>
  );
}