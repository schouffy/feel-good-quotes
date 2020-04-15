import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import Quote from './Quote'
import { IQuote } from './data/quote'
import { DataProvider } from './data/dataProvider'

interface IProps {
}
interface IState {
  displayQuotes: IQuote[];
  showLoadMoreQuotesButton: boolean;
}

export default class QuoteList extends React.Component<IProps, IState> {

  dataProvider: DataProvider;
  currentPageIndex: number;
  swiper: any;

  constructor(props: any) {
    super(props);
    this.dataProvider = new DataProvider();
    this.currentPageIndex = 0;
    this.state = { displayQuotes: [], showLoadMoreQuotesButton: false }

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
    if (index == this.state.displayQuotes.length - 1) {
      // last page : show a button to load more
      this.setState({ showLoadMoreQuotesButton: true });
    }
    else if (this.state.showLoadMoreQuotesButton) {
      // not last page : if the button was visible, hide it
      this.setState({ showLoadMoreQuotesButton: false });
    }
    await this.setCurrentQuoteSeen();
  }

  async setCurrentQuoteSeen() {
    // await this.dataProvider.setQuoteSeen(this.state.displayQuotes[this.currentPageIndex]);
  }

  async loadMoreQuotes() {
    const newQuotes = await this.dataProvider.getSomeQuotes();
    this.swiper.scrollBy(-this.currentPageIndex, false);
    this.currentPageIndex = 0;
    this.setState({ displayQuotes: newQuotes });
  }

  render() {
    console.log("QuoteList.render");
    const renderQuotes = this.state.displayQuotes.map((q: IQuote, key: number) => {
      return <Quote key={key} text={q.text} author={q.author} backgroundUri={q.backgroundUri}></Quote>
    });
    const renderLoadMoreButton = (showButton: boolean) => {
      console.log("renderLoadMoreButton " + showButton);
      if (showButton) {
        return (
          <View style={styles.loadMoreContainer}>
            <Button title="Load more quotes"  onPress={this.loadMoreQuotes}></Button>
          </View>
        )
      }
    }
    return (
      <View style={{flex:1}}>
        <Swiper showsPagination={false} loadMinimal={true} loadMinimalSize={2} loop={false}
          onIndexChanged={this.onIndexChanged} ref={component => this.swiper = component}>
          {renderQuotes}
        </Swiper>
        {renderLoadMoreButton(this.state.showLoadMoreQuotesButton)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loadMoreContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 20,
    padding: 30,
    flex: 1
  }
});
