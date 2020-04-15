import React from 'react';
import QuoteList from './QuoteList'
import { StatusBar, View, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.app}>
      <QuoteList></QuoteList>
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    // paddingTop: StatusBar.currentHeight
  }
});
