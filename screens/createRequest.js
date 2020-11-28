import React, {useState} from 'react';
import { Keyboard, StyleSheet, Text, View, Platform } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import DropDownPicker from 'react-native-dropdown-picker';

import KehillahDropDown from '../components/kehillahDropDown';
import KehillahDialog from '../components/kehillahDialog';


export default () => {

    const items = [
        {
            label: "SMALL",
            value: "SMALL",
        },
        {
            label: "MEDIUM",
            value: "MEDIUM",
        },
        {
            label: "LARGE",
            value: "LARGE",
        },
        {
            label: "EXTRA LARGE",
            value: "EXTRA LARGE",
        },
        {
            label: "I DONT KNOW",
            value: "I DONT KNOW",
        }
    ]

    const [pickupDate, setPickupDate] = useState(moment().format().split("T")[0]);
    const [trashSize, setTrashSize]   = useState('SMALL');
    const [location, setLocation]     = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [alertVisibility, setAlertVisibility] =  useState(false)



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

    const handleMakeRequest = () => {
        if(pickupDate.length > 0 && location.length > 0 && trashSize.length > 0){
            setAlertVisibility(true)
        } else {
            setAlertVisibility(true)
        }
        const bodyToSend = {
            pickupDate,
            location,
            trashSize
        }

        console.log(bodyToSend);
    }




    return(
        <View style={styles.root}>
            <Text style={styles.text}>Create A Pickup Request</Text>
            <KehillahDropDown 
                items={items}
                defaultValue={trashSize}
                onChangeItem={item => setTrashSize(item.value)}
            />

            <TextInput 
                style={styles.inputStyle}
                label="Location"
                value={location}
                theme={theme}
                mode="outlined"
                onChangeText={currentLocation => setLocation(currentLocation)}
            />
            
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

            <KehillahDialog 
                visibility={alertVisibility} 
                close={() => setAlertVisibility(false)} 
                message="Posted Successfully"
                icon="✅"
            />
           
            <View>
                <Button style={styles.buttonStyle} icon="car" mode="contained" onPress={handleMakeRequest}>
                    Press me
                </Button>
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
        marginTop: 10
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
        margin: 10,
        marginTop: 15
    }, 
    dropView: {
        flex: 1
    },
    buttonStyle: {
        margin: 10,
        padding: 10
    },
    text: {
        margin:10,
        textAlign: "center",
        fontSize: 20,
    },
    label: {
        marginLeft: 10,
        marginTop: 10
    }

})