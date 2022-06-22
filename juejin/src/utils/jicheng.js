// 借用构造函数继承
function father () {
  this.color = ['red', 'blue', 'green'];
}
function son () {
  father.call(this);
}
const instance = new son();

// 组合继承
function father () {
  this.name = 'father';
  this.color = ['red', 'blue', 'green'];
}
father.prototype.say = function () {
  console.log('hello');
}

function son () {
  father.call(this);
  this.name = 'son';
}
son.prototype = new father();
son.prototype.sayName = function () {
  console.log(this.name);
}

// 原型继承
function objCreate (o) {
  function f () {}
  f.prototype = o;
  return new f();
}
const instances = objCreate(father.prototype);

// 寄生式继承
function cloneAnother (original) {
  let obj = objCreate(original);
  obj.say = function () {
    console.log('hello');
  }
  return obj;
}

// 寄生组合式继承
function extend (subClass, superClass) {
  let prototype = objCreate(superClass.prototype);
  prototype.constructor = subClass;
  subClass.prototype = prototype;
}