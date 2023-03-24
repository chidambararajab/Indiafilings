import React, {useEffect} from 'react';
import {StyleSheet, StatusBar, LogBox, SafeAreaView} from 'react-native';
import {Tab} from './components';
import {colors} from './utils';

const App = () => {
  useEffect(() => {
    LogBox.ignoreAllLogs();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
      <Tab />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.white},
});

export default App;
