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
    <AppBar name="Create A Request" />
    <ScrollView style={{flex: 1, backgroundColor: (Platform.OS === 'ios') ? colors.iosSettingsBackground : colors.white}}>
        <SettingsCategoryHeader title={'My Account'} textStyle={(Platform.OS === 'android') ? {color: colors.monza} : null}/>
        <SettingsDividerLong android={false}/>
        <SettingsEditText
            title="Username"
            dialogDescription={'Enter your username.'}
            valuePlaceholder="..."
            negativeButtonTitle={'Cancel'}
            buttonRightTitle={'Save'}
            onSaveValue={value => setUsername(value) }
            value={username}
            dialogAndroidProps={{
                widgetColor: colors.monza,
                positiveColor: colors.monza,
                negativeColor: colors.monza,
            }}
        />
        <SettingsDividerShort/>
        <SettingsPicker
            title="Gender"
            dialogDescription={'Choose your gender.'}
            possibleValues={[
                {label: '...', value: ''},
                {label: 'male', value: 'male'},
                {label: 'female', value: 'female'},
                {label: 'other', value: 'other'}
            ]}
            negativeButtonTitle={'Cancel'}
            buttonRightTitle={'Save'}
            onSaveValue={value => setGender(value) }
            value={gender}
            styleModalButtonsText={{color: colors.monza}}
        />

        <Text></Text>

        <SettingsSwitch
            title={'Allow Push Notifications'}
            onSaveValue={value => setAllowPushNotifications(value)}
            value={allowPushNotifications}
            thumbTintColor={(allowPushNotifications) ? colors.switchEnabled : colors.switchDisabled}
        />

      <Text></Text>

      </ScrollView>
      </View>

    )

}

const colors = {
  iosSettingsBackground: 'rgb(235,235,241)',
  white: '#FFFFFF',
  monza: '#C70039',
  switchEnabled: (Platform.OS === 'android') ? '#C70039' : null,
  switchDisabled: (Platform.OS === 'android') ? '#efeff3' : null,
  switchOnTintColor: (Platform.OS === 'android') ? 'rgba(199, 0, 57, 0.6)' : null,
  blueGem: '#27139A',
};
