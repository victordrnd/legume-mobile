import React from 'react';
import { View, StatusBar, ActivityIndicator, Alert } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Transition } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Feather';
import { createAppContainer } from 'react-navigation';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import { createStackNavigator } from 'react-navigation-stack';
import OfflineNotice from './src/components/OfflineNotice';
import { AuthLoadingScreen } from './src/screens/AuthLoadingScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import NavigationService from './src/services/NavigationService';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Service from './src/services/Service';
import UserService from './src/services/UserService';
import IntroScreen from './src/screens/IntroScreen';
import AsyncStorage from '@react-native-community/async-storage';
import { LoginScreen } from './src/screens/LoginScreen';
import { Overlay, Text } from 'react-native-elements';
import { RegisterScreen } from './src/screens/RegisterScreen';
export default class App extends React.Component {



  async componentDidMount() {
    await Analytics.setEnabled(true);
    await AsyncStorage.getItem('@token').then(async (token) => {
      UserService.tokenSubject.next(token);
      Service.token = token;
      await UserService.populate();
    });
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
    Stock: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <View style={{ backgroundColor: tintColor, borderRadius: 10, padding: 7, width: 40, marginTop: -7 }}>
            <Icon style={{ color: "#000", textAlign: "center" }} name="package" size={20}></Icon>
          </View>
        )
      }
    },
    Historique: {
      screen: HomeScreen,
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
    primary: '#222a5b',
    accent: '#f1c40f',
    background: '#f1f3f6'
  },
};

const AuthenticationNavigator = createStackNavigator({
  Login: LoginScreen,
  Register : RegisterScreen
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