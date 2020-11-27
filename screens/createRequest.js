import React, {useState} from 'react';
import { Keyboard, StyleSheet, Text, View, Platform, Button } from 'react-native';
import { TextInput } from 'react-native-paper';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment'


export default () => {

    const [pickupDate, setPickupDate] = useState('');
    const [trashSize, setTrashSize]   = useState('SMALL');
    const [location, setLocation]     = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);



    const showDatePicker = () => {
        Keyboard.dismiss();
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        const newDate = moment(date).format().split("T")[0];
        console.log("A date has been picked: ", newDate);
        setPickupDate(newDate);
        hideDatePicker();
    };



    return(
        <View style={styles.root}>
            <Text>Heyy Create Request Page</Text>
            <TextInput 
                style={styles.inputStyle}
                label="Trash Size"
                value={trashSize}
                theme={theme}
                mode="outlined"
                onChangeText={currentTrashSize => setTrashSize(currentTrashSize)}
            />
            <TextInput 
                style={styles.inputStyle}
                label="Location"
                value={location}
                theme={theme}
                mode="outlined"
                onChangeText={currentLocation => setLocation(currentLocation)}
            />
            <View>
                <TextInput 
                    style={styles.inputStyle}
                    label="Selet A Date"
                    value={pickupDate}
                    theme={theme}
                    mode="outlined"
                    onFocus={showDatePicker}
                />
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
            </View>
        </View>
    );
};

const theme = {
    colors: {
        primary: "red"
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        paddingTop: "20%",
        paddingLeft: 5,
        paddingRight: 5,
    },
    inputStyle: {
        margin: 10,
    },
})