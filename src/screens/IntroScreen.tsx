import AsyncStorage from '@react-native-community/async-storage';
import LottieView from 'lottie-react-native';
import React from 'react';
import { StatusBar, Text, View, Image } from 'react-native';
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
    image: require('../../assets/images/aubergine.gif'),
    imageStyle: { width: 300, height: 400, alignSelf: "flex-end", marginRight: 20, marginTop: 50 },
    titleStyle: { marginTop: 50, marginLeft: 50, textAlign: "left", fontSize: 22 },
    descStyle: { textAlign: 'left', marginLeft: 50, fontSize:14, marginRight: 50 },
  },
  {
    key: '2',
    title: 'Compteur',
    text: "Afin de faciliter le comptage des kits, un compteur entièrement personnalisé a été mis en place. \n",
    image: require('../../assets/images/carotte.gif'),
    imageStyle: { width: 300, height: 400, alignSelf: "center", marginTop: 50 },
    titleStyle: { marginTop: 50, marginLeft: 50, textAlign: "left", fontSize: 22 },
    descStyle: { textAlign: 'left', marginLeft: 50, fontSize:14, marginRight: 50 },
    top: true
  },
  {
    key: '3',
    title: 'Interopérabilité',
    text: "Les inventaires peuvent être synchronisés avec l'application web ou bien exporté au format XML.",
    image: require('../../assets/images/fraise.gif'),
    imageStyle: { width: 300, height: 400, alignSelf: "flex-end", marginRight: 20, marginTop: 50 },
    titleStyle: { marginTop: 50, marginLeft: 50, textAlign: "left", fontSize: 22 },
    descStyle: { textAlign: 'left', marginLeft: 50, fontSize:14, marginRight: 50 },
  }
];

export default class IntroScreen extends React.Component {
  animation;
  _renderItem = ({ item }) => {
    return (
      <>
        <StatusBar backgroundColor="#fff" barStyle='dark-content'></StatusBar>
        <View style={{ backgroundColor: "#fff", height: "100%" }}>
          {item.top &&
            [
              <Text style={[styles.titleDark, item.titleStyle]}>{item.title}</Text>,
              <Text style={[styles.subtitle, item.descStyle]}>{item.text}</Text>
            ]}
          <Image source={item.image} style={item.imageStyle} />
          {!item.top &&
            [
              <Text style={[styles.titleDark, item.titleStyle]}>{item.title}</Text>,
              <Text style={[styles.subtitle, item.descStyle]}>{item.text}</Text>
            ]}
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
        <AppIntroSlider renderItem={this._renderItem} slides={slides} onDone={this._onDone} nextLabel="Suivant"
          dotStyle={{ backgroundColor: "#f0f0fa" }}
          activeDotStyle={{ backgroundColor: "#7f7fb8" }}
          renderNextButton={() => <Icon name="chevron-right" size={24}></Icon>}
          renderDoneButton={() => <Icon name="check" size={24}></Icon>}
          buttonStyle={{ marginRight: 20 }} />
      </>
    );
  }
}