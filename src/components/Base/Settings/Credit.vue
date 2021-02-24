<template>
  <div class="credit">
    <perfect-scrollbar>
      <h1>クレジット</h1>
      <div class="section">
        <h2>制作</h2>
        <p>いっぺー</p>
      </div>
      <div class="section">
        <h2>使用素材</h2>
        <div class="item">
          <h3>画像</h3>
          <h4>Canva</h4>
          <ul class="list">
            <li><a target="_blank" rel="nofollow noopener" href="https://www.canva.com/photos/MADGv5rcu7M-woman-walking-in-the-street-during-night-time/">"夜の間に通りを歩いている女性"</a> by Aleksandar Pasaric</li>
            <li><a target="_blank" rel="nofollow noopener" href="https://www.canva.com/photos/MAEEWnGpeF8-man-looking-out-of-window/">"Man looking out of window"</a> by ozgurdonmaz</li>
            <li><a target="_blank" rel="nofollow noopener" href="https://www.canva.com/photos/MAEEE0qEB1E-female-retro-tin-toy-robot-portrait/">"Female Retro Tin Toy Robot Portrait"</a> by ThomasVogel</li>
            <li><a target="_blank" rel="nofollow noopener" href="https://www.canva.com/photos/MADaAx-NWHE-milky-way-/">"天の川！"</a> by Sahil Malhotra</li>
            <li><a target="_blank" rel="nofollow noopener" href="https://www.canva.com/photos/MAC5MsKKatU-cat-on-the-moon-background/">"Cat on the moon background"</a> by ks2009q</li>
          </ul>
          <h4>Unsplash</h4>
          <ul class="list">
            <li><a target="_blank" rel="nofollow noopener" href="https://unsplash.com/photos/_b4ppn1Ssgw?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink">"Downtown Park, Bellevue, United States"</a> by Elisha Terada</li>
            <li><a target="_blank" rel="nofollow noopener" href="https://unsplash.com/photos/F-pSZO_jeE8?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink">"429 Cornelius Rd, Cerulean, KY 42215, USA, United States"</a> by Jongsun Lee</li>
            <li><a target="_blank" rel="nofollow noopener" href="https://unsplash.com/photos/NwDSEPXr9og?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink">"Downtown Bellevue at Night, Bellevue, United States"</a> by Dylan Mullins</li>
          </ul>
          <h4>写真AC</h4>
          <ul class="list">
            <li><a target="_blank" rel="nofollow noopener" href="https://www.photo-ac.com/main/detail/1828030?title=%E3%83%90%E3%83%BC%E3%82%AB%E3%82%A6%E3%83%B3%E3%82%BF%E3%83%BC&searchId=2565206629">"バーカウンター"</a> by 河童</li>
          </ul>
        </div>
        <div class="item">
          <h3>フォント</h3>
          <ul class="list">
            <li><a href="https://moji-waku.com/pigmo01/" target="_blank" rel="nofollow noopener">"ピグモ 01"</a> by もじワク研究</li>
            <li><a href="http://togoshi-font.osdn.jp/" target="_blank" rel="nofollow noopener">"戸越ゴシック"</a> by mshio</li>
          </ul>
        </div>
        <div class="item">
          <h3>BGM</h3>
          <ul class="list">
            <li>"めうちきりんのメトロポリス" by いっぺー</li>
          </ul>
        </div>
        <div class="item">
          <h3>SE</h3>
          <h4>Freesound</h4>
          <ul class="list">
            <li><a href="https://freesound.org/people/Zott820/sounds/209580/" target="_blank" rel="nofollow noopener">"Entrance Bell"</a> by Zott820</li>
            <li><a href="https://freesound.org/people/davidbain/sounds/136778/" target="_blank" rel="nofollow noopener">"Page Turn"</a> by davidbain</li>
            <li><a href="https://freesound.org/people/exterminat/sounds/164806/" target="_blank" rel="nofollow noopener">"Page turns and book close/open"</a> by exterminat</li>
          </ul>
        </div>
      </div>
      <div class="section">
        <h2>使用技術</h2>
        <div class="item">
          <h3>プログラミング言語</h3>
          <ul class="list">
            <li><a href="https://www.rust-lang.org/ja" target="_blank" rel="nofollow noopener">Rust</a></li>
            <li><a href="https://developer.mozilla.org/ja/docs/Web/JavaScript" target="_blank" rel="nofollow noopener">JavaScript</a></li>
          </ul>
        </div>
        <div class="item">
          <h3>フレームワーク</h3>
          <ul class="list">
            <li><a href="https://tauri.studio/" target="_blank" rel="nofollow noopener">tauri</a></li>
            <li><a href="https://vuejs.org/" target="_blank" rel="nofollow noopener">Vue.js</a></li>
          </ul>
        </div>
      </div>
    </perfect-scrollbar>
  </div>
</template>

<script>
export default {
  name: 'credit',
}
</script>

<style>
.ps {
  height: 60vh;
}

.section {
  margin-bottom: 5rem;
}

  .section h2 {
    display: inline-block;
    border-bottom: 2px solid #fbfaf5;
  }

  .section .item {
    margin-bottom: 5rem;
  }

    .item h3 {
      font-size: 2.4rem;
      margin-bottom: 1.2rem;
    }

    .item h3::before {
      content: '- ';
    }
    .item h3::after {
      content: ' -';
    }

    .item h4 {
      font-size: 2rem;
      margin: 1rem 0;
    }
  
  .list {
    font-size: 2rem;
  }

    .list li {
      margin-bottom: 1rem;
    }

      .list li > a {
        font-size: 2rem;
        border-bottom: 1px dashed #fbfaf5;
      }

.ps__rail-y {
  width: 0.9rem;
  opacity: 0.6 !important;
}

.ps__thumb-y,
.ps__rail-y:hover > .ps__thumb-y,
.ps__rail-y:focus > .ps__thumb-y,
.ps__rail-y.ps--clicking .ps__thumb-y {
  background-color: #fbfaf5;
  width: 0.9rem;
}

.ps-scrollbar-y-hover-width {
  width: 0.9rem;
}

.ps .ps__rail-y:hover,
.ps .ps__rail-y:focus,
.ps .ps__rail-y.ps--clicking {
  background: none !important;
  opacity: 0.8 !important;
}

</style>