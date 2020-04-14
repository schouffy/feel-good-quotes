import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';
// import Image from 'react-native-scalable-image';

export default class Quote extends React.Component {
  constructor(props: any) {
    super(props);
  }
  render() {

    return (
      <View>
        <Image style={styles.image}
          source={{ uri: 'https://www.freeimages.com/download/file/68c20c8051fa40166c784dbe4b2e7ffe/2048x1536' }} />
        <View style={styles.darkener}></View>
        <View style={styles.quoteWrapper}>
          <Text style={styles.quote}>Some inspirational quote</Text>
          <Text style={styles.author}>Albert Einstein</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    backgroundColor: '#9999ff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  darkener: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000000',
    opacity: 0.7,
  },
  quoteWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 1,
  },
  quote: {
    color: '#ffffff',
  },
  author: {
    color: '#ffffff',
  }
});