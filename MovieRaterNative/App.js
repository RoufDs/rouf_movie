import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import List from './components/List';
import Detail from './components/Detail';
import Edit from './components/Edit';
import Auth from './components/Auth';

const AppNavigator = createStackNavigator({
  Auth: {screen: Auth},
  MovieList: {screen: List},
  Detail: {screen: Detail},
  Edit: {screen: Edit},
})

const App = createAppContainer(AppNavigator)

export default App;