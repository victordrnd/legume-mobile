import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, Image } from 'react-native';
import { Button, Card, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import UserService from '../core/services/UserService';
interface NavigationParams {
  my_param: string;
}

type Navigation = NavigationScreenProp<NavigationState, NavigationParams>;

interface Props {
  navigation: Navigation;
}

export class LoginScreen extends Component<Props> {

  state = {
    email: '',
    password: ''
  }



  async submitForm() {
    if (this.state.email && this.state.password) {
      await UserService.login(this.state, async (res) => {
        await UserService.setAuth(res);
        this.props.navigation.navigate('Home');
      },
        (error) => {
          alert('Identifiants incorrects')
        });
    } else {
      alert('Certain champs ne sont pas remplis correctement.')
    }
  }


  render() {
    return (
      <>
        <View>
          <StatusBar backgroundColor='#00d8a2' barStyle='light-content'></StatusBar>
          <View style={styles.headerView} >
            <Image source={require('../../assets/logo.png')} style={{ width: 80, height: 80, alignSelf: "center", marginTop: 20, paddingBottom: 20 }} />
            <View>
              <View style={{ width: "50%", position: "absolute", top: 15 }}>
                <Text style={styles.switch1}>Connexion</Text>
              </View>
              <View style={{ width: "50%", position: "absolute", left: "50%", top: 15 }}>
                <Text style={styles.switch2} onPress={() => this.props.navigation.navigate('Register')}>Inscription</Text>
              </View>
            </View>
          </View>
          <View style={{ marginTop: -35 }}>

            <Card containerStyle={{ borderColor: 'transparent', elevation: 0, margin: -1, borderTopLeftRadius: 25, borderTopRightRadius: 25 }}>
              <Text style={styles.title}>Connexion</Text>
              <Input label="Adresse email" keyboardType={'email-address'} inputStyle={styles.inputs} value={this.state.email} labelStyle={{ fontWeight: "normal", fontFamily: "ProductSansRegular" }} containerStyle={{ marginVertical: 10 }}
                onChangeText={email => this.setState({ email })}
                leftIcon={<Icon name='mail' size={24} color='grey' style={{ marginLeft: -15 }} />}></Input>

              <Input label="Mot de passe" secureTextEntry={true} style={styles.inputs} value={this.state.password} labelStyle={{ fontWeight: "normal", fontFamily: "ProductSansRegular" }} containerStyle={{ marginVertical: 10 }}
                onChangeText={password => this.setState({ password })}
                leftIcon={<Icon name='lock' size={24} color='grey' style={{ marginLeft: -15 }} />} blurOnSubmit={false} onSubmitEditing={() => this.submitForm()}></Input>

              <Text style={{ marginTop: 20, textAlign: "right", color: '#00d8a2', fontFamily: "ProductSansRegular" }}>Mot de passe oublié ?</Text>
            </Card>
          </View>
        </View>
        <Button title="Connexion" buttonStyle={styles.confirmButton} titleStyle={{ fontFamily: "ProductSansBold" }} onPress={() => this.submitForm()} />
      </>
    )
  }

}


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
    fontStyle: 'italic',
    fontSize: 12
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
  inputs: {
    marginVertical: 0,
    marginHorizontal: 10,
    backgroundColor: '#fff',
    borderColor: '#00d8a2'
  },
  confirmButton: {
    backgroundColor: '#00d8a2',
    width: '80%',
    height: 45,
    borderRadius: 30,
    alignSelf: "center",
    marginTop: 50
  }
});