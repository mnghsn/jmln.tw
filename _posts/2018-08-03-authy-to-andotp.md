---
title: 從 Authy 轉換至 andOTP
date: 2018-08-03 12:00:00 +0800
tags: otp authy andotp
---

近年來越來越多線上服務使用[兩步驟驗證](https://zh.wikipedia.org/wiki/雙重認證)來增加安全性，在登入時要取得兩步驟驗證的[單次有效密碼（OTP）](https://zh.wikipedia.org/wiki/一次性密碼)，除了手機簡訊之外，更方便的是使用 OTP 產生器。

早期我使用的是 Google 自家的 [**Google Authenticator**](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2)，不過隨著要驗證的網站越來越多，簡潔的界面反而難以識別和管理。更重要的是 Google Authenticator 不支援備份功能，要是手機故障、遺失、或是更換新手機時，就得回到各個網站一一重設兩步驟驗證，非常麻煩（我通常不會 root 我的手機，所以也不能使用鈦備份之類的方式）。

{% include tags/image.html url="/assets/posts/2018-08-03-authy-to-andotp/google-authenticator.min.png" description="Google Authenticator 螢幕擷圖，取自 Google Play。" %}

後來我轉移到了 [**Authy**](https://authy.com/) 這個服務，看上的就是它有線上備份 TOPT 密鑰的功能，而且支援多個裝置同時登入，就算換手機也只要登入 Authy 的帳號密碼，所有 OTP 就通通回來了。等等，把 TOTP 的密鑰丟給第三方？這樣豈不是本末倒置嗎？是的，當然這樣會犧牲一點安全性，但是安全和便利本就是很難兼顧的東西，而且 Authy 就我所知目前為止還沒有出包的紀錄，還算放心。

{% include tags/image.html url="/assets/posts/2018-08-03-authy-to-andotp/authy.min.png" description="Authy 螢幕擷圖，取自 Google Play。" %}

雖說如此，Authy 仍是有些美中不足的缺點，例如它的 Android 應用程式可以設定每個網站的圖示，但是解析度很差、也缺少很多我正在使用的網站圖示，整體而言界面不算很好看，而且它不是開放原始碼的應用程式（好啦，可能很少人會在乎這點…）。所以前幾天試著尋找是否有更好的替代方案。

在搜尋過 [Google Play](https://play.google.com/) 和 [F-Droid](https://f-droid.org/) 之後，發現 [**FreeOTP**](https://play.google.com/store/apps/details?id=org.fedorahosted.freeotp) 和 [**andOTP**](https://play.google.com/store/apps/details?id=org.shadowice.flocke.andotp) 這兩款都是開源的 OTP 產生器。FreeOTP 是 RedHat 出品的，使用者也不少，可惜試用過後發現它沒有加密備份功能（開發者[表示](https://github.com/freeotp/freeotp-android/issues/20#issuecomment-407879122)有在試著開發中）。andOTP 則是從[另一款 Autheticator](https://f-droid.org/en/packages/net.bierbaumer.otp_authenticator/) 分支出來的版本（後者在 2015 年就停止更新了），andOTP 在原有的架構上新增了不少功能，還有豐富的網站圖示、標籤分類功能。因此我決定使用 andOTP 當作現在的 OTP 產生器。

{% include tags/image.html url="/assets/posts/2018-08-03-authy-to-andotp/andotp.min.png" description="andOTP 螢幕擷圖，取自 Google Play。" %}

andOTP 的優點：

* App 本身有安全鎖，可以設定密碼或 PIN 碼才能開啟 App。也可以設定成使用手機的圖形鎖、指紋辨識等等。
* 可以備份和還原 TOTP 密鑰，密鑰很重要，所以可以用密碼或 PGP 加密備份的檔案。
* 內建各種網站圖示。
* 可以用標籤分類各個網站。
* 只要相機（掃描 QR Code）和儲存空間（備份）權限。
* [It's open source!](https://github.com/andOTP/andOTP)

問題來了，我在 Authy 有十幾個網站的 OTP，要怎麼轉移到 andOTP 上呢？最安全的辦法就是回到各網站重新設定兩步驟驗證，這樣 TOTP 密鑰會被重設，Authy 伺服器上的密鑰就沒用了。

另一種懶人的辦法是參考 <https://gist.github.com/gboudreau/94bb0c11a6209c82418d01a59d958c93> 這裡的辦法，透過 Chrome 瀏覽器的 Authy 應用程式取得原本的 TOTP 密鑰，然後用 andOTP 掃描 QRCode 就行了。全部轉移完就可以把 Authy 帳號砍掉囉。
