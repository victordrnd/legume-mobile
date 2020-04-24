import React, { Component } from 'react';
import { NavigationScreenProp, NavigationState, } from 'react-navigation';
import { View, StyleSheet, Alert } from 'react-native';
import { Button, Text, Modal } from "react-native-paper";
import { Card, colors } from 'react-native-elements';
import Header from '../components/Header';
import Booking from '../core/models/Booking';
import AsyncStorage from '@react-native-community/async-storage';
import Item from '../core/models/Item';



interface NavigationParams {
  my_param: string;
}

type Navigation = NavigationScreenProp<NavigationState, NavigationParams>;

interface Props {
  navigation: Navigation;
}

export class CommandeScreen extends Component<Props, any> {
  constructor(props) {
    super(props);
    this.state = {
      booking: null
    }
  }

  async componentDidMount() {
    this.setState({ booking: JSON.parse(await AsyncStorage.getItem('currentBookingProcessed')) as Booking })
  }

  _specifyQuantityForItem(id: number, quantity: number) {
    console.log(id, quantity)
  }

  alertNotComplet(itemId, productQuantity) { }
  render() {
    if (this.state.booking != null) {
      return (
        <View>
          <Header title="Commandes Screen"></Header>
          <View>
            {this.state.booking.order.items.map((item: Item) => {
              return (
                <Card containerStyle={commandeStyles.card}>
                  <View >
                    <Text>Produit: {item.product.libelle}</Text>
                    <Text>Quantité : {item.quantity}</Text>
                  </View>
                  <View style={{ flexDirection: "row", justifyContent: 'flex-end' }} >
                    <Button color={colors.secondary} onPress={() => { }}>Non complet</Button>
                    <Button onPress={() => { this.alertNotComplet(item.id, item.quantity) }} >Ok</Button>
                  </View>
                </Card>
              )
            })}
          </View>
        </View>
      );
    } else {
      return (
        <View>
          <Header title="CommandeScreen"></Header>
          <Text> Veuillez choisir une commande à traiter</Text>
        </View>
      )
    }
  }
}
const commandeStyles = StyleSheet.create({
  card: {
    borderRadius: 15
  }
})
