import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import QuoteList from './QuoteList'

export default function App() {
  return (
    <View style={styles.container}>
      <QuoteList></QuoteList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
