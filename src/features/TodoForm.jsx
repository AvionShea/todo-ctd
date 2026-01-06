import { useRef, useState } from "react";
import TextInputWithLabel from "../shared/TextInputWithLabel";

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
            <TextInputWithLabel
            ref={todoTitleInput}
            value={workingTodoTitle}
            onChange={(event) => setWorkingTodoTitle(event.target.value)}
            elementId="todoTitle"
            labelText="Todo"
            />
            <button type="submit" disabled={workingTodoTitle.trim() === ""}>Add Todo</button>
        </form>
    )
}

export default TodoForm