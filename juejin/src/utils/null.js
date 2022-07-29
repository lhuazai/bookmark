console.log(null == null); // true
console.log(null == undefined); // true
console.log([] == 0); // true
console.log([] == ''); // true

console.log(null == ''); // false
console.log(null == []); // false
console.log(null == 0); // false
console.log(null == NaN); // false
console.log(null == {}); // false

console.log([] == []); // false
console.log([] == {}); // false

console.log({} == {}); // false
console.log({} == 0); // false
console.log({} == ''); // false
console.log(undefined == ''); // false
console.log(undefined == 0); // false
console.log(undefined == {}); // false