---
title: 開啟 Incremental Regeneration 加速 Jekyll
date: 2017-08-05 21:10:00 +0800
tags: jekyll
---

[Jekyll](https://jekyllrb.com/) 在 3.0 版本之後導入了「**[Incremental Regeneration](https://jekyllrb.com/docs/configuration/#incremental-regeneration)**」功能，透過「只處理前後兩次 build 時有變更過的檔案」來大幅增加 build 的速度。對於以往一直被嫌速度太慢的 Jekyll 可以說是非常大的進步（不過還是輸 Hexo 或 Hugo 這些新興框架。沒辦法，人家語言天生就比較快）。

<!--more-->

要開啟 Incremental Regeneration 有兩種方法：

* 在 `_config.yml` 中設定 `incremental: true`
* 在終端機下指令（`jekyll build` 或 `jekyll serve`）時指定 `--incremental`（`-I`）參數。

如果是放在 GitHub Pages 上的網站，GitHub 目前還不開放 Incremental Regeneration，請參考 [GitHub 官方文件的說明](https://help.github.com/articles/configuring-jekyll/#configuration-settings-you-cannot-change)。

Incremental Regeneration 會追蹤各個檔案的相依關係，例如 A 檔案用 `{% raw %}{% include %}{% endraw %}` 嵌入了 B 檔案，那麼如果 B 檔案被修改了，Jekyll 也會重新產生 A 檔案（甚至連 SCSS 的 `@import` 相依關係也會追蹤）。至於其他沒變的檔案因為上一次產生時就有了，所以跳過不處理。

這些資訊會記錄在根目錄下的 `.jekyll-metadata` 檔案裡。這個檔案不需要版控，記得在 `.gitignore` 排除這個檔案。

不過有些例外狀況必須手動設定，例如網站首頁通常會使用 `{% raw %}{% for post in site.posts %}{% endraw %}` 之類的迴圈列出所有文章。這時候如果新增了一篇文章，Incremental Regeneration 是沒辦法自動更新首頁的。解決方法是在 Front-Matter 加入 `regenerate: true`，告訴 Jekyll 無論如何都要強制產生這個檔案。

一般而言網站穩定上線之後不會常常更動版面、只是偶爾新增一點文章時，Incremental Regeneration 就很適合派上用場了。
