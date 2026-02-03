import TodoListItem from "./TodoListItem";
import styles from './TodoList.module.css';

function TodoList({todoList, onCompleteTodo, onUpdateTodo, isLoading}) {

    const filteredTodos = todoList.filter((todo) => !todo.isCompleted);
    
    return (
        isLoading ? <p>Loading todo items, please hold!</p> :
        filteredTodos.length === 0 ? <p>Add an item to get started!</p> :
        <ul className={styles.list}>
          {filteredTodos.map(
            (todo) => <TodoListItem 
            key={todo.id}
            todo={todo}
            onCompleteTodo={onCompleteTodo}
            onUpdateTodo={onUpdateTodo}
            isLoading={isLoading}
            />
            )}
        </ul>
    )
}

export default TodoList