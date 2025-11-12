import './App.css'

function App() {
  const todos = [
    {id:1, title:"Test item 1"},
    {id:2, title:"Test item 2"},
    {id:3, title:"Test item 3"},
  ]

  return (
    <div>
      <h1>My Todos</h1>
      <ul>
        {todos.map((todo) => <li key={todo.id}>{todo.title}</li>)}
      </ul>
    </div>
  )
}

export default App
