import React from 'react';
import { StyleSheet, Button, View, Text } from 'react-native';

export default ({navigation}) => {
    return(
        <View style={styles.container}>
            <Button
                title="Create A New Request"
                onPress={() => navigation.navigate('Create Pickup Request')}
            />
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