---
title: 試著把 Caps Lock 當成 Ctrl 使用吧
date: 2020-02-05 22:00:00 +0800
tags: keyboard macos windows linux ubuntu debian archlinux
---

一直以來聽說過很多高手──尤其是重度依賴鍵盤的程式設計師們──會把美式鍵盤上的 <kbd>Caps Lock</kbd> 設定成 <kbd>Ctrl</kbd>（Mac 上的 <kbd>Control</kbd>），於是今年開始我也決定來試著多按幾下 <kbd>Caps Lock</kbd> 看看。

## Why <kbd>Caps Lock</kbd> ?

一般寫程式碼的時候不太會遇到長時間輸入全大寫的情況，就算有，頂多按住 <kbd>Shift</kbd> 幾秒就行（甚至各種 IDE 都有自動補完功能），<kbd>Caps Lock</kbd> 幾乎無用武之地。

除此之外，而且還能得到各種組合鍵更順手的按法，常用的 <kbd>Ctrl</kbd> + <kbd>C</kbd>、<kbd>Ctrl</kbd> + <kbd>V</kbd>、<kbd>Ctrl</kbd> + <kbd>A</kbd> 不會按到小指抽筋發麻了（傳統 Unix 系統鍵盤的 <kbd>Control</kbd> 是在 <kbd>A</kbd> 旁邊的）。

## 各種系統的設定方式

以下是我在手邊各作業系統的設定方式，僅供參考。

### macOS

macOS 的設定很簡單，到「系統偏好設定（System Preferences）」裡的「鍵盤（Keyboard）」>「變更鍵（Modifier Keys）」就可以修改 <kbd>Control</kbd> 跟 <kbd>Caps Lock</kbd> 的對應了。

### Windows

#### 方法一：官方小工具

微軟官方有提供「[Ctrl2cap](https://docs.microsoft.com/en-us/sysinternals/downloads/ctrl2cap)」這個小工具可以讓 <kbd>Caps Lock</kbd> 變成 <kbd>Ctrl</kbd>。下載後解壓縮、在命令提示字元執行 `ctrl2cap /install` 安裝即可。如果要還原則執行 `ctrl2cap /uninstall`。

#### 方法二：編輯登錄檔

就算不安裝上述的小工具，光靠編輯登錄檔的方式也可以修改鍵盤對應：在 `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Keyboard Layout` 新增一個二進位值 `Scancode Map`，數值為 `00,00,00,00,00,00,00,00,02,00,00,00,1d,00,3a,00,00,00,00,00`。

可以寫成登錄檔（`.reg`）存起來：

```
Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Keyboard Layout]
"Scancode Map"=hex:00,00,00,00,00,00,00,00,02,00,00,00,1d,00,3a,00,00,00,00,00
```

如果要還原，刪除或還原到原本的 `Scancode Map` 就好。記得都要重新開機或登入。

以上兩種方法都會維持 <kbd>Ctrl</kbd> 原本的功能，因此就算一開始不習慣按 <kbd>Caps Lock</kbd> 也沒關係，<kbd>Ctrl</kbd> 依然是熟悉的 <kbd>Ctrl</kbd>。

### Ubuntu / Debian

Ubuntu / Debian 的 Xorg 鍵盤設定在 `/etc/default/keyboard` 這個檔案，在 `XKBOPTIONS` 加入：

* `ctrl:nocaps`：讓 <kbd>Caps Lock</kbd> 變成 <kbd>Ctrl</kbd>，同時維持 <kbd>Ctrl</kbd> 原本的功能。
* `ctrl:swapcaps`：交換 <kbd>Caps Lock</kbd> 和 <kbd>Ctrl</kbd> 兩個按鍵的功能 。

`/etc/default/keyboard` 的範例：

```bash
# KEYBOARD CONFIGURATION FILE

# Consult the keyboard(5) manual page.

XKBMODEL="pc105"
XKBLAYOUT="us"
XKBVARIANT=""
XKBOPTIONS="ctrl:nocaps"

BACKSPACE="guess"
```

### Arch Linux

Arch Linux 是在 `/etc/X11/xorg.conf.d/00-keyboard.conf` 裡（乾淨的系統裡應該沒有這個檔案，要自己建立）設定 `XkbOptions` 的值。

`/etc/X11/xorg.conf.d/00-keyboard.conf` 的範例：

```bash
Section "InputClass"
	Identifier "system-keyboard"
	MatchIsKeyboard "on"
	Option "XkbOptions" "ctrl:nocaps"
EndSection
```

## 參考資料

* [諸君！把 Control 和 Caps Lock 交換吧](https://blog.yorkxin.org/2016/12/27/ergonomic-control-key.html)
* [更改 Mac 上變更鍵的行為](https://support.apple.com/zh-tw/guide/mac-help/mchlp1011/mac)
* [Windows10 CapsLockキーをCtrlキーに割りあててしまおう！](http://www.shin-tan.com/swapKey){: lang="ja"}
* [Xorg/Keyboard configuration](https://wiki.archlinux.org/index.php/Xorg/Keyboard_configuration)
