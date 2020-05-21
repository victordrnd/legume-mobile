import React, { Component } from 'react';
import { Alert, StyleSheet, View, RefreshControl } from 'react-native';
import { Button, Portal, Text, List, Badge, Avatar, Chip, Dialog, Paragraph } from "react-native-paper";
import { NavigationScreenProp, NavigationState, NavigationEvents } from 'react-navigation';
import Header from '../components/Header';
import Item from '../core/models/Item';
import BookingService from '../core/services/BookingService';
import OrderService from '../core/services/OrderService';
import { ScrollView } from 'react-native-gesture-handler';
import theme from '../theme';
import Booking from '../core/models/Booking';
import NumericInput from 'react-native-numeric-input'
import Icon from 'react-native-vector-icons/Feather';
import NavigationService from '../core/services/NavigationService';
import AsyncStorage from '@react-native-community/async-storage';
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
      itemChanged: {
        quantity: 0
      },
      key: 0
    }
  }
  componentDidMount() {
    this.setBooking();
  }

  async setBooking() {
    let booking = await BookingService.getCurrentPorcessedBooking();
    this.setState({ booking: booking.data as Booking })

  }
  _hideModal() { this.setState({ visible: false }) }
  _showModal(key) { this.setState({ visible: true, itemChanged: { ...this.state.booking.order.items[key], delivered_quantity: this.state.booking.order.items[key].quantity }, key: key }) }

  onComplete() {
    OrderService.editDeliveredQuantity(this.state.booking.order, this.state.booking.order.items).then(async () => {
      NavigationService.navigate('Bookings', {});
      AsyncStorage.removeItem('currentBookingProcessedId');
      this.setState({booking : null});
    }).catch(err => Alert.alert("Erreur", err.result))
  }


  render() {
    if (this.state.booking != null) {
      return (
        <View>
          <Portal>
            <Dialog
              visible={this.state.visible}
              onDismiss={() => this.setState({ visible: false })}>
              <Dialog.Content>
                <Text style={{ fontFamily: "ProductSansBold" }}>Quantité livrée :</Text>
                <Paragraph>{this.state.itemChanged.libelle} - {this.state.booking.order.items[this.state.key].product.unit}</Paragraph>
                <View style={{ alignItems: "center",marginBottom : 50, marginTop:50 }}>
                  <NumericInput type='plus-minus' rounded={true} separatorWidth={0} totalWidth={150} valueType='real' value={this.state.itemChanged.delivered_quantity} onChange={value => this.setState({ itemChanged: { ...this.state.itemChanged, delivered_quantity: value } })} maxValue={10} minValue={0} />
                </View>
                <Button mode="contained"  labelStyle={{ color: "white" }} onPress={() => {
                  this.state.booking.order.items[this.state.key] = this.state.itemChanged;
                  this.setState({ bookings: this.state.booking, visible: false });
                }}>Confirmer</Button>
              </Dialog.Content>
            </Dialog>
          </Portal>
          <View style={{ height: 50, marginTop: 40 }}>
            <View style={{ flex: 1, flexDirection: "column", justifyContent: "space-between", }}>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontFamily: "ProductSansBold", fontSize: 25, marginLeft: 15 }}>En préparation</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Chip style={{ width: 150, alignSelf: 'flex-end', marginRight: 20 }}>Commande #{this.state.booking.id}</Chip>
                </View>
              </View>
            </View>
          </View>
          {/* <NavigationEvents
            onDidFocus={() => this.setBooking()}
          /> */}
          <ScrollView>

            {this.state.booking.order.items.map((item: Item, key: number) => {
              return (
                <List.Item
                  key={key}
                  left={() => <Avatar.Text size={35} labelStyle={{ color: 'white', fontSize: 12 }} style={{ backgroundColor: theme.colors.primary, margin: 10 }} label={'x' + item.quantity}></Avatar.Text>}
                  right={() => <Button mode="contained" style={commandeStyles.addToBagButton} onPress={() => console.log('Pressed')}><Icon name={item.delivered_quantity != null ? "check-circle" : "shopping-bag"} color="white" size={15}></Icon> </Button>}
                  title={item.product.libelle}
                  titleStyle={{ fontFamily: "ProductSansBold" }}
                  description={'Catégorie : ' + (item.product.category != undefined ? item.product.category.libelle : 'Panier') + ' | Livré : ' + (item.delivered_quantity || 0)}
                  onPress={() => this._showModal(key)}
                ></List.Item>
              )
            })}
          </ScrollView>
          <Button labelStyle={{ color: "white" }} style={{ margin: 15 }} mode="contained" onPress={() => this.onComplete()} disabled={!this.state.booking.order.items.every(checkDeliveredQuantity)}>
            Terminer la préparation
          </Button>
        </View>
      );
    } else {
      return (
        <>
          <Header title="Commande Screen"></Header>
          <ScrollView>
            <View style={{ flex: 1 }}>
              <Text style={{ textAlign: "center" }}> Veuillez choisir une commande à traiter</Text>
              <Button labelStyle={{ color: "white" }} style={{ margin: 15 }} mode="contained" onPress={() => this.setBooking()}>
                Refresh
          </Button>
            </View>
          </ScrollView>
        </>
      )
    }
  }
}

const checkDeliveredQuantity = (items) => items.delivered_quantity != null
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
  addToBagButton: {
    width: 40,
    height: 40,
    textAlign: "center",
  }
})
