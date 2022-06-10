let designSize = 1920; // 设计图尺寸
export function fnResize (designWidth = designSize) {
  designSize = designWidth; // 设计图尺寸
  let html = document.documentElement;
  let wW = html.clientWidth;
  let wH = html.clientHeight;
  if (wW * 9 > wH * 16) {
    wW = wH / 9 * 16;
  }
  let rem = wW * 100 / designSize;

  document.documentElement.style.fontSize = rem + 'px';
}
// 绑定到窗口的这个事件中
window.onresize = fnResize;
