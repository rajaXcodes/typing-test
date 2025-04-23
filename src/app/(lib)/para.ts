import {generate} from 'random-words';



export const getRandomParagraph = () => {
  const words : string = generate({ exactly: 50, join: ' ' });
  console.log(words);
  return words;
};

getRandomParagraph();
