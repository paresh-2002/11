 const AppReducer = (state, action) =>{
    switch(action.type){
        case 'DELETE_EXPENSE':
        return{
            ...state,
            expenseLists: state.expenseLists.filter(expense => expense.id !== action.payload)
        }
        case 'ADD_EXPENSE':
            return{
                ...state,
                expenseLists: [action.payload, ...state.expenseLists]
            }
        case 'EDIT_BUDGET':
            return{
                ...state,
                budget: action.payload
                
            }
        default:
            return state
    }
}
export default AppReducer