/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import InfoScreen from './src/screens/InfoScreen';
AppRegistry.registerComponent(appName, () => InfoScreen);
