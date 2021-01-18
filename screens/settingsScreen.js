import React, {useState} from 'react'
import {
  StyleSheet, ScrollView, Platform, Text, View
} from 'react-native';
import {
  SettingsDividerShort,
  SettingsDividerLong,
  SettingsEditText,
  SettingsCategoryHeader,
  SettingsSwitch, SettingsPicker
} from 'react-native-settings-components';

import AppBar from '../components/appBar';

export default () => {

  const [username, setUsername] = useState('')
  const [allowPushNotifications, setAllowPushNotifications] = useState(true)
  const [gender, setGender] = useState('')

  return(
    <View style={{flex: 1}}>
    <AppBar name="Settings" />
    <ScrollView style={{flex: 1, backgroundColor: (Platform.OS === 'ios') ? colors.iosSettingsBackground : colors.white}}>
        <SettingsCategoryHeader title={'My Account'} textStyle={(Platform.OS === 'android') ? {color: colors.monza} : null}/>
        <SettingsDividerLong android={false}/>
        <SettingsEditText
           disabled={true}
           title="Username"
           dialogDescription={"Enter your username."}
           valuePlaceholder="..."
           negativeButtonTitle={"Cancel"}
           buttonRightTitle={"Save"}
           onValueChange={value => setUsername(value)}
           value={username}
         />
        <SettingsDividerShort/>
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

        <Text></Text>



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
  switchEnabled: "#C70039",
  switchDisabled: "#efeff3",
  blueGem: "#27139A",
};
