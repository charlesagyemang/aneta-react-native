import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppBar from '../components/appBar';



export default () => {
    return(
        <View style={{flex: 1}}>
            <AppBar name="All Requests" />    
            <View style={styles.container}>         
                <Text>ALL REQUESTS PAGE</Text>
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