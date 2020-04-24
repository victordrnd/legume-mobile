import React, { Component } from 'react';
import { Image, StatusBar, View, Text } from 'react-native';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Service from '../core/services/Service';
interface NavigationParams {
  my_param: string;
}

type Navigation = NavigationScreenProp<NavigationState, NavigationParams>;

interface Props {
  navigation: Navigation;
}

export class AuthLoadingScreen extends Component<Props> {

  state = {
  };
  animation;


  componentDidMount() {
    this.animation.play(60);
    setTimeout(() => { this.checkIntro() }, 2500)
  }


  checkIntro() {
    AsyncStorage.getItem('@introDone').then(async res => {
      res = JSON.parse(res);
      if (res) {
        let userToken = Service.token;
        this.props.navigation.navigate(userToken ? 'Home' : 'Login');
      } else {
        this.props.navigation.navigate('IntroScreen', {});
      }
    })
  }




  render() {
    return (
      <>
        <StatusBar backgroundColor='#00d8a2' barStyle='light-content'></StatusBar>
        <View style={{ backgroundColor: "#00d8a2", height: "100%", width: "100%" }}>
          <Image source={require('../../assets/logo.png')} style={{ alignSelf: "center", marginTop: 150, height: 200, width: 200 }}></Image>
          <LottieView source={require('../../assets/animations/dna2.json')} style={{ marginTop: 100, width: 200, alignSelf: "center" }} autoPlay loop ref={animation => {
            this.animation = animation;
          }} />
          <Text style={{ textAlign: "center", color: "#fff", fontFamily: "ProductSansRegular", marginTop: 100 }}>Chargement...</Text>
        </View>
      </>
    )
  }

}


