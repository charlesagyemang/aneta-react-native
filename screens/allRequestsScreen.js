import React, {useState, useEffect} from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView, TextInput } from 'react-native';
import axios from 'axios'
import theme2 from '../src/theme';
import AppBar from '../components/appBar';
import Item from '../components/listLanguagesItem';
import { Block, Button, Text } from 'galio-framework';
import { LinearGradient as Gradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { AsyncStorage } from 'react-native';
import  Button2  from "../components/Button";



const BASE_SIZE = theme2.SIZES.BASE;
const GRADIENT_BLUE = ['#006400', '#00FF00'];
const GRADIENT_PINK = ['#006400', '#00FF00'];
const COLOR_WHITE = theme2.COLORS.WHITE;
const COLOR_GREY = theme2.COLORS.MUTED; // '#D8DDE1';


export default () => {
  const [selectedId, setSelectedId] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [isNotEmpty, setIsNotEmpty] = useState(null);
  const [data, setData] = useState([]);
  const [token, setToken] = useState('');
  const [firstQuery, setFirstQuery] = useState('')
  const [refreshTrue, setRefreshTrue] = useState(false)

  useEffect(() => {
    AsyncStorage.getItem('USER-DETAILS', (err, data) => {
      setToken(JSON.parse(data).id);
      const url = `https://kelin-weebhook.herokuapp.com/api/user/mobile/${JSON.parse(data).id}`
      axios.get(url)
      .then((resp) => {
        console.log(resp.data);
        const articles = resp.data.requests
        setIsNotEmpty(resp.data.requests.length > 0)
        setData(articles);
        setRefreshTrue(false);
      })
      .catch((e) => {
        console.log(e.message);
      })
      .finally(() => {
        setLoading(false)
      })
    });
  }, [refreshTrue])

  const renderItem = ({ item }) => {
     const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
     return (
       <Item
         item={item}
         onPress={() => setSelectedId(item.id)}
         style={{ backgroundColor }}
       />
     );
   };


   const renderCard = (props, index) => {
     const gradientColors = index % 2 ? theme2.COLOR_THEMES.ONE.GRADIENT_VARIANT_ONE : theme2.COLOR_THEMES.ONE.GRADIENT_VARIANT_TWO;
     let gradientColorsTwo;

     switch (props.requestStatus) {
       case 'CREATED':
         gradientColorsTwo = ['#5E72E4', '#9AA6FF'] //[ '#18A558' , '#A3EBB1' ]
         break;
       case 'PROCESSING':
         gradientColorsTwo = [ '#D1D100', '#FFFF00']
         break;
       case 'ASSIGNED_TO_A_DRIVER':
         gradientColorsTwo = [ '#F76201' , '#DFB106' ]
         break;
       case 'DRIVER_ON_ROUTE_TO_PICKUP':
         gradientColorsTwo = [ '#3B0918' , '#B8390E' ]
         break;
       case 'PICKUP_COMPLETE':
         gradientColorsTwo = [ '#18A558' , '#A3EBB1' ]
         break;
       default:

     }

     return (
       <Block row center card shadow space="between" style={styles.card} key={props.id}>
         <Gradient
           start={[0.45, 0.45]}
           end={[0.90, 0.90]}
           colors={gradientColorsTwo}
           style={[styles.gradient, styles.left]}
         >
           <Icon
             size={BASE_SIZE * 1.8}
             name="ios-git-pull-request"
             color={COLOR_WHITE}
             family={props.iconFamily}
           />
         </Gradient>

         <Block flex>
           <Text size={BASE_SIZE * 1.125}>ON {props.other.proposedDate} @ {props.other.proposedLocation}</Text>
           <Text size={BASE_SIZE * 0.875} >Type: {props.requestType}</Text>
           <Text size={BASE_SIZE * 0.875} >Status: {props.requestStatus}</Text>
           <Text size={BASE_SIZE * 0.875} >ID: {props.id}</Text>
         </Block>
         <Button style={styles.right}>
           <Icon size={BASE_SIZE} name="ios-arrow-forward" family="Galio" color={COLOR_GREY} />
         </Button>
       </Block>
     );
   }
   const renderCards = () => data.map((card, index) => renderCard(card, index))

    return(
        <View style={{flex: 1}}>
            <AppBar name="All Requests" bg={theme2.COLOR_THEMES.ONE.PRIMARY}/>
            <View style={styles.container}>
            <View style={{...styles.inputView, backgroundColor: theme2.COLOR_THEMES.ONE.PRIMARY}} >
              <TextInput
                style={styles.inputText}
                placeholder="Search Requests"
                placeholderTextColor= 'white'
                onChangeText={pin => console.log("pin")}/>
            </View>

                <View style={styles.newStack}>
                <Button2
                  onPress={() => setRefreshTrue(true)}
                  small
                  style={{ marginLeft: 15,  backgroundColor: "violet" }}
                >
                  Reload
                </Button2>
                { isLoading ? <Text>Loading...</Text> : <Text></Text> }
                { isNotEmpty ? <Text></Text> : <Text>You Have No requests</Text> }
                </View>
                <SafeAreaView style={styles.safeAreaStyle}>
                    <ScrollView>
                      {renderCards()}
                    </ScrollView>
                </SafeAreaView>
            </View>
        </View>
      )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    safeAreaStyle: {
      height: "80%"
    },
    newStack:{
      height: "5%"
    },
    card: {
      borderColor: 'transparent',
      marginHorizontal: BASE_SIZE,
      marginVertical: BASE_SIZE / 3,
      padding: BASE_SIZE / 3,
      backgroundColor: COLOR_WHITE,
      shadowOpacity: 0.40,
    },

    menu: {
      width: BASE_SIZE * 2,
      borderColor: 'transparent',
    },
    settings: {
      width: BASE_SIZE * 2,
      borderColor: 'transparent',
    },
    left: {
      marginRight: BASE_SIZE,
    },
    right: {
      width: BASE_SIZE * 2,
      backgroundColor: 'transparent',
      elevation: 0,
    },
    gradient: {
      width: BASE_SIZE * 3.25,
      height: BASE_SIZE * 3.25,
      borderRadius: BASE_SIZE * 1.6,
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputView:{
      marginTop: "5%",
      marginLeft: "10%",
      width:"80%",
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
});
