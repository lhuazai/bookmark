window.onload = function () {
  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    let li = document.createElement('a');
    li.href = element.url;
    li.innerHTML = `${index +1}:  ${element.title}`;
    li.target = '_blank';
    li.addEventListener('click', function (e) {
        e.preventDefault();
        document.getElementById('iframe').contentWindow.location.replace(element.url);
    })
    document.getElementById('content').appendChild(li);
  }
}