import "./App.css";
import TodosPage from "./pages/TodosPage";
import { reducer as todosReducer, actions as todoActions, initialState as initialTodosState } from "./reducers/todos.reducer";
import { useCallback, useEffect, useState, useReducer } from "react";
import { useLocation, Routes, Route } from "react-router";
import Header from "./shared/Header";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

import styles from './App.module.css';

function App() {
  const location = useLocation();

  const [todoState, dispatch] = useReducer(todosReducer, initialTodosState);
  const [sortField, setSortField] = useState("createdTime");
  const [sortDirection, setSortDirection] = useState("desc");
  const [queryString, setQueryString] = useState("");
  const [title, setTitle] = useState("Todo List");

  const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
  const token = `Bearer ${import.meta.env.VITE_PAT}`;

  const encodeUrl = useCallback(()=> {
    let sortQuery = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;
    let searchQuery = "";

    if (queryString) {
      searchQuery = `&filterByFormula=SEARCH("${queryString}", {title})`;
    }

    return encodeURI(`${url}?${sortQuery}${searchQuery}`);
  },[sortField, sortDirection, queryString]);

  useEffect(() => {
    const fetchTodos = async () => {
      dispatch({ type: todoActions.fetchTodos });
      const options = {
        method: "GET",
        headers: {
          Authorization: token,
        },
      };
      try {
        const resp = await fetch(
          encodeUrl({ sortField, sortDirection, queryString }),
          options,
        );
        if (!resp.ok) {
          throw new Error(resp.message);
        }
        const data = await resp.json();
        dispatch({ type: todoActions.loadTodos, records: data.records });
      } catch (error) {
        dispatch({ type: todoActions.setLoadError, error });
      }
    };
    fetchTodos();
  }, [sortDirection, sortField, queryString]);

  const addTodo = async (newTodo) => {
    const payload = {
      records: [
        {
          fields: {
            title: newTodo.title,
            isCompleted: newTodo.isCompleted,
          },
        },
      ],
    };
    const options = {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    try {
      dispatch({ type: todoActions.startRequest });
      const resp = await fetch(
        encodeUrl({ sortField, sortDirection, queryString }),
        options,
      );
      if (!resp.ok) {
        throw new Error("Failed to save the todo.");
      }
      const { records } = await resp.json();
      dispatch({ type: todoActions.addTodo, records });
    } catch (error) {
      dispatch({ type: todoActions.setLoadError, error });
    } finally {
      dispatch({ type: todoActions.endRequest });
    }
  };

  const completeTodo = async (id) => {
    const originalTodo = todoState.todoList.find((todo) => todo.id === id);
    dispatch({ type: todoActions.completeTodo, id });
    const payload = {
      records: [
        {
          id: originalTodo.id,
          fields: {
            title: originalTodo.title,
            isCompleted: true,
          },
        },
      ],
    };
    const options = {
      method: "PATCH",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    try {
      const resp = await fetch(
        encodeUrl({ sortField, sortDirection, queryString }),
        options,
      );
      if (!resp.ok) {
        throw new Error("Failed to save the todo.");
      }
    } catch (error) {
      dispatch({ type: todoActions.revertTodo, originalTodo });
      dispatch({ type: todoActions.setLoadError, error });
    }
  };

  const updateTodo = async (editedTodo) => {
    const originalTodo = todoState.todoList.find((todo) => todo.id === editedTodo.id);
    dispatch({ type: todoActions.updateTodo, editedTodo });
    const payload = {
      records: [
        {
          id: editedTodo.id,
          fields: {
            title: editedTodo.title,
            isCompleted: editedTodo.isCompleted,
          },
        },
      ],
    };

    const options = {
      method: "PATCH",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    try {
      const resp = await fetch(
        encodeUrl({ sortField, sortDirection, queryString }),
        options,
      );
      if (!resp.ok) {
        throw new Error("Failed to save the todo.");
      }
    } catch (error) {
      dispatch({ type: todoActions.revertTodo, originalTodo });
      dispatch({ type: todoActions.setLoadError, error });
    }
  };

  useEffect(() => {
    if (location.pathname === "/"){
      setTitle("Todo List");
    } else if(location.pathname === "/about"){
      setTitle("About");
    } else {
      setTitle("Not Found");
    }
  }, [location]);

  return (
    <div>
      <Header title={title} />
      <Routes>
        <Route path="/" element={
          <TodosPage
            todoState={todoState} 
            addTodo={addTodo} 
            completeTodo={completeTodo} 
            updateTodo={updateTodo} 
            sortDirection={sortDirection} 
            setSortDirection={setSortDirection} 
            sortField={sortField} 
            setSortField={setSortField} 
            queryString={queryString} 
            setQueryString={setQueryString}
          />
        }>
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <hr />

      {todoState.errorMessage && (
        <div className={styles["error-message"]}>
          <hr />
          <p>{todoState.errorMessage}</p>
          <button onClick={() => dispatch({ type: todoActions.clearError })}>Dismiss</button>
        </div>
      )}
    </div>
  );
}

export default App;
