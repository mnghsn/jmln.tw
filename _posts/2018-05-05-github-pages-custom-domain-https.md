---
title: GitHub Pages Custom Domains HTTPS 設定心得
date: 2018-05-05 22:00:00 +0800
tags: github-pages https
---

![GitHub Pages 的 HTTPS 設定（已啟用狀態）](/assets/posts/2018-05-05-github-pages-custom-domain-https/https-settings.min.png)

前幾天 GitHub 終於宣布[使用自訂網域的 GitHub Pages 網站也可以使用 HTTPS 了](https://blog.github.com/2018-05-01-github-pages-custom-domains-https/)，從[好幾年前](https://github.com/isaacs/github/issues/156 "isaacs/github#156")提出的 issue 終於實現。憑證的部分是由 [Let's Encrypt](https://letsencrypt.org/) 所提供的，簡單來說只要設定好 GitHub Pages 提供的 DNS，GitHub 就會幫你搞定憑證申請、自動續約的工作，非常方便。

既然 GitHub 這麼好心，那就來把這個網站（jmln.tw）也設定好 HTTPS 吧。原本我是使用 [Cloudflare](https://www.cloudflare.net) 所提供的 Flexible SSL，所以從 Cloudflare 到使用者這段就預設是加密連線了，不過設定好 GitHub Pages 之後，就能使用 Cloudflare 全段加密的 Full (Strict) SSL，更加安全了。（雖然對沒有隱私資料傳輸的靜態網站來說沒什麼差啦，不過有加密看起來就是心情好。）

設定方法很簡單。根據官方文件，去網域的 DNS 伺服器設定好 [GitHub 提供的 IP](https://help.github.com/articles/setting-up-an-apex-domain/#configuring-a-records-with-your-dns-provider) 就行了。如果已經有設定好自訂網域（`CNAME` 檔案）的話，要移除之後再重新加回去，GitHub 才會幫你處理後續的憑證工作。

不過我設定的時候發現，即便 Cloudflare 那邊的 DNS 已經更新好了，GitHub 還是抓不到新的 IP 設定（等了一天，應該不是 DNS 沒生效的問題…）。最後是把 Cloudflare 暫時關掉（Pause 功能）之後才過關。等個幾分鐘讓 GitHub 去處理憑證之後，鏘鏘！一個完整的 HTTPS 網站誕生了！
