import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../services/dryApiMethods';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  user: null,
  error: '',
  todos: [],
};

export const loginAction = createAsyncThunk(
  'auth/Login',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.methods.postData(
        'http://focusbee.ap-south-1.elasticbeanstalk.com/examportal/api/auth/signin',
        payload
      );
      console.log('🚀 => response', response);

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getAllTodoAction = createAsyncThunk(
  'auth/GetTodo',
  async (_payload, { rejectWithValue }) => {
    try {
      const response = await api.methods.getData(
        'https://jsonplaceholder.typicode.com/todos'
      );

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createTodoAction = createAsyncThunk(
  'auth/CreateTodo',
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.methods.postData(
        'https://jsonplaceholder.typicode.com/todos',
        payload
      );
      console.log('🚀 => response', response);

      if (response.status === 201) {
        return response.data;
      }
    } catch (error) {
      console.log('🚀 => error', error);
      return rejectWithValue(error);
    }
  }
);
export const updateTodoAction = createAsyncThunk(
  'auth/UpdateTodo',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.methods.patchData(
        `https://jsonplaceholder.typicode.com/todos/${payload.id}`,
        payload
      );

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteTodoAction = createAsyncThunk(
  'auth/DeleteTodo',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.methods.deleteData(
        `https://jsonplaceholder.typicode.com/todos/${payload.id}`
      );

      if (response.status === 200) {
        return payload.id;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    stoploading(state) {
      state.isLoading = false;
    },
    setLogOut(state) {
      state.isAuthenticated = false;
      state.isLoading = false;
    },
  },

  extraReducers: {
    // Button should be in loading state
    [loginAction.pending]: (state) => {
      state.isLoading = true;
    },
    [loginAction.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = payload;
      state.error = '';
    },
    [loginAction.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // Get all todo
    [getAllTodoAction.pending]: (state) => {
      state.isLoading = true;
      state.todos = [];
    },
    [getAllTodoAction.fulfilled]: (state, { payload }) => {
      state.todos = payload;
      state.isLoading = false;
    },
    [getAllTodoAction.rejected]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    // Create a todo
    [createTodoAction.pending]: (state) => {
      state.isLoading = true;
    },
    [createTodoAction.fulfilled]: (state, { payload }) => {
      let temp = [...state.todos];
      temp.push(payload);
      state.todos = temp;
      state.isLoading = false;
    },
    [createTodoAction.rejected]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    // Delete todo function
    [deleteTodoAction.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteTodoAction.fulfilled]: (state, { payload }) => {
      let temp = [...state.todos];
      let index = temp.findIndex((_x) => _x.id === payload);
      temp.splice(index, 1);
      state.todos = temp;
      state.isLoading = false;
    },
    [deleteTodoAction.rejected]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { startLoading, stoploading, setLogOut } = slice.actions;

//Selectors
export const selectIsLoadingFromAuth = (state) => state.auth.isLoading;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectCurrentUser = (state) => state.auth.user;
export const selectLoginError = (state) => state.auth.error;
export const selectTodos = (state) => state.auth.todos;