import TodoListItem from "./TodoListItem";
import styles from './TodoList.module.css';
import { useEffect } from "react";

import { useSearchParams, useNavigate } from "react-router";

function TodoList({todoList, onCompleteTodo, onUpdateTodo, isLoading}) {
    const filteredTodos = todoList.filter((todo) => !todo.isCompleted);
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const itemsPerPage = 15;
    const currentPage = parseInt(searchParams.get("page") || "1", 10);
    const indexOfFirstTodo = (currentPage - 1) * itemsPerPage;
    const totalPages = Math.ceil(filteredTodos.length / itemsPerPage);

    const paginatedTodos = filteredTodos.slice(indexOfFirstTodo, indexOfFirstTodo + itemsPerPage);
    

    

    useEffect(() => {
    if (totalPages > 0) {
        if (isNaN(currentPage) || currentPage < 1 || currentPage > totalPages) {
            navigate("/");
        }
    }
}, [currentPage, totalPages, navigate]);

    function handlePreviousPage() {
    setSearchParams({ page: Math.max(1, currentPage - 1).toString() });
}

function handleNextPage() {
    setSearchParams({ page: Math.min(totalPages, currentPage + 1).toString() });
}
    
   return (
    <>
        {isLoading ? (
            <p>Loading todo items, please hold!</p>
        ) : filteredTodos.length === 0 ? (
            <p>Add an item to get started!</p>
        ) : (
            <>
                <ul className={styles.list}>
                    {paginatedTodos.map(
                        (todo) => <TodoListItem 
                        key={todo.id}
                        todo={todo}
                        onCompleteTodo={onCompleteTodo}
                        onUpdateTodo={onUpdateTodo}
                        isLoading={isLoading}
                        />
                    )}
                </ul>
                <div className="paginationControls">
                    <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
                </div>
            </>
        )}
    </>
)
}

export default TodoList