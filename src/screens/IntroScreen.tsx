import AsyncStorage from '@react-native-community/async-storage';
import LottieView from 'lottie-react-native';
import React from 'react';
import { StatusBar, Text, View } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import Icon from 'react-native-vector-icons/Feather';
import styles from '../../assets/styles/styles';
import Header from '../components/Header';
import NavigationService from '../core/services/NavigationService';


const slides = [
  {
    key: '1',
    title: 'Objectif',
    text: "L'objectif de cette application est de premettre au personel d'un laboratoire de comptabiliser des kits en stock et de réaliser des inventaires",
    image: require('../../assets/animations/page-success.json'),
    backgroundColor: '#f1f3f6',
  },
  {
    key: '2',
    title: 'Compteur',
    text: "Afin de faciliter le comptage des kits, un compteur entièrement personnalisé a été mis en place. \n",
    image: require('../../assets/animations/pulse.json'),
    backgroundColor: '#f1f3f6',
  },
  {
    key: '3',
    title: 'Interopérabilité',
    text: "Les inventaires peuvent être synchronisés avec l'application web ou bien exporté au format XML.",
    image: require('../../assets/animations/share3.json'),
    backgroundColor: '#f1f3f6',
  }
];

export default class IntroScreen extends React.Component {
  animation;
  _renderItem = ({ item }) => {
    return (
      <>
        <StatusBar backgroundColor="#f1f3f6" barStyle='dark-content'></StatusBar>
        <View style={{ backgroundColor: item.backgroundColor, height: "100%" }}>
          <LottieView source={item.image} style={{ width: 600, height: 500, alignSelf: "center", marginTop: 50 }} autoPlay loop={true} ref={animation => {
            this.animation = animation;
          }} />
          <Text style={styles.titleDark}>{item.title}</Text>
          <Text style={[styles.subtitle, { textAlign: 'center' }]}>{item.text}</Text>
        </View>
      </>
    );
  }
  _onDone = () => {
    AsyncStorage.setItem('@introDone', JSON.stringify(true))
    NavigationService.navigate('Login', {});
  }
  render() {
    return (
      <>
        <View style={{ zIndex: 40 }}>
          <Header title="Introduction"></Header>
        </View>

        <AppIntroSlider renderItem={this._renderItem} slides={slides} onDone={this._onDone} nextLabel="Suivant"
          dotStyle={{ backgroundColor: "#fff" }}
          activeDotStyle={{ backgroundColor: "#00d8a2" }}
          renderNextButton={() => <Icon name="chevron-right" size={24}></Icon>}
          renderDoneButton={() => <Icon name="check" size={24}></Icon>}
          buttonStyle={{ marginRight: 20 }} />
      </>
    );
  }
}