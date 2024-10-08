import { FlatList} from "react-native";
import ExpenseItem from "./ExpenseItem";


function ExpensesList({expenses, setTasks}) {
    function renderExpenseItem(itemData) {
        
        return (
            <ExpenseItem {...itemData.item} setTasks={setTasks} />
        )
    }
    return (
        <FlatList data={expenses}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            renderItem={renderExpenseItem}
            keyExtractor={(item) => item.id}
        />
)}

export default ExpensesList;