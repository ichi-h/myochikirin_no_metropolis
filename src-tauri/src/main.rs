#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

mod cmd;
mod audio;

use std::sync::Arc;

fn main() {
  let (_stream, handle) = rodio::OutputStream::try_default().unwrap();
  let bgm_sink = Arc::new(rodio::Sink::try_new(&handle).unwrap());
  let se_sink = Arc::new(rodio::Sink::try_new(&handle).unwrap());

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
                PlayBGM { volume } => {
                  let volume_float: f32 = volume.parse::<f32>().unwrap();
                  println!("PlayBGM vol: {}", volume);
                  audio::play_bgm(&bgm_sink_, volume_float);
                },
                ChangeBGMVolme { volume } => {
                  let volume_float: f32 = volume.parse::<f32>().unwrap();
                  println!("ChangeBGMVolme vol: {}", volume);
                  bgm_sink_.set_volume(volume_float);
                },
                PlaySE { file_name, volume } => {
                  let volume_float: f32 = volume.parse::<f32>().unwrap();
                  println!("PlaySE vol: {}, file_name: {}", volume, file_name);
                  audio::play_se(&se_sink_, file_name, volume_float);
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
  audio::set_bgm(&bgm_sink_);
}
