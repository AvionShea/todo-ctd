const actions = {
    //actions in useEffect that loads todos
    fetchTodos: 'fetchTodos',
    loadTodos: 'loadTodos',
    //found in useEffect and addTodo to handle failed requests
    setLoadError: 'setLoadError',
    //actions found in addTodo
    startRequest: 'startRequest',
    addTodo: 'addTodo',
    endRequest: 'endRequest',
    //found in helper functions 
    updateTodo: 'updateTodo',
    completeTodo: 'completeTodo',
    //reverts todos when requests fail
    revertTodo: 'revertTodo',
    //action on Dismiss Error button
    clearError: 'clearError',
};

const initialState = {
    todoList: [],
    isLoading: false,
    isSaving: false,
    errorMessage: "",
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actions.fetchTodos:
            return { ...state, isLoading: true };
        case actions.loadTodos: {
            const todosFromApi = action.records.map((record) => ({
                id: record.id,
                title: record.fields.title,
                isCompleted: record.fields.isCompleted || false,
            }));
            return { ...state, todoList: todosFromApi, isLoading: false };
        }
        case actions.setLoadError:
            return { ...state, errorMessage: action.error.message, isLoading: false };
        case actions.startRequest:
            return { ...state, isSaving: true };
        case actions.addTodo: {
            const savedTodo = {
                id: action.records[0].id,
                title: action.records[0].fields.title,
                isCompleted: action.records[0].fields.isCompleted || false,
            };
            return { ...state, todoList: [...state.todoList, savedTodo], isSaving: false };
        }
        case actions.endRequest:
            return { ...state, isLoading: false, isSaving: false };
        case actions.updateTodo: {
            const updatedTodos = state.todoList.map((todo) =>
                todo.id === action.editedTodo.id ? { ...action.editedTodo } : todo
            );
            const updatedState = { ...state, todoList: updatedTodos };
            if (action.error) {
                updatedState.errorMessage = action.error.message;
            }
            return updatedState;
        }
        case actions.completeTodo: {
            const updatedTodos = state.todoList.map((todo) =>
                todo.id === action.id ? { ...todo, isCompleted: true } : todo
            );
            return { ...state, todoList: updatedTodos };
        }
        case actions.revertTodo: {
            const updatedTodos = state.todoList.map((todo) =>
                todo.id === action.originalTodo.id ? { ...action.originalTodo } : todo
            );
            return { ...state, todoList: updatedTodos };
        };
        case actions.clearError:
            return { ...state, errorMessage: "" };
        default:
            return state;
    };
};
export { actions, initialState, reducer };