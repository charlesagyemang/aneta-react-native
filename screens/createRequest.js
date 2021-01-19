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

    const [color, setColor] = useState('')
    const [theme, setTheme] = useState({
      NAME: 'default',
      DEFAULT: '#172B4D',
      PRIMARY: '#5E72E4',
      SECONDARY: '#F7FAFC',
      GRADIENT_VARIANT_ONE: ['#5E72E4', '#9AA6FF'],
      GRADIENT_VARIANT_TWO: ['#9AA6FF', '#5E72E4'],
    });
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

    useEffect(() => {
      AsyncStorage.getItem('USER-DETAILS', (err, data) => {
        const dataGotten = JSON.parse(data);
        setCurrentUser(dataGotten);
      });

      AsyncStorage.getItem('USER-CHOSEN-THEME', (err, data) => {
        const datum = JSON.parse(data);
        setColor(datum.NAME);
        setTheme(datum);
        // console.log("DATAAAAA", datum);
      });
    }, [theme])

    const showDatePicker = () => {
        Keyboard.dismiss();
        setDatePickerVisibility(true);
    };

    const sendSlackNotification = (data) => {
      const url = 'https://kelin-weebhook.herokuapp.com/api/notification/slack';
      const bodyToSend = {
        data,
        weebHookUrl: 'https://hooks.slack.com/services/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',
      }

      axios.post(url, bodyToSend)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.message);
      })

    }

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
        console.log(data);
        setAlertVisibility(true)
        setAlertMessage(message)
        setButtonMessage('Success')
        navigation.navigate('All Requests', {name: 'All Requets'})
        const newMessage = `New Request from Mobile App\n Sender: ${currentUser.other.name} || ${currentUser.phoneNumber}\n Edit Link: https://aneta-dashboard.netlify.app/dashboard/edit-single-request/${data.id}`
        sendSlackNotification(newMessage)
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

            <AppBar name="Create A Request" bg={theme.PRIMARY}/>
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
                    <Button style={{...styles.buttonStyle,  backgroundColor: theme.PRIMARY}} loading={buttonLoadingStatus} icon="car" mode="contained" onPress={handleMakeRequest}>
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
