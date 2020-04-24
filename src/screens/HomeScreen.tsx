import * as React from 'react';
import { Text } from 'react-native-elements';
import { StatusBar, View } from 'react-native';
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

        <StatusBar backgroundColor='#f1f3f6' barStyle='dark-content'></StatusBar>
        <Header
          title="Gestion des stocks"></Header>
        <View style={{ marginTop: 150 }}>

          <Text style={[styles.subtitle, { textAlign: "center" }]}>Plateforme de gestion des stocks Galaxy-Swiss Bourdin</Text>
          <LottieView source={require('../../assets/animations/office.json')} style={{ height: 340, alignSelf: "center" }} autoPlay loop={true} ref={animation => {
            this.animation = animation;
          }} />
        </View>

      </View>
    );
  }



}

