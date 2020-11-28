import React, {useState} from 'react';
import { StyleSheet, Button, View, Text } from 'react-native';
import BaseDropDown from '../components/baseDropDown'

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
        <View style={styles.container}>
            <Button
                title="Create A New Request"
                onPress={() => navigation.navigate('Create Pickup Request')}
            />
            <BaseDropDown items={sports} value={sportValue} onValueChange={(val) => setSportValue(val)}  message="Select Your Sports"/>
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