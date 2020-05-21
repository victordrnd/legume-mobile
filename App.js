import AsyncStorage from '@react-native-community/async-storage';
import React from 'react';
import { StatusBar, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Transition } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Feather';
import { createAppContainer } from 'react-navigation';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import { createStackNavigator } from 'react-navigation-stack';
import OfflineNotice from './src/components/OfflineNotice';
import NavigationService from './src/core/services/NavigationService';
import UserService from './src/core/services/UserService';
import { AuthLoadingScreen } from './src/screens/AuthLoadingScreen';
import { CommandeScreen } from './src/screens/CommandeScreen';
import { CommandesScreen } from './src/screens/CommandesScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import IntroScreen from './src/screens/IntroScreen';
import { LoginScreen } from './src/screens/LoginScreen';
import theme from './src/theme';
import { createBottomTabNavigator } from 'react-navigation-tabs';

export default class App extends React.Component {

  async componentDidMount() {
    await UserService.load();
  }


  render() {
    return (
      <PaperProvider theme={theme}>
        <StatusBar backgroundColor="#fff" />
        <AppContainer ref={navigatorRef => { NavigationService.setTopLevelNavigator(navigatorRef) }} />
        <OfflineNotice />
      </PaperProvider>
    )
  }
}

const bottomTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={{ color: tintColor }} name="home" size={20}></Icon>
          </View>
        ),
        title : "Accueil"
      }
    },
    Bookings: {
      screen: CommandesScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={{ color: tintColor }} name="package" size={20}></Icon>
          </View>
        ),
        title : "Commandes"
      }
    },
    Booking: {
      screen: CommandeScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={{ color: tintColor }} name="clipboard" size={20}></Icon>
          </View>
        ),
        title : "Préparation"
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: theme.colors.primary,
      inactiveTintColor: theme.colors.inactive,
      keyboardHidesTabBar: true,
      style : { 
        borderTopColor: 'transparent',
        elevation : 1,
        borderRadius : 5,
        backgroundColor:"white"
        // height: 50,
       },
      showLabel : true
    },
  },
);



const AuthenticationNavigator = createStackNavigator({
  Login: LoginScreen
},
  {
    headerMode: 'none'
  })

const HomeNavigator = createStackNavigator({
  App: bottomTabNavigator,
  IntroScreen: IntroScreen,
}, {
  headerMode: 'none'
})

AppNavigator = createAppContainer(createAnimatedSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: HomeNavigator,
    Login: AuthenticationNavigator
  },
  {
    initialRouteName: 'AuthLoading',
    transition: (
      <Transition.Together>
        <Transition.Out
          type="slide-bottom"
          durationMs={400}
          interpolation="easeIn"
        />
        <Transition.In type="fade" durationMs={500} />
      </Transition.Together>
    ),
  }),
);

const AppContainer = createAppContainer(AppNavigator);