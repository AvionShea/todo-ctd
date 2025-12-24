import { useRef, useState } from "react";

function TodoForm({onAddTodo}){

    const [workingTodoTitle, setWorkingTodoTitle] = useState("");

    function handleAddTodo(e){
        e.preventDefault();
        onAddTodo(workingTodoTitle);
        setWorkingTodoTitle("");
        

        todoTitleInput.current.focus();
    }

    const todoTitleInput = useRef(" ");

    return(
        <form onSubmit={handleAddTodo}>
            <label htmlFor="todoTitle">Todo</label>
            <input 
            type="text" 
            placeholder="Add an Item" 
            name="title" 
            ref={todoTitleInput}
            value={workingTodoTitle}
            onChange={(event) => setWorkingTodoTitle(event.target.value)}
            />
            <button type="submit" disabled={workingTodoTitle.trim() === ""}>Add Todo</button>
        </form>
    )
}

export default TodoForm