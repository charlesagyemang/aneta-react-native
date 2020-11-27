import React, {useState} from 'react';
import { SafeAreaView, Keyboard, StyleSheet, Text, View, Platform, Button } from 'react-native';
import { Provider, TextInput } from 'react-native-paper';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import DropDownPicker from 'react-native-dropdown-picker';

// import Icon from 'react-native-vector-icons/Feather';

export default () => {

    const items = [
        {
            label: "SMALL",
            value: "SMALL",
            icon: () => {},
        },
        {
            label: "MEDIUM",
            value: "MEDIUM",
            icon: () => {},
        },
        {
            label: "LARGE",
            value: "LARGE",
            icon: () => {},
        },
        {
            label: "EXTRA LARGE",
            value: "EXTRA LARGE",
            icon: () => {},
        },
        {
            label: "I DONT KNOW",
            value: "I DONT KNOW",
            icon: () => {},
        }
    ]

    const [pickupDate, setPickupDate] = useState(moment().format().split("T")[0]);
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
            <View styles={styles.dropView}>      
                <DropDownPicker
                    items={items}
                    defaultValue={trashSize}
                    containerStyle={styles.dropDoenContainerStyles}
                    style={styles.dropDownStyle}
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}
                    dropDownStyle={styles.dropDownStyle}
                    onChangeItem={item => setTrashSize(item.value)}
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
    containerStyle: {
        flex: 1,
        marginHorizontal: 20,
        justifyContent: 'center',
    },
    dropDownStyle: {
        backgroundColor: 'white',
    },
    dropDoenContainerStyles: {
        height: 60,
    }, 
    dropView: {
   
        flex: 1
    },
})