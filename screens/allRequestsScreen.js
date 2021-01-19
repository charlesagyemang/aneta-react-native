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
  const [firstQuery, setFirstQuery] = useState('');
  const [color, setColor] = useState('')
  const [theme, setTheme] = useState({
    NAME: 'default',
    DEFAULT: '#172B4D',
    PRIMARY: '#5E72E4',
    SECONDARY: '#F7FAFC',
    GRADIENT_VARIANT_ONE: ['#5E72E4', '#9AA6FF'],
    GRADIENT_VARIANT_TWO: ['#9AA6FF', '#5E72E4'],
  });

  useEffect(() => {
    AsyncStorage.getItem('USER-DETAILS', (err, data) => {
      setToken(JSON.parse(data).id);
      const url2 = 'https://raw.githubusercontent.com/adhithiravi/React-Hooks-Examples/master/testAPI.json'
      const url = `https://kelin-weebhook.herokuapp.com/api/user/mobile/${JSON.parse(data).id}`

      axios.get(url)
      .then((resp) => {
        console.log(resp.data);
        const articles = resp.data.requests
        setIsNotEmpty(resp.data.requests.length > 0)
        setData(articles);
      })
      .catch((e) => {
        console.log(e.message);
      })
      .finally(() => {
        setLoading(false)
      })

      AsyncStorage.getItem('USER-CHOSEN-THEME', (err, data) => {
        const datum = JSON.parse(data);
        setColor(datum.NAME);
        setTheme(datum);
      });
    }, [theme]);



  }, [color])

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
     const gradientColors = index % 2 ? theme.GRADIENT_VARIANT_ONE : theme.GRADIENT_VARIANT_TWO;

     return (
       <Block row center card shadow space="between" style={styles.card} key={props.id}>
         <Gradient
           start={[0.45, 0.45]}
           end={[0.90, 0.90]}
           colors={gradientColors}
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
           <Text size={BASE_SIZE * 1.125}>{props.requestStatus}</Text>
           <Text size={BASE_SIZE * 0.875} muted>{props.id}</Text>
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
            <AppBar name="All Requests" bg={theme.PRIMARY}/>

            <View style={styles.container}>
            <View style={{...styles.inputView, backgroundColor: theme.PRIMARY}} >
              <TextInput
                style={styles.inputText}
                placeholder="Search Requests"
                placeholderTextColor= 'white'
                onChangeText={pin => console.log("pin")}/>
            </View>
                <View style={styles.newStack}>
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
