class Score{

  static top(sz)
  {
    let v = docCookies.getItem("score" + sz);
    return v ? v : "No time set yet"
  }

  static set(sz,tm)
  {
      let v = docCookies.getItem("score" + sz);
      if(!v || v < tm){
          docCookies.setItem("score" + sz, tm)
      }
  }

}