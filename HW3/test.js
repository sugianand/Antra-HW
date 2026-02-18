const hw3 = require("./script.js");

function sameArray(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

const tests = [
  ["Q1 reverseNumber", hw3.reverseNumber(32243) === 34223],
  ["Q2 isPalindrome", hw3.isPalindrome("nurses run") === true],
  ["Q3 stringCombinations", hw3.stringCombinations("dog").join(",") === "d,do,dog,o,og,g"],
  ["Q4 alphabeticalOrder", hw3.alphabeticalOrder("webmaster") === "abeemrstw"],
  ["Q5 capitalizeWords", hw3.capitalizeWords("the quick brown fox") === "The Quick Brown Fox"],
  ["Q6 longestWord", hw3.longestWord("Web Development Tutorial") === "Development"],
  ["Q7 countVowels", hw3.countVowels("The quick brown fox") === 5],
  ["Q8 isPrime", hw3.isPrime(29) === true],
  [
    "Q9 getType",
    hw3.getType({}) === "object" &&
      hw3.getType(true) === "boolean" &&
      hw3.getType(() => 1) === "function" &&
      hw3.getType(123) === "number" &&
      hw3.getType("abc") === "string" &&
      hw3.getType(undefined) === "undefined",
  ],
  ["Q10 identityMatrix", JSON.stringify(hw3.identityMatrix(3)) === JSON.stringify([[1, 0, 0], [0, 1, 0], [0, 0, 1]])],
  ["Q11 secondLowestAndGreatest", JSON.stringify(hw3.secondLowestAndGreatest([1, 2, 3, 4, 5])) === JSON.stringify([2, 4])],
  ["Q12 isPerfectNumber", hw3.isPerfectNumber(28) === true],
  ["Q13 factors", sameArray(hw3.factors(28), [1, 2, 4, 7, 14, 28])],
  ["Q14 amountToCoins", hw3.amountToCoins(46, [25, 10, 5, 2, 1]).join(",") === "25,10,10,1"],
  ["Q15 power", hw3.power(2, 8) === 256],
  ["Q16 uniqueCharacters", hw3.uniqueCharacters("thequickbrownfoxjumpsoverthelazydog") === "thequickbrownfxjmpsvlazydg"],
  [
    "Q17 letterOccurrences",
    (() => {
      const result = hw3.letterOccurrences("aabB");
      return result.a === 2 && result.b === 2 && Object.keys(result).length === 2;
    })(),
  ],
  ["Q18 binarySearch", hw3.binarySearch([1, 2, 3, 4, 5, 6, 7], 5) === 4],
  ["Q19 largerThan", sameArray(hw3.largerThan([1, 4, 7, 9, 2], 5), [7, 9])],
  [
    "Q20 randomStringId",
    (() => {
      const id = hw3.randomStringId(12);
      return typeof id === "string" && id.length === 12 && /^[A-Za-z0-9]+$/.test(id);
    })(),
  ],
  ["Q21 subsetsFixedLength", sameArray(hw3.subsetsFixedLength([1, 2, 3], 2), [[2, 1], [3, 1], [3, 2]])],
  ["Q22 countLetter", hw3.countLetter("microsoft.com", "o") === 3],
  ["Q23 firstNonRepeatedCharacter", hw3.firstNonRepeatedCharacter("abacddbec") === "e"],
  [
    "Q24 bubbleSortDescending",
    sameArray(
      hw3.bubbleSortDescending([12, 345, 4, 546, 122, 84, 98, 64, 9, 1, 3223, 455, 23, 234, 213]),
      [3223, 546, 455, 345, 234, 213, 122, 98, 84, 64, 23, 12, 9, 4, 1]
    ),
  ],
  ["Q25 longestCountryName", hw3.longestCountryName(["Australia", "Germany", "United States of America"]) === "United States of America"],
  ["Q26 longestUniqueSubstring", hw3.longestUniqueSubstring("abcabcbb") === "abc"],
  ["Q27 longestPalindrome", hw3.longestPalindrome("bananas") === "anana"],
  ["Q28 applyFunction", hw3.applyFunction((a, b) => a + b, 10, 15) === 25],
  [
    "Q29 getFunctionName",
    (() => {
      function demoName() {
        return "ok";
      }
      return hw3.getFunctionName(demoName) === "demoName";
    })(),
  ],
];

const failed = tests.filter(([, ok]) => !ok);

if (failed.length === 0) {
  console.log(`Passed ${tests.length}/${tests.length} tests`);
  process.exit(0);
}

console.log(`Passed ${tests.length - failed.length}/${tests.length} tests`);
for (const [name] of failed) {
  console.log(`FAILED: ${name}`);
}
process.exit(1);
