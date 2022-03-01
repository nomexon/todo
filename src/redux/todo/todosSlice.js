import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
  status: null,
  error: null,
  limit: 10,
  limitMore: 10,
  isModalOpen: false,
};

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async function (_, { getState, rejectWithValue }) {
    let { limit } = getState().todos;
    try {
      let url = `https://jsonplaceholder.typicode.com/todos?_start=0&_limit=${limit}`;
      let res = await fetch(url);
      if (!res.ok) {
        throw new Error("Ошибка сервера");
      }
      let data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue();
    }
  }
);

export const fetchMore = createAsyncThunk(
  "todos/fetchMore",
  async function (_, { getState, rejectWithValue }) {
    let { limit } = getState().todos;
    let { limitMore } = getState().todos;
    let url = `https://jsonplaceholder.typicode.com/todos?_start=${limitMore}&_limit=${limit}`;
    try {
      let res = await fetch(url);
      if (!res.ok) {
        throw new Error("Не удалось подгрузить данные");
      }
      let data = await res.json();

      return data;
    } catch (error) {
      return rejectWithValue();
    }
  }
);

export const fetchAddTodo = createAsyncThunk(
  "todos/fetchAddTodo",
  async function (text, { rejectWithValue }) {
    if (text.trim().length > 0) {
      try {
        let res = await fetch("https://jsonplaceholder.typicode.com/todos", {
          method: "POST",
          body: JSON.stringify({
            title: text,
            userId: 1,
            completed: false,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        if (!res.ok) {
          throw new Error("Не удалось добавить задачу");
        }
        let data = await res.json();
        return data;
      } catch (error) {
        return rejectWithValue();
      }
    }
  }
);

export const fetchDeleteTodo = createAsyncThunk(
  "todos/fetchDeleteTodo",
  async function (id, { dispatch, rejectWithValue }) {
    try {
      let res = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) {
        throw new Error("Не удалось удалить задачу");
      }
      dispatch(deleteTodo(id));
    } catch (error) {
      return rejectWithValue();
    }
  }
);
export const fetchDoneTodo = createAsyncThunk(
  "todos/fetchDoneTodo",

  async function (id, { dispatch, rejectWithValue }) {
    try {
      let res = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            completed: true,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      if (!res.ok) {
        throw new Error("ошибка done");
      }
      dispatch(doneTodo(id));
    } catch (error) {
      return rejectWithValue();
    }
  }
);
export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    deleteTodo(state, action) {
      state.todos = state.todos.filter((item) => {
        return item.id !== action.payload;
      });
    },

    doneTodo(state, action) {
      const item = state.todos.find((todo) => {
        return todo.id === action.payload;
      });

      item.completed = true;
    },
    changeLimit(state, actions) {
      state.limit = +actions.payload;
    },
    setIsModalVisible(state, action) {
      state.isModalOpen = action.payload;
    },
  },
  extraReducers: {
    [fetchTodos.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [fetchTodos.fulfilled]: (state, actions) => {
      state.status = "resoled";
      state.todos = actions.payload;
    },
    [fetchTodos.rejected]: (state) => {
      state.status = "error";
      state.error = "Ошибка, не удалось загрузить задачи";
    },
    [fetchMore.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [fetchMore.fulfilled]: (state, actions) => {
      state.status = "resoled";
      state.limitMore += state.limit;
      state.todos.push(...actions.payload);
    },
    [fetchMore.rejected]: (state) => {
      state.status = "error";
      state.error = "Ошибка, не удалось подгрузить задачи";
    },
    [fetchAddTodo.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [fetchAddTodo.fulfilled]: (state, actions) => {
      state.status = "resoled";
      state.todos.push(actions.payload);
      state.isModalOpen = false;
    },
    [fetchAddTodo.rejected]: (state, action) => {
      state.status = "error";
      state.error = "Ошибка, не удалось добавить задачу";
    },
    [fetchDeleteTodo.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [fetchDeleteTodo.fulfilled]: (state) => {
      state.status = "resoled";
    },
    [fetchDeleteTodo.rejected]: (state) => {
      state.status = "error";
      state.error = "Ошибка, не удалось удалить задачу";
    },
    [fetchDoneTodo.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [fetchDoneTodo.fulfilled]: (state) => {
      state.status = "resoled";
    },
    [fetchDoneTodo.rejected]: (state) => {
      state.status = "error";
      state.error = "Ошибка, не удалось завершить задачу";
    },
  },
});

export const { changeLimit, setIsModalVisible, addTodo, deleteTodo, doneTodo } =
  todosSlice.actions;

export default todosSlice.reducer;
