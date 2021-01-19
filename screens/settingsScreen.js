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
import theme from '../src/theme';

import axios from 'axios'
import AppBar from '../components/appBar';
import { AsyncStorage } from 'react-native';


export default () => {

  const [profile, setProfile] = useState({phoneNumber: "", other: { name: "Loading....", zone: "please Wait...", location: "....", }})
  const [reqStat, setReqStat] = useState({todaysRequest: [], thisWeeksRequest: [], thisMonthsRequest: [], requests: [{id: "none"}]})
  const [username, setUsername] = useState('')
  const [allowPushNotifications, setAllowPushNotifications] = useState(true)
  const [gender, setGender] = useState('')

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

    })

  }, [])

  return(
    <View style={{flex: 1}}>
    <AppBar name="Settings" />
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
         onValueChange={value => setGender(value)}
         value={gender}
         styleModalButtonsText={{ color: colors.monza }}
         />
         <SettingsDividerShort/>
        <SettingsSwitch
          title={"Allow Push Notifications"}
          onValueChange={value => setAllowPushNotifications(value) }
          value={allowPushNotifications}
          trackColor={{
            true: colors.switchEnabled,
            false: colors.switchDisabled,
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
  switchEnabled: theme.COLORS_TWO.PRIMARY,
  switchDisabled: theme.COLORS_TWO.SECONDARY,
  blueGem: "#27139A",
};
