import TodoForm from '../features/TodoForm';
import TodoList from '../features/TodoList/TodoList';
import TodosViewForm from '../features/TodosViewForm';
import styles from '../App.module.css';

function TodosPage({todoState, addTodo, completeTodo, updateTodo, sortDirection, setSortDirection, sortField, setSortField, queryString, setQueryString}){
    return(
       <div className={styles.app}>
            <TodoForm 
          onAddTodo={addTodo}
          isSaving={todoState.isSaving} 
          />
          <TodoList
            todoList={todoState.todoList}
            onCompleteTodo={completeTodo}
            onUpdateTodo={updateTodo}
            isLoading={todoState.isLoading}
            errorMessage={todoState.errorMessage}
          />
    <TodosViewForm
            sortDirection={sortDirection}
            setSortDirection={setSortDirection}
            sortField={sortField}
            setSortField={setSortField}
            queryString={queryString}
            setQueryString={setQueryString}
          />
       </div>
    )
}

export default TodosPage