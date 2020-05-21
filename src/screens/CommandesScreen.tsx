import React, { Component } from 'react';
import { NavigationScreenProp, NavigationState, NavigationEvents } from 'react-navigation';
import { View, Text, StyleSheet, TouchableOpacity, Alert, RefreshControl, Image } from 'react-native';
import Header from '../components/Header';
import NavigationService from "../core/services/NavigationService";
import BookingService from "../core/services/BookingService";
import Booking from '../core/models/Booking';
import { ScrollView } from 'react-native-gesture-handler';
import theme from '../theme';
import { Snackbar, Avatar, List, Badge } from 'react-native-paper';
import moment from "moment";
import AsyncStorage from '@react-native-community/async-storage';


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
    this.loadLocale()
  }
  state = {
    bookings: [],
    page: 1,
    refreshing: false,
    _snackBarMessage: "",
    _snackbarVisible: false,
  }

  _swipeRefreshing() {
    this.setState({ refreshing: !this.state.refreshing });
  }

  async componentDidMount() {
    const bookings = await BookingService.getBookings();
    this.setState({ bookings: bookings });
  }

  _openBookingAlert(booking: Booking) {
    if (!(booking.status.slug == 'prepared' || booking.status.slug == 'preparation')) {
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

              BookingService.setCurrentBooking(booking).then(async (res) => {
                await AsyncStorage.setItem('currentBookingProcessedId', booking.id.toString());
                NavigationService.navigate('Booking', {});
              }).catch(err => {
                console.log(JSON.stringify(err.response.data.error))
                this.setState({ _snackBarMessage: err.response.data.error, _snackbarVisible: true })
              })
            },
            style: 'default'
          }
        ])
    }
  }

  async refreshList() {
    this._swipeRefreshing();
    BookingService.getBookings()
      .then((data) => this.setState({ bookings: data }))
      .then(() => { this._swipeRefreshing() });
  }

  render() {
    return (
      <>
        <View style={{ height: 80 }}>
          <View style={{ flex: 1, flexDirection: "column", justifyContent: "space-between", }}>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: "ProductSansBold", fontSize: 25, marginLeft: 15 }}>Commandes</Text>
                <Text style={{ fontFamily: "ProductSans", marginLeft: 15, color: theme.colors.primary, fontSize: 11, marginBottom: 10 }}>{moment().format("dddd D MMMM à HH:mm ")}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Image source={require("../../assets/logo2.gif")} style={{ height: 50, width: 50, alignSelf: "flex-end", marginRight: 30 }} />
              </View>
            </View>
          </View>
        </View>
        <NavigationEvents
          onDidFocus={() => this.refreshList()}
        />
        <ScrollView refreshControl={
          <RefreshControl refreshing={this.state.refreshing} onRefresh={() => { this.refreshList() }} />
        }
        >
          {this.state.bookings.map((book: Booking, key: number) => {
            return <List.Item
              key={book.id}
              title={`Commande de ${book.user.firstname} ${book.user.lastname}`}
              titleStyle={{ fontFamily: "ProductSansBold" }}
              description={`Pour le ${moment(book.schedule).format("dddd D MMM à HH:mm")}`}
              descriptionStyle={{ fontFamily: "ProductSans" }}
              left={props => <Avatar.Text size={35} labelStyle={{ color: "white", fontSize: 12, fontFamily: "ProductSansBold" }} style={{ margin: 10, backgroundColor: getStatusColor(book) }} label={book.id.toString()} />}
              right={props => <Badge visible={true} style={{ margin: 30, backgroundColor: getStatusColor(book) }} size={10}></Badge>}
              onPress={() => this._openBookingAlert(book)}
            />
          })}
        </ScrollView>
        <Snackbar visible={this.state._snackbarVisible} onDismiss={() => this.setState({ _snackbarVisible: false })}
          duration={1000} style={{ backgroundColor: theme.colors.error }}>
          {this.state._snackBarMessage}
        </Snackbar>
      </>
    )
  }

  loadLocale() {
    moment.locale('fr', {
      months: 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
      monthsShort: 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
      monthsParseExact: true,
      weekdays: 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
      weekdaysShort: 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
      weekdaysMin: 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
      weekdaysParseExact: true,
      longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY HH:mm',
        LLLL: 'dddd D MMMM YYYY HH:mm'
      },
      calendar: {
        sameDay: '[Aujourd’hui à] LT',
        nextDay: '[Demain à] LT',
        nextWeek: 'dddd [à] LT',
        lastDay: '[Hier à] LT',
        lastWeek: 'dddd [dernier à] LT',
        sameElse: 'L'
      },
      relativeTime: {
        future: 'dans %s',
        past: 'il y a %s',
        s: 'quelques secondes',
        m: 'une minute',
        mm: '%d minutes',
        h: 'une heure',
        hh: '%d heures',
        d: 'un jour',
        dd: '%d jours',
        M: 'un mois',
        MM: '%d mois',
        y: 'un an',
        yy: '%d ans'
      },
      dayOfMonthOrdinalParse: /\d{1,2}(er|e)/,
      ordinal: function (number) {
        return number + (number === 1 ? 'er' : 'e');
      },
      meridiemParse: /PD|MD/,
      isPM: function (input) {
        return input.charAt(0) === 'M';
      },

      meridiem: function (hours, minutes, isLower) {
        return hours < 12 ? 'PD' : 'MD';
      },
      week: {
        dow: 1, // Monday is the first day of the week.
        doy: 4  // Used to determine first week of the year.
      }
    });
  }
}

const getStatusColor = (book) => {
  switch (book.status.slug) {
    case 'preparation':
      return theme.colors.primary
      break;
    case 'confirmed':
      return "#b5b5b5"
      break;
    case 'prepared':
      return "#87d068"
  }

}