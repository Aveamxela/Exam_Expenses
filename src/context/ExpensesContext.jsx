import { createContext,  useState } from "react";

const ExpensesContext = createContext()

export const Provider = ({ children }) => {
    const [expensesList, setExpensesList] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0)
    const [currencySymbol, setCurrencySymbol] = useState("$")

    const updateExpensesList = (data, action) => {
        if (action === "add") {
            setExpensesList([...expensesList, data]);
            setTotalPrice(prevTotal => prevTotal + parseFloat(data.amount));

        }
        else if (action === "delete") {
            setExpensesList(expensesList.filter((expense) => expense !== data))
            setTotalPrice(prevTotal => prevTotal - parseFloat(data.amount));

        };
    }

    const expenses = {
        expensesList,
        updateExpensesList,
        totalPrice,
        setTotalPrice,
        currencySymbol,
        setCurrencySymbol
    }

    return (
        <ExpensesContext.Provider value={expenses}>
            {children}
        </ExpensesContext.Provider>

    )
}
export default ExpensesContext