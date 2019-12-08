window.onload = () => {

  $('.img-block').click(blueBorder)

  function blueBorder(){
    for(element of $('.img-block')){

      if($(element).hasClass('blue-lagoon')){
        $(element).removeClass('blue-lagoon');
      }
    }

    var bg = $(this).css('background-image');
    bg = bg.replace('url(','').replace(')','').replace(/\"/gi, "").replace('http://127.0.0.1:3000/','../../');
    $('.board').attr('src', bg);
    console.log(bg);
    $(this).addClass('blue-lagoon');
  }
}
