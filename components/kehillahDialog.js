import React from 'react';
import { Text, View } from 'react-native';

import { FancyAlert } from 'react-native-expo-fancy-alerts';

// CREATE ERROR DIALOG 
export default (props) => {
    return (
        <FancyAlert
            visible={props.visibility}
            icon={<View style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: 50,
            width: '100%',
            }}><Text onPress={props.close.bind(this)}>{props.icon}</Text></View>}
            style={{ backgroundColor: 'white' }}
        >
            <Text style={{ marginTop: -16, marginBottom: 32 }}>{props.message}</Text>
     </FancyAlert>   
    );
}