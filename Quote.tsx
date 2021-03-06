import React from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';
import { IQuote } from './data/quote';

export interface Props {
  quote: IQuote;
  showLoadMoreButton: boolean;
  onShowLoadMoreClick: any;
}

export default class Quote extends React.Component<Props> {
  constructor(props: any) {
    super(props);
  }

  render() {
    let fontSize = 0, lineHeight = 0;
    const length = this.props.quote.text.length;
    if (length < 120) {
      fontSize = 32;
      lineHeight = 44;
    }
    else if (length < 200) {
      fontSize = 24;
      lineHeight = 34;
    }
    else if (length < 300) {
      fontSize = 22;
      lineHeight = 29;
    }
    else if (length < 550) {
      fontSize = 18;
      lineHeight = 24;
    }
    else {
      fontSize = 16;
      lineHeight = 22;
    }

    let author = this.props.quote.author;
    if (!author)
      author = "Author unknown";

    return (
      <View>
        <Image style={styles.image}
          source={{ uri: this.props.quote.background.uri }} blurRadius={0} />

        <View style={styles.darkener}></View>
        <View style={styles.quoteWrapper}>
          <Text style={[styles.quote, { fontSize: fontSize, lineHeight: lineHeight }]}>{this.props.quote.text}</Text>
          <Text style={styles.author}>- {author}</Text>
          {/* <Text style={styles.quoteAttribution}>{this.props.quote.attribution}</Text> */}

          <Text style={styles.backgroundAttribution}>{this.props.quote.background.attribution}</Text>
        </View>

        {(() => {
            if (this.props.showLoadMoreButton) {
              return (<View style={styles.loadMoreContainer}>
                <TouchableOpacity onPress={this.props.onShowLoadMoreClick} style={styles.loadMoreButton}>
                  <Image source={require('./assets/refresh.png')} style={styles.loadMoreIcon} />
                  <Text style={styles.loadMoreText}>Load some more</Text>
              </TouchableOpacity>
              </View>)
            }
          })()}
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
    margin: 14,
  },
  quote: {
    color: '#ffffff',
    margin: 10,
    textAlign: "center",
    opacity: 0.9,
    fontWeight: 'bold'
  },
  author: {
    marginTop: 6,
    color: '#ffffff',
    textAlign: "center",
    fontSize: 12,
    opacity: 0.9
  },
  quoteAttribution: {
    color: '#ffffff',
    marginTop: 14,
    opacity: 0.6,
    textAlign: "center",
    fontSize: 12,
  },
  backgroundAttribution: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    color: '#ffffff',
    opacity: 0.7,
    textAlign: "right",
    fontSize: 12
  },
  loadMoreContainer: {
    position: 'absolute',
    bottom: 80,
    width: '100%',
    alignItems: 'center',
    opacity: 0.7,
  },
  loadMoreButton: {
    alignItems: 'center',
  },
  loadMoreIcon: {
    height: 60,
    width: 60,
  },
  loadMoreText: {
    marginTop: 10,
    color: '#FFFFFF'
  }
});