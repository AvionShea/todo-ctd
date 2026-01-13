import { useRef, useState } from "react";
import TextInputWithLabel from "../shared/TextInputWithLabel";

function TodoForm({onAddTodo, isSaving}){

    const [workingTodoTitle, setWorkingTodoTitle] = useState("");

    function handleAddTodo(e){
        e.preventDefault();
        onAddTodo({title: workingTodoTitle, isCompleted: false});
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
            <button disabled={workingTodoTitle.trim() === ''}>
    {isSaving ? 'Saving...' : 'Add Todo Item'}
</button>
        </form>
    )
}

export default TodoForm