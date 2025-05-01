const trie = {};

function insertWord() {
  const word = document.getElementById("wordInput").value.toLowerCase();
  let node = trie;
  for (let char of word) {
    if (!node[char]) node[char] = {};
    node = node[char];
  }
  node.isEndOfWord = true;
  node.frequency = (node.frequency || 0) + 1;
  showOutput(`Inserted "${word}" successfully.`);
}

function searchWord() {
  const word = document.getElementById("wordInput").value.toLowerCase();
  let node = trie;
  for (let char of word) {
    if (!node[char]) return showOutput("Word not found.");
    node = node[char];
  }
  if (node.isEndOfWord) {
    showOutput(`Word found. Frequency: ${node.frequency}`);
  } else {
    showOutput("Word not found.");
  }
}

function suggestWords() {
  const prefix = document.getElementById("wordInput").value.toLowerCase();
  let node = trie;
  for (let char of prefix) {
    if (!node[char]) return showOutput("No suggestions found.");
    node = node[char];
  }
  const results = [];
  suggestionsHelper(node, prefix, results);
  results.sort((a, b) => b.frequency - a.frequency);
  let msg = results.length
    ? `Suggestions for "${prefix}":<br>` + results.map(r => `• ${r.word} (used ${r.frequency} times)`).join("<br>")
    : "No suggestions found.";
  showOutput(msg);
}

function suggestionsHelper(node, currentWord, results) {
  if (!node) return;
  if (node.isEndOfWord) {
    results.push({ word: currentWord, frequency: node.frequency });
  }
  for (let char in node) {
    if (char.length === 1) {
      suggestionsHelper(node[char], currentWord + char, results);
    }
  }
}

function updateWord() {
  const oldWord = document.getElementById("wordInput").value.toLowerCase();
  const newWord = document.getElementById("newWordInput").value.toLowerCase();
  if (deleteHelper(trie, oldWord, 0)) {
    document.getElementById("wordInput").value = newWord;
    insertWord();
    showOutput(`Updated "${oldWord}" to "${newWord}"`);
  } else {
    showOutput(`Word "${oldWord}" not found for update.`);
  }
}

function deleteWord() {
  const word = document.getElementById("wordInput").value.toLowerCase();
  const deleted = deleteHelper(trie, word, 0);
  showOutput(deleted ? `Deleted "${word}" successfully.` : `"${word}" not found.`);
}

function deleteHelper(node, word, index) {
  if (index === word.length) {
    if (!node.isEndOfWord) return false;
    delete node.isEndOfWord;
    delete node.frequency;
    return Object.keys(node).length === 0;
  }
  const char = word[index];
  if (!node[char]) return false;
  const shouldDeleteChild = deleteHelper(node[char], word, index + 1);
  if (shouldDeleteChild) {
    delete node[char];
    return Object.keys(node).length === 0;
  }
  return false;
}

function showOutput(message) {
  document.getElementById("output").innerHTML = message;
}
