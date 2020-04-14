import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';

export interface Props {
  text: string;
  author: string;
  backgroundUri?: string;
}

export default class Quote extends React.Component<Props> {
  constructor(props: any) {
    super(props);
  }
  render() {
    return (
      <View>
        <Image style={styles.image}
          source={{ uri: this.props.backgroundUri }} />
        <View style={styles.darkener}></View>
        <View style={styles.quoteWrapper}>
          <Text style={styles.quote}>{this.props.text}</Text>
          <Text style={styles.author}>{this.props.author}</Text>
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
    opacity: 0.55,
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