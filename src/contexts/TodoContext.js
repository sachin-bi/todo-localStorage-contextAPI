import { createContext, useContext } from "react";


// This context will be used to share todo data across different components.
export const TodoContext = createContext({
    todos: [
        {
            id: 1,
            todo: "Todo Msg",
            completed: false,
        },
    ],
    // theme: "dark",
    addTodo: (todo) =>{},
    updateTodo: (id,todo) =>{},
    deleteTodo: (id) =>{},
    toggleComplete: (id) =>{},
})


// Defines a custom hook to access the todo context.
export const useTodo = () => {
    return useContext(TodoContext)
}

// This component will be used to wrap components that need access to the todo data.
export const TodoProvider = TodoContext.Provider