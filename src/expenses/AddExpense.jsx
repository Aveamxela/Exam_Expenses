import { useContext } from "react"
import { useForm } from "react-hook-form"
import ExpensesContext from "../context/ExpensesContext"
export default function AddExpense() {
    const { handleSubmit, register, formState: { errors } } = useForm()
    const { updateExpensesList, setCurrencySymbol, currencySymbol } = useContext(ExpensesContext)
    const onSubmit = (data, e) => {
        e.preventDefault()
        updateExpensesList(data, "add")
    }
    const handleCurrencyChange = (e) => {
        setCurrencySymbol(e.target.value)
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Description:</label>
                <input type="text" {...register("description", { required: true })} />
                {errors.description?.type === "required" && (<span style={{ color: "red" }}>Please provide a description</span>)}
                <label>Select currency:</label>
                <select value={currencySymbol} onChange={handleCurrencyChange}>
                    <option value="$">USD</option>
                    <option value="€">EUR</option>
                    <option value="£">GBP</option>
                </select>
                <label>Amount:</label>
                <input type="number" min="0" step="0.01" {...register("amount", { required: true })} />
                {errors.amount?.type === "required" && (<span style={{ color: "red" }}>Please provide an amount</span>)}
                <label>Category:</label>
                <select {...register("category", { required: true })} defaultValue="">
                    <option value="" disabled hidden>Select a category</option>
                    <option value="Groceries">Groceries</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Entertainment">Entertainment</option>
                </select>
                {errors.category?.type === "required" && <span style={{ color: "red" }}>Please select a category</span>}

                <input className="submitButton" type="submit" value="Submit" />
            </form>
        </>
    )
}