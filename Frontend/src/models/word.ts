export interface IWord {
  _id: string;
  englishWord: string;
  frenchWord: string;
  category?: string;
  difficulty?: string;
  creationDate: Date;
}
