import React, { Component } from 'react';
import { Alert, StyleSheet, View, RefreshControl } from 'react-native';
import { Card, colors, Input } from 'react-native-elements';
import { Button, Modal, Portal, Text } from "react-native-paper";
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import Header from '../components/Header';
import Item from '../core/models/Item';
import Order from '../core/models/Order';
import BookingService from '../core/services/BookingService';
import ProductService from '../core/services/ProductService';
import { ScrollView } from 'react-native-gesture-handler';
import theme from '../theme';
import Booking from '../core/models/Booking';


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
      booking: null,
      visible: false,
      itemChanged: null
    }
  }
  async componentDidMount() {
    let booking = await BookingService.getCurrentPorcessedBooking();
    this.setState({ booking: booking.data as Booking })
  }

  _hideModal() { this.setState({ visible: false }) }
  _showModal() { this.setState({ visible: true }) }

  alertComplete(item: Item, productQuantity) {
    Alert.alert(`Confirmer la quantité`, `Quantité délivrée : ${productQuantity}`,
      [
        {
          text: "Annuler",
          style: "cancel"
        },
        {
          text: "Confirmer",
          onPress: () => {
            ProductService.editDeliveredQuantity(this.state.booking.order, item, productQuantity).then(async () => {
              let booking = await BookingService.getCurrentPorcessedBooking();
              this.setState({ booking: booking.data as Booking })
            })
          }
        },
      ])
  }


  render() {
    if (this.state.booking != null) {
      return (
        <View>
          <Portal>
            <Modal contentContainerStyle={commandeStyles.modal} visible={this.state.visible} onDismiss={() => { this._hideModal() }}>
              <View>
                <Text style={commandeStyles.title}>Modifier la quantité donnée</Text>
                <View>
                  <Input keyboardType={'decimal-pad'} label="Nouvelle quantité" inputStyle={commandeStyles.inputs} value={this.state.newQuantity} labelStyle={{ fontWeight: "normal", fontFamily: "ProductSansRegular" }} containerStyle={{ marginTop: 35 }}
                    onChangeText={newQuantity => this.setState({ newQuantity })}></Input>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Button labelStyle={{ fontSize: 18 }}
                    onPress={() => {
                      this.alertComplete(this.state.itemChanged, this.state.newQuantity);
                      this._hideModal();
                    }}>Ok</Button>
                </View>
              </View>
            </Modal>
          </Portal>
          <Header title={`Commande #${this.state.booking.id}`}></Header>
          <ScrollView>

            {this.state.booking.order.items.map((item: Item, key: number) => {
              return (
                <Card containerStyle={commandeStyles.card} key={key} >
                  <View >
                    <Text>Produit : {item.product.category != undefined ? item.product.category.libelle : null} {item.product.libelle}</Text>
                    <Text>Quantité demandée : {item.quantity}</Text>
                    {item.delivered_quantity != null ? (<Text>Quantité réelle donnée {item.delivered_quantity}</Text>) : null}
                  </View>
                  {item.delivered_quantity == null &&
                    <View style={{ flexDirection: "row", justifyContent: 'flex-end' }} >
                      <Button color={colors.secondary} onPress={() => { this._showModal(); this.setState({ itemChanged: item }) }}>Non complet</Button>
                      <Button onPress={() => { this.alertComplete(item, item.quantity) }} >Ok</Button>
                    </View>
                  }
                </Card>
              )
            })}
          </ScrollView>
        </View>
      );
    } else {
      return (
        <>
          <Header title="Commande Screen"></Header>
          <ScrollView>
            <View style={{ flex: 1 }}>
              <Text> Veuillez choisir une commande à traiter</Text>
            </View>
          </ScrollView>
        </>
      )
    }
  }
}
const commandeStyles = StyleSheet.create({
  card: {
    borderColor: 'transparent',
    borderBottomColor: theme.colors.primary,
    elevation: 0,
    shadowColor: 'rgba(0,0,0, .2)',
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0, //default is 1
    shadowRadius: 0//default is 1
  },
  title: {
    fontSize: 20
  },
  modal: {
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 15,
  },
  inputs: {
    marginVertical: 0,
    marginHorizontal: 10,
    backgroundColor: '#fff',
    borderColor: '#00d8a2'
  },
})
