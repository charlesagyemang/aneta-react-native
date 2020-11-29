import React, {useState} from 'react';
import { StyleSheet, Button, View, Text } from 'react-native';
import BaseDropDown from '../components/baseDropDown';
import AppBar from '../components/appBar';


const sports = [
    {
      label: 'Football',
      value: 'football',
      key: 1,
    },
    {
      label: 'Baseball',
      value: 'baseball',
      key: 2,
    },
    {
      label: 'Hockey',
      value: 'hockey',
      key: 3,
    },
  ];

export default ({navigation}) => {
    const [sportValue, setSportValue] = useState();

    return(
      <View style={{flex: 1}}>
        <AppBar name="Home Screen" />
        <View styles={styles.container}>
            <Button
                title="Create A New Request"
                onPress={() => navigation.navigate('New Request')}
            />
            <BaseDropDown
              items={sports}
              value={sportValue}
              onValueChange={(val) => setSportValue(val)}  message="Select Your Sports"
            />
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});
