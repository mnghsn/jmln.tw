---
title: 更加方便的原生 JavaScript 與 DOM 操作
date: 2017-07-31 22:20:00 +0800
tags: javascript jquery dom
redirect_from: /blog/dom-manipulation-methods.html
---

在上一篇「[都 2017 年了，學學用原生 JS 來操作 DOM 吧](2017-07-07-vanilla-javascript-dom-manipulation.md)」中整理了一些使用單純 JavaScript 來操作 DOM（文件物件模型）的方式，不過說實話很多撇步都還稱不上是非常優雅和直覺。尤其對常年用慣 jQuery 的開發者們來說，要轉換過來得花點功夫改寫，還得處理各家瀏覽器的差異。

好家在咱們的 JavaScript 依然不停地進化，現代瀏覽器都實作了更多更方便的 API 來無痛達成 library-free 的開發。

## DOM Manipulation Convenience Methods

[DOM manipulation convenience methods](https://dom.spec.whatwg.org/#interface-childnode) 是 WHATWG 的 Living Standard，提供更接近 jQuery 用法的 DOM API。

### 移除一個元素

要從頁面上刪掉一個指定的元素，在 jQuery 我們這樣寫：

```js
var $elem = $('.someClass');
$elem.remove();
```

沒有 jQuery 的話，必須先參照到親元素（`parentNode`）之後才能回來刪：

```js
var elem = document.querySelector('.someClass');
elem.parentNode.removeChild(elem);
```

**現在我們有清爽優雅的新 API：**

```js
var elem = document.querySelector('.someClass');
elem.remove();
```

### 在元素裡面 Prepend 內容

在 jQuery 我們這樣寫：

（以下假設 `$elem` 是 jQuery `$(...)` 選出來的物件；而 `elem` 是 `document.querySelector(...)` 選出來的 `Element` 物件。）

```js
$elem.prepend($someOtherElem);
```

**現在原生 JavaScript 也完全比照辦理：**

```js
elem.prepend(someOtherElem);
```

### 在元素前插入另一個元素

在 jQuery 我們這樣寫：

```js
$elem.before($someOtherElem);
```

**現在原生 JavaScript 也完全比照辦理：**

```js
elem.before(someOtherElem);
```

### 取代物件

在 jQuery 我們這樣寫：

```js
$elem.replaceWith($someOtherElem);
```

**現在原生 JavaScript 也完全比照辦理：**

```js
elem.replaceWith(someOtherElem);
```

### 尋找最接近的元素

在 jQuery 我們這樣寫：

```js
$elem.closest('div');
```

**現在原生 JavaScript 也完全比照辦理：**

```js
elem.closest('div');
```

### 瀏覽器支援程度

要談到傷感情的瀏覽器支援了，根據 [Can I use...](http://caniuse.com/#feat=dom-manip-convenience) 的資料，支援 DOM manipulation methods 為：

* ✔️ Firefox 49+
* ✔️ Chrome 54+
* ✔️ Opera 41+
* ✔️ Safari 10+
* ✔️ iOS Safari 10.0-10.2
* ✔️ Android Chrome 59+
* ✔️ Android Firefox 54+
* ❌ IE & Edge 不支援（Edge 正在努力實作中…）
* ❌ Opera Mobile & Opera Mini 不支援

看到 IE 不支援先不要沮喪，下面會介紹如何讓 IE 也能跟上腳步的方法（polyfill）。

## 更彈性的 `addEventListener` 可以接第三個參數了

主要是用在類似 jQuery 的 `$(...).once()`（只觸發事件一次）。

```js
elem.addEventListener('click', someFunc, { once: true });
```
### 瀏覽器支援程度

詳細支援表格請參考：<http://caniuse.com/#feat=once-event-listener>

* ✔️ Firefox 50+
* ✔️ Chrome 55+
* ✔️ Safari's technology preview 7+

## `NodeList` 終於可以 `forEach` 了

由於 `document.querySelectorAll(...)` 回傳的 `NodeList` 不是 `Array`，以往不能直接給它接 `forEach(...)` 下去跑，得繞個圈子才行：

```js
var myArrayFromNodeList = [].slice.call(document.querySelectorAll('li'));

// or:
[].forEach.call(myNodeList, function (item) {...}

// or:
Array.from(querySelectorAll('li')).forEach((li) => /* do something with li */);
```

這走訪元素實在是太常用了，每次都這樣寫實在很阿雜。現在我們終於有 iterable 的 `NodeList` 了！

```js
document.querySelectorAll('li').forEach((li) => /* do some stuff */);
```

（不過要注意它還是 `NodeList` 而非 `Array`）

### 瀏覽器支援程度

* ✔️ Firefox 50+
* ✔️ Chorme 51+
* ✔️ Opera 38+
* ✔️ Safari 10+
* ❌ IE & Edge 不支援

## 遇到舊瀏覽器怎麼辦？

很多時候不能棄舊瀏覽器而去，幸好有個好用的服務叫做 [Polyfill.io](https://polyfill.io/)，只要在網頁加上他們提供的 JS 檔案：

```html
<script src="https://cdn.polyfill.io/v2/polyfill.min.js"></script>
```

Polyfill.io 會根據 User-agent 判斷使用者的瀏覽器種類和版本，自動回傳相對應的向下相容實作。完全不用動腦就能讓舊瀏覽器享受新功能。

例如 IE 11 以下都沒有 `Array.from()` 方法，Polyfill.io 就會定義一個 Array.from 給瀏覽器用。完整的支援功能可以參考 <https://polyfill.io/v2/docs/features/>。

## References

* [(Now More Than Ever) You Might Not Need jQuery](https://css-tricks.com/now-ever-might-not-need-jquery/)
* [NodeList - Web APIs｜MDN](https://developer.mozilla.org/en/docs/Web/API/NodeList)
* [Once Upon an Event Listener](https://developers.google.com/web/updates/2016/10/addeventlistener-once)
