# めうちきりんのメトロポリス
![title](./assets/title.jpg)

**「めうちきりんのメトロポリス」** は、文章生成にカットアップと自然言語処理の知見を活用した、ショートショート形式のサウンドノベルです。  

## ダウンロード
Coming soon...  

## 使用技術
### 概要
- **Vue.js**
  - フロントエンド
    - UI構築
    - スクリプト・エンジン開発
- **tauri (Rust)**
  - バックエンド
    - UI表示
    - セーブ＆ロード機能
    - オーディオ管理
      - BGM・SEの再生／停止、音量調整
- **Python**
  - 文章生成
    - カットアップ
    - 自然言語処理

### なぜWeb技術を用いたゲーム開発なのか？
ノベルゲームはその名の通り、文字を主体とするゲームジャンルの1つです。  
そのゲームの特性上、文字にアニメーションを付加したり、また複数のフォントを使用するなど、必然的に文字に対するウェイトが大きくなります。  
そのため、文字の扱いに長けたツールを用いてゲーム開発をしたほうが効率が良いと考え、そうしたツールの1つであるWeb技術を用いて開発することとなりました。  

### Vue.js
今回は既存のゲームエンジン等を使用せず、期限が1ヶ月以内にほぼ0の状態からゲームを制作するという制約が存在したため、UIフレームワークを使用することを前提に構想を進めました。  

いくつかのフレームワークを試した結果、自分の直感的な扱いやすさと学習効率を考慮した結果、Vue.jsを最終的なフレームワークとして使用することとなりました。  

### tauri
tauriはRust製のデスクトップアプリケーション用バックエンドフレームワークです。  

Web技術を用いたデスクトップアプリ開発におけるバックエンドフレームワークとして、Electronがよく挙げられると思いますが、tauriはUIの表示にwebview（OS付属ブラウザのHTMLレンダリングエンジンを使用する仕組み）を用いるため、Electronよりも圧倒的にファイルサイズが軽量になります。  

今回はゲーム開発というものの、そこまで大規模なものにはならないため、Electronを使用するのはややオーバースペックであるという点と、Rustは比較的使い慣れている点を考慮に入れ、最終的にtauriをバックエンドとして使用しました。  

### Rust
オーディオの再生にはrodioを使用しています。  

JavaScriptで任意区間のBGMをシームレスにループしようとした場合、基本的にWeb Audio APIを使用する必要がありますが、こちらは記述が煩雑になりやすいという難点があります。  
そもそも、Web Audio API自体が音声処理を主な用途とするため、単なるループ再生にはオーバースペックでもあります。  

これらを考慮した結果、オーディオ周りをRust側ですべて受け持つようなシステムを構築しました。  

### Python
文章生成の大きな流れとしては、まず既存の文章を形態素解析によって分割し、それらを一定のルールでバラバラに組み替えたり、N階マルコフ連鎖によって短いセンテンスを生成します。  
そこらか個人的に良いと感じたセンテンスをピックアップし、それらを直感的に組み合わせることによって本文を作成しました。  

詳しい文章生成の仕組みについて、別リポジトリにて解説を行う予定です。  

## 使用素材
### 画像
#### Canva
* ["夜の間に通りを歩いている女性"](https://www.canva.com/photos/MADGv5rcu7M-woman-walking-in-the-street-during-night-time/) by Aleksandar Pasaric
* ["Man looking out of window"](https://www.canva.com/photos/MAEEWnGpeF8-man-looking-out-of-window/) by ozgurdonmaz
* ["月の満ち欠け。月の月の周期。"](https://www.canva.com/photos/MADesfDpSrk-phases-of-the-moon-moon-lunar-cycle-/) by Allexxandar
* ["天の川！"](https://www.canva.com/photos/MADaAx-NWHE-milky-way-/) by Sahil Malhotra
* ["Cat on the moon background"](https://www.canva.com/photos/MAC5MsKKatU-cat-on-the-moon-background/) by ks2009q

#### Unsplash
* ["Downtown Park, Bellevue, United States"](https://unsplash.com/photos/_b4ppn1Ssgw?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink) by Elisha Terada
* ["429 Cornelius Rd, Cerulean, KY 42215, USA, United States"](https://unsplash.com/photos/F-pSZO_jeE8?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink) by Jongsun Lee
* ["Downtown Bellevue at Night, Bellevue, United States"](https://unsplash.com/photos/NwDSEPXr9og?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink) by Dylan Mullins

#### 写真AC
* ["バーカウンター"](https://www.photo-ac.com/main/detail/1828030?title=%E3%83%90%E3%83%BC%E3%82%AB%E3%82%A6%E3%83%B3%E3%82%BF%E3%83%BC&searchId=2565206629) by 河童

### フォント
* ["ピグモ 01"](https://moji-waku.com/pigmo01/) by もじワク研究
* ["戸越ゴシック"](http://togoshi-font.osdn.jp/) by mshio

### BGM
* "めうちきりんのメトロポリス" by いっぺー

### SE
* ["Entrance Bell"](https://freesound.org/people/Zott820/sounds/209580/) by Zott820
* ["Page Turn"](https://freesound.org/people/davidbain/sounds/136778/) by davidbain
* ["Page turns and book close/open"](https://freesound.org/people/exterminat/sounds/164806/) by exterminat
