import { Pressable, StyleSheet, Text, View, Animated } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GlobalStyles } from "../../constants/style";
import { getFormatedDate } from "../../util/date";
import { useContext, useEffect, useRef, useState } from "react";
import { updatedExpense } from "../../util/storage";
import { ExpensesContext } from "../../store/expenses-context";


function ExpenseItem({ id, description, title, date, priority, status }) {
    const navigation = useNavigation();
    const expensesCtx = useContext(ExpensesContext)
    const animation = useRef(new Animated.Value(1)).current;
    const [isChecked, setIsChecked] = useState(status == "done");

    useEffect(() => {
        const breathe = () => {
            Animated.sequence([
                Animated.timing(animation, {
                    toValue: 1.2,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(animation, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }),
            ]).start(() => breathe());
        };

        breathe();

        // Cleanup animation on unmount
        return () => {
            // Reset the animation value to the original state if necessary
            animation.setValue(1);
        };
    }, [animation]);

    const getColor = () => {
        switch (priority) {
            case 'high':
                return 'red';
            case 'medium':
                return 'yellow';
            case 'low':
                return '#00ff00cc';
            default:
                return 'transparent';
        }
    };

    const animatedStyle = {
        transform: [{ scale: animation }],
        backgroundColor: getColor(),
    };

    function expensePressHandler() {
        navigation.navigate('ManageExpenses', {
            expenseId: id
        });
    }

    return (
        <Pressable onPress={expensePressHandler} style={({ pressed }) => pressed && styles.pressed}>
            <View style={styles.expenseItem}>
                <Pressable onPress={() => {
                    setIsChecked(!isChecked);
                    const data = {title, description, date, priority, status: !isChecked ? 'done' : 'pending'};
                    updatedExpense(id, data)
                    expensesCtx.updateExpense(id, data);
                }} style={[styles.checkbox, styles.checked]}>
                    {<View style={!isChecked ? styles.uncheckmark : styles.checkmark} />}
                </Pressable>
                <View style={[styles.internalView]}>
                <View>
                    <Text style={[styles.textBase, styles.description]}>{title}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.textBase}>{description}</Text>
                        <Animated.View style={[styles.circle, animatedStyle]} />
                    </View>
                </View>
                <View style={styles.amountContainer}>
                    <Text style={styles.amount}>{getFormatedDate(date)}</Text>
                </View>
                </View>
            </View>
        </Pressable>
    )
}

export default ExpenseItem;

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.75
    },
    expenseItem: {
        padding: 12,
        marginVertical: 8,
        // backgroundColor: GlobalStyles.colors.primary500,
        backgroundColor: '#5283ff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 6,
        elevation: 3,
        shadowColor: GlobalStyles.colors.gray500,
        shadowRadius: 4,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4
    },
    internalView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 8
    },
    textBase: {
        // color: GlobalStyles.colors.primary50,
        color: 'white'
    },
    description: {
        fontSize: 16,
        marginBottom: 4,
        fontWeight: 'bold'
    },
    amountContainer: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        minWidth: 80
    },
    amount: {
        // color: GlobalStyles.colors.primary500,
        color: 'black',
        fontWeight: 'bold'
    },
    categoryText: {
        fontSize: 12,
        marginBottom: 4,
        fontWeight: 'bold',
        backgroundColor: 'white',
        borderRadius: 4,
        paddingHorizontal: 4,
        paddingVertical: 2,
        marginLeft: 20,
        width: 100,
        textAlign: 'center',
        height: 20,
    },
    circle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
    },
    checkbox: {
        // width: 20,
        // height: 20,
        marginHorizontal: 10,
        minHeight: 40,
        borderWidth: 2,
        borderColor: 'gray',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
        flex: 1,
        display: 'flex',
        aspectRatio: 1,
    },
    checked: {
        backgroundColor: '#5283ff',
        borderColor: '#5283ff',
    },
    checkmark: {
        width: 12,
        height: 12,
        backgroundColor: '#00ff0078',
        borderRadius: 2,
    },
    uncheckmark: {
        width: 12,
        height: 12,
        backgroundColor: 'white',
        borderRadius: 2,
    },
})