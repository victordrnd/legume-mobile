import React, { Component } from 'react';
import { Dimensions, Image, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import { RegisterForm } from '../components/Form/RegisterForm';
import GestureRecognizer from 'react-native-swipe-gestures';

interface NavigationParams {

}

type Navigation = NavigationScreenProp<NavigationState, NavigationParams>;

interface Props {
  navigation: Navigation;
}

export class RegisterScreen extends Component<Props> {

  onSwipeRight = () => {
    this.props.navigation.navigate('Login');
  }


  render() {
    return (
      <GestureRecognizer onSwipeRight={this.onSwipeRight}>
        <ScrollView>
          <StatusBar backgroundColor='#00d8a2' barStyle='light-content'></StatusBar>

          <View style={styles.headerView} >
            <Image source={require('../../assets/logo.png')} style={{ width: 80, height: 80, alignSelf: "center", marginTop: 20, paddingBottom: 20 }} />
            <View>
              <View style={{ width: "50%", position: "absolute", top: 15 }}>
                <Text style={styles.switch2} onPress={() => this.props.navigation.navigate('Login')}>Connexion</Text>
              </View>
              <View style={{ width: "50%", position: "absolute", left: "50%", top: 15 }}>
                <Text style={styles.switch1}>Inscription</Text>
              </View>
            </View>
          </View>
          <View style={styles.RegistrationForm}>
            <RegisterForm></RegisterForm>
          </View>
        </ScrollView>
      </GestureRecognizer>
    )
  }

}

let ScreenHeight = Dimensions.get("window").height - 100;

const styles = StyleSheet.create({
  headerView: {
    backgroundColor: '#00d8a2',
    height: 200,
    padding: 10,
  },
  title: {
    color: '#000',
    fontSize: 28,
    margin: 20,
    fontFamily: "ProductSansBold"
  },
  subtitle: {
    color: '#fff',
    fontSize: 12,
    fontFamily: "ProductSansItalic"
  },
  label: {
    marginLeft: 10,
    fontSize: 16,
    marginTop: 20,
    color: 'grey',

  },
  switch1: {
    color: '#fff',
    fontSize: 20,
    textAlign: "center",
    fontFamily: "ProductSansBold"
  },
  switch2: {
    color: '#fff',
    fontSize: 20,
    textAlign: "center",
    opacity: 0.5,
    fontFamily: "ProductSansBold"
  },
  RegistrationForm: {
    height: ScreenHeight
  }
});