import React, { Component } from 'react';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Card, ThemeConsumer } from "react-native-elements";
import Header from '../components/Header';
import NavigationService from "../core/services/NavigationService";
import BookingService from "../core/services/BookingService";
import Booking from '../core/models/Booking';


interface NavigationParams {
  my_param: string;
}

type Navigation = NavigationScreenProp<NavigationState, NavigationParams>;

interface Props {
  navigation: Navigation;
}

export class CommandesScreen extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
      bookings: []
    }
  }

  async componentDidMount() {
    this.setState({ bookings: await BookingService.getBookings() });
  }

  _openBookingAlert(id) {
    Alert.alert('Commencer la commande',
      `Voulez-vous débuter la gestion de la commande #${id} ?`,
      [
        {
          text: 'Annuler',
          style: 'cancel'
        },
        {
          text: 'Oui',
          onPress: () => { 
            BookingService.setCurrentBookingProcessed(id).then(()=> {
              NavigationService.navigate('Booking', {});
            })
           },
          style: 'default'
        }
      ])
  }

  render() {
    return (
      <View>
        <Header title="Commandes Screen"></Header>
        {this.state['bookings'].map((book: Booking, key: any) => {
          return (
            <View>
              <TouchableOpacity key={key} onPress={() => { this._openBookingAlert(book.id) }}>
                <Card containerStyle={commandesStyles.card} title={"Commande #"+book.id}>
                  <Text>Pour {book.schedule}</Text>
                </Card>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    )
  }

}
const commandesStyles = StyleSheet.create({
  card: {
    borderRadius: 15
  }
})