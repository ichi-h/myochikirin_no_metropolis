# ./src-tauri/src/

- audio.rs
  - オーディオの再生／音量調整を管理するライブラリ
- build.rs
  - アプリをビルドする際の設定ファイル
- cmd.rs
  - JavaScript 側から呼び出せるカスタムコマンドのインターフェース
- main.rs
  - tauri（ウィンドウ表示、カスタムコマンドの定義）と rodio（オーディオ管理）を別スレッドで実行
