import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, FlatList, ScrollView } from 'react-native';

import NewToDoButton from './NewToDoButton';
import ToDoItem from './ToDoItem';
import { NewTodo } from '../actions';

class ToDoList extends Component {

  static navigationOptions = {
    header: null,
  }

  // returns list of days, each of which will be rendered by render()
  getDates = daysToRender => {
    const dateArray = new Array();
    let day = new Date(Date.now());
    let i = 0;
    while(i < daysToRender) {
      dateArray.push({"day": day.toDateString(), 
                      "id": Date.now()});
      day.setDate(day.getDate() + 1);
      i++;
    }
    return dateArray;
  }

  addTodoItem = date => {
    this.props.NewTodo("boob", date);
  }

  renderTodoItems = date => {
    if(this.props[date]) {
      return(
        <FlatList 
          data = {this.props[date]}
          renderItem = {({ item, index }) => <ToDoItem date={date} text={item} id={index} />}
          keyExtractor = {(item, index) => index.toString()}
        />
      );
    }
    return null;
    //GOAL
    //return <ToDoItem date={date} />;
  }

  renderDay = date => {
    const isToday = date == new Date(Date.now()).toDateString();
    return(
      <View>
        <Text style={{...styles.dateTextStyle, fontSize: isToday ? 40 : 32 }}>{ isToday ? "Today" : date.substring(0, date.length - 4) }</Text>
        { this.renderTodoItems(date) }
        <View style={{flex: 1, alignItems: "center"}}>
          <NewToDoButton onPress={()=>this.props.NewTodo("", date)} color={"red"} />
        </View>
      </View>
    );
  }

  render () {
    return (
    <View styles={styles.listContainerStyle}>
      <ScrollView 
        keyboardDismissMode='on-drag'
        style={{backgroundColor: '#002552', paddingTop: 75}}
      >
        <FlatList 
          data = {this.getDates(10)}
          renderItem = {({ item }) => this.renderDay(item.day)}
          keyExtractor = {(item, index) => index.toString()}
        />
      </ScrollView>
    </View>
    );
  }
}

const styles = {
  listContainerStyle: {
    flex: 1,
    backgroundColor: '#002552',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateTextStyle: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    paddingLeft: 10
  }
};

const mapStateToProps = state => {
  const { ListReducer } = state;
  return ListReducer;
}

export default connect(mapStateToProps, { NewTodo })(ToDoList);