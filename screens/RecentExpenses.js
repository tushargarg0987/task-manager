import { useContext,useEffect } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/storage";
import { View, Text, StyleSheet } from "react-native";

function RecentExpenses({navigation}) {
    const expensesCtx = useContext(ExpensesContext);
    const priorityOrder = {
        high: 1,
        medium: 2,
        low: 3,
    };
    useEffect(() => {
        async function getData() {
            const expenses = await fetchExpenses();
            expensesCtx.setExpenses(expenses);
        }
        getData();
    }, [])

    const pendingTasks = expensesCtx.expenses.filter((expense)=> expense.status === 'pending');
    const sortedTasks = pendingTasks.sort((a, b) => {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
    return (
        <>
            <View style={{paddingVertical: 10, paddingHorizontal: 20}}>
                <Text style={{fontSize: 18, fontWeight: '500', marginBottom: 10, marginLeft: 10}}>Priority</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingRight: '30%'}}>
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                        <View style={styles.circle} backgroundColor="red"></View>
                        <Text>High</Text>
                    </View>
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                        <View style={styles.circle} backgroundColor="yellow"></View>
                        <Text>Medium</Text>
                    </View>
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                        <View style={styles.circle} backgroundColor="#00ff00cc"></View>
                        <Text>Low</Text>
                    </View>
                </View>
            </View>
            <ExpensesOutput navigation={navigation} expenses={sortedTasks} periodName="Pending" fallbackText="No pending tasks all set 😀!" />
        </>
    )
}

export default RecentExpenses;

const styles = StyleSheet.create({
    circle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
    },
})