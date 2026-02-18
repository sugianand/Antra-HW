# HW3 Manual Test Inputs

Run these in terminal:

```powershell
cd "C:\Users\Akhila\Downloads\Antra HW"
node
```

Then in the Node prompt (`>`):

```js
const HW3 = require('./HW3/script.js')

// Q1
HW3.reverseNumber(32243)

// Q2
HW3.isPalindrome('nurses run')

// Q3
HW3.stringCombinations('dog')

// Q4
HW3.alphabeticalOrder('webmaster')

// Q5
HW3.capitalizeWords('the quick brown fox')

// Q6
HW3.longestWord('Web Development Tutorial')

// Q7
HW3.countVowels('The quick brown fox')

// Q8
HW3.isPrime(29)

// Q9
HW3.getType(123)
HW3.getType('abc')
HW3.getType(undefined)

// Q10
HW3.identityMatrix(3)

// Q11
HW3.secondLowestAndGreatest([1,2,3,4,5])

// Q12
HW3.isPerfectNumber(28)

// Q13
HW3.factors(28)

// Q14
HW3.amountToCoins(46,[25,10,5,2,1])

// Q15
HW3.power(2,8)

// Q16
HW3.uniqueCharacters('thequickbrownfoxjumpsoverthelazydog')

// Q17
HW3.letterOccurrences('The quick brown fox')

// Q18
HW3.binarySearch([1,2,3,4,5,6,7],5)

// Q19
HW3.largerThan([1,4,7,9,2],5)

// Q20
HW3.randomStringId(12)

// Q21
HW3.subsetsFixedLength([1,2,3],2)

// Q22
HW3.countLetter('microsoft.com','o')

// Q23
HW3.firstNonRepeatedCharacter('abacddbec')

// Q24
HW3.bubbleSortDescending([12,345,4,546,122,84,98,64,9,1,3223,455,23,234,213])

// Q25
HW3.longestCountryName(['Australia','Germany','United States of America'])

// Q26
HW3.longestUniqueSubstring('abcabcbb')

// Q27
HW3.longestPalindrome('bananas')

// Q28
HW3.applyFunction((a,b)=>a+b,10,15)

// Q29
function demoName() {}
HW3.getFunctionName(demoName)
```

Exit Node:

```js
.exit
```
