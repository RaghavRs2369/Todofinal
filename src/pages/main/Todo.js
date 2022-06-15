import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TablePagination,
  Divider,
} from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import { filter } from 'lodash';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Page from '../../components/Page';
import { useDispatch, useSelector } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import TodoView from './TodoView';
import {
  getAllTodoAction,
  selectTodos,
  createTodoAction,
  updateTodoAction,
  deleteTodoAction,
  selectIsLoadingFromAuth,
} from '../../redux/slices/auth';
import MUITableHead from '../../components/MUITableHead';
import MUISearchBar from '../../components/MUISearchBar';

import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  if (query) {
    return filter(
      array,
      (_product) =>
        _product.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }

  return stabilizedThis.map((el) => el[0]);
}

const TABLE_HEAD = [
  { id: 'id', label: 'Id', alignRight: false },
  { id: 'title', label: 'Title', alignRight: false },
  { id: '', label: 'Actions' },
];

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

const columns = [
  {
    field: 'id',
    headerName: 'Id',
    width: 140,
  },
  {
    field: 'title',
    headerName: 'Title',
    width: 440,
  },
];

export default function Todo() {
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.auth.user);
  const isLoading = useSelector(selectIsLoadingFromAuth);
  const arr = useSelector(selectTodos);
  const [openDialog, setOpenDialog] = useState(false);
  const [formState, setFormState] = useState('');
  const [value, setEditValues] = useState({
    title: '',
  });

  const [page, setPage] = React.useState(0);
  const [order, setOrder] = React.useState('desc');
  const [selected, setSelected] = React.useState([]);
  const [filterName, setFilterName] = React.useState('');
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [orderBy, setOrderBy] = React.useState('id');

  const compareFnc = (obj1, obj2) => {
    return obj2.id - obj1.id;
  };

  const handleDelete = (todo) => {
    // let temp = [...arr];
    // let index = temp.findIndex((_x) => _x.id === todo.id);
    // temp.splice(index, 1);
    // setArr(temp);
    dispatch(deleteTodoAction(todo));
  };

  const handleView = (todo) => {
    setEditValues({ ...todo });
    setOpenDialog(true);
    setFormState('edit');
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = arr.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const handleLogout = () => {
    dispatch({ type: 'USER_LOGOUT' });
  };

  const handleAdd = () => {
    setFormState('add');
    setOpenDialog(true);
  };

  const handleUpdate = (e, event) => {
    console.log(value);
    try {
      e.preventDefault();
      if (event === 'add') {
        let payload = {
          id: arr[arr.length - 1].id + 1,
          userId: 1,
          title: value.title,
          completed: false,
        };

        dispatch(createTodoAction(payload));
      } else if (event === 'edit') {
        let payload = {
          id: value.id,
          userId: 1,
          title: value.title,
          completed: false,
        };

        dispatch(updateTodoAction(payload));
      } else {
        alert('Something went wrong');
      }
      setOpenDialog(false);
    } catch (err) {
      console.log('🚀 => err', err);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditValues({
      title: '',
    });
  };

  const handleChange = (e) => {
    setEditValues({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    dispatch(getAllTodoAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - arr.length) : 0;

  const filteredArr = applySortFilter(
    arr,
    getComparator(order, orderBy),
    filterName
  );

  return (
    <Page titleName='Todo Page'>
      <Card>
        <CardHeader
          title={`${name} todo`}
          action={
            <>
              <IconButton color='primary' onClick={handleAdd}>
                <AddIcon />
              </IconButton>
              <IconButton color='primary' onClick={handleLogout}>
                <ExitToAppIcon />
              </IconButton>
            </>
          }
        />
        <MUISearchBar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />
        <CardContent>
          <TableContainer>
            <Table>
              <MUITableHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={arr.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
              />
              <TableBody>
                {isLoading && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={3}>
                      <LinearProgress />
                    </TableCell>
                  </TableRow>
                )}
                {filteredArr
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, i) => (
                    <TableRow hover key={i} tabIndex={-1}>
                      <TableCell component='th' scope='row' padding='none'>
                        {row.id}
                      </TableCell>
                      <TableCell style={{ minWidth: 160 }}>
                        {row.title}
                      </TableCell>
                      <TableCell style={{ minWidth: 160 }}>
                        <IconButton
                          edge='end'
                          aria-label='delete'
                          onClick={() => handleDelete(row)}
                        >
                          <DeleteIcon />
                        </IconButton>{' '}
                        <IconButton
                          edge='end'
                          aria-label='view'
                          onClick={() => handleView(row)}
                        >
                          <RemoveRedEyeIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {/* <List>
            {arr.length === 0 && <span>No todo</span>}
            {[...arr].sort(compareFnc).map((todo) => (
              <ListItem
                key={todo.id}
                secondaryAction={
                  <>
                    <IconButton
                      edge='end'
                      aria-label='delete'
                      onClick={() => handleDelete(todo)}
                    >
                      <DeleteIcon />
                    </IconButton>{' '}
                    <IconButton
                      edge='end'
                      aria-label='view'
                      onClick={() => handleView(todo)}
                    >
                      <RemoveRedEyeIcon />
                    </IconButton>
                  </>
                }
              >
                <ListItemText
                  primary={todo.title}
                  // secondary={todo.description}
                />
              </ListItem>
            ))}
          </List> */}
        </CardContent>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={arr.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

      <Divider />

      {/* <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          columns={columns}
          rows={arr}
          pagination
          rowsPerPageOptions={[5, 20, 100]}
          loading={isLoading}
          components={{
            Toolbar: CustomToolbar,
            LoadingOverlay: LinearProgress,
          }}
        />
      </div> */}
      <TodoView
        handleCloseDialog={handleCloseDialog}
        openDialog={openDialog}
        handleUpdate={handleUpdate}
        value={value}
        handleChange={handleChange}
        formState={formState}
      />
    </Page>
  );
}