import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TextInput,
  Dimensions,
  Animated,
  PanResponder,
  TouchableOpacity,
} from 'react-native';

import { UpdateTodo, DeleteTodo } from '../actions';
import { ThemeColors } from 'react-navigation';

const width = Dimensions.get("window").width;

class ToDoItem extends Component {

  state = {
    text: "",
    typeable: true,
    lastTap: 0,
  }

  onChangeText = (text, id) => {
    this.props.UpdateTodo(this.props.date, id, text);
    this.state.text = text;
  }

  handleDoubleTap = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (this.state.lastTap && (now-this.state.lastTap) < DOUBLE_PRESS_DELAY) {
      this.setState({typeable: true});
    } else {
      this.setState({lastTap: now});
    }
  }

  renderText = () => {
    return this.state.typeable ? <TextInput
          style={styles.textStyle}
          onChangeText={text => this.onChangeText(text, this.props.id)}
          value={this.state.text}
          textAlign={'center'}
          onEndEditing={()=>this.setState({typeable: false})}
          autoFocus
        /> : <Text style={styles.textStyle}>{this.state.text}</Text>;
  }

  render() {

    let translateX = new Animated.Value(0);
    let opacityValue = new Animated.Value(0);

    let cardOpacity = opacityValue.interpolate({
      inputRange: [0, 1],
      outputRange: [1, .5]
    });

    let panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gesture) => {
        Animated.event([null, { dx: translateX }])(e, gesture);
        Animated.timing(opacityValue, {
          toValue: 1,
          duration: 50,
          useNativeDriver: true
        }).start();
      },
      onPanResponderRelease: (e, { vx, dx }) => {
        if (dx === 0) {
          this.handleDoubleTap();
        }
        if (Math.abs(dx) >= 0.5 * width && Math.sign(dx) != -1) {
          this.props.DeleteTodo(this.props.date, this.props.id);
          Animated.timing(translateX, {
            toValue: dx > 0 ? width : -width,
            duration: 200,
            useNativeDriver: true
          }).start();
        } else {
          Animated.parallel([
            Animated.spring(translateX, {
              toValue: 0,
              bounciness: 20,
              useNativeDriver: true
            }),
            Animated.timing(opacityValue, {
              toValue: 0,
              duration: 5,
              useNativeDriver: true
            })
          ]).start();
        }
      }
    });

    return (
      <Animated.View
        style={{
          transform: [{ translateX }],
          opacity: cardOpacity,
          ...styles.outlineViewStyle,
        }}
        {...panResponder.panHandlers}
      >
        {this.renderText()}
      </Animated.View>
    );
  }
};

const mapStateToProps = state => {
  const { ListReducer } = state;

  return ListReducer;
}

export default connect(mapStateToProps, { UpdateTodo, DeleteTodo })(ToDoItem);

const styles = {
  outlineViewStyle: {
    backgroundColor: 'red',
    flex: 1,
    flexDirection: 'col',
    borderRadius: 10,
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
  },
  textStyle: {
    color: 'white',
    fontSize: 18,
    paddingTop: 12,
    paddingBottom: 12,
    height: 50,
    flex: 1,
    alignSelf: 'center'
  }
}