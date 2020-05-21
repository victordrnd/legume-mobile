import React, { Component } from 'react';
import { StyleSheet, View, StatusBar, Image } from 'react-native';
import { Card, Input, colors, Text } from 'react-native-elements';
import { Button, Snackbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import UserService from '../core/services/UserService';
import theme from '../theme';
import NavigationService from '../core/services/NavigationService';

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
    password: '',
    _snackbarVisible: false,
    _snackbarText: "",
    _snackbarTheme: {},
  }



  async submitForm() {


    if (this.state.email && this.state.password) {
      UserService.login(this.state,
        () => {
          return (<Snackbar visible={true} onDismiss={() => { }}>Identifiants incorrects</Snackbar>);

        }).then((res) => {
          if (res) this.props.navigation.navigate('Home')
          else {
            this.state._snackbarText = "Mauvais identifiants";
            this.state._snackbarVisible = true;
            this.state._snackbarTheme = { backgroundColor: theme.colors.error };
          };
        });

    } else {
      this.setState({

        _snackbarText: "Veuillez remplir tous les champs",
        _snackbarVisible: true,
        _snackbarTheme: { backgroundColor: theme.colors.warning },
      });

    }
  }


  render() {
    return (
      <>
        <View>
          <StatusBar backgroundColor={theme.colors.primary} barStyle='dark-content'></StatusBar>
          <View style={styles.headerView} >
            <Image source={require('../../assets/logo2.gif')} style={{ width: 60, height: 60, alignSelf: "center" }} />
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
        <Button color={theme.colors.primary} mode="contained" style={styles.confirmButton} labelStyle={{ fontFamily: "ProductSansBold", marginTop: 10, color : 'white' }} onPress={() => this.submitForm()} >Connexion</Button>
        <Snackbar visible={this.state._snackbarVisible} duration={900} onDismiss={() => { this.setState({ _snackbarVisible: false }) }} style={[{ borderRadius: 100, justifyContent: "center", alignContent:"center" }, this.state._snackbarTheme]}>{this.state._snackbarText}</Snackbar>
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