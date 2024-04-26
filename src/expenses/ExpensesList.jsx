import { useContext, useEffect, useState } from "react"
import ExpensesContext from "../context/ExpensesContext"
import EditExpense from "./EditExpense";

export default function ExpensesList() {

    const { currencySymbol,totalPrice, setTotalPrice, updateExpensesList, expensesList } = useContext(ExpensesContext)
    const [selectedCategory, setSelectedCategory] = useState("All categories")
    const [filteredExpensesList, setFilteredExpensesList] = useState([]);
    const [isEditing, setIsEditing] = useState(false); 
    const [selectedExpenseId, setSelectedExpenseId] = useState(null);

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value)
    }
   
    const handleDelete = (index, e) => {
        e.preventDefault()
        const expenseToDelet = filteredExpensesList[index]
        updateExpensesList(expenseToDelet, "delete")
    }

    const handleEdit = (index,e) => {
        e.preventDefault();
        const expenseToEdit = filteredExpensesList[index];
        setSelectedExpenseId(expenseToEdit)
        setIsEditing(true);
    };

    useEffect(() => {
        if (selectedCategory === "All categories") {
            setFilteredExpensesList(expensesList);
            const priceAllCategories = expensesList.reduce((total, expense) => total + parseFloat(expense.amount), 0);
            setTotalPrice(priceAllCategories.toFixed(2));
        } else {
            const filteredExpenses = expensesList.filter(expense => expense.category === selectedCategory);
            setFilteredExpensesList(filteredExpenses);
            const priceSpecificCategory = filteredExpenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);
            setTotalPrice(priceSpecificCategory.toFixed(2));
        }
    },[selectedCategory,  expensesList, setTotalPrice])

    return (
        <>
            <select className="showCategoryExpenses"value={selectedCategory} onChange={handleCategoryChange}>
                <option value="All categories">All categories</option>
                <option value="Groceries">Groceries</option>
                <option value="Utilities">Utilities</option>
                <option value="Entertainment">Entertainment</option>
            </select>
            {filteredExpensesList.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Category</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredExpensesList.map((expense, index, e) => (
                            <tr key={index}>
                                <td>{expense.description}</td>
                                <td>{currencySymbol}{parseFloat(expense.amount).toFixed(2)}</td>
                                <td>{expense.category}</td>
                                <td>
                                <button className="deleteButton displayButtons" onClick={(e) => handleDelete(index, e)} >Delete</button>
                                <button className="editButton displayButtons" onClick={(e) => handleEdit(index,e)}>Edit</button></td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>Total</td>
                            <td>{currencySymbol}{totalPrice}</td>
                        </tr>
                    </tfoot>
                </table>
            ) : <p>No expenses</p>}
            {isEditing ? <EditExpense selectedExpenseId={selectedExpenseId}/> : null}

        </>
    )
}