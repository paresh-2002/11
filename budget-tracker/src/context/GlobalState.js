import { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";


const initialState = {
    budget : 20000,
    expenseLists : [
        {id:1, name:'Shopping', cost:1200 },
        {id:2, name:'Holiday', cost:150 },
        {id:3, name:'Transportation', cost:250 },
        {id:4, name:'Fuel', cost:500 },
        {id:5, name:'Child Care', cost:1000 },
    ]
}

export const GlobalContext = createContext(initialState)
export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(AppReducer, initialState)

    const deleteExpense = (id) => {
        dispatch({
            type:"DELETE_EXPENSE",
            payload:id
        });
    }
    const addExpense = (expenseList) => {
        dispatch({
            type:"ADD_EXPENSE",
            payload:expenseList
        });
    }
    const editExpense = (expense) => {
        console.log(expense);
        
        dispatch({
            type:"EDIT_BUDGET",
            payload:expense
        })
    }
   return(
    <GlobalContext.Provider value={{expenseLists:state.expenseLists, budget:state.budget, deleteExpense,addExpense,editExpense}}>
        {children}
    </GlobalContext.Provider>
   )
}