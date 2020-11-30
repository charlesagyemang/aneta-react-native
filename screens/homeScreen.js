import React from 'react';
import {
  StyleSheet, ScrollView, Platform,
} from 'react-native';
import { LinearGradient as Gradient } from 'expo-linear-gradient';
import { Defs, LinearGradient, Stop } from 'react-native-svg';
import { AreaChart } from 'react-native-svg-charts';
import * as shape from 'd3-shape';

// galio components
import {
  Button, Block, Text, NavBar,
} from 'galio-framework';
import Icon from 'react-native-vector-icons/Ionicons';
import theme from '../src/theme';

const BASE_SIZE = theme.SIZES.BASE;
const GRADIENT_BLUE = ['#6B84CA', '#8F44CE'];
const GRADIENT_PINK = ['#D442F8', '#B645F5', '#9B40F8'];
const COLOR_WHITE = theme.COLORS.WHITE;
const COLOR_GREY = theme.COLORS.MUTED; // '#D8DDE1';

// mock data
const cards = [
  {
    title: 'Taskswwssss',
    subtitle: '15 completed tasks',
    icon: 'ios-list',
    iconFamily: 'Galio',
  },

  {
    title: 'Aquisitions',
    subtitle: '15 completed tasks',
    icon: 'ios-appstore',
    iconFamily: 'Galio',
  },
  {
    title: 'Cards',
    subtitle: '15 completed tasks',
    icon: 'ios-home',
    iconFamily: 'Galio',
  },

  {
    title: 'Settings',
    subtitle: '15 completed tasks',
    icon: 'ios-home',
    iconFamily: 'Galio',
  },
];
const statsTitles = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov'];

const Dashboard = () => {

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
            <Stop offset="0%" stopColor={theme.COLORS.THEME} />
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
        <Button style={styles.right}>
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
