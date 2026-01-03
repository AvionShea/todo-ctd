import './App.css'
import TodoList from './TodoList'
import TodoForm from './TodoForm'
import { useState } from 'react'

function App() {
  const [todoList, setTodoList] = useState([]);

  function addTodo(title){
    const newTodo = {
      id: Date.now(),
      title: title,
      isCompleted: false,
    }

    setTodoList([...todoList, newTodo])
  }

  function completeTodo(id){
    const updatedTodos = todoList.map((todo) => {
      return (todo.id === id) ? {...todo, isCompleted: true} : todo;
    });
    setTodoList(updatedTodos);
  }

  return (
      <div>
        <h1>My Todos</h1>
        <TodoForm onAddTodo={addTodo}/>
        <TodoList todoList={todoList} onCompleteTodo={completeTodo}/>
      </div>
  )
}

export default App