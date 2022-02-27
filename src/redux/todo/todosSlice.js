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
  async function (_, { getState }) {
    let { limit } = getState().todos;
    try {
      let url = `https://jsonplaceholder.typicode.com/todos?_start=0&_limit=${limit}`;
      let res = await fetch(url);
      if (res.ok) {
        let data = await res.json();
        return data;
      }
    } catch (error) {
      alert("Проблема с сервером");
    }
  }
);

export const fetchMore = createAsyncThunk(
  "todos/fetchMore",
  async function (_, { getState }) {
    let { limit } = getState().todos;
    let { limitMore } = getState().todos;
    let url = `https://jsonplaceholder.typicode.com/todos?_start=${limitMore}&_limit=${limit}`;
    try {
      let res = await fetch(url);
      if (res.ok) {
        let data = await res.json();

        return data;
      }
    } catch (error) {
      alert("Проблема с сервером");
    }
  }
);
export const fetchAddTodo = createAsyncThunk(
  "todos/fetchAddTodo",
  async function (text) {
    if (text.trim().length > 0) {
      try {
        let prom = await fetch("https://jsonplaceholder.typicode.com/todos", {
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
        if (prom.ok) {
          let data = await prom.json();
          return data;
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
);
export const fetchDeleteTodo = createAsyncThunk(
  "todos/fetchDeleteTodo",
  async function (id, { dispatch }) {
    let res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      dispatch(deleteTodo(id));
    }
  }
);
export const fetchDoneTodo = createAsyncThunk(
  "todos/fetchDoneTodo",

  async function (id, { dispatch }) {
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
      if (res.ok) {
        dispatch(doneTodo(id));
      }
    } catch (error) {
      console.log(error);
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
    [fetchTodos.rejected]: (state, actions) => {
      state.status = "error";
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
    [fetchMore.rejected]: (state, actions) => {
      state.status = "error";
    },
    [fetchAddTodo.pending]: (state) => {
      state.status = "loading";
    },
    [fetchAddTodo.fulfilled]: (state, actions) => {
      state.status = "resoled";
      console.log("add", actions.payload);
      state.todos.push(actions.payload);
    },
    [fetchAddTodo.rejected]: (state) => {
      state.status = "error";
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
    },
  },
});

export const { changeLimit, setIsModalVisible, addTodo, deleteTodo, doneTodo } =
  todosSlice.actions;

export default todosSlice.reducer;
