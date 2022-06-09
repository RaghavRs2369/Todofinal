import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
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
} from '../../redux/slices/auth';

export default function Todo() {
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.auth.user);
  const arr = useSelector(selectTodos);
  const [openDialog, setOpenDialog] = useState(false);
  const [formState, setFormState] = useState('');
  const [value, setEditValues] = useState({
    title: '',
  });

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
        <CardContent>
          <List>
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
          </List>
        </CardContent>
      </Card>
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