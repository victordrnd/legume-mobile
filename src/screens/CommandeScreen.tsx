import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Card, colors } from 'react-native-elements';
import { Button, Modal, Portal, Text } from "react-native-paper";
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import Header from '../components/Header';
import Item from '../core/models/Item';
import Order from '../core/models/Order';
import OrderService from '../core/services/OrderService';
import ProductService from '../core/services/ProductService';



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
      order: null,
      visible: false
    }
  }

  async componentDidMount() {
    this.setState({ order: JSON.parse(await AsyncStorage.getItem('currentOrderProcessed')) as Order })
  }

  _specifyQuantityForItem(id: number, quantity: number) {
    console.log(id, quantity)
  }

  _hideModal() {
    this.setState({ visible: false })
  }
  _showModal() {
    this.setState({ visible: true })
  }

  alertComplete(itemId, productQuantity) {
    Alert.alert("Confirmer la quantité", `Quantité délivrée : ${productQuantity}`,
      [
        {
          text: "Annuler",
          style: "cancel"
        },
        {
          text: "Confirmer",
          onPress: () => { ProductService.editDeliveredQuantity(itemId, this.state.order, productQuantity) }
        },
      ])
  }
  render() {
    if (this.state.order != null) {
      return (
        <View>
          <Portal>
            <Modal visible={this.state.visible} onDismiss={() => { this._hideModal() }}>
              <Text>Example Modal</Text>
            </Modal>
          </Portal>

          <Header title="Commande Screen"></Header>
          <View>
            {this.state.order.items.map((item: Item) => {
              return (
                <Card containerStyle={commandeStyles.card}>
                  <View >
                    <Text>Produit : {item.product.libelle}</Text>
                    <Text>Quantité : {item.quantity}</Text>
                  </View>
                  {item.delivered_quantity == null &&
                    <View style={{ flexDirection: "row", justifyContent: 'flex-end' }} >
                      <Button color={colors.secondary} onPress={() => { }}>Non complet</Button>
                      <Button onPress={() => { this.alertComplete(item.id, item.quantity) }} >Ok</Button>
                    </View>
                  }
                </Card>
              )
            })}
          </View>
        </View>
      );
    } else {
      return (
        <View>
          <Header title="Commande Screen"></Header>
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
