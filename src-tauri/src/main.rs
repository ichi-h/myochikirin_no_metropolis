#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

mod cmd;
mod audio;

use audio::{start_bgm, play_se};
use std::sync::Arc;

fn main() {
  let (_stream, handle) = rodio::OutputStream::try_default().unwrap();
  let bgm_sink = Arc::new(rodio::Sink::try_new(&handle).unwrap());
  let se_sink = Arc::new(rodio::Sink::try_new(&handle).unwrap());
  let vol = 0.4;

  {
    let bgm_sink_ = bgm_sink.clone();
    let se_sink_ = se_sink.clone();

    let _ = std::thread::spawn(move || {
      tauri::AppBuilder::new()
        .invoke_handler(move |_webview, arg| {
          use cmd::Cmd::*;
          match serde_json::from_str(arg) {
            Err(e) => {
              Err(e.to_string())
            }
            Ok(command) => {
              match command {
                // definitions for your custom commands from Cmd here
                MyCustomCommand { arg } => {
                  //  your command code
                  println!("{}", arg);
                },
                ChangeBGMVolme { volume } => {
                  bgm_sink_.set_volume(volume);
                },
                PlaySE { file_name, volume } => {
                  play_se(&se_sink_, file_name, volume);
                },
              }
              Ok(())
            }
          }
        })
        .build()
        .run();
      
      std::process::exit(0);
    });
  }

  let bgm_sink_ = bgm_sink.clone();
  start_bgm(&bgm_sink_, vol);
}
