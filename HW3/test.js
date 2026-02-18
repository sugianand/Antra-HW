const hw3 = require("./script.js");

const tests = [
  ["Q1 reverseNumber", hw3.reverseNumber(32243) === 34223],
  ["Q2 isPalindrome", hw3.isPalindrome("nurses run") === true],
  ["Q3 stringCombinations", hw3.stringCombinations("dog").join(",") === "d,do,dog,o,og,g"],
  ["Q4 alphabeticalOrder", hw3.alphabeticalOrder("webmaster") === "abeemrstw"],
  ["Q5 capitalizeWords", hw3.capitalizeWords("the quick brown fox") === "The Quick Brown Fox"],
  ["Q6 longestWord", hw3.longestWord("Web Development Tutorial") === "Development"],
  ["Q7 countVowels", hw3.countVowels("The quick brown fox") === 5],
  ["Q8 isPrime", hw3.isPrime(29) === true],
  ["Q10 identityMatrix", JSON.stringify(hw3.identityMatrix(3)) === JSON.stringify([[1, 0, 0], [0, 1, 0], [0, 0, 1]])],
  ["Q11 secondLowestAndGreatest", JSON.stringify(hw3.secondLowestAndGreatest([1, 2, 3, 4, 5])) === JSON.stringify([2, 4])],
  ["Q12 isPerfectNumber", hw3.isPerfectNumber(28) === true],
  ["Q14 amountToCoins", hw3.amountToCoins(46, [25, 10, 5, 2, 1]).join(",") === "25,10,10,1"],
  ["Q16 uniqueCharacters", hw3.uniqueCharacters("thequickbrownfoxjumpsoverthelazydog") === "thequickbrownfxjmpsvlazydg"],
  ["Q22 countLetter", hw3.countLetter("microsoft.com", "o") === 3],
  ["Q23 firstNonRepeatedCharacter", hw3.firstNonRepeatedCharacter("abacddbec") === "e"],
  ["Q25 longestCountryName", hw3.longestCountryName(["Australia", "Germany", "United States of America"]) === "United States of America"],
  ["Q27 longestPalindrome", hw3.longestPalindrome("bananas") === "anana"],
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
