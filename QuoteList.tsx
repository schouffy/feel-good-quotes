import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
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
  currentPageIndex: number;
  swiper: any;

  constructor(props: any) {
    super(props);
    this.dataProvider = new DataProvider();
    this.currentPageIndex = 0;
    this.state = { displayQuotes: [] }

    this.onIndexChanged = this.onIndexChanged.bind(this);
    this.setCurrentQuoteSeen = this.setCurrentQuoteSeen.bind(this);
    this.loadMoreQuotes = this.loadMoreQuotes.bind(this);
  }

  async componentDidMount() {
    this.setState({ displayQuotes: await this.dataProvider.getSomeQuotes() });
    await this.setCurrentQuoteSeen();
  }

  async onIndexChanged(index: number) {
    this.currentPageIndex = index;
    await this.setCurrentQuoteSeen();
  }

  async setCurrentQuoteSeen() {
    await this.dataProvider.setQuoteSeen(this.state.displayQuotes[this.currentPageIndex]);
  }

  async loadMoreQuotes(event: MouseEvent) {
    const newQuotes = await this.dataProvider.getSomeQuotes();
    this.swiper.scrollBy(-this.currentPageIndex, false);
    this.currentPageIndex = 0;
    this.setState({ displayQuotes: newQuotes });
  }

  render() {
    const renderQuotes = this.state.displayQuotes.map((q: IQuote, key: number) => {
      return <Quote key={key} quote={q} 
        showLoadMoreButton={key === this.state.displayQuotes.length - 1}
        onShowLoadMoreClick={this.loadMoreQuotes} ></Quote>
    });

    const renderLoader = () => {
      return (<View style={styles.loader}>
          <ActivityIndicator size='large' color='#999999' ></ActivityIndicator>
          <Text style={styles.loaderText}>Patience is bitter, but its fruit is sweet - Aristotle</Text>
        </View>)
    }
    return (
      <View style={{flex:1}}>
        <Swiper showsPagination={false} loadMinimal={true} loadMinimalSize={2} loop={false}
          onIndexChanged={this.onIndexChanged} ref={component => this.swiper = component} loadMinimalLoader={renderLoader()}>
          {renderQuotes}
        </Swiper>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
    
  },
  loaderText: {
    color: 'white',
    opacity: 0.5,
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center'
  }
});
