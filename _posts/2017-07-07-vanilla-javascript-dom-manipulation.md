---
title: 都 2017 年了，學學用原生 JS 來操作 DOM 吧
date: 2017-07-07 10:00:00 +0800
tags: javascript jquery dom
---

> 註：本文最早發表於批踢踢實業坊（PTT）的 Ajax 版（[這裡](https://www.ptt.cc/bbs/Ajax/M.1491563311.A.1F2.html)）和 WebDesign 版（[這裡](https://www.ptt.cc/bbs/Web_Design/M.1491563726.A.508.html)）。

JavaScript 在經過這幾年的進化之後，原本大家習慣使用第三方函示庫（例如 jQuery）包裝的 DOM 操作方法，現在都能夠使用原生的 JavaScript 來達成了。

## 查詢和取得 DOM

我們有很方便的 `querySelector()` 和 `querySelectorAll()` 方式來取得 DOM。

```js
// 取得單一元素
const oneElement = document.querySelector('#foo > div.bar')

// 取得所有符合的元素
const allElements = document.querySelectorAll('.bar')
```

可以透過 `matches()` 方式檢查元素是否符合指定的選擇器。

```js
oneElement.matches('div.bar') === true
```

也可以在特定的元素底下繼續查詢。

```js
const button = allElements.querySelector('button[type="submit"]')
```

那以前慣用的 `getElementById()`、`getElementsByTagName()` 呢？當然也可以使用，但是 `querySelector()` 不能動態更新查詢到的元素。

```js
const elementsNew = document.querySelectorAll('div')
const elementsOld = document.getElementsByTagName('div')

// 動態插入一個新的 div
const newDiv = document.createElement('div')
document.body.appendChild(newDiv)

// elementsOld 會拿到 newDiv；elementsNew 則否。
elementsNew.length !== elementsOld.length
```

把 `querySelectorAll()` 回傳的 NodeList 轉成 Array 之後，就能用 `forEach()` 方式走訪每個元素。

```js
Array.from(allElements).forEach(element => { // do something... })

// IE 還不支援 Array.from()，可以用：
Array.prototype.forEach.call(allElements, element => {
  // do something...
})

// 更短的寫法：
[].forEach.call(allElements, element => {
  // do something...
})
```

## 修改 class 和屬性

要修改元素的 class，可以用方便的 classList 操作。

```js
oneElement.classList.add('baz')
oneElement.classList.remove('baz')
oneElement.classList.toggle('baz')

// 檢查是否有指定的 class
oneElement.classList.contains('baz')
```

要修改元素的屬性（attribute），直接指定給該元素即可。

```js
// 取得屬性
const oneValue = oneElement.value

// 設定屬性
oneElement.value = 'hello'

// 一口氣設定好多種屬性，用 Object.assign()
Object.assign(oneElement. { value: 'hello', id: 'world' })

// 要刪除屬性，設定成 null 就好
oneElement.value = null
```

等等，那為何不用 `getAttribute()`、`setAttribute()` 和 `removeAttribute ()` 呢？因為這些方式是直接修改 HTML 的屬性，會導致瀏覽器進行重繪（redraw），對效能來說是很大的影響（換句話說就是很慢）。但如果你要修改的屬性真的需要重繪畫面（例如表格的 `colspan` 屬性等等）時例外。

要修改元素的 CSS 樣式，可以存取 style 物件。

```js
oneElement.style.paddingTop = '2rem'
```

要取得元素的 CSS 值，可以像上面一樣透過 style 物件，也可以透過 `window.getComputedStyle()` 取得實際的值。

```js
window.getComputedStyle(oneElement).getPropertyValue('padding-top')
```

## 修改 DOM

```js
// 在 element1 裡插入一個 element2
element1.appendChild(element2)

// 在 element1 裡的 element3 之前插入一個 element2
element1.insertBefore(element2, element3)
```

世界上有 `insertBefore()` 卻沒有 `insertAfter()`，所以必須繞個圈。

```js
// 在 element1 裡的 element3 「之後」插入一個 element2
element1.insertBefore(element2, element3.nextSibling)
// 不能寫成：
// element1.insertAfter(element2, element3)
```

```js
// 複製 DOM
const newElement = oneElement.cloneNode()
element1.appendChild(newElement)

// 建立新的 DOM
const newElement = document.createElement('div')
const newTextNode = document.createTextNode('hello world')

// 移除 DOM，需要參照到親元素
parentElement.removeChild(element1)

// 自己移除自己
element1.parentNode.removeChild(element1)
```

要修改元素的內容，傳統的做法可以用 `innerHTML`：

```js
oneElement.innerHTML = '<div><h1>hello world</h1></div>'
```

更好的做法是使用 `DocumentFragment`：

```js
const text = document.createTextNode('continue reading...')
const hr = document.createElement('hr')
const fragment = document.createDocumentFragment()

fragment.appendChild(text)
fragment.appendChild(hr)

oneElement.appendChild(fragment)
```

## 監聽事件

JavaScript 最重要的就是監聽（listen）各種事件來觸發程式碼。我們使用 addEventListener 來監聽事件處理。

```js
oneElement.addEventListener('click', function (event) {
  // do something...
})
```

同時監聽許多元素時，透過 `event.target` 來取得是哪個元素觸發的。

```js
Array.from(allElements).forEach(element => {
  element.addEventListener('change', function (event) {
    console.log(event.target.value)
  })
})
```

只想讓事件觸發一次（jQuery 的 `once`）：

```js
oneElement.addEventListener('change', function listener(event) {
  console.log(event.type + ' got triggered on ' + this)
  this.removeEventListener('change', listener)
})
```

## 動畫

以前習慣用 `window.setTimeout()` 來做動畫，現在我們有更好更快的 `window.requestAnimationFrame()` 了。

```js
const start = window.performance.now()
const duration = 2000

window.requestAnimationFrame(function fadeIn (now) {
  const progress = now - start
  oneElement.style.opacity = progress / duration

  if (progress < duration) {
    window.requestAnimationFrame(fadeIn)
  }
}
```

## 包裝

最後我們可以把這些方式全部包在一個 function 裡。就像 jQuery 一樣，還可以鍊式呼叫（chainable）（例如：`$('foo').css({color: 'red'}).on('click', () => {})`）

```js
const $ = function $(selector, context = document) {
  const elements = Array.from(context.querySelectorAll(selector))

  return {
    elements,

    html (newHtml) {
      this.elements.forEach(element => {
        element.innerHTML = newHtml
      })
      return this
    },

    css (newCss) {
      this.elements.forEach(element => {
        Object.assign(element.style, newCss)
      })
      return this
    },

    on (event, handler, options) {
      this.elements.forEach(element => {
        element.addEventListener(event, handler, options)
      })
      return this
    }

    // etc.

  }
}
```

或者用 ES6 的 Class 來包裝：

```js
class DOM {
  constructor(selector) {
    const elements = document.querySelectorAll(selector)
    this.length = elements.length
    Object.assign(this, elements)
  }

  each(callback) {
    for (let el of Array.from(this)) {
      callback.call(el)
    }
    return this
  }

  addClass(className) {
    return this.each(function () {
      this.classList.add(className)
    })
  }

  removeClass(className) {
    return this.each(function () {
      this.classList.remove(className)
    })
  }

  hasClass(className) {
    return this[0].classList.contains(className)
  }

  on(event, callback) {
    return this.each(function () {
      this.addEventListener(event, callback, false)
    })
  }

  // etc.

}
```
