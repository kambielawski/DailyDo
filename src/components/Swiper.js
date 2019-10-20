import React from 'react';
import {
  View,
  Image,
  Text,
  Dimensions,
  Animated,
  PanResponder,
} from 'react-native';
import { connect } from 'redux';

const width = Dimensions.get("window").width;

const Swiper = ({ item, dismissAction }) => {

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
      if (Math.abs(dx) >= 0.5 * width && Math.sign(dx) != -1) {
        dismissAction(item);
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
        ...styles.bar
      }}
      {...panResponder.panHandlers}
    >
      <Text style={styles.name}>{item}</Text>
    </Animated.View>
  );

}

mapStateToProps = state => { 
  const { ListReducer } = state;
  return ListReducer;
}

export default connect(mapStateToProps)(Swiper);