import React, {useEffect} from 'react';
import {StyleSheet, StatusBar, LogBox, SafeAreaView} from 'react-native';
import {Provider} from 'react-redux';

import {Tab} from './components';
import {colors} from './utils';
import store from './redux';

const App = () => {
  useEffect(() => {
    LogBox.ignoreAllLogs();
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={colors.skyBlue} barStyle="light-content" />
        <Tab />
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.white},
});

export default App;
