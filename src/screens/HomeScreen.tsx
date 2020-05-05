import * as React from 'react';
import { Text } from 'react-native-elements';
import { StatusBar, View, Image } from 'react-native';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import styles from '../../assets/styles/styles';
import LottieView from 'lottie-react-native';
import Header from '../components/Header';
interface NavigationParams {
}

type Navigation = NavigationScreenProp<NavigationState, NavigationParams>;

interface Props {
  navigation: Navigation;
}


export class HomeScreen extends React.Component<Props> {

  animation;

  render() {
    return (
      <View>

        <StatusBar backgroundColor='#fff' barStyle='dark-content'></StatusBar>
        <Header
          title="Accueil"></Header>
        <View style={{ marginTop: 150 }}>
          <Text style={[ { textAlign: "center"}, styles.subtitle]}>Plateforme de gestion des commandes de</Text>
          <Text style={[ { textAlign: "center"}, styles.subtitle]}>Rémy vous livre</Text>
          <Image source={require("../../assets/logo.gif")} style={{height:300, width:300, alignSelf : "center"}}/>
        </View>

      </View>
    );
  }



}

