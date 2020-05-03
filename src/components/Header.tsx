import React, { PureComponent, Component } from 'react';
import { View, Text, Image, StatusBar, StyleSheet, Alert } from 'react-native';
import styles from '../../assets/styles/styles';
import Icon from 'react-native-vector-icons/Feather';
import UserService from '../core/services/UserService';
import NavigationService from '../core/services/NavigationService';




interface Props {
  title: string
  right?: React.ReactNode
  left?: React.ReactNode
}



export default class Header extends PureComponent<Props> {
  state = {
  }

  componentDidMount() {
  }

  _onPress() {
    Alert.alert(
      'Déconnexion',
      'Etes vous sûr de vouloir vous déconnecter ?',
      [
        {
          text: 'Annuler',
          onPress: () => { },
          style: 'cancel',
        },
        {
          text: 'OK', onPress: () => { UserService.purgeAuth(); NavigationService.navigate('Login', {}) }
        },
      ],
      { cancelable: false },
    );
  }


  render() {
    const { right, left } = this.props
    return (

      <View style={{paddingBottom:75}}>

        <View style={{ flex: 1, flexDirection: "column", justifyContent: "space-between" }}>

          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
              {left}
            </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.titleDark, { textAlign: "center", marginTop: 25 }]}>{this.props.title}</Text>
          </View>

            <View style={{ flex: 1 }}>
              {right ?
                right : <Icon name="log-out" size={20} color="#000" style={styles2.validate} onPress={() => this._onPress()}></Icon>}
            </View>

          </View>
        </View>
      </View>
    )
  }
}


const styles2 = StyleSheet.create({
  validate: {
    alignSelf: "flex-end",
    marginTop: 30,
    marginRight: 30,
    backgroundColor: "#f1f3f6",
    borderRadius: 20,
    padding: 7,
    elevation: 3
  },
  iconButton: {
    backgroundColor: "#f1f3f6",
    padding: 5,
    borderRadius: 20,
    elevation: 3
  }
})
