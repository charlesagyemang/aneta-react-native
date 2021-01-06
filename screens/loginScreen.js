import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { storeData } from '../helpers/localStorage'
import axios from 'axios'
import KehillahDialog from '../components/kehillahDialog';

export default () => {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [buttonText, setButtonText] = useState('LOGIN')
  const [pin, setPin] = useState('')
  const [alertVisibility, setAlertVisibility] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [alertIcon, setAlertIcon] = useState('❌')

  const handleSignIn = async () => {
    const loginBody = { phoneNumber, pin }
    const url = 'https://kelin-weebhook.herokuapp.com/api/user/login'
    const pinIs4Digits = pin.length === 4
    if (pinIs4Digits) {
      try {
        setButtonText('Authenticating.....')
        const res =  await axios.post(url, loginBody)
        setButtonText('SUCCESS')
        storeData('USER-DETAILS', JSON.stringify(res.data))
      } catch (e) {
        setButtonText('LOGIN')
        setAlertVisibility(true)
        setErrorMessage("Wrong PhoneNumber Or PIN please check and try again")
      } finally {
        setButtonText('LOGIN')
      }
    } else {
      setButtonText('LOGIN')
      setAlertVisibility(true)
      setErrorMessage("Wrong PIN please check and try again. Your Pin should be only 4 digits.")
    }
  }
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>Aneta</Text>
        <View style={styles.inputView} >
          <TextInput
            style={styles.inputText}
            numeric
            placeholder="Enter Your Phone Number"
            placeholderTextColor="#003f5c"
            keyboardType={'numeric'}
            onChangeText={phoneNumber => setPhoneNumber(phoneNumber)}/>
        </View>
        <View style={styles.inputView} >
          <TextInput
            secureTextEntry
            numeric
            style={styles.inputText}
            keyboardType={'numeric'}
            placeholder="Enter Your Secret PIN"
            placeholderTextColor="#003f5c"
            onChangeText={pin => setPin(pin)}/>
        </View>


        <KehillahDialog
            visibility={alertVisibility}
            close={() => setAlertVisibility(false)}
            message={errorMessage}
            icon={alertIcon}
        />

        <TouchableOpacity
          style={styles.loginBtn}
          onPress={handleSignIn}
        >
          <Text style={styles.loginText}>{buttonText}</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.loginText}>Signup</Text>
        </TouchableOpacity>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00b300',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    fontWeight:"bold",
    fontSize:50,
    color:"white",
    marginBottom:40
  },
  inputView:{
    width:"80%",
    backgroundColor:"#2E8B57",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"white"
  },
  forgot:{
    color:"white",
    fontSize:11
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"#006400", //#32CD32
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  loginText:{
    color:"white"
  }
});
