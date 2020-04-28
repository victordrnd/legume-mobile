import AsyncStorage from '@react-native-community/async-storage';
import React from 'react';
import { StatusBar, View } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Transition } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Feather';
import { createAppContainer } from 'react-navigation';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import OfflineNotice from './src/components/OfflineNotice';
import NavigationService from './src/core/services/NavigationService';
import Service from './src/core/services/Service';
import UserService from './src/core/services/UserService';
import { AuthLoadingScreen } from './src/screens/AuthLoadingScreen';
import { CommandeScreen } from './src/screens/CommandeScreen';
import { CommandesScreen } from './src/screens/CommandesScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import IntroScreen from './src/screens/IntroScreen';
import { LoginScreen } from './src/screens/LoginScreen';

export default class App extends React.Component {

  async componentDidMount() {
    let token = await AsyncStorage.getItem('@token');
    UserService.tokenSubject.next(token);
    Service.token = token;
    await UserService.populate();
  }


  render() {
    return (
      <PaperProvider theme={theme}>
        <StatusBar backgroundColor="#d8a864"></StatusBar>
        <AppContainer ref={navigatorRef => { NavigationService.setTopLevelNavigator(navigatorRef) }} />
        <OfflineNotice />
      </PaperProvider>
    )
  }
}


const bottomTabNavigator = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <View style={{ backgroundColor: tintColor, borderRadius: 10, padding: 7, width: 40, marginTop: -7 }}>
            <Icon style={{ color: "#000", textAlign: "center" }} name="home" size={20}></Icon>
          </View>
        )
      }
    },
    Bookings: {
      screen: CommandesScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <View style={{ backgroundColor: tintColor, borderRadius: 10, padding: 7, width: 40, marginTop: -7 }}>
            <Icon style={{ color: "#000", textAlign: "center" }} name="package" size={20}></Icon>
          </View>
        )
      }
    },
    Booking: {
      screen: CommandeScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <View style={{ backgroundColor: tintColor, borderRadius: 10, padding: 7, width: 40, marginTop: -7 }}>
            <Icon style={{ color: "#000", textAlign: "center" }} name="clipboard" size={20}></Icon>
          </View>
        )
      }
    },
  },
  {
    initialRouteName: 'Home',
    activeColor: '#f1f3f6',
    inactiveColor: '#fff',
    labeled: false,
    barStyle: { backgroundColor: '#fff', position: "absolute" },
  },
);






const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#8FE9B3',
    accent: '#C40FFF',
    background: '#f1f3f6'
  },
};

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