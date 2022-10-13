import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import List from './components/List';
import Detail from './components/Detail';
import Edit from './components/Edit';

const AppNavigator = createStackNavigator({
  MovieList: {screen: List},
  Detail: {screen: Detail},
  Edit: {screen: Edit},
})

const App = createAppContainer(AppNavigator)

export default App;