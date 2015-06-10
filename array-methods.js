
var dataset = require('./dataset.json');

/*
  create an array with accounts from bankBalances that are
  greater than 100000.00
  assign the resulting array to `hundredThousandairs`
*/
function getNumbers(element, index, array){
  return element.amount > 100000.00;
} 

var hundredThousandairs = dataset.bankBalances.filter(getNumbers);
/*
  set a new key for each object in bankBalances named `rounded`
  the value of this key will be the `amount` rounded to the nearest dollar
  example 
    {
      "amount": "134758.44",
      "state": "HI",
      "rounded": 134758
    }
  assign the resulting array to `roundedDollar`
*/
function roundKey(element,index,array){

  return{
    "amount":element.amount,
    "state":element.state,
    "rounded":Math.round(element.amount)
  }
}

var roundedDollar = dataset.bankBalances.map(roundKey);


/*
  set a the `amount` value for each object in bankBalances
  to the value of `amount` rounded to the nearest 10 cents
  example 
    {
      "amount": 134758.4,
      "state": "HI"
    }
  assign the resulting array to `roundedDime`
*/
function doDime(element,index,array){

  return{
    "amount": parseFloat(element.amount.substring(0,8)),
    "state":element.state
  }

}

var roundedDime = dataset.bankBalances.map(doDime);

// set sumOfBankBalances to the sum of all amounts in bankBalances
var sumOfBankBalances = dataset.bankBalances.reduce(function(previous,current,index,array){
  var rtn = previous + parseFloat(current.amount);
  return Math.round(100 * rtn) / 100;
},0);



/*
  set sumOfInterests to the sum of the 18.9% interest
  for all amounts in bankBalances
  in each of the following states
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  the result should be rounded to the nearest cent
 */

var sumOfInterests = dataset.bankBalances.filter(function(element,index,array){
  return element.state === "WI"||
  element.state === "IL" ||
  element.state === "WY" ||
  element.state === "OH" ||
  element.state === "GA" ||
  element.state === "DE";
}).reduce(function(prev,current,index,array){
  return Math.round((prev + current.amount * 0.189) * 100) / 100;

},0);

/*
  set sumOfHighInterests to the sum of the 18.9% interest
  for all amounts in bankBalances
  where the amount of the sum of interests in that state is
    greater than 50,000
  in !each of the following states
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  the result should be rounded to the nearest cent
 */

 var stateSums = dataset.bankBalances.reduce(function(previous,current){
  if(!previous.hasOwnProperty(current.state)){
    previous[current.state] = 0;
  }

  previous[current.state] += parseFloat(current.amount);
  previous[current.state] = Math.round(previous[current.state] * 100) /100;

  return previous;
},{})

/*
  aggregate the sum of bankBalance amounts
  grouped by state
  set stateSums to be a hash table
    where the key is the two letter state abbreviation
    and the value is the sum of all amounts from that state
      the value must be rounded to the nearest cent
 */

 var sumOfHighInterests = Object.keys(stateSums).filter(function(state){
  return ['WI','IL','WY','OH','GA','DE'].indexOf(state) === -1;
})
 .map(function(stateKey){
  return{
    state: stateKey,
    interest: Math.round(stateSums[stateKey] * .189 * 100) / 100
  };
 })
 .filter(function(account){
  return account.interest > 50000;

 })
 .reduce(function(previousInterest,currentAccount){
  return Math.round((previousInterest + currentAccount.interest) * 100) / 100;

 },0);
/*
  set lowerSumStates to an array containing
  only the two letter state abbreviation of each state 
  where the sum of amounts in the state is
    less than 1,000,000
 */
var lowerSumStates = Object.keys(stateSums).filter(function(state){
  return stateSums[state] < 1000000
});



/*
  set higherStateSums to be the sum of 
    all amounts of every state
    where the sum of amounts in the state is
      greater than 1,000,000
 */
var higherStateSums = Object.keys(stateSums).filter(function(state){
  return stateSums[state.toString()] > 1000000;
}).reduce(function(previous,current){
  return previous + stateSums[current];
},0);

/*
  set areStatesInHigherStateSum to be true if
    all of these states have a sum of account values
      greater than 2,550,000
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  false otherwise
 */
var areStatesInHigherStateSum = Object.keys(stateSums).filter(function(state){
  return['WI','IL','WY','OH','GA','DE'].indexOf(state) !== -1;
},{}).map(function(state){
  return{
    state: state,
    amount: stateSums[state]
  }
}).every(function(element,index,array){
  return element > 2500000;
});

console.log(areStatesInHigherStateSum);
/*
  set anyStatesInHigherStateSum to be true if
    any of these states have a sum of account values
      greater than 2,550,000
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  false otherwise
 */
var anyStatesInHigherStateSum = Object.keys(stateSums).filter(function(state){
  return['WI','IL','WY','OH','GA','DE'].indexOf(state) !== -1;
}).map(function(state){
  return{
    state: state,
    amount: stateSums[state]
  }
}).some(function(amount){
  console.log();
  return amount.amount <= 2550000;
});

console.log(anyStatesInHigherStateSum);




module.exports = {
  hundredThousandairs : hundredThousandairs,
  roundedDollar : roundedDollar,
  roundedDime : roundedDime,
  sumOfBankBalances : sumOfBankBalances,
  sumOfInterests : sumOfInterests,
  sumOfHighInterests : sumOfHighInterests,
  stateSums : stateSums,
  lowerSumStates : lowerSumStates,
  higherStateSums : higherStateSums,
  areStatesInHigherStateSum : areStatesInHigherStateSum,
  anyStatesInHigherStateSum : anyStatesInHigherStateSum
};