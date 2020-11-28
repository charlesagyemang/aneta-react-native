import React, {useState} from 'react';
import { StyleSheet, Button, View, Text } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Ionicons from 'react-native-vector-icons/Ionicons';


export default (props) => {
    const placeholder = {
        label: 'Select a sport...',
        value: null,
        color: '#9EA0A4',
    };

    return(
        <View style={{flexDirection: "row", paddingTop: 10}}>
            <Text style={{padding: "3%"}}>{props.message}</Text>
            <RNPickerSelect
                placeholder={placeholder}
                items={props.items}
                onValueChange={props.onValueChange.bind(this)}
                style={{
                ...pickerSelectStyles,
                iconContainer: {
                    top: 10,
                    right: 12,
                },
                }}
                value={props.value}
                useNativeAndroidPickerStyle={false}
                textInputProps={{ underlineColor: 'yellow' }}
                Icon={() => {
                    return <Ionicons name="md-arrow-down" size={24} color="gray" />;
                }}
            />
        </View>
    );
};

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
  });

  //====== USAGE =====//
//   <BaseDropDown items={sports} value={sportValue} onValueChange={(val) => setSportValue(val)}  message="Select Your Sports"/>
//