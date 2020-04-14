import React from 'react';
import { Dimensions, StyleSheet, Text, View, ViewPagerAndroid } from 'react-native';
// import Image from 'react-native-scalable-image';
import Swiper from 'react-native-swiper';
import Quote from './Quote'
// import { GetSeenArticlesIds, StoreAsSeenArticleId } from './Helpers/ArticlesStorage.js';

export default class QuoteList extends React.Component {
  constructor(props: any) {
    super(props);
  }
  render() {
    return (
      <Swiper showsPagination={true}>
        <Quote></Quote>
        <Quote></Quote>
        <Quote></Quote>
        <Quote></Quote>
        <Quote></Quote>
      </Swiper>
    );
  }
}