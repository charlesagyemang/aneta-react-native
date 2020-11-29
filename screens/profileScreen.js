import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppBar from '../components/appBar';



export default () => {
    return(
        <View style={{flex: 1}}>
            <AppBar name="Profile / Settings" />    
            <View style={styles.container}>         
                <Text>Profile Page</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});