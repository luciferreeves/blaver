module.exports = function (number) {
  number = number.replace(/\D/g, "");
  let split = number.split("");
  split = split.map(function (num) {
    return parseInt(num);
  });
  const check = split.pop();
  split.reverse();
  split = split.map(function (num, index) {
    if (index % 2 === 0) {
      num *= 2;
      if (num > 9) {
        num -= 9;
      }
    }
    return num;
  });
  const sum = split.reduce(function (prev, curr) {
    return prev + curr;
  });
  return sum % 10 === check;
};
