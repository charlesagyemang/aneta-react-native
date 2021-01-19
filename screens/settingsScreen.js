import React, {useState, useEffect} from 'react'
import {
  StyleSheet, ScrollView, Platform, Text, View
} from 'react-native';
import {
  SettingsDividerShort,
  SettingsDividerLong,
  SettingsEditText,
  SettingsTextLabel,
  SettingsCategoryHeader,
  SettingsSwitch, SettingsPicker
} from 'react-native-settings-components';
// import theme from '../src/theme';

import axios from 'axios'
import AppBar from '../components/appBar';
import { AsyncStorage } from 'react-native';
import { storeData, retrieveData } from '../helpers/localStorage';


export default () => {

  const [profile, setProfile] = useState({phoneNumber: "", other: { name: "Loading....", zone: "please Wait...", location: "....", }})
  const [reqStat, setReqStat] = useState({todaysRequest: [], thisWeeksRequest: [], thisMonthsRequest: [], requests: [{id: "none"}]})
  const [username, setUsername] = useState('')
  const [allowPushNotifications, setAllowPushNotifications] = useState(true)
  const [gender, setGender] = useState('')
  const [color, setColor] = useState('')
  const [theme, setTheme] = useState({
    NAME: 'default',
    DEFAULT: '#172B4D',
    PRIMARY: '#5E72E4',
    SECONDARY: '#F7FAFC',
    GRADIENT_VARIANT_ONE: ['#5E72E4', '#9AA6FF'],
    GRADIENT_VARIANT_TWO: ['#9AA6FF', '#5E72E4'],
  });

  useEffect(() => {
    AsyncStorage.getItem('USER-DETAILS', (err, data) => {
      const info = JSON.parse(data);
      setProfile(info);
      const url = `https://kelin-weebhook.herokuapp.com/api/user/mobile/${info.id}`
      axios.get(url)
      .then((resp) => {
        setReqStat(resp.data);
      })
      .catch((e) => {
        console.log(e.message);
      })
    });

    AsyncStorage.getItem('USER-CHOSEN-THEME', (err, data) => {
      const datum = JSON.parse(data);
      setColor(datum.NAME);
      setTheme(datum);
      // console.log("DATAAAAA", datum);
    });

  }, [color])

  const handleChooseColorTheme = async (color) => {
    setColor(color);
    const colorThemes = {
      default: {
        NAME: 'default',
        DEFAULT: '#172B4D',
        PRIMARY: '#5E72E4',
        SECONDARY: '#F7FAFC',
        GRADIENT_VARIANT_ONE: ['#5E72E4', '#9AA6FF'],
        GRADIENT_VARIANT_TWO: ['#9AA6FF', '#5E72E4'],
      },
      green: {
        NAME: 'green',
        DEFAULT: '#172B4D', //00A300
        PRIMARY: '#007500',
        SECONDARY: '#00D100',
        GRADIENT_VARIANT_ONE: ['#00A300', '#00D100'],
        GRADIENT_VARIANT_TWO: ['#00D100', '#00A300'],
      },
      blue: {
        NAME: 'blue',
        DEFAULT: '#172B4D',
        PRIMARY: '#5E72E4',
        SECONDARY: '#F7FAFC',
        GRADIENT_VARIANT_ONE: ['#5E72E4', '#9AA6FF'],
        GRADIENT_VARIANT_TWO: ['#9AA6FF', '#5E72E4'],
      },
      violet: {
        NAME: 'violet',
        DEFAULT: '#172B4D',
        PRIMARY: '#5E72E4',
        SECONDARY: '#F7FAFC',
        GRADIENT_VARIANT_ONE: ['#5E72E4', '#9AA6FF'],
        GRADIENT_VARIANT_TWO: ['#9AA6FF', '#5E72E4'],
      },
    }
    await storeData('USER-CHOSEN-THEME', JSON.stringify(colorThemes[color]));
  }

  return(
    <View style={{flex: 1}}>
    <AppBar name="Settings" bg={theme.PRIMARY}/>
    <ScrollView style={{flex: 1, backgroundColor: (Platform.OS === 'ios') ? colors.iosSettingsBackground : colors.white}}>
        <SettingsCategoryHeader
        title={'My Account'}
        titleStyle={{fontWeight: 'bold', fontSize: 16}}
        />
        <SettingsDividerLong android={false}/>
        <SettingsEditText
           disabled={true}
           title="Username"
           titleStyle={{color: 'black'}}
           valueStyle = {{color: 'black'}}
           dialogDescription={"Enter your username."}
           valuePlaceholder="..."
           negativeButtonTitle={"Cancel"}
           buttonRightTitle={"Save"}
           onValueChange={value => setUsername(value)}
           value={profile.other.name}
         />

         <SettingsDividerShort/>
         <SettingsEditText
            disabled={true}
            title="Zone"
            titleStyle={{color: 'black'}}
            valueStyle = {{color: 'black'}}
            dialogDescription={"Enter your username."}
            valuePlaceholder="..."
            negativeButtonTitle={"Cancel"}
            buttonRightTitle={"Save"}
            onValueChange={value => setUsername(value)}
            value={profile.other.zone}
          />
          <SettingsDividerShort/>
          <SettingsEditText
             disabled={true}
             title="Location"
             titleStyle={{color: 'black'}}
             valueStyle = {{color: 'black'}}
             dialogDescription={"Enter your username."}
             valuePlaceholder="..."
             negativeButtonTitle={"Cancel"}
             buttonRightTitle={"Save"}
             onValueChange={value => setUsername(value)}
             value={profile.other.location}
           />
         <SettingsDividerShort/>
         <SettingsEditText
            disabled={true}
            title="Phone Number"
            titleStyle={{color: 'black'}}
            valueStyle = {{color: 'black'}}
            dialogDescription={"Enter your username."}
            valuePlaceholder="..."
            negativeButtonTitle={"Cancel"}
            buttonRightTitle={"Save"}
            onValueChange={value => setUsername(value)}
            value={profile.phoneNumber}
          />

          <SettingsCategoryHeader
          title={'Request Details'}
          titleStyle={{fontWeight: 'bold', fontSize: 16}}
          />

          <SettingsDividerLong android={false}/>
          <SettingsEditText
             disabled={true}
             title="Todays requests"
             titleStyle={{color: 'black'}}
             valueStyle = {{color: 'black'}}
             dialogDescription={"Enter your username."}
             valuePlaceholder="..."
             negativeButtonTitle={"Cancel"}
             buttonRightTitle={"Save"}
             onValueChange={value => setUsername(value)}
             value={reqStat.todaysRequest.length + ""}
           />

           <SettingsDividerShort/>
            <SettingsEditText
               disabled={true}
               title="This Months Requests"
               titleStyle={{color: 'black'}}
               valueStyle = {{color: 'black'}}
               dialogDescription={"Enter your username."}
               valuePlaceholder="..."
               negativeButtonTitle={"Cancel"}
               buttonRightTitle={"Save"}
               onValueChange={value => setUsername(value)}
               value={reqStat.thisMonthsRequest.length + ""}
             />
           <SettingsDividerShort/>
           <SettingsEditText
              disabled={true}
              title="All time Requests"
              titleStyle={{color: 'black'}}
              valueStyle = {{color: 'black'}}
              dialogDescription={"Enter your username."}
              valuePlaceholder="..."
              negativeButtonTitle={"Cancel"}
              buttonRightTitle={"Save"}
              onValueChange={value => setUsername(value)}
              value={reqStat.requests.length + ""}
            />


        <SettingsCategoryHeader
        title={'Other'}
        titleStyle={{fontWeight: 'bold', fontSize: 16}}
        />

        <SettingsPicker
           title="Select theme"
           dialogDescription={"Choose your color."}
           options={[
             { label: "green", value: "green" },
             { label: "blue", value: "blue" },
             { label: "violet", value: "violet" }
           ]}
           onValueChange={value => handleChooseColorTheme(value)}
           value={color}
         />
         <SettingsDividerShort/>
        <SettingsSwitch
          title={"Allow Push Notifications"}
          onValueChange={value => setAllowPushNotifications(value) }
          value={allowPushNotifications}
          trackColor={{
            true: theme.PRIMARY,
            false: theme.SECONDARY,
          }}
        />
      <Text></Text>
      </ScrollView>
      </View>

    )

}

const colors = {
  white: "#FFFFFF",
  monza: "#C70039",
  blueGem: "#27139A",
};
