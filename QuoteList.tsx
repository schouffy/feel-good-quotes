import React from 'react';
import { Dimensions, StyleSheet, Text, View, ViewPagerAndroid } from 'react-native';
import Swiper from 'react-native-swiper';
import Quote from './Quote'
import { IQuote } from './data/quote'
import { DataProvider } from './data/dataProvider'

interface IProps {

}
interface IState {
  displayQuotes: IQuote[];
}

export default class QuoteList extends React.Component<IProps, IState> {

  dataProvider: DataProvider;

  constructor(props: any) {
    super(props);
    this.dataProvider = new DataProvider();

    this.state = { displayQuotes: this.dataProvider.allQuotes }
  }

  render() {
    const displayQuotes = this.state.displayQuotes.map((q: IQuote, key: number) => {
      return <Quote key={key} text={q.text} author={q.author} backgroundUri={this.dataProvider.getRandomBackground().uri}></Quote>
    });
    return (
      <Swiper showsPagination={false} loadMinimal={true} loadMinimalSize={2} loop={false}>
        {displayQuotes}
      </Swiper>
    );
  }
}