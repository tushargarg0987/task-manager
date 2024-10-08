import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Input from "./Input";
import Button from "../UI/Button";
import { GlobalStyles } from "../../../constants/style";
import DateTimePicker from '@react-native-community/datetimepicker';

const listValues = [
    { key: '1', value: 'High' },
    { key: '2', value: 'Medium' },
    { key: '3', value: 'Low' }
]

function ExpenseForm({ onCancel, onSubmit, isEditing, defaultValues }) {
    const [selectedPriority, setSelectedPriority] = useState(defaultValues ? defaultValues.priority : 'low');
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    const onChange = (event, selectedDate) => {
        setShowPicker(false);
        if (selectedDate) {
            setDate(selectedDate);
            inputChangeHandler('date', selectedDate.toISOString().split('T')[0]); // Format as YYYY-MM-DD
        }
    };

    var catValue;
    if (defaultValues) {
        for (let ele in listValues) {
            if (listValues[ele].key = defaultValues.category) {
                catValue = listValues[ele].value;
            }
        }
    }
    const handleSelect = (priority) => {
        setSelectedPriority(priority);
        inputValue.priority.value = priority;
    };

    const [inputValue, setValue] = useState({
        title: {
            value: defaultValues ? defaultValues.title.toString() : '', isValid: true
        },
        date: {
            value: defaultValues ? defaultValues.date.toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10)
            , isValid: true
        },
        description: { value: defaultValues ? defaultValues.description : '', isValid: true },
        priority: { value: defaultValues ? defaultValues.priority : 'low', isValid: true }
    });
    let selectedItem = {}
    if (defaultValues) {
        selectedItem = listValues.find((tuple) => tuple.value == defaultValues.category)
    }

    function submitHandler() {
        const expenseData = {
            title: inputValue.title.value,
            date: new Date(inputValue.date.value),
            description: inputValue.description.value,
            priority: inputValue.priority.value,
            status: 'pending'
        };
        onSubmit(expenseData);
    }

    function inputChangeHandler(identifier, enteredValue) {
        setValue((currentValue) => {
            return {
                ...currentValue,
                [identifier]: { value: enteredValue, isValid: true }
            }
        })
    }

    const formIsInvalid = !inputValue.title.isValid || !inputValue.date.isValid || !inputValue.description.isValid || !inputValue.priority.isValid;

    var splitFields = [];
    for (let i = 1; i < parseInt(inputValue.split); i++) {
        console.log("Added");
        splitFields.push(
            <View>
                <Input label="Split name"
                    invalid={inputValue.description.isValid}
                    textInputConfig={{
                        onChangeText: inputChangeHandler.bind(this, 'description'),
                        value: inputValue.description.value
                    }} />
            </View>
        )
    }

    return (
        <View style={styles.form}>
            <Text style={styles.title}>Add Task</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Input label="Title"
                    style={{ flex: 3 }}
                    invalid={inputValue.title.isValid}
                    textInputConfig={{
                        onChangeText: inputChangeHandler.bind(this, 'title'),
                        value: inputValue.title.value
                    }} />
                <Input
                    label="Due Date"
                    style={{ flex: 3 }}
                    invalid={inputValue.date.isValid} // Assuming isValid indicates an error
                    textInputConfig={{
                        placeholder: "YYYY-MM-DD",
                        maxLength: 10,
                        value: date.toISOString().split('T')[0], // Format as YYYY-MM-DD
                        onFocus: () => setShowPicker(true),
                    }}
                />
                {showPicker && (
                    <DateTimePicker
                        value={date}
                        mode="date"
                        display="default"
                        onChange={onChange}
                    />
                )}
            </View>
            <View style={{ paddingVertical: 10, marginHorizontal: 2, marginBottom: 5 }}>
                <Text style={[{
                    fontSize: 12,
                    color: 'black',
                    marginBottom: 4, marginLeft: 4
                }, !inputValue.priority.isValid && { color: GlobalStyles.colors.error500 }]}
                >Priority</Text>

                <View style={styles.radioContainer}>
                    <TouchableOpacity
                        style={[styles.radioButton, selectedPriority === 'high' && styles.selectedHigh]}
                        onPress={() => handleSelect('high')}
                    >
                        <Text style={[styles.radioText, selectedPriority === 'high' && styles.selectedRadioText]}>High</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.radioButton, selectedPriority === 'medium' && styles.selectedMedium]}
                        onPress={() => handleSelect('medium')}
                    >
                        <Text style={styles.radioText}>Medium</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.radioButton, selectedPriority === 'low' && styles.selectedLow]}
                        onPress={() => handleSelect('low')}
                    >
                        <Text style={[styles.radioText, selectedPriority === 'low' && styles.selectedRadioText]}>Low</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Input label="Description"
                invalid={inputValue.description.isValid}
                textInputConfig={{
                    multiline: true,
                    onChangeText: inputChangeHandler.bind(this, 'description'),
                    value: inputValue.description.value
                }} />
            {formIsInvalid && <Text style={styles.errorText}>Invalid input please check the data</Text>}
            <View style={styles.buttons}>
                <Button style={styles.button} mode="flat" onPress={onCancel}>Cancel</Button>
                <Button style={styles.button} onPress={submitHandler}>{isEditing ? 'Update' : 'Add'}</Button>
            </View>
        </View>
    )
}

export default ExpenseForm

const styles = StyleSheet.create({
    form: {
        marginTop: 40,
        paddingBottom: 20
    },
    title: {
        fontSize: 22,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'black',
        marginVertical: 16
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8
    },
    errorText: {
        textAlign: 'center',
        color: GlobalStyles.colors.error500,
        margin: 8
    },
    radioContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    radioButton: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        width: '30%',
        alignItems: 'center',
    },
    selectedHigh: {
        backgroundColor: 'red',
        borderColor: 'darkred',
    },
    selectedMedium: {
        backgroundColor: 'yellow',
        borderColor: 'gold',
    },
    selectedLow: {
        backgroundColor: 'green',
        borderColor: 'darkgreen',
    },
    radioText: {
        fontSize: 16,
        color: 'black',
    },
    selectedRadioText: {
        fontSize: 16,
        color: 'white',
    },
})