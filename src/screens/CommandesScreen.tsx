import React, { Component } from 'react';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import { View, Text, StyleSheet, TouchableOpacity, Alert, RefreshControl } from 'react-native';
import { Card } from "react-native-elements";
import Header from '../components/Header';
import NavigationService from "../core/services/NavigationService";
import BookingService from "../core/services/BookingService";
import Booking from '../core/models/Booking';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import theme from '../theme';


interface NavigationParams {
  my_param: string;
}

type Navigation = NavigationScreenProp<NavigationState, NavigationParams>;

interface Props {
  navigation: Navigation;
}

export class CommandesScreen extends Component<Props, any> {

  constructor(props) {
    super(props);
    this.state = {
      bookings: [],
      page: 1,
      refreshing: false
    }
  }

  _swipeRefreshing() {
    this.setState({ refreshing: !this.state.refreshing });
  }

  async componentDidMount() {
    this.setState({ bookings: await BookingService.getBookings(this.state.page) });
  }

  _openBookingAlert(booking: Booking) {
    Alert.alert('Commencer la commande',
      `Voulez-vous débuter la gestion de la commande #${booking.id} ?`,
      [
        {
          text: 'Annuler',
          style: 'cancel'
        },
        {
          text: 'Oui',
          onPress: () => {

            BookingService.setCurrentBooking(booking).then(() => {
              NavigationService.navigate('Booking', {});
            })
          },
          style: 'default'
        }
      ])
  }

  async refreshList() {
    this._swipeRefreshing();
    BookingService.getBookings(1)
      .then((data) => this.setState({ bookings: data }))
      .then(() => { this._swipeRefreshing() });
  }

  render() {
    return (
      <View>
        <Header title="Commandes Screen"></Header>
        <ScrollView refreshControl={
          <RefreshControl refreshing={this.state.refreshing} onRefresh={() => { this.refreshList() }} />
        }
        >
          {this.state.bookings.map((book: Booking, key: number) => {
            return book.order_id != null? (
              <TouchableOpacity key={key} onPress={() => { this._openBookingAlert(book) }}>
                <View style={commandesStyles.card} >
                  {/* Ajouter un icone sur le coté gauche */}
                  <Text style={{fontFamily : "ProductSansBold"}}>Commande {book.user.lastname.charAt(0).toUpperCase() + book.user.lastname.toLowerCase().slice(1)}</Text>
                  <Text style={{fontFamily : "ProductSansRegular"}}>Pour le {book.schedule}</Text>
                </View>
              </TouchableOpacity>
            ): null;
          })}
        </ScrollView>
      </View>
    )
  }

}
const commandesStyles = StyleSheet.create({
  card: {
    backgroundColor : "#fff",
    borderWidth : 0,
    borderRadius : 5,
    marginBottom : 5,
    height: 100,
    marginTop : 10,
    marginLeft:15,
    marginRight : 15,
    padding : 10,
    borderBottomWidth :1,
    borderBottomColor : theme.colors.accent
  }
})