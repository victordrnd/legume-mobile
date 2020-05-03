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
      .then((data) => {this.setState({ bookings: data }); console.log(data)})
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
                <Card containerStyle={commandesStyles.card} title={"Commande #" + book.id}>
                  <Text>Pour le {book.schedule}</Text>
                </Card>
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
    borderColor: 'transparent',
    borderBottomColor: theme.colors.primary,
    elevation:0,
    shadowColor: 'rgba(0,0,0, .2)',
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0, //default is 1
    shadowRadius: 0//default is 1
  }
})