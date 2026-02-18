"use strict";

function reverseNumber(x) {
  const sign = Math.sign(x) || 1;
  const reversed = Number(String(Math.abs(Math.trunc(x))).split("").reverse().join(""));
  return sign * reversed;
}

function isPalindrome(text) {
  const cleaned = text.toLowerCase().replace(/[^a-z0-9]/g, "");
  return cleaned === cleaned.split("").reverse().join("");
}

function stringCombinations(text) {
  const output = [];
  for (let i = 0; i < text.length; i += 1) {
    for (let j = i + 1; j <= text.length; j += 1) {
      output.push(text.slice(i, j));
    }
  }
  return output;
}

function alphabeticalOrder(text) {
  return text.split("").sort().join("");
}

function capitalizeWords(text) {
  return text.toLowerCase().replace(/\b[a-z]/g, (ch) => ch.toUpperCase());
}

function longestWord(text) {
  const words = text.match(/[A-Za-z0-9']+/g) || [];
  return words.reduce((longest, current) => (current.length > longest.length ? current : longest), "");
}

function countVowels(text) {
  const matches = text.match(/[aeiou]/gi);
  return matches ? matches.length : 0;
}

function isPrime(number) {
  if (!Number.isInteger(number) || number <= 1) return false;
  if (number === 2) return true;
  if (number % 2 === 0) return false;
  for (let i = 3; i * i <= number; i += 2) {
    if (number % i === 0) return false;
  }
  return true;
}

function getType(value) {
  return typeof value;
}

function identityMatrix(n) {
  return Array.from({ length: n }, (_, row) =>
    Array.from({ length: n }, (_, col) => (row === col ? 1 : 0))
  );
}

function secondLowestAndGreatest(numbers) {
  const unique = [...new Set(numbers)].sort((a, b) => a - b);
  if (unique.length < 2) return [];
  return [unique[1], unique[unique.length - 2]];
}

function isPerfectNumber(number) {
  if (!Number.isInteger(number) || number <= 1) return false;
  let sum = 1;
  for (let i = 2; i * i <= number; i += 1) {
    if (number % i === 0) {
      sum += i;
      const pair = number / i;
      if (pair !== i) sum += pair;
    }
  }
  return sum === number;
}

function factors(number) {
  const output = [];
  for (let i = 1; i * i <= number; i += 1) {
    if (number % i === 0) {
      output.push(i);
      const pair = number / i;
      if (pair !== i) output.push(pair);
    }
  }
  return output.sort((a, b) => a - b);
}

function amountToCoins(amount, coins) {
  const output = [];
  let remaining = amount;
  const sortedCoins = [...coins].sort((a, b) => b - a);
  for (const coin of sortedCoins) {
    while (remaining >= coin) {
      output.push(coin);
      remaining -= coin;
    }
  }
  return output;
}

function power(base, exponent) {
  return base ** exponent;
}

function uniqueCharacters(text) {
  const seen = new Set();
  let output = "";
  for (const ch of text) {
    if (!seen.has(ch)) {
      seen.add(ch);
      output += ch;
    }
  }
  return output;
}

function letterOccurrences(text) {
  const counts = {};
  for (const ch of text.toLowerCase()) {
    if (/[a-z]/.test(ch)) {
      counts[ch] = (counts[ch] || 0) + 1;
    }
  }
  return counts;
}

function binarySearch(sortedArray, target) {
  let left = 0;
  let right = sortedArray.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (sortedArray[mid] === target) return mid;
    if (sortedArray[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}

function largerThan(array, threshold) {
  return array.filter((value) => value > threshold);
}

function randomStringId(length, chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789") {
  let output = "";
  for (let i = 0; i < length; i += 1) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    output += chars[randomIndex];
  }
  return output;
}

function subsetsFixedLength(array, subsetLength) {
  const output = [];

  function dfs(start, path) {
    if (path.length === subsetLength) {
      output.push([...path].reverse());
      return;
    }
    for (let i = start; i < array.length; i += 1) {
      path.push(array[i]);
      dfs(i + 1, path);
      path.pop();
    }
  }

  dfs(0, []);
  return output;
}

function countLetter(text, letter) {
  const lowerLetter = letter.toLowerCase();
  let count = 0;
  for (const ch of text.toLowerCase()) {
    if (ch === lowerLetter) count += 1;
  }
  return count;
}

function firstNonRepeatedCharacter(text) {
  const counts = {};
  for (const ch of text) counts[ch] = (counts[ch] || 0) + 1;
  for (const ch of text) {
    if (counts[ch] === 1) return ch;
  }
  return null;
}

function bubbleSortDescending(array) {
  const output = [...array];
  for (let i = 0; i < output.length - 1; i += 1) {
    let swapped = false;
    for (let j = 0; j < output.length - 1 - i; j += 1) {
      if (output[j] < output[j + 1]) {
        const temp = output[j];
        output[j] = output[j + 1];
        output[j + 1] = temp;
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  return output;
}

function longestCountryName(countries) {
  return countries.reduce((longest, current) => (current.length > longest.length ? current : longest), "");
}

function longestUniqueSubstring(text) {
  let start = 0;
  let bestStart = 0;
  let bestLength = 0;
  const lastSeen = new Map();

  for (let end = 0; end < text.length; end += 1) {
    const ch = text[end];
    if (lastSeen.has(ch) && lastSeen.get(ch) >= start) {
      start = lastSeen.get(ch) + 1;
    }
    lastSeen.set(ch, end);
    const length = end - start + 1;
    if (length > bestLength) {
      bestLength = length;
      bestStart = start;
    }
  }

  return text.slice(bestStart, bestStart + bestLength);
}

function longestPalindrome(text) {
  if (text.length < 2) return text;
  let bestStart = 0;
  let bestLength = 1;

  function expand(left, right) {
    while (left >= 0 && right < text.length && text[left] === text[right]) {
      left -= 1;
      right += 1;
    }
    const length = right - left - 1;
    if (length > bestLength) {
      bestLength = length;
      bestStart = left + 1;
    }
  }

  for (let i = 0; i < text.length; i += 1) {
    expand(i, i);
    expand(i, i + 1);
  }

  return text.slice(bestStart, bestStart + bestLength);
}

function applyFunction(fn, ...args) {
  if (typeof fn !== "function") {
    throw new TypeError("First argument must be a function");
  }
  return fn(...args);
}

function getFunctionName(fn) {
  if (typeof fn !== "function") return "";
  return fn.name || "anonymous";
}

function sampleResults() {
  function demoFunction() {
    return "ok";
  }

  return [
    { question: 1, result: reverseNumber(32243) },
    { question: 2, result: isPalindrome("nurses run") },
    { question: 3, result: stringCombinations("dog") },
    { question: 4, result: alphabeticalOrder("webmaster") },
    { question: 5, result: capitalizeWords("the quick brown fox") },
    { question: 6, result: longestWord("Web Development Tutorial") },
    { question: 7, result: countVowels("The quick brown fox") },
    { question: 8, result: isPrime(29) },
    { question: 9, result: getType(42) },
    { question: 10, result: identityMatrix(3) },
    { question: 11, result: secondLowestAndGreatest([1, 2, 3, 4, 5]) },
    { question: 12, result: isPerfectNumber(28) },
    { question: 13, result: factors(28) },
    { question: 14, result: amountToCoins(46, [25, 10, 5, 2, 1]) },
    { question: 15, result: power(2, 8) },
    { question: 16, result: uniqueCharacters("thequickbrownfoxjumpsoverthelazydog") },
    { question: 17, result: letterOccurrences("The quick brown fox") },
    { question: 18, result: binarySearch([1, 2, 3, 4, 5, 6, 7], 5) },
    { question: 19, result: largerThan([1, 4, 7, 9, 2], 5) },
    { question: 20, result: randomStringId(12) },
    { question: 21, result: subsetsFixedLength([1, 2, 3], 2) },
    { question: 22, result: countLetter("microsoft.com", "o") },
    { question: 23, result: firstNonRepeatedCharacter("abacddbec") },
    {
      question: 24,
      result: bubbleSortDescending([12, 345, 4, 546, 122, 84, 98, 64, 9, 1, 3223, 455, 23, 234, 213]),
    },
    { question: 25, result: longestCountryName(["Australia", "Germany", "United States of America"]) },
    { question: 26, result: longestUniqueSubstring("abcabcbb") },
    { question: 27, result: longestPalindrome("bananas") },
    { question: 28, result: applyFunction((a, b) => a + b, 10, 15) },
    { question: 29, result: getFunctionName(demoFunction) },
  ];
}

const HW3 = {
  reverseNumber,
  isPalindrome,
  stringCombinations,
  alphabeticalOrder,
  capitalizeWords,
  longestWord,
  countVowels,
  isPrime,
  getType,
  identityMatrix,
  secondLowestAndGreatest,
  isPerfectNumber,
  factors,
  amountToCoins,
  power,
  uniqueCharacters,
  letterOccurrences,
  binarySearch,
  largerThan,
  randomStringId,
  subsetsFixedLength,
  countLetter,
  firstNonRepeatedCharacter,
  bubbleSortDescending,
  longestCountryName,
  longestUniqueSubstring,
  longestPalindrome,
  applyFunction,
  getFunctionName,
  sampleResults,
};

if (typeof window !== "undefined") {
  window.HW3 = HW3;
  const output = document.getElementById("output");
  if (output) {
    output.textContent = JSON.stringify(sampleResults(), null, 2);
  }
  console.log("HW3 sample results:", sampleResults());
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = HW3;
}
