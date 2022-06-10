Function.prototype.myCall = function (context, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError('not function');
  }
  if (!context) context = window;
  const fn = Symbol();
  context[fn] = this;
  const result =  context[fn](...args);
  delete context[fn];
  return result;
}

Function.prototype.myApply = function(context, args = []) { // 解构方式
  if(typeof this !== 'function') {
    throw new TypeError(`It's must be a function`)
  }
  if(!context) context = window;
  const fn = Symbol();
  context[fn] = this;
  const result = context[fn](...args);
  delete context[fn];
  return result;
}

Function.prototype.myBind = function (context, ...args) {
  const fn = this;
  if(typeof fn !== 'function') {
    throw new TypeError(`It's must be a function`)
  }
  if(!context) context = window;
  return function (...otherArgs) {
    return fn.apply(context, [...args, ...otherArgs]);
  };
}

export function myNew (context, ...args) {
  let obj = new Object();
  obj.__proto__ = context.prototype;
  let res = context.call(obj, ...args);
  return res instanceof Object ? res : obj;
}

Array.prototype.myReduce = function (arr, callBack, initialVal) {
  if (!Array.isArray(arr) || typeof callBack !== 'function' || arr.length === 0) {
    return [];
  }
  const hasInitialVal =  initialVal !== undefined;
  let value = hasInitialVal ? initialVal : arr[0];
  for (let i = hasInitialVal ? 0 : 1; i < arr.length; i++) {
    value = callBack(value, arr[i], arr, i);
  }
  return value;
}

export function debounce (fn, wait) {
  let time = null;
  return function () {
    const context = this;
    const args = [...arguments];
    if (time) {
      clearTimeout(time);
    }
    time = setTimeout(() => {
      fn.apply(context, args)
    }, wait)
  }
}

export function  throttle (fn, wait) {
  let last = 0;
  return function () {
    let that = this;
    let now = new Date().getTime();
    if (now - last > wait) {
      setTimeout(function () {
        fn.call(that, arguments);
        last = now;
      }, wait)
    }
  }
}