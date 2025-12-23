import { useRef } from "react";
function TodoForm({onAddTodo}){
    function handleAddTodo(e){
        e.preventDefault();
        const title = e.target.title.value;
        onAddTodo(title);
        
        e.target.title.value = "";

        todoTitleInput.current.focus();
    }

    const todoTitleInput = useRef(" ");

    return(
        <form onSubmit={handleAddTodo}>
            <label htmlFor="todoTitle">Todo</label>
            <input type="text" placeholder="Add an Item" name="title" ref={todoTitleInput}></input>
            <button type="submit">Add Todo</button>
        </form>
    )
}

export default TodoForm