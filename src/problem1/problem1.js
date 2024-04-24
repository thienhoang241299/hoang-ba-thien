// If input is non-negatuve interger, it's will be throw error 'Input must be a non-negative integer'
// And input must be interger, if input is non interger, it's will be throw error 'Input must be a integer'
// in function sum_to_n_c, i use recursion so if input greater than 10464, it will give stack overflow error

var sum_to_n_a = function(n) {
    if (!Number.isInteger(n)) {
        throw new Error('Input must be a integer');
    } else if (n < 0) {
        throw new Error('Input must be a non-negative integer');
    }
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
};

var sum_to_n_b = function(n) {
    if (!Number.isInteger(n)) {
        throw new Error('Input must be a integer');
    } else if (n < 0) {
        throw new Error('Input must be a non-negative integer');
    }
    return n * (n + 1) / 2;
};

var sum_to_n_c = function(n) {
    
    if (!Number.isInteger(n)) {
        throw new Error('Input must be a integer');
    } else if (n < 0) {
        throw new Error('Input must be a non-negative integer');
    }
    if (n > 10464) {
        throw new Error('Recursion cannot handle input integers greater than 10464')
    }
    if (n === 0) {
        return 0;
    } else {
        return n + sum_to_n_c(n - 1);
    }
};


console.log(sum_to_n_a(10))
console.log(sum_to_n_b(10))
console.log(sum_to_n_c(10))