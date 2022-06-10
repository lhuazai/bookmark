
// canvas 实现 watermark
export function __canvasWM (data = {}) {
  // 使用 ES6 的函数默认值方式设置参数的默认取值
  // 具体参见 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Default_parameters

  const args = arguments[0];
  const canvas = document.createElement('canvas');
  const { container, width, height, textAlign, textBaseline, font, fillStyle, content, rotate, zIndex } = data;
  canvas.setAttribute('width', width);
  canvas.setAttribute('height', height);
  const ctx = canvas.getContext('2d');

  ctx.textAlign = textAlign;
  ctx.textBaseline = textBaseline;
  ctx.font = font;
  ctx.fillStyle = fillStyle;
  ctx.rotate(Math.PI / 180 * rotate);
  ctx.fillText(content, parseFloat(width) / 2, parseFloat(height) / 2);

  const base64Url = canvas.toDataURL();
  const __wm = document.querySelector('.__wm');

  const watermarkDiv = __wm || document.createElement('div');
  const styleStr = `
          position:absolute;
          top:0;
          left:0;
          width:100%;
          height:100%;
          z-index:${zIndex};
          pointer-events:none;
          background-repeat:repeat;
          background-image:url('${base64Url}')`;

  watermarkDiv.setAttribute('style', styleStr);
  watermarkDiv.classList.add('__wm');

  if (!__wm) {
    container.style.position = 'relative';
    container.insertBefore(watermarkDiv, container.firstChild);
  }

  const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
  if (MutationObserver) {
    let mo = new MutationObserver(function () {
      const __wm = document.querySelector('.__wm');
      // 只在__wm元素变动才重新调用 __canvasWM
      if ((__wm && __wm.getAttribute('style') !== styleStr) || !__wm) {
        // 避免一直触发
        mo.disconnect();
        mo = null;
        __canvasWM(JSON.parse(JSON.stringify(args)));
      }
    });

    mo.observe(container, {
      attributes: true,
      subtree: true,
      childList: true
    });
  }
}

if (typeof module !== 'undefined' && module.exports) { // CMD
  module.exports = __canvasWM;
// eslint-disable-next-line no-undef
} else if (typeof define === 'function' && define.amd) { // AMD
  // eslint-disable-next-line no-undef
  define(function () {
    return __canvasWM;
  });
} else {
  window.__canvasWM = __canvasWM;
}

// 使用
// __canvasWM({
//   container: document.body,
//   width: '240px',
//   height: '200px',
//   textAlign: 'center',
//   textBaseline: 'middle',
//   font: '14px microsoft yahei',
//   fillStyle: 'rgba(184, 184, 184, 0.2)',
//   content: this.userinfo.realName + ' ' + this.userinfo.employeeNumber,
//   rotate: '-30',
//   zIndex: 1000
// });
