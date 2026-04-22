import { CatMBTI } from './constants';

export interface SavedCat {
  id: string;
  name: string;
  mbti: CatMBTI;
  typeName: string;
  date: string;
  traits: string[];
}

export interface ShareConfig {
  title: string;
  subTitle: string;
  traits: string[];
  description: string;
  typeName: string;
}
