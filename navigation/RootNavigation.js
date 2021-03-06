import { Notifications } from 'expo';
import React from 'react';
import { Animated } from 'react-native';
import { StackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import VideoScreen from '../components/video/VideoScreen';
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';
import theme from '../components/style/Theme';
import ProfileScreen from '../screens/ProfileScreen';

const RootStackNavigator = StackNavigator(
  {
    Main: {
      screen: MainTabNavigator,
        navigationOptions: () => ({
          headerTitleStyle: {
            fontWeight: 'normal',
          },
          headerStyle: {
            height: 0, // sets new height for the Header
          }
        }),
    },
    ProfileScreen: {
      screen: ProfileScreen,
        navigationOptions: () => ({
          headerTitleStyle: {
            fontWeight: 'normal',
          },
        }),
    },
  },
);

export default class RootNavigator extends React.Component {

  componentDidMount() {
    this._notificationSubscription = this._registerForPushNotifications();
  }

  componentWillUnmount() {
    this._notificationSubscription && this._notificationSubscription.remove();
  }

  render() {
    return (
      <RootStackNavigator> </RootStackNavigator>
    );
  }

  _registerForPushNotifications() {
    // Send our push token over to our backend so we can receive notifications
    // You can comment the following line out if you want to stop receiving
    // a notification every time you open the app. Check out the source
    // for this function in api/registerForPushNotificationsAsync.js
    registerForPushNotificationsAsync();

    // Watch for incoming notifications
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = ({ origin, data }) => {
    console.log(`Push notification ${origin} with data: ${JSON.stringify(data)}`);
  };
}
