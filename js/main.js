$(document).ready(function(){
  var cityId;
  var city;
  var unitsFormat = "metric";
  
  $("#options>input").click(function(event) {
    if(!$(this).hasClass('active')){
      if($(this).attr('id')=='metric'){
      unitsFormat = "metric";
      $("#wind-unit-format").text("M");
      $("#temp-unit-format").text("C");
    }else{
      unitsFormat = "imperial";
      $("#wind-unit-format").text("Ft");
      $("#temp-unit-format").text("F");
    }
      $("#options>input").removeClass('active');
      $(this).addClass('active');
      getWeatherInfo();
    }
  });
  var getWeatherInfo = function(){
    $.getJSON("http://api.sypexgeo.net/json")
    .done(function(locationData){
      cityId = locationData.city.id;
      $.getJSON("http://api.openweathermap.org/data/2.5/weather?",{
        id: cityId,
        units: unitsFormat,
        APPID: '7e8c332eb8db970b5518579cf4b1125d'
      })
        .done(function(weatherDate){
          $("#w-icon").attr("src", "http://openweathermap.org/img/w/"+weatherDate.weather[0].icon+".png");
          $("#temp").text(Math.round(weatherDate.main.temp));
          if(weatherDate.main.temp>=20)
            $('html').css("background-image", 'url(https://static.pexels.com/photos/7032/landscape-field-sonja-langford-sonja.jpg)');
          if(weatherDate.main.temp<20 && weatherDate.main.temp>=4)
            $('html').css("background-image", 'url(https://static.pexels.com/photos/3186/wood-nature-sun-forest.jpg)');
          if(weatherDate.main.temp<4)
            $('html').css("background-image", 'url(https://static.pexels.com/photos/6672/snow-forest-trees-winter.jpeg)');
          $("#location").text(weatherDate.name);
          $("#description").text(weatherDate.weather[0].description);
          
          var windDir='';
          if(weatherDate.wind.deg<=23 || weatherDate.wind.deg>=337)
            windDir = "N";
          if(weatherDate.wind.deg>23 && weatherDate.wind.deg<=67)
            windDir = "NE";
          if(weatherDate.wind.deg>67 && weatherDate.wind.deg<=113)
            windDir = "E";
          if(weatherDate.wind.deg>113 && weatherDate.wind.deg<=158)
            windDir = "SE";
          if(weatherDate.wind.deg>158 && weatherDate.wind.deg<=203)
            windDir = "S"
          if(weatherDate.wind.deg>203 && weatherDate.wind.deg<=248)
            windDir = "SW"
          if(weatherDate.wind.deg>248 && weatherDate.wind.deg<=293)
            windDir = "W"
          if(weatherDate.wind.deg>293 && weatherDate.wind.deg<337)
            windDir = "NW"
          
          $("#wind-dir").text(windDir)
          $("#wind-speed").text(weatherDate.wind.speed);
         });
  });
  }

  getWeatherInfo();
  
});