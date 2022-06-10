import Vue from 'vue';
const vm = new Vue();

/**
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
export function find (list, f) {
  return list.filter(f)[0];
}
/**
 * forEach for object
 */
export function forEachValue (obj, fn) {
  Object.keys(obj).forEach(key => fn(obj[key], key));
}

export function isObject (obj) {
  return obj !== null && typeof obj === 'object';
}

// 数组去重 元素的键
export function uniqueFunc (arr, uniId) {
  const res = new Map();
  return arr.filter((item) => !res.has(item[uniId]) && res.set(item[uniId], 1));
}

export function isPromise (val) {
  return val && typeof val.then === 'function';
}

export function assert (condition, msg) {
  if (!condition) throw new Error(`[vuex] ${msg}`);
}

export function partial (fn, arg) {
  return function () {
    return fn(arg);
  };
}

export const queryToObj = (key) => {
  let url = window.location.search; // 获取当前url
  if (url) {
    let cs = url.split('?')[1]; // 获取?之后的参数字符串
    let csArr = cs.split('&'); // 参数字符串分割为数组
    const obj = {};
    for (let i = 0; i < csArr.length; i++) { // 遍历数组，拿到json对象
      obj[csArr[i].split('=')[0]] = csArr[i].split('=')[1];
    }
    return obj[key];
  }
  return null;
};

// 格式化链接参数
export const getQueryObject = (url) => {
  const search = url.substring(url.lastIndexOf('?') + 1);
  const obj = {};
  const reg = /([^?&=]+)=([^?&=]*)/g;
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1);
    let val = decodeURIComponent($2);
    val = String(val);
    obj[name] = val;
    return rs;
  });
  return obj;
};

export const objToQuery = (obj) => {
  let str = '';
  for (let key in obj) {
    if (str !== '') {
      str += '&';
    }
    if (key) {
      str += key + '=' + encodeURIComponent(obj[key]);
    }
  }
  return str;
};

let pngMagic = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
let jpegJfif = [0x4a, 0x46, 0x49, 0x46];
let jpegExif = [0x45, 0x78, 0x69, 0x66];
let jpegMagic = [0xFF, 0xD8, 0xFF, 0xE0];
let gifMagic0 = [0x47, 0x49, 0x46, 0x38, 0x37, 0x61];
let getGifMagic1 = [0x47, 0x49, 0x46, 0x38, 0x39, 0x61];

function arraycopy (src, index, dist, distIndex, size) {
  for (let i = 0; i < size; i++) {
    dist[distIndex + i] = src[index + i];
  }
}

function arrayEquals (arr1, arr2) {
  if (arr1 === 'undefined' || arr2 === 'undefined') {
    return false;
  }
  if (arr1 instanceof Array && arr2 instanceof Array) {
    if (arr1.length !== arr2.length) {
      return false;
    }
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
    return true;
  }
  return false;
}

export const isImage = (buf) => {
  if (buf === null || buf === 'undefined' || buf.length < 8) {
    return null;
  }
  let bytes = [];
  arraycopy(buf, 0, bytes, 0, 6);
  if (isGif(bytes)) {
    return 'image/gif';
  }
  bytes = [];
  arraycopy(buf, 6, bytes, 0, 4);
  if (isJpeg(bytes)) {
    return 'image/jpeg';
  }
  bytes = [];
  arraycopy(buf, 0, bytes, 0, 8);
  if (isPng(bytes)) {
    return 'image/png';
  }
  return null;
};

/**
 * @param data first 6 bytes of file
 * @return gif image file true,other false
 */
function isGif (data) {
  return arrayEquals(data, gifMagic0) || arrayEquals(data, getGifMagic1);
}

/**
 * @param data first 4 bytes of file
 * @return jpeg image file true,other false
 */
function isJpeg (data) {
  return arrayEquals(data, jpegMagic) || arrayEquals(data, jpegJfif) || arrayEquals(data, jpegExif);
}

/**
 * @param data first 8 bytes of file
 * @return png image file true,other false
 */
function isPng (data) {
  return arrayEquals(data, pngMagic);
}
/**
 * 导出
 *
 * @param {Object} 后端返回的整个response
 */
export function exportExcel (oRequest) {
  const fileName = decodeURIComponent(
    oRequest.headers['content-disposition']
  ).split('=')[1];
  const blob = new Blob([oRequest.data], { type: 'application/vnd.ms-excel' });
  const elink = document.createElement('a');
  elink.download = fileName;
  elink.style.display = 'none';
  elink.href = URL.createObjectURL(blob);
  document.body.appendChild(elink);
  elink.click();
  URL.revokeObjectURL(elink.href); // 释放URL 对象
  document.body.removeChild(elink);
}
/**
 * 下载文件流
 * @param blob 文件流
 * @param filename 文件名字
 * @param type 文件类型 "application/excel"
 */
export function downloadStreamBlob (blob, filename, type = 'application/excel') {
  // 防止重复添加a链接
  const oOldA = document.getElementById('downloadstream');
  if (oOldA) {
    document.body.removeChild(oOldA);
  }
  // https://stackoverflow.com/questions/20310688/blob-download-is-not-working-in-ie
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveBlob(blob, filename);
  } else {
    // let filename = "设备导出{0}.xlsx".format(vpms.core.date.format("yyyyMMddhhmmss"));
    const oAElement = document.createElement('a');
    oAElement.setAttribute('id', 'downloadstream');
    let binaryData = [];
    binaryData.push(blob);
    const URL = window.URL || window['webkitURL']; // 兼容处理
    const url = URL.createObjectURL(new Blob(binaryData, { type }));

    oAElement.href = url;
    oAElement.download = filename;
    oAElement.click();
    URL.revokeObjectURL(url);
  }
}
// 打开url下载文件
export function downloadByUrl (url, fileName) {
  var downloadURL = url;
  let xhr = new XMLHttpRequest();
  xhr.open('GET', downloadURL, true);
  xhr.responseType = 'arraybuffer';
  xhr.onload = function () {
    if (this.status === 200) {
      let blob = new Blob([this.response], { type: 'application/octet-stream"' });
      if (typeof window.navigator.msSaveBlob !== 'undefined') {
        window.navigator.msSaveBlob(blob, fileName);
      } else {
        let URL = window.URL || window.webkitURL;
        let objectUrl = URL.createObjectURL(blob);
        if (fileName) {
          var a = document.createElement('a');
          if (typeof a.download === 'undefined') {
            window.location = objectUrl;
          } else {
            a.href = objectUrl;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            a.remove();
          }
        } else {
          window.location = objectUrl;
        }
      }
    }
  };
  xhr.send();
}

// 导出txt文件
export function exportRaw (fileName, data) {
  // Window.URL 属性返回一个对象，它提供了用于创建和管理对象URLs的静态方法。它也可以作为一个构造函数被调用来构造 URL 对象。
  const urlObject = window.URL || window.webkitURL || window;
  // Blob 对象表示一个不可变、原始数据的类文件对象。
  const exportBlob = new Blob([data]);
  // 创建一个具有指定的命名空间URI和限定名称的元素。 createElementNS() 方法创建带有命名空间的元素节点。该方法返回 Element 对象。
  const saveLink = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
  // URL.createObjectURL() 静态方法会创建一个 DOMString，其中包含一个表示参数中给出的对象的URL。
  // 这个 URL 的生命周期和创建它的窗口中的 document 绑定。这个新的URL 对象表示指定的 File 对象或 Blob 对象。
  saveLink.href = urlObject.createObjectURL(exportBlob);
  // HTMLAnchorElement.download 属性是一个 DOMString ，表明链接的资源将被下载，而不是显示在浏览器中。
  // HTMLAnchorElement 接口表示超链接元素，并提供一些特别的属性和方法（除了那些继承自普通 HTMLElement对象接口的之外）以用于操作这些元素的布局和显示。
  // DOMString 是一个UTF-16字符串。由于JavaScript已经使用了这样的字符串，所以DOMString 直接映射到 一个String。就是一个普通的字符串
  saveLink.download = fileName;
  // 模拟点击事件
  saveLink.click();
}
/**
 * 复制文本到粘
 * 参考：https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
 * @param text 复制的文本
 */

export function fnPureCopyTextToClipboard (text, sucessMessage) {
  let textArea = document.createElement('textarea');
  textArea.style.position = 'fixed';
  textArea.style.top = 0;
  textArea.style.left = 0;
  textArea.style.width = '2em';
  textArea.style.height = '2em';
  textArea.style.padding = 0;
  textArea.style.border = 'none';
  textArea.style.outline = 'none';
  textArea.style.boxShadow = 'none';
  textArea.style.background = 'transparent';
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  try {
    let successful = document.execCommand('copy');
    let msg = successful ? 'successful' : 'unsuccessful';
    if (msg === 'successful') {
      if (sucessMessage) {
        vm.$message.success(sucessMessage);
      } else {
        vm.$message.success('复制成功');
      }
    } else {
      window.prompt('复制: Ctrl+C ', text);
    }
  } catch (err) {
    window.prompt('复制: Ctrl+C ', text);
  }
  document.body.removeChild(textArea);
}

/**
 * 数字转为中文
 */
export function fnPureToChinesNum (Num) {
  for (var i = Num.length - 1; i >= 0; i--) {
    Num = Num.replace(',', '');// 替换Num中的“,”
    Num = Num.replace(' ', '');// 替换Num中的空格
  }
  if (isNaN(Num)) { // 验证输入的字符是否为数字
    // alert("请检查小写金额是否正确");
    return;
  }
  // 字符处理完毕后开始转换，采用前后两部分分别转换
  var part = String(Num).split('.');
  var newchar = '';
  // 小数点前进行转化
  for (let i = part[0].length - 1; i >= 0; i--) {
    if (part[0].length > 10) {
      // alert("位数过大，无法计算");
      return '';
    }// 若数量超过拾亿单位，提示
    var tmpnewchar = '';
    var perchar = part[0].charAt(i);
    switch (perchar) {
    case '0': tmpnewchar = '零' + tmpnewchar; break;
    case '1': tmpnewchar = '一' + tmpnewchar; break;
    case '2': tmpnewchar = '二' + tmpnewchar; break;
    case '3': tmpnewchar = '三' + tmpnewchar; break;
    case '4': tmpnewchar = '四' + tmpnewchar; break;
    case '5': tmpnewchar = '五' + tmpnewchar; break;
    case '6': tmpnewchar = '六' + tmpnewchar; break;
    case '7': tmpnewchar = '七' + tmpnewchar; break;
    case '8': tmpnewchar = '八' + tmpnewchar; break;
    case '9': tmpnewchar = '九' + tmpnewchar; break;
    }
    switch (part[0].length - i - 1) {
    case 0: break;
    case 1: if (perchar !== 0) tmpnewchar = tmpnewchar + '十'; break;
    case 2: if (perchar !== 0) tmpnewchar = tmpnewchar + '百'; break;
    case 3: if (perchar !== 0) tmpnewchar = tmpnewchar + '千'; break;
    case 4: tmpnewchar = tmpnewchar + '万'; break;
    case 5: if (perchar !== 0) tmpnewchar = tmpnewchar + '十'; break;
    case 6: if (perchar !== 0) tmpnewchar = tmpnewchar + '百'; break;
    case 7: if (perchar !== 0) tmpnewchar = tmpnewchar + '千'; break;
    case 8: tmpnewchar = tmpnewchar + '亿'; break;
    case 9: tmpnewchar = tmpnewchar + '十'; break;
    }
    newchar = tmpnewchar + newchar;
  }
  // 替换所有无用汉字，直到没有此类无用的数字为止
  while (newchar.search('零零') !== -1 || newchar.search('零亿') !== -1 || newchar.search('亿万') !== -1 || newchar.search('零万') !== -1) {
    newchar = newchar.replace('零亿', '亿');
    newchar = newchar.replace('亿万', '亿');
    newchar = newchar.replace('零万', '万');
    newchar = newchar.replace('零零', '零');
  }
  // 替换以“一十”开头的，为“十”
  if (newchar.indexOf('一十') === 0) {
    newchar = newchar.substr(1);
  }
  // 替换以“零”结尾的，为“”
  if (newchar.lastIndexOf('零') === newchar.length - 1) {
    newchar = newchar.substr(0, newchar.length - 1);
  }
  return newchar;
}

// 隐藏电话号码中间4位
export function hideTel (mobile) {
  var reg = new RegExp('(\\d{3})(\\d{4})(\\d{4})');
  mobile = mobile.toString();
  var tel = mobile.replace(reg, '$1****$3');
  return tel;
}

/*
 *  description: 防抖函数
 *  param fnName {String}  函数名
 *  param wait {Number}    延迟时间
 *  return: 处理后的执行函数
 */

export function debounce (fnName, wait) {
  let timeout = null;
  return function () {
    let context = this;
    let args = arguments;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      this[fnName].apply(context, args);
    }, wait);
  };
}

// 字段名称 下划线转换驼峰
export function fieldToHump (name) {
  return name.replace(/_(\w)/g, function (all, letter) {
    return letter.toUpperCase();
  });
}
// 字段名称 驼峰转换下划线
export function fieldToLine (name) {
  return name.replace(/([A-Z])/g, '_$1').toLowerCase();
}

// 16进制颜色值转换成rgb
export const hexToRgbArr = (hex) => {
  return [parseInt('0x' + hex.slice(1, 3)), parseInt('0x' + hex.slice(3, 5)), parseInt('0x' + hex.slice(5, 7))];
};

// 动态添加脚本
export function loadScript (url, callback) {
  const script = document.createElement('script');
  script.type = 'text/javascript';

  if (script.readyState) { // IE
    script.onreadystatechange = function () {
      if (script.readyState === 'loaded' || script.readyState === 'complete') {
        script.onreadystatechange = null;
        callback && callback();
      }
    };
  } else { // Others
    script.onload = function () {
      callback && callback();
    };
  }

  script.src = url;
  document.body.appendChild(script);
}

// 输出A-Z 26个大写字母
export function createCharCode () {
  const code = [];
  for (let i = 0; i < 26; i++) {
    code.push(String.fromCharCode(65 + i));
  }
  return code;
}
// 千分位分隔符 1000 -> 1,000
export function formatNumOfThousands (num) {
  let reg = /\d{1,3}(?=(\d{3})+$)/g;
  return (num + '').replace(reg, '$&,');
}
