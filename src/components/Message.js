import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {colors, deviceWidth} from '../utils';

const Message = ({message}) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      }}>
      <View
        style={{
          height: 300,
          width: deviceWidth * 0.8,
          backgroundColor: colors.black10,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: colors.black30,
        }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: colors.black30,
          }}>
          {message}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Message;
