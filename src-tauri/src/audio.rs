use rodio::{Source, Sink};
use once_cell::sync::Lazy;
use std::io::BufReader;
use std::fs::File;
use std::time::Duration;

static BGM1: Lazy<File> = Lazy::new(|| File::open("audio/bgm.ogg").unwrap());
static BGM2: Lazy<File> = Lazy::new(|| File::open("audio/bgm.ogg").unwrap());
static BELL: Lazy<File> = Lazy::new(|| File::open("audio/bell.ogg").unwrap());
static TURN_PAGE1: Lazy<File> = Lazy::new(|| File::open("audio/turnPage1.ogg").unwrap());
static TURN_PAGE2: Lazy<File> = Lazy::new(|| File::open("audio/turnPage2.ogg").unwrap());

pub fn start_bgm(sink: &Sink, volume: f32) {
  let src_start = rodio::Decoder::new(BufReader::new(&*BGM1)).unwrap();
  let src_loop = rodio::Decoder::new(BufReader::new(&*BGM2)).unwrap();

  let src_loop = src_loop.skip_duration(Duration::from_millis(5506)).repeat_infinite();

  sink.append(src_start);
  sink.append(src_loop);

  sink.set_volume(volume);

  loop {
    println!("Loop start");
    let mut s = String::new();
    std::io::stdin().read_line(&mut s).ok();
  }
}

pub fn play_se(sink: &Sink, file_name: String, volume: f32) {
  let src = match &*file_name {
    "bell" => rodio::Decoder::new(BufReader::new(&*BELL)).unwrap(),
    "turnPage1" => rodio::Decoder::new(BufReader::new(&*TURN_PAGE1)).unwrap(),
    "turnPage2" => rodio::Decoder::new(BufReader::new(&*TURN_PAGE2)).unwrap(),
    _ => { return },
  };

  sink.append(src);
  sink.set_volume(volume);
}
