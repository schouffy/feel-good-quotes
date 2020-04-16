import { AsyncStorage } from 'react-native';
import { IQuote } from './quote'
import { IBackground } from './background';

export class DataProvider {

  public onlyShowUnseen: boolean = false;
  public quotesPageCount: number = 20;

  public allQuotes: IQuote[];
  public allBackgrounds: IBackground[];

  constructor() {
    this.allBackgrounds = require('./backgrounds.json');
    this.allQuotes = [];
  }

  private loadAllQuotes = () => {
    var quotes: IQuote[] = require('./quotes.json');
    for (var i = 0; i < quotes.length; ++i) {
      quotes[i].hash = this.hashCode(quotes[i].text);
    }
    return quotes;
  }

  private loadAllUnseenQuotes = async (): Promise<IQuote[]> => {
    if (!this.allQuotes.length)
      this.allQuotes = this.loadAllQuotes();

    if (!this.onlyShowUnseen)
      return this.allQuotes;

    const alreadySeenQuotes = await this.getAlreadySeenQuotesIds();
    const unseenQuotes = this.allQuotes.filter(function (item) {
      return alreadySeenQuotes.indexOf(item.hash) === -1;
    });

    return unseenQuotes;
  }

  getRandomBackground = (): IBackground => {
    const index = Math.floor(Math.random() * this.allBackgrounds.length);
    return this.allBackgrounds[index];
  }

  getSomeQuotes = async (): Promise<IQuote[]> => {
    const unseenQuotes = await this.loadAllUnseenQuotes();
    let someQuotes = shuffle(unseenQuotes)
      .slice(0, this.quotesPageCount);
    for (var i = 0; i < someQuotes.length; ++i) {
      someQuotes[i].background = this.getRandomBackground();
    }
    return someQuotes;
  }

  hashCode = (str: string) => {
    var hash = 0, i, chr;
    for (i = 0; i < str.length; i++) {
      chr = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  }

  private getAlreadySeenQuotesIds = async (): Promise<number[]> => {
    if (this.onlyShowUnseen) {
      const value = await AsyncStorage.getItem('@Content:SeenQuotesIds');
      if (value !== null) {
        return JSON.parse(value);
      }
    }
    return [];
  }

  setQuoteSeen = async (quote: IQuote) : Promise<void> => {
    var ids = await AsyncStorage.getItem('@Content:SeenQuotesIds');
    var arr = ids ? JSON.parse(ids) : [];
    if (arr.indexOf(quote.hash) === -1)
    {
        arr.push(quote.hash);
        AsyncStorage.setItem('@Content:SeenQuotesIds', JSON.stringify(arr));
    }
  }
}

function shuffle<T>(array: Array<T>) : Array<T> {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
