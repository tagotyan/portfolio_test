// 画面をページをローディングし終わるまでの処理
// 下記処理は画像やCSSが読み込まれたら実行する処理
$(window).on("load" , function(){

  // 「fadeOut」第二引数で、「fadeOut」実行後に第二引数処理を実行
  $('.loading').delay(2000).fadeOut(300, function(){

    //フェードアウト後「loaded_screen」に「loaded」クラス付与
    $('.loaded_screen').addClass('loaded');

  });

});



// 画像やCSSが読み込まれたら実行する処理
$(window).on("load" , function(){

  //CSSアニメーションが終わった後に動かしたいソースコードを記述する
  $('.loaded_screen_bottom').on('animationend', function () {

    // 動かしたい要素のクラスにそれぞれ「〇〇_slide_fadeIn」を事前に付与
    
    // 右にスライドフェードイン
    $('.right_slide_fadeIn').addClass('active');

    $('.left_slide_fadeIn').addClass('active');

    //時間を遅らせて動かしたいソースコードを記述する
    setTimeout(function () {

      // 上にスライドフェードイン
      $('.up_slide_fadeIn').addClass('active');
      // 下にスライドフェードイン
      $('.under_slide_fadeIn').addClass('active');

    }, 500);//この場合0.5秒後
  });
  
});



// 画面をスクロールしたらフェードイン
function fadeAnime(){

  //動きの指定
  $('.fadeInTrigger').each(function(){ //fadeInTriggerというクラス名が
    var elemPos = $(this).offset().top-20;//画面下部が指定要素より20px上の位置にきた時
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight){
    $(this).addClass('fadeIn');// 画面内に入ったらfadeInというクラス名を追記
    }else{
    $(this).removeClass('fadeIn');// 画面外に出たらfadeInというクラス名を外す
    }
    });
  
}



// 画面をスクロールしたら左にスライドフェードイン
// 「left_slide_fade」に「position:relative;」「left:30px;」「opacity:0;」を事前に記述
function left_slide_fade(){

  $('.left_slide_fade').each(function(){ //left_slide_fadeというクラス名が

    var elemPos = $(this).offset().top-20;//画面下部が指定要素より20px上の位置にきた時
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();

    // もし画面内に「left_slide_fade」クラスの要素が入った場合の処理
    if(scroll >= elemPos - windowHeight){

      // 「left_slide_fade」クラスの要素に、1.5秒かけて位置と透明度を下記に変化させる
      $(this).animate({left : '10', opacity: 1}, 1500);

    }

  });

}
// 画面をスクロールをしたら動く場合の記述
$(window).scroll(function (){

  // アニメーション用の関数を呼ぶ
  fadeAnime();

  // 左スライドフェードの関数
  left_slide_fade();

});



// 「toggleClass」メソッドによる「active」クラスの有無状況によりハンバーガーが回転してグローバルナビが出現or消える処理を関数化
function global_nav_change(){

  // ハンバーガーが回転してバツに
  $(".openbtn8").toggleClass('active');

  // 「openbtn8」クラスを持つ要素に「active」クラスがあればグローバルナビをフェードイン、なければフェードアウト
  if($(".openbtn8").hasClass("active")){
    $(".click_fade_nav").fadeIn(500);
  }else{
    $(".click_fade_nav").fadeOut(500);
  }

  // 「openbtn8」クラス要素に「active」クラスがあれば、navリストを0.3秒遅らして１つずつフェードスライド表示、なければ一斉にフェードスライド非表示
  // 「left」プロパティを有効にするために、「gnav_menu_item」クラスに前もって「position: relative」を記述
  if($(".openbtn8").hasClass("active")){
    $('.gnav_menu_item').css({left : '40px', opacity: 0}).each(function(i){
      $(this).delay(300 * i).animate({left : '0', opacity: 1}, 700);
    });
  }else{
    $('.gnav_menu_item').animate({left : '40px', opacity: 0}, 700);
  }

}
// ハンバーガーメニューをクリックした時の処理
$(".openbtn8").click(function () {

  global_nav_change();

});



// グローバルナビ内のプロフィールをクリックした時の処理
$('.nav_profile').click(function () {

  // ページ内リンクのHTMLタグhrefから、リンクされているエリアidの値を取得
  var area_position = $(this).attr('href');

  // idの上部の距離を取得
  var area_top = $(area_position).offset().top;

  // 取得した位置にスクロール。500の数値が大きくなるほどゆっくりスクロール
  $('body,html').animate({scrollTop: area_top}, 500);
  
  // ページ内リンク移動に合わせてGNavが消える処理
  global_nav_change();

  return false;

});



// ページリンクナビ内のページリンクをクリックした時の処理
$('.page_link').click(function () {

  // ページ内リンクのHTMLタグhrefから、リンクされているエリアidの値を取得
  var area_position = $(this).attr('href');

  // idの上部の距離を取得
  var area_top = $(area_position).offset().top;

  // 取得した位置にスクロール。500の数値が大きくなるほどゆっくりスクロール
  $('body,html').animate({scrollTop: area_top}, 500);

  return false;

});