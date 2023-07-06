$(document).ready(function(){
    $.ajaxSetup({ cache: false });
    $('#searchArt').keyup(function(){
     $('#result').html('');
     $('#state').val('');
     var searchField = $('#searchArt').val();
     var expression = new RegExp(searchField, "i");
     $.getJSON('mafs.json', function(data) {
      $.each(data, function(key, value){
       if (value.art.search(expression) != -1 || value.name.search(expression) != -1 || value.factArt.search(expression) != -1)
       {  
        if (value.img == ""){
          image = "photo/" + value.factArt + ".png";
        } else {
          image = value.img;
        }
        $('#result').append('<li class="list-group-item link-class"><img src="'+ image +'" height="40" width="40" class="img-thumbnail" /> ' + value.art + ' | ' + value.factArt + ' | <span class="text-muted" >'+value.name+' | ' + value.size + '</span> </li>');
       } 
      });   
      if ($('#searchArt').val() == ''){
        $("#result").html('');
        };
     });
    });
    
    $('#result').on('click', 'li', function() {
     var click_text = $(this).text().split('|');
     if (click_text[0] == 0) {
      $('#searchArt').val($.trim(click_text[1]));
      $("#result").html('');
     } else {
      $('#searchArt').val($.trim(click_text[0]));
      $("#result").html('');
      };
    });
   });