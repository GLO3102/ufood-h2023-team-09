// Levenshtein distance
// Source https://en.wikibooks.org/wiki/Algorithm_Implementation/Strings/Levenshtein_distance#C++
// Compute the edit distance between the two given strings
export function getSimilitude(str1, str2) {
  str1 = str1.toLowerCase();
  str2 = str2.toLowerCase();
  const len1 = str1.length;
  const len2 = str2.length;
  if (len1 === 0) return len2;
  if (len2 === 0) return len1;

  const matrix = [];

  // increment along the first column of each row
  let i;
  for (i = 0; i <= len2; i++) {
    matrix[i] = [i];
  }

  // increment each column in the first row
  let j;
  for (j = 0; j <= len1; j++) {
    matrix[0][j] = j;
  }

  // Fill in the rest of the matrix
  for (i = 1; i <= len2; i++) {
    for (j = 1; j <= len1; j++) {
      if (str2.charAt(i - 1) == str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          Math.min(
            matrix[i][j - 1] + 1, // insertion
            matrix[i - 1][j] + 1
          )
        ); // deletion
      }
    }
  }
  let length = Math.max(len1, len2);
  let distance = matrix[len2][len1];
  return 1 - distance / length;
}

export function format(str) {
  let newStr = str[0].toUpperCase() + str.slice(1);
  return newStr;
}

export function accentLess(str) {
  let newStr = str;
  newStr = str.replaceAll("é", "e");
  newStr = newStr.replaceAll("è", "e");
  newStr = newStr.replaceAll("ê", "e");
  newStr = newStr.replaceAll("à", "a");
  newStr = newStr.replaceAll("â", "a");
  newStr = newStr.replaceAll("ù", "u");
  newStr = newStr.replaceAll("û", "u");
  newStr = newStr.replaceAll("ô", "o");
  newStr = newStr.replaceAll("ë", "e");
  newStr = newStr.replaceAll("ï", "i");
  return newStr;
}
