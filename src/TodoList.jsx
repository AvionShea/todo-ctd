import TodoListItem from "./TodoListItem";

function TodoList(){
    const todos = [
    {id:1, title:"Test item 1"},
    {id:2, title:"Test item 2"},
    {id:3, title:"Test item 3"},
  ]
    return (
        <ul>
          {todos.map(
            (todo) => <TodoListItem 
            key={todo.id}
            todo={todo}
            />
            )}
        </ul>
    )
}

export default TodoList