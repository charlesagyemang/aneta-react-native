import React, {useState} from 'react';
import { StyleSheet, Button, View, Text } from 'react-native';
import BaseDropDown from '../components/baseDropDown';


const sports = [
    {
      label: 'Football',
      value: 'football',
      key: "1",
    },
    {
      label: 'Baseball',
      value: 'baseball',
      key: "2",
    },
    {
      label: 'Hockey',
      value: 'hockey',
      key: "3",
    },
    {
      label: 'Football',
      value: 'football',
      key: "4",
    },
    {
      label: 'Baseball',
      value: 'baseball',
      key: "5",
    },
    {
      label: 'Hockey',
      value: 'hockey',
      key: "6",
    },
    {
      label: 'Football',
      value: 'football',
      key: "7",
    },
    {
      label: 'Baseball',
      value: 'baseball',
      key: "8",
    },
    {
      label: 'Hockey',
      value: 'hockey',
      key: "9",
    },
  ];

export default ({navigation}) => {
    const [sportValue, setSportValue] = useState();
    return(
      <View style={styles.container}>
        <View>
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
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
});
