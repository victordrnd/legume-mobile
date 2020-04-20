import * as React from 'react';
import { Text, Button } from 'react-native-elements';
import { StatusBar, View, StyleSheet, Image } from 'react-native';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import styles from '../../assets/styles/styles';
import Icon from 'react-native-vector-icons/Feather';
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
                    title="Bienvenue sur l'application de gestion des stocks FNAEG"></Header>
                {/* <Image source={require("../assets/logo-dark.png")} style={{width : 100, height : 100, alignSelf : "center"}}></Image>
                <Text style={styles.titleDark}>Bienvenue sur l'application de gestion des stocks FNAEG</Text> */}
                <View style={{marginTop: 150}}>

                    <Text style={[styles.subtitle, { textAlign: "center" }]}>Plateforme de gestion des stocks Galaxy-Swiss Bourdin</Text>
                    {/* <Image source={ require('../assets/note-yellow.png')} style={{width:240, height : 240, alignSelf : "center", marginTop : 100}}></Image> */}
                    <LottieView source={require('../../assets/animations/office.json')} style={{ height: 340, alignSelf: "center" }} autoPlay loop={true} ref={animation => {
                        this.animation = animation;
                    }} />
                    <Button title="Réaliser un nouvel inventaire" icon={<Icon name="arrow-right" color="#fff" size={18}></Icon>}
                        iconRight titleStyle={styles.buttonText} buttonStyle={[styles.button, { marginTop: 100 }]}
                        onPress={() => { this.props.navigation.navigate('Stock') }}></Button>
                </View>

            </View>
        );
    }



}

