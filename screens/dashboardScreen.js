import React, {useEffect, useState} from 'react';
import axios from 'axios'
import {
  StyleSheet, ScrollView, Platform,
} from 'react-native';
import { LinearGradient as Gradient } from 'expo-linear-gradient';
import { Defs, LinearGradient, Stop } from 'react-native-svg';
import { AreaChart } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import { AsyncStorage } from 'react-native';
// galio components
import {
  Button, Block, Text, NavBar,
} from 'galio-framework';
import Icon from 'react-native-vector-icons/Ionicons';
import theme from '../src/theme';



const BASE_SIZE = theme.SIZES.BASE;
const GRADIENT_BLUE = ['#006400', '#00FF00'];
const GRADIENT_PINK = ['#006400', '#00FF00'];
const COLOR_WHITE = theme.COLORS.WHITE;
const COLOR_GREY = theme.COLORS.MUTED; // '#D8DDE1';


const statsTitles = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov'];

const Dashboard = ({navigation}) => {

  // AsyncStorage.removeItem('USER-DETAILS', (data) => {
  //   console.log("done");
  // })
  const [reqStat, setReqStat] = useState({todaysRequest: [], thisWeeksRequest: [], thisMonthsRequest: [], requests: [{id: "none"}]})
  const [token, setToken] = useState('');

  const todReq = reqStat.todaysRequest.length
  const twReq = reqStat.thisWeeksRequest.length
  const tmReq = reqStat.thisMonthsRequest.length || 0
  const allTime = reqStat.requests.length || 0

  const mostRecent = reqStat.requests[0] ? reqStat.requests[0].id : 'NAN'
  const completed = reqStat.requests.filter(x => x.requestStatus === "COMPLETED").length;
  const created = reqStat.requests.filter(x => x.requestStatus === "CREATED").length;

  useEffect(() => {
    AsyncStorage.getItem('USER-DETAILS', (err, data) => {
      setToken(JSON.parse(data).id);
      const url = `https://kelin-weebhook.herokuapp.com/api/user/mobile/${JSON.parse(data).id}`
      axios.get(url)
      .then((resp) => {
        setReqStat(resp.data);
      })
      .catch((e) => {
        console.log(e.message);
      })

    })

  }, []);

  // mock data
  const cards = [
    {
      title: 'All Requests',
      subtitle: `Today: ${todReq} This Week: ${twReq} All Time: ${allTime}`,
      icon: 'ios-list',
      iconFamily: 'Galio',
      name: 'All Requests',
    },

    {
      title: 'Create A New Request',
      subtitle: `Created: ${created} Completed: ${completed}`,
      icon: 'ios-add-circle',
      iconFamily: 'Galio',
      name: 'New Request',
    },
    {
      title: 'Track A Pickup',
      subtitle: `Most Recent Req: ${mostRecent}`,
      icon: 'ios-trash',
      iconFamily: 'Galio',
      name: 'New Request',
    },

    {
      title: 'Profile',
      subtitle: 'Check out Your Profile',
      icon: 'ios-people',
      iconFamily: 'Galio',
      name: 'Profile',
    },
  ];


  const renderHeader = () => {
    return(
        <NavBar
          title="Dashboard"
          onLeftPress={() => props.handlePressHeart}
          leftIconColor={theme.COLORS.MUTED}
          right={(
            <Button
              color="transparent"
              style={styles.settings}
              onPress={() => console.log('Hey There')}
            >
              <Icon size={BASE_SIZE} name="ios-heart" family="font-awesome" color={theme.COLORS.MUTED} />
            </Button>
          )}
          style={Platform.OS === 'android' ? { marginTop: theme.SIZES.BASE } : null}
        />
      )
  }

  const GradientStats = () => {
    return (
        <Defs key="gradient">
          <LinearGradient id="gradient" x1="0" y="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor={theme.COLORS.RED} />
            <Stop offset="100%" stopColor={theme.COLORS.INFO} />
          </LinearGradient>
        </Defs>
      );
  }

  const renderStats = () => {
    const statsActive = Array.from({ length: 20 }, () => parseFloat((Math.random() * 0.8 + 1).toFixed(3)));
    const statsInactive = Array.from({ length: 12 }, () => parseFloat((Math.random() * 0.7 + 1).toFixed(3)));
    return (
      <Block style={{ marginBottom: BASE_SIZE * 3 }}>
        <AreaChart
          yMin={0}
          yMax={Math.max(...statsActive) + 1}
          data={statsInactive}
          curve={shape.curveNatural}
          style={[StyleSheet.absoluteFill]}
          contentInset={{
            bottom: -BASE_SIZE * 0.15, right: -BASE_SIZE * 0.15, left: -BASE_SIZE * 0.15,
          }}
          svg={{ strokeWidth: 1, stroke: 'rgba(0,0,0,0.2)', strokeDasharray: 4 }}
        >
          <GradientStats />
        </AreaChart>
        <AreaChart
          yMin={0}
          yMax={Math.max(...statsActive) + 1}
          data={statsActive}
          curve={shape.curveNatural}
          style={{ height: BASE_SIZE * 10 }}
          contentInset={{
            bottom: -BASE_SIZE * 0.21, right: -BASE_SIZE * 0.21, left: -BASE_SIZE * 0.21,
          }}
          svg={{ strokeWidth: BASE_SIZE * 0.1875, stroke: 'url(#gradient)' }}
        >
          <GradientStats />
        </AreaChart>
        <Block row space="evenly" style={{ marginTop: BASE_SIZE }}>
          {statsTitles.map(title => <Text key={title} size={theme.SIZES.FONT * 0.85} muted>{title}</Text>)}
        </Block>
      </Block>
    );
  }

  const renderCard = (props, index) => {
    const gradientColors = index % 2 ? GRADIENT_BLUE : GRADIENT_PINK;

    return (
      <Block row center card shadow space="between" style={styles.card} key={props.title}>
        <Gradient
          start={[0.45, 0.45]}
          end={[0.90, 0.90]}
          colors={gradientColors}
          style={[styles.gradient, styles.left]}
        >
          <Icon
            size={BASE_SIZE * 1.8}
            name={props.icon}
            color={COLOR_WHITE}
            family={props.iconFamily}
          />
        </Gradient>

        <Block flex>
          <Text size={BASE_SIZE * 1.125}>{props.title}</Text>
          <Text size={BASE_SIZE * 0.875} muted>{props.subtitle}</Text>
        </Block>
        <Button style={styles.right} onPress={() => navigation.navigate(props.name, { name: props.name })}>
          <Icon size={BASE_SIZE} name="ios-arrow-forward" family="Galio" color={COLOR_GREY} />
        </Button>
      </Block>
    );
  }

  const renderCards = () => cards.map((card, index) => renderCard(card, index))

  return (
    <Block safe flex>
    {renderHeader()}
       {renderStats()}
      <ScrollView style={{ flex: 1 }}>
        {renderCards()}
      </ScrollView>
    </Block>
  );
}

const styles = StyleSheet.create({
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

export default Dashboard;
