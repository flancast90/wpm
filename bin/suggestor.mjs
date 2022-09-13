import { args } from '../args.mjs';

export function guess(arg) {
 let percentShared = 0;
 let thisGuess = '--help';
 
 for (let elem in args) {
  let shortest = (arg.length < elem.length) ? arg.length : elem.length;
  for (let i=0; i < shortest-1; i++) {
   var lettersShared = 0;
   if (elem[i] == arg[i]) lettersShared++;
  }
  
  if ((lettersShared/(shortest-1)) > percentShared) {
   percentShared = lettersShared/(shortest-1);
   thisGuess = elem;
  }
 }
 
 return thisGuess;
}
