import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {addRequest} from '../src/store/actions';
import { Keyboard, StyleSheet, Text, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import KehillahDialog from '../components/kehillahDialog';
import AppBar from '../components/appBar';
import BaseDropDown from '../components/baseDropDown';
import {notifySlack} from '../helpers/notifications';
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import theme2 from '../src/theme';


export default ({navigation}) => {

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
    const [alertMessage, setAlertMessage] = useState(false);
    const [alertLogo, setAlertLogo] = useState('✅');
    const [buttonMessage, setButtonMessage] = useState('SUBMIT');
    const [currentUser, setCurrentUser] = useState({id: "", other: {location: "Ablekuma-Awoshie", zone: "Ablekuma-Awoshie", trashSize: "I DONT KNOW"}})
    const dispatch =  useDispatch();

    useEffect(() => {
      AsyncStorage.getItem('USER-DETAILS', (err, data) => {
        const dataGotten = JSON.parse(data);
        setCurrentUser(dataGotten);
      });
    }, [])

    const showDatePicker = () => {
        Keyboard.dismiss();
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        const newDate = moment(date).format().split("T")[0];
        setPickupDate(newDate);
        hideDatePicker();
    };

    const handleMakeRequest = () => {
      setButtonMessage('Sending Request Please Wait.....')
      const url = 'https://kelin-weebhook.herokuapp.com/api/request';
      const bodyToSend = {
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
      axios.post(url, bodyToSend)
      .then(({data}) => {
        const message = `Request Successfully Created With ID ${data.id}`;
        setButtonMessage('Success');
        dispatch(addRequest(data));
        notifySlack(currentUser, data, true);
        navigation.navigate('All Requests', {name: 'All Requets'});
      })
      .catch((err) => {
        console.log(err.message);
        setAlertVisibility(true)
        setAlertLogo('❌')
        setAlertMessage('An error Occured While Sending Request. Please Try Again Later')
        setButtonMessage('SUBMIT')
      })
  }




    return(
        <View style={{flex: 1}}>

            <AppBar name="Create A Request" bg={theme2.COLOR_THEMES.ONE.PRIMARY}/>
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
                    theme2={theme2}
                    mode="outlined"
                    onChangeText={currentLocation => setLocation(currentLocation)}
                />

                <TextInput
                    style={styles.inputStyle}
                    label="Selet A Date"
                    value={pickupDate}
                    theme2={theme2}
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
                    message={alertMessage}
                    icon={alertLogo}
                />

                <BaseDropDown
                    items={trashSizes}
                    value={trashSize}
                    onValueChange={(val) => setTrashSize(val)}
                    message="Select Your Trash Size"
                />
                <View>
                    <Button style={{...styles.buttonStyle,  backgroundColor: theme2.COLOR_THEMES.ONE.PRIMARY}} loading={buttonLoadingStatus} icon="car" mode="contained" onPress={handleMakeRequest}>
                        {buttonMessage}
                    </Button>
                </View>
            </View>
        </View>

    );
};


const styles = StyleSheet.create({
    root: {
        flex: 1,
        marginTop: 50,
        margin: 10,
        justifyContent: 'center',
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
