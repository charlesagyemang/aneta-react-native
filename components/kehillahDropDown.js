
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';


// CREATE Kehillah Drop Down
export default (props) => {
    return (
        <View>
            <Text style={styles.label}>Select Trash Size</Text>
            <DropDownPicker
            items={props.items}
            defaultValue={props.defaultValue}
            containerStyle={styles.dropDoenContainerStyles}
            style={styles.dropDownStyle}
            itemStyle={{
                justifyContent: 'flex-start'
            }}
            dropDownStyle={styles.dropDownStyle}
            onChangeItem={props.onChangeItem.bind(this)}
        />
      </View>
    );
}

const styles = StyleSheet.create({
    dropDownStyle: {
        backgroundColor: 'white',
    },
    dropDoenContainerStyles: {
        height: 60,
        margin: 10,
        marginTop: 15
    }, 
    label: {
        marginLeft: 10,
        marginTop: 10
    }
})


//=== USAGE ======///
{/* <KehillahDropDown 
items={items}
defaultValue={trashSize}
onChangeItem={item => setTrashSize(item.value)}
/> */}