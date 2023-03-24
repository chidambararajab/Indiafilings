import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Tab} from './components';

const App = () => {
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <View>
      <Tab />
    </View>
  );
};

const styles = StyleSheet.create({});

export default App;
