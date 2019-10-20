import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import ToDoList from './src/components/ToDoList';
import reducers from './src/reducers';

const AppNavigator = createStackNavigator({
  Home: {
    screen: ToDoList,
  },
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render () {

    const store = createStore(reducers);
    
    return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
    );
  }
}

