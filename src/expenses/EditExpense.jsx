import { useForm } from "react-hook-form";

export default function EditExpense(selectedExpenseId) {
    const { description, amount, category } = selectedExpenseId;
    const { handleSubmit, register } = useForm()

    console.log({selectedExpenseId});


    return (
        <>
          <h1>Edit product</h1>
            <form onSubmit={handleSubmit()} >
                <label>Description:</label>
                <input type="text" {...register("name")} defaultValue={description} />
                <label>Amount:</label>
                <input type="text" {...register("detail")} defaultValue={amount} />
                <label>category:</label>
                <input type="text" {...register("hero")} defaultValue={category} />
            </form>
        </>
    )
}