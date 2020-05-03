import React, { Component } from 'react';
import { StyleSheet, View, StatusBar, Image } from 'react-native';
import { Card, Input, colors, Text } from 'react-native-elements';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import UserService from '../core/services/UserService';
import theme from '../theme';

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
          <StatusBar backgroundColor={theme.colors.primary} barStyle='light-content'></StatusBar>
          <View style={styles.headerView} >
            <Image source={require('../../assets/logo.png')} style={{ width: 80, height: 80, alignSelf: "center" }} />
          </View>
          <View style={{ marginTop: -20 }}>

            <Card containerStyle={{ borderColor: 'transparent', elevation: 0, margin: -1, borderTopLeftRadius: 25, borderTopRightRadius: 25 }}>
              <Text style={styles.title}>Connexion</Text>
              <Input label="Adresse email" keyboardType={'email-address'} inputStyle={styles.inputs} value={this.state.email} labelStyle={{ fontWeight: "normal", fontFamily: "ProductSansRegular" }} containerStyle={{ marginVertical: 10 }}
                onChangeText={email => this.setState({ email })}
                leftIcon={<Icon name='mail' size={24} color='grey' style={{ marginLeft: -15 }} />}></Input>

              <Input label="Mot de passe" secureTextEntry={true} style={styles.inputs} value={this.state.password} labelStyle={{ fontWeight: "normal", fontFamily: "ProductSansRegular" }} containerStyle={{ marginVertical: 10 }}
                onChangeText={password => this.setState({ password })}
                leftIcon={<Icon name='lock' size={24} color='grey' style={{ marginLeft: -15 }} />} blurOnSubmit={false} onSubmitEditing={() => this.submitForm()}></Input>

              <Text style={{ marginTop: 20, textAlign: "right", color: theme.colors.accent, fontFamily: "ProductSansRegular" }}>Mot de passe oublié ?</Text>
            </Card>
          </View>
        </View>
        <Button color={theme.colors.primary} mode="contained" style={styles.confirmButton} labelStyle={{ fontFamily: "ProductSansBold" }} onPress={() => this.submitForm()} >Connexion</Button>
      </>
    )
  }

}

const styles = StyleSheet.create({
  headerView: {
    backgroundColor: theme.colors.primary,
    height: 100,
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
    width: '80%',
    height: 45,
    borderRadius: 30,
    alignSelf: "center",
    marginTop: 50
  }
});