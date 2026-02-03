import { useRef, useState } from "react";
import TextInputWithLabel from "../shared/TextInputWithLabel";
import styled from 'styled-components';

function TodoForm({onAddTodo, isSaving}){

    const [workingTodoTitle, setWorkingTodoTitle] = useState("");

    function handleAddTodo(e){
        e.preventDefault();
        onAddTodo({title: workingTodoTitle, isCompleted: false});
        setWorkingTodoTitle("");
        

        todoTitleInput.current.focus();
    }

    const todoTitleInput = useRef(" ");

    const StyledTodoForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;
const StyledButton = styled.button`
  &:disabled {
    font-style: italic;
    background-color: lightgray;
    cursor: not-allowed;
  }
`;

    return(
        <StyledTodoForm onSubmit={handleAddTodo}>
                <TextInputWithLabel
                ref={todoTitleInput}
                value={workingTodoTitle}
                onChange={(event) => setWorkingTodoTitle(event.target.value)}
                elementId="todoTitle"
                labelText="Todo"
                />
                <StyledButton disabled={workingTodoTitle.trim() === ''}>
        {isSaving ? 'Saving...' : 'Add Todo Item'}
    </StyledButton>
        </StyledTodoForm>
    )
}

export default TodoForm