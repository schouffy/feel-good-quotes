import { IQuote } from './quote'
import { IBackground } from './background';

export class DataProvider {

  public allQuotes: IQuote[];
  public allBackgrounds: IBackground[];

  constructor() {
    this.allQuotes = this.loadAllQuotes();
    this.allBackgrounds = require('./backgrounds.json');
  }

  loadAllQuotes = () : IQuote[] => {
    var quotes: IQuote[] = require('./quotes.json'); 
    // TODO filter already seen, take 20 randomly. When on last page on the swiper, show a button to load 20 more
    for (var i = 0; i < quotes.length; ++i) {
      quotes[i].hash = this.hashCode(quotes[i].text);
    }

    return quotes.slice(0,20);
  }

  getRandomBackground = () : IBackground => {
    return this.allBackgrounds[Math.floor(Math.random() * this.allBackgrounds.length)];
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
}
