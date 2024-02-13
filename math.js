/**
 * Normalize the object's properties to a sum of 1.
 * @param {Object} obj - The object to normalize
 * @returns The normalized object
 */
const normalize = (obj) => {
  const sum = Object.values(obj).reduce((acc, val) => acc + val, 0);
  for (let key in obj) {
    obj[key] /= sum;
  }
  return obj;
};

/**
 * Calculate the factorial of a number.
 * @param {number} n - The number to calculate the factorial of
 * @returns The factorial of n
 */
const factorial = (n) => {
  if (n === 0) return 1;
  let result = 1;
  for (let i = 1; i <= n; i++) {
    result *= i;
  }
  return result;
};

/**
 * Calculate the combinations of n choose k (without repetition).
 * @param {number} n - The total number of elements
 * @param {number} k - The number of elements to choose
 * @returns The combination of n choose k
 */
const combinations = (n, k) => {
  return factorial(n) / (factorial(k) * factorial(n - k));
};

/**
 * Calculates the binomial probability of at least 1 success in n trials, given the probability of success in a single trial.
 * @param {number} n - The number of trials
 * @param {number} p - The probability of success in a single trial
 */
const atLeastOneSuccess = (n, p) => {
  return 1 - Math.pow(1 - p, n);
};

export { normalize, factorial, combinations, atLeastOneSuccess };
