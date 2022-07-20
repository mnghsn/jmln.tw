---
title: 為什麼我選擇用 Jekyll？談靜態網站產生器
date: 2017-06-27 17:00:00 +0800
last_modified_at: 2018-03-02 18:00:00 +0800
tags: jekyll wordpress hexo hugo
redirect_from: /blog/why-i-choose-jekyll.html
---

當初在規劃要架設這個部落格時，評估和試用了一些現在熱門的部落格系統。現在趁著部落格剛上線沒多久，把這些心得紀錄下來。

首先大方向就是我想要使用**靜態網站產生器（static website generator）**，而不是 [**WordPress**](https://wordpress.org/) 之類的動態網站。當然 WordPress 是很棒的內容管理系統（CMS），我以前也用過好幾年的 WordPress 來架設網站。但對於這種~~邊緣~~單人的小小部落格，出動到 WordPress 實在是有殺雞焉用牛刀之感。而且使用資料庫這件事在未來萬一要搬遷網站的時候也比較麻煩，不像以檔案為基底的靜態網站，直接整個 Git repository 包起來帶著走就好。

談到靜態網站產生器，最大牌的就是 [**Jekyll**](https://jekyllrb.com/)，也是 [GitHub Pages](https://pages.github.com/) 採用的系統。Jekyll 是用 [Ruby](https://www.ruby-lang.org/) 語言寫成的。我和 Ruby 還不太熟，但是除非是要開發外掛，不然一般用 Jekyll 不太會碰到真的要寫 Ruby 的時候，只要專注在前端（HTML、CSS、JavaScript）和文章內容就好。

接著是用 [Node.js](https://nodejs.org/) 寫成的 [**Hexo**](https://hexo.io/)，這是台灣人開發的（台灣之光～）。其實 Hexo 一直都有在我的考慮名單之內，因為 JavaScript 是我比較熟悉的語言，也有很多[外掛](https://hexo.io/plugins/)方便使用。不過之前在試著用 Hexo 架設部落格時，一直踩到很多文件上沒有的奇怪地雷，例如 `{% raw %}{% asset_path %}{% endraw %}` 標籤外掛的用法等等，還得去翻原始碼才能搞懂。

另外 Hexo 的設計是佈景主題是獨立的，而佈景主題的設定檔案（`_config.yml`）竟然優先於全站的設定，也就是說你不能直接用 Git submodule 安裝別人的佈景主題，因為這樣會把別人的設定全部導進來，必須直接複製檔案、或是另外 clone 一個新的 repository 才行，然後更新時要處理跟上游的 conflict，想到就頭痛…😣。

[**Hugo**](https://gohugo.io/)，這是用目前正夯的 [Go](https://golang.org/) 語言寫成的新興框架。特色是速度極快，也具備其他框架大多數的功能。問題是沒有 CSS 和 JavaScript 的 preprocessor，必須用其他方式（例如 Grunt 或 Gulp 等）來輔助建置，當然這稱不上缺點，不過我還是希望整個專案能乾淨一點（不要太多種語言），因此沒有選擇用 Hugo。

其他還有很多靜態網站產生器（可參考 [StaticGen](https://www.staticgen.com/) 這個網站），但是社群生態的活躍程度不一，很怕哪一天就突然死掉了…

至於從零開始重寫一個部落格框架這件事，考量到時間成本和不要重複造輪子的問題，很快就打消了這個想法。

**最後我選擇的還是 Jekyll 👍。**因為它在 GitHub 上的星星數是同類型專案的冠軍~~（膚淺）~~，而且有 GitHub 掛保證，內建 SCSS 也方便設計佈景主題。能直接放在 GitHub Pages 上也省去自架主機的瑣事。

Jekyll 的自由度也很高，任何檔案都可以導入 Liquid 樣板，幾乎不靠任何外掛就可以架設一個基本的部落格~~，像現在這個部落格就以不用非 Jekyll 內建的外掛為目標~~。

Jekyll 最為人詬病的缺點就是建置的速度太慢，文章多的話花上一兩分鐘都有可能。但是自從有了 [Incremental Regeneration](https://jekyllrb.com/docs/configuration/#incremental-regeneration) 之後，可以在每次 build 時忽略沒有修改過的檔案，速度就像開了 turbo 一樣。更何況放在 GitHub Pages 上就等於把 build 這項工作丟給 GitHub 去跑，清爽無負擔。

或許未來靜態網站產生器的生態又會改變，又或者文章越來越多、Jekyll 已經不敷使用等等情況，到時候可能會換到其他框架。用 Markdown 寫文章的好處就是格式標準化，可以到處搬移帶著走，不會被資料庫系統綁住。
