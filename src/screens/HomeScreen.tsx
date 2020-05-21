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
        <View style={{ marginTop: 20 }}>
          <Text style={[ { textAlign: "center"}, styles.subtitle]}>Plateforme de gestion de préparation des commandes de</Text>
          <Text style={[ { textAlign: "center"}, styles.subtitle]}>Rémyvouslivre.fr</Text>
          {/* <Image source={require("../../assets/logo2.gif")} style={{height:300, width:300, alignSelf : "center"}}/> */}
          <LottieView source={require('../../assets/animations/drag-drop.json')} style={{ height: 340, alignSelf: "center" }} autoPlay loop={true} ref={animation => {
                        this.animation = animation;
                    }} />
        </View>

      </View>
    );
  }



}

