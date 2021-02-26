use rodio::{Source, Sink, OutputStreamHandle};
use std::io::Cursor;
use std::time::Duration;

pub fn set_bgm(bgm_sink: &Sink) {
  let buf1 = Cursor::new(include_bytes!("../audio/bgm.ogg").to_vec());
  let buf2 = Cursor::new(include_bytes!("../audio/bgm.ogg").to_vec());

  let src_start = rodio::Decoder::new(buf1).unwrap();
  let src_loop = rodio::Decoder::new(buf2).unwrap();

  let loop_start_point: f32 = 222980.0 / 44100.0;

  let src_loop = src_loop.skip_duration(Duration::from_secs_f32(loop_start_point)).repeat_infinite();

  bgm_sink.append(src_start);
  bgm_sink.append(src_loop);

  bgm_sink.pause();

  loop {
    println!("Loop start");
    let mut s = String::new();
    std::io::stdin().read_line(&mut s).ok();
  }
}

pub fn play_bgm(sink: &Sink, volume: f32) {
  while !sink.is_paused() {
    std::thread::sleep(Duration::from_secs_f32(0.1));
    println!("wait");
  }
  println!("start bgm");

  sink.set_volume(volume);
  sink.play();
}

#[derive(Clone, Debug)]
pub struct SoundEffect {
  pub bell: Cursor<std::vec::Vec<u8>>,
  pub turn_page1: Cursor<std::vec::Vec<u8>>,
  pub turn_page2: Cursor<std::vec::Vec<u8>>,
}

impl SoundEffect {
  pub fn play_se(self, sink: &mut Sink, handle: &OutputStreamHandle, file_name: String, volume: f32) {
    *sink = rodio::Sink::try_new(handle).unwrap();

    let buf = match &*file_name {
      "bell" => self.bell,
      "turnPage1" => self.turn_page1,
      "turnPage2" => self.turn_page2,
      _ => { return },
    };

    let src = rodio::Decoder::new(buf).unwrap();

    sink.set_volume(volume);
    sink.append(src);
  }
}
