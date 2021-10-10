#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

mod cmd;
mod audio;

use std::sync::{Arc, Mutex};
use std::io::Cursor;

fn main() {
  let (_stream, handle) = rodio::OutputStream::try_default().unwrap();
  let bgm_sink = Arc::new(rodio::Sink::try_new(&handle).unwrap());
  let se_sink = Arc::new(Mutex::new(rodio::Sink::try_new(&handle).unwrap()));

  {
    let bgm_sink_ = bgm_sink.clone();
    let se_sink_ = se_sink.clone();

    let bell_vec = include_bytes!("../audio/bell.ogg").to_vec();
    let turn_page1_vec = include_bytes!("../audio/turnPage1.ogg").to_vec();
    let turn_page2_vec = include_bytes!("../audio/turnPage2.ogg").to_vec();

    let sound_effect = audio::SoundEffect {
      bell: Cursor::new(bell_vec),
      turn_page1: Cursor::new(turn_page1_vec),
      turn_page2: Cursor::new(turn_page2_vec),
    };

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
                PlayBGM { volume } => {
                  let volume_float: f32 = volume.parse::<f32>().unwrap();
                  audio::play_bgm(&bgm_sink_, volume_float);
                },
                ChangeBGMVolme { volume } => {
                  let volume_float: f32 = volume.parse::<f32>().unwrap();
                  bgm_sink_.set_volume(volume_float);
                },
                PlaySE { file_name, volume } => {
                  let sound_effect_ = sound_effect.clone();

                  let mut se_sink_lock = se_sink_.lock().unwrap();

                  let volume_float: f32 = volume.parse::<f32>().unwrap();
                  sound_effect_.play_se(&mut se_sink_lock, &handle, file_name, volume_float);
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

  audio::set_bgm(&bgm_sink);
}
