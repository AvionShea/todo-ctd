import TodoListItem from "./TodoListItem";

function TodoList({todoList, onCompleteTodo}) {

    const filteredTodos = todoList.filter((todo) => !todo.isCompleted);
    
    return (
        filteredTodos.length === 0 ? <p>Add an item to get started!</p> :
        <ul>
          {filteredTodos.map(
            (todo) => <TodoListItem 
            key={todo.id}
            todo={todo}
            onCompleteTodo={onCompleteTodo}
            />
            )}
        </ul>
    )
}

export default TodoList