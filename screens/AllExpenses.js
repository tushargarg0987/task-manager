import { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { deleteAllExpenses } from "../util/storage";

function AllExpenses({navigation}) {
    const expensesCtx = useContext(ExpensesContext);
    const doneTasks = expensesCtx.expenses.filter((expense)=> expense.status === 'done');
    return (
        <ExpensesOutput navigation={navigation} periodName="Total" expenses={doneTasks} fallbackText="No task marked as done yet 😐"/>
    )
}

export default AllExpenses;