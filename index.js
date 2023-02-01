/**
 * @format
 */

import {AppRegistry, LogBox, Platform} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import PushNotification from 'react-native-push-notification';

PushNotification.configure({
  onNotification: function (notification) {
    console.log('Notification: ', notification);
  },
  requestPermissions: Platform.OS === 'ios',
});
LogBox.ignoreAllLogs();
AppRegistry.registerComponent(appName, () => App);
