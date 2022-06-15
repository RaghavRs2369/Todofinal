import {
    Box,
    TableRow,
    TableCell,
    TableHead,
    TableSortLabel,
  } from '@mui/material';
  
  // ----------------------------------------------------------------------
  
  export default function MUITableHead({
    order,
    orderBy,
    headLabel,
    onRequestSort,
  }) {
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
  
    return (
      <TableHead>
        <TableRow>
          {headLabel.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.alignRight ? 'right' : 'left'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                hideSortIcon
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box>{order === 'desc' ? ' desc' : 'asc'}</Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }