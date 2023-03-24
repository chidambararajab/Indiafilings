import React from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {Tab} from './components';
import {colors} from './utils';

const App = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
      <Tab />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.white},
});

export default App;
