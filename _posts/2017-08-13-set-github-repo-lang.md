---
title: 設定 GitHub 上顯示的程式語言狀態
date: 2017-08-13 22:00:00 +0800
tags: git gitattributes github linguist
---

在每個 GitHub 的 repository 首頁都有一個顯示程式語言組成比例的狀態列：

![GitHub 程式語言狀態列]({% link /assets/posts/2017-08-13-set-github-repo-lang/github-lang-stats-bar.png %})

GitHub 是透過 [Linguist](https://github.com/github/linguist) 這個 Ruby gems 來判斷和計算各個檔案的程式語言。

雖然 GitHub 會自動幫我們搞定，但是有時候難免會想要排除一些特殊檔案，例如：

* 把相依的（第三方）套件直接放在 repo 裡面的時候。
* 把文件說明也放在同一個 repo 裡面的時候。

這時候可以透過在根目錄新增一個 `.gitattributes` 檔案來覆寫 Linguist 的判斷。

<!--more-->

## 指定檔案的程式語言

使用 `linguist-language=*` 指定程式語言。

```
*.rb linguist-language=Java
```

這會影響狀態列比例的計算，以及 GitHub 網頁上觀看程式碼時的 syntax highlighting。

## 排除第三方程式碼

使用 `linguist-vendored` 排除第三方的程式碼（例如網頁用到的 jQuery）。

```
assets/vendor/* linguist-vendored
assets/images/* linguist-vendored=false
```

## 排除專案的文件說明

使用 `linguist-documentation` 排除專案文件檔案。

```
docs/* linguist-documentation
docs/formatter.rb linguist-documentation=false
```

## 排除自動產生的程式碼

使用 `linguist-generated` 排除程式自動產生的檔案（例如最小化過的 JavaScript、編譯過的 CoffeeScript 檔案等等）。

```
js/main.min.js linguist-generated=true
```

## References

* [github/linguist](https://github.com/github/linguist)
* [リポジトリの言語割合にドキュメントを含めないようにする方法](http://qiita.com/yuku_t/items/15888c95e32f43e6c830)
