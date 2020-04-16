import { IBackground } from './background';

export interface IQuote {
  text: string;
  author: string;
  attribution: string;
  hash: number;
  background: IBackground;
}
