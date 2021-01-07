import React, {useState, useEffect} from 'react';
import { Keyboard, StyleSheet, Text, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import KehillahDialog from '../components/kehillahDialog';
import AppBar from '../components/appBar';
import BaseDropDown from '../components/baseDropDown';
import axios from 'axios';
import { AsyncStorage } from 'react-native';
// import  Button  from "../components/Button";



export default () => {

    const trashSizes = [
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


    const zoneList = [
        {
            label: "Ablekuma-Awoshie",
            value: "Ablekuma-Awoshie",
        },
        {
            label: "Tema-Spintext Zone",
            value: "Tema-Spintext Zone",
        },
        {
            label: "Afeanya-Prampram Zone",
            value: "Afeanya-Prampram Zone",
        },
        {
            label: "Ofankor-Nsawam Zone",
            value: "Ofankor-Nsawam Zone",
        },

        {
            label: "Odorkor-Accra Zone",
            value: "Odorkor-Accra Zone",
        },
        {
            label: "Madina-Adenta-Aburi Zone",
            value: "Madina-Adenta-Aburi Zone",
        },
        {
            label: "Kwashieman-Lapaz-Legon Zone",
            value: "Kwashieman-Lapaz-Legon Zone",
        },
        {
            label: "Kasoa-Mallam-ofankor Zone",
            value: "Kasoa-Mallam-ofankor Zone",
        },
        {
            label: "I DONT KNOW",
            value: "I DONT KNOW",
        },

        {
            label: "La-Teshie-Nungua Zone",
            value: "La-Teshie-Nungua Zone",
        },
        {
            label: "East Legon - Airport - 37 Zone",
            value: "East Legon - Airport - 37 Zone",
        }
    ]

    const [pickupDate, setPickupDate] = useState(moment().format().split("T")[0]);
    const [trashSize, setTrashSize]   = useState('I DONT KNOW');
    const [location, setLocation]     = useState('');
    const [zone, setZone]     = useState('La-Teshie-Nungua Zone');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [alertVisibility, setAlertVisibility] =  useState(false)
    const [buttonLoadingStatus, setButtonLoadingStatus] = useState(false);

    const [currentUser, setCurrentUser] = useState({id: "", other: {location: "Ablekuma-Awoshie", zone: "Ablekuma-Awoshie", trashSize: "I DONT KNOW"}})

    useEffect(() => {
      AsyncStorage.getItem('USER-DETAILS', (err, data) => {
        const dataGotten = JSON.parse(data);
        setCurrentUser(dataGotten);
      })
      setZone(currentUser.other.zone)
      setLocation(currentUser.other.location)
      setTrashSize(currentUser.other.trashSize)
    })

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
        const RANDOM_NUMBER = Math.floor(1000000 + (Math.random() * 9000000));
        const bodyToSend = {
          id: `18${RANDOM_NUMBER}00`,
          paymentMethod: '',
          requestStatus: 'CREATED',
          trashSize: trashSize,
          requestType: 'ONE_OFF',
          requester: currentUser.id,
          date: pickupDate,
          paymentStatus: 'NOT_PAID',
          other: {
            proposedDate: pickupDate,
            source: 'MOBILE-APP',
            status: 'ACTIVE',
            proposedLocation: location,
          },
        }


        console.log(bodyToSend);
    }




    return(
        <View style={{flex: 1}}>

            <AppBar name="Create A Request" />
             <View style={styles.root}>

             <BaseDropDown
                 items={zoneList}
                 value={zone}
                 onValueChange={(val) => setZone(val)}
                 message="Select Your Zone"
             />

                <TextInput
                    style={styles.inputStyle}
                    label="Actual Location In The zone"
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

                <BaseDropDown
                    items={trashSizes}
                    value={trashSize}
                    onValueChange={(val) => setTrashSize(val)}
                    message="Select Your Trash Size"
                />
                <View>
                    <Button style={styles.buttonStyle} loading={buttonLoadingStatus} icon="car" mode="contained" onPress={handleMakeRequest}>
                        Press me
                    </Button>
                </View>
            </View>
        </View>

    );
};

const theme = {
    colors: {
        primary: "green"
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        marginTop: 50,
        margin: 10
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
        marginTop: 30,
        padding: 10,
        backgroundColor: 'green'
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
