import React, {useState, useEffect} from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView } from 'react-native';
import axios from 'axios'
import theme from '../src/theme';
import AppBar from '../components/appBar';
import Item from '../components/listLanguagesItem';
import { Block, Button, Text } from 'galio-framework';
import { LinearGradient as Gradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { AsyncStorage } from 'react-native';


const BASE_SIZE = theme.SIZES.BASE;
const GRADIENT_BLUE = ['#006400', '#00FF00'];
const GRADIENT_PINK = ['#006400', '#00FF00'];
const COLOR_WHITE = theme.COLORS.WHITE;
const COLOR_GREY = theme.COLORS.MUTED; // '#D8DDE1';


export default () => {
  const [selectedId, setSelectedId] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [isNotEmpty, setIsNotEmpty] = useState(null);
  const [data, setData] = useState([]);
  const [token, setToken] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('USER-DETAILS', (err, data) => {
      setToken(JSON.parse(data).id);
      const url2 = 'https://raw.githubusercontent.com/adhithiravi/React-Hooks-Examples/master/testAPI.json'
      const url = `https://kelin-weebhook.herokuapp.com/api/user/mobile/${JSON.parse(data).id}`

      axios.get(url)
      .then((resp) => {
        // console.log(resp.data);
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
    })
    // AsyncStorage.removeItem('USER-DETAILS', (err, data) => {
    //   console.log(data);
    // })


  }, [])

  // console.log(token);

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
     const gradientColors = index % 2 ? GRADIENT_BLUE : GRADIENT_PINK;

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
             name="ios-trash"
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
            <AppBar name="All Requests" />
            <View style={styles.container}>
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
      height: "10%"
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
});
