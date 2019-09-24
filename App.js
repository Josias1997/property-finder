/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import SearchPage from './screens/SearchPage';
import SearchResults from './screens/SearchResults';


const App = createStackNavigator({
  Home: {
    screen: SearchPage,
  },
  Results: {
    screen: SearchResults,
  },
});


export default createAppContainer(App);