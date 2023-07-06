var id = 1;
var deliveryMar = 0.05;
var montageMar = 0.2;

$(document).ready(function(){

   shelbyQuestion();
   //Управление текстовыми кнопками
   $(".hideButtons").click(function(){
      var index = $('.hideButtons').index(this);
      var str = '.buttonText:eq(' + index + ')';
      var question = "";

      switch(index){
         case 0:
            question = "Номер заказа: ";
            break;
         case 1:
            question = "Дата: ";
            break;
         case 2:
            question = "Имя заказчика: ";
            break;
         case 3:
            question = "Срок действия КП: ";
            break;
         case 4:
            question = "КП действует до: ";
            break;
         case 5:
            question = "Первый платеж (%): ";
            break;
         case 6:
            question = "Второй платеж (%): ";
            break;
         case 7:
            question = "Срок поставки оборудования (дней): ";
            break;
      }
      var oldText = $(str).text();
      var newText = prompt(question, oldText);
      $(str).text(newText);
      setDeliveryDate();

   })

   //Переключаем менеджеров
   $(".manager").click(function(){
      $("input[type='radio']:checked").each(function() {
         var idVal = $(this).attr("id");
         if (idVal === "manager2"){
            $(".photo").attr("src", "images/Andrew.png");
            $(".phone1").text('+7 (925) 286-40-80');
            $(".email").text("a.golovin@shelby-ltd.ru");
            $(".managerName").text("Андрей Головин");
         } else if (idVal === "manager3"){
            $(".photo").attr("src", "images/Diman.png");
            $(".phone1").text('+7 (925) 480-91-38');           
            $(".email").text("d.francuzov@shelby-ltd.ru");
            $(".managerName").text("Дмитрий Французов");
         } else if (idVal === "manager4"){
            $(".photo").attr("src", "images/Nata.png");
            $(".phone1").text('+7 (925) 283-59-00');           
            $(".email").text("n.barsegyan@shelby-ltd.ru");
            $(".managerName").text("Наталья Барсегян");
         } else if (idVal === "manager1"){
            $(".photo").attr("src", "images/Sanek.jpeg");
            $(".phone1").text('+7 (937) 086-77-79');           
            $(".email").text("a.tkachenko@shelby-ltd.ru");
            $(".managerName").text("Александр Ткаченко");
         }  else if (idVal === "manager5"){
            $(".job").text('Cпециалист отдела продаж');
            $(".photo").attr("src", "images/gosha.png");
            $(".phone1").text('+7 (925) 296-49-97');           
            $(".email").text("g.filonov@shelby-ltd.ru");
            $(".managerName").text("Георгий Филонов");
         }  else if (idVal === "manager6"){
            $(".job").text('Ведущий специалист отдела продаж');
            $(".photo").attr("src", "images/Ramil.jpeg");
            $(".phone1").text('+7 (925) 296-76-72');           
            $(".email").text("r.zaripov@shelby-ltd.ru");
            $(".managerName").text("Рамиль Зарипов");
         }
         
         
      });
   });

   //Универсальная наценка
   $(".superMarginal").click(function(){
      var marginal = parseFloat($(".superMarginal").val());
      $(".marginal").val(marginal);
      $(".marginal").click();
   })

   //скидка общая
   $(".discountMargin").click(function(){
      discount = $(".discountMargin").val();
      sum = parseInt($(".sum").text().replace( /\s/g, ''));
      sumWithDiscount = parseInt((sum-(sum * discount / 100)).toFixed(0));
      $(".sumWithDiscount").text(sumWithDiscount.toLocaleString());
      self = parseInt($(".totalSelf").text().replace( /\s/g, ''));

      profit = sumWithDiscount - self;
   })

   //коэффициент монтажа
   $(".montageMargin").click(function(){
      montageMar = parseFloat($(".montageMargin").val());
      calcColumns();
   })

   //коэффициент доставки
   $(".deliveryMargin").click(function(){
      deliveryMar = parseFloat($(".deliveryMargin").val());
      calcColumns();
   })

   //добавляем ряд из JSON
   $(".checkjson").click(function(event){
      $.getJSON('mafs.json', function(data){
         $.each(data, function(key, val) {
            var newRow;
            newRow += "<tr><td>" + id + "</td>";
            newRow += '<td class="img-cell"><img class="shellimg" src="' + val.img + '" alt=""></td>';            
            newRow += "<td>" + val.art + "</td>";
            newRow += "<td>" + val.name + "</td>";
            newRow += "<td>" +  val.size + '</td>';
            newRow += '<td><input type="number" class="quantity" id="quantity" name="quantity" min="0" max="100" value="0"></td>';
            newRow += "<td>" + 'шт.' + '</td>';
            newRow += '<td class="price">0</td>'
            newRow += '<td id="total" class="total">' + 0 + '</td>';
            newRow += '<td class="selfprice" id="selfprice" style="background:yellow;">' + parseInt(val.self).toLocaleString() + '</td>';
            newRow += '<td class="selftotal" id="selftotal" style="background:yellow;">' + 0 + '</td>';
            newRow += '<td style="background:yellow;"><input type="number" class="marginal" step="0.1" min="0.00" max="3.00" value="1"></td></tr>';
            
         $('#catalog tr:last').after(newRow);
         id++;
         });
      });
   });
   
   //Добавляем по артикулу
   $(".addArt").click(function(event){
      var myArt = $('#searchArt').val();
      if (myArt != ""){ 
      $.getJSON('mafs.json', function(data){
         $.each(data, function(key, val) {
            
            if ((val.art == myArt)||(val.factArt == myArt)){
               var art;
               if (val.art != 0) {
                  art = val.art;
               } else {
                  art = val.factArt;
               }
            
            if (val.img == ""){
               image = "photo/" + val.factArt + ".png";
            } else if(val.factArt == ""){
               image = "photo/" + val.art + ".png";
            } else {
               image = val.img;
            }
            

               var sizes = val.size.split('*');
               var newRow;

               newRow += "<tr><td class='id'>" + id + "</td>";
               newRow += '<td class="img-cell"><img class="shellimg" src="' + image + '" alt=""></td>';
               newRow += "<td>" + art + "</td>";
               newRow += "<td style='width: 15%'>" + val.name + "</td>";
               newRow += "<td style='width: 10%'>" + "<br>Д: " + sizes[0] + "</br>" + "<br>Ш: " + sizes[1] + "</br>" + "<br>В: " + sizes[2] + "</br>" + '</td>';
               newRow += '<td><input type="number" class="quantity" id="quantity" name="quantity" min="0" max="100" value="1"></td>';
               newRow += "<td>" + 'шт.' + '</td>';
               newRow += '<td class="price">0</td>'
               newRow += '<td id="total" class="total">' + 0 + '</td>';
               newRow += '<td class="selfprice" id="selfprice" style="background:yellow;">' + parseInt(val.self).toLocaleString() + '</td>';
               newRow += '<td class="selftotal" id="selftotal" style="background:yellow;">' + 0 + '</td>';
               newRow += '<td style="background:yellow;"><input type="number" class="marginal" step="0.1" min="0.00" max="3.00" value="1.8"></input><button class="deleteRow" style="color: red;">X</button> </td></tr>';
               
               $('#catalog tr:last').after(newRow);
               $(".marginal").click();
               id++;
            }
         });
      });
   }
      $('#searchArt').val('');
   });

   //Удалить ряд
   $(".content-table").on('click', '.deleteRow',function(){
      var index = parseInt($('.deleteRow').index(this)) + 2;
      var str = 'tr:eq(' + index + ')';
      $(str).remove();

      calcColumns();
      id  = id -1;
      var ids = $('.id');
      ids.each(function(i){
         $('.id:eq(' + i + ')').text(i+1);
      });
   })

   //Расчеты ячеек
   $('.content-table').on('click','.quantity', function() {
      var quantity = parseInt($(this).parent().find("#quantity").val());
      var index = $('.quantity').index(this);

      //итого
      var strForTotal = '.price:eq(' + index + ')';
      var price = parseInt($(strForTotal).text().replace( /\s/g, ''));
      var total = quantity * price;

      //итого себестоимость
      var strForSelfPrice = '.selfprice:eq(' + index + ')';
      var selfprice = parseInt($(strForSelfPrice).text().replace( /\s/g, ''));
      var selfTotal = quantity * selfprice;

      $(this).parent().parent().find("#total").html(total.toLocaleString()).show();
      $(this).parent().parent().find("#selftotal").html(selfTotal.toLocaleString()).show();

      //общая себестоимость оборудования
      calcColumns();
   });

   //расчет при изменении наценки
   $('.content-table').on('click','.marginal', function() {
      var marginal = parseFloat($(this).parent().find(".marginal").val());
      var index = $('.marginal').index(this);

      //Расчитываем стоимость за одну единицу
      var strForSelf = '.selfprice:eq(' + index + ')';
      var selfPrice = parseInt($(strForSelf).text().replace( /\s/g, ''));
      var price = parseInt((selfPrice * marginal).toFixed(0));
      $(this).parent().parent().find(".price").html(price.toLocaleString());

      //расчитываем итоговую сумму за одну позицию
      var strForQuantity = '.quantity:eq(' + index + ')';
      var quantity = parseInt($(strForQuantity).val());
      var selfTotal = selfPrice * quantity;
      var totalPrice = price * quantity;
      $(this).parent().parent().find(".total").html(totalPrice.toLocaleString());
      $(this).parent().parent().find(".selftotal").html(selfTotal.toLocaleString());
      
      //общая себестоимость оборудования
      calcColumns();
   });

   //скрыть кнопки
   $('#photo').click(function(){
      if ($('.block2').is(":visible")){
      $('td:nth-child(12),th:nth-child(12)').hide();
         $('td:nth-child(11),th:nth-child(11)').hide();
         $('td:nth-child(10),th:nth-child(10)').hide();
         $('.absoluteText').hide();
         $('.block2').hide();
         $("#hideDivWithButtons").hide();
         $("#searchBar").hide();
         $(".hideButtons").hide();
         $(".block0").hide();

      }else{
         $('td:nth-child(12),th:nth-child(12)').show();
         $('td:nth-child(11),th:nth-child(11)').show();
         $('td:nth-child(10),th:nth-child(10)').show();
         $('.absoluteText').show();
         $('.block2').show();
         $("#hideDivWithButtons").show();
         $("#searchBar").show();
         $(".hideButtons").show();
         $(".block0").show();
      } 
   })
   
  //расчет монтажа есть или нет
  $('#isMontage').change(function(){
   if ($('#isMontage').is(":checked")){
      $('.targetMontTop').text("На изготовление, поставку и монтаж детского игрового и спортивного оборудования");
      $('.targetMontBottom').show();
      var sum =  (($('.totalContract').text().replace( /\s/g, '')) * (1.2 + deliveryMar)).toFixed(0);
      sum = parseInt(sum);
      $('.sum').text(sum.toLocaleString());
      calcColumns();

   }else{
      $('.targetMontTop').text("На изготовление и поставку детского игрового и спортивного оборудования");
      $('.targetMontBottom').hide();
      var sum = (($('.totalContract').text().replace( /\s/g, '')) * deliveryMar).toFixed(0);
      sum = parseInt(sum);
      $('.sum').text(sum.toLocaleString());
      calcColumns();
   }
  })

  //Страница с условиями
  $('#isTerms').change(function(){
   if ($('#isTerms').is(":checked")){
      $('.terms').show();
   }else{
      $('.terms').hide();
   }
  })

  //Строка со скидкой
  $('#isDiscount').change(function(){
   if ($('#isDiscount').is(":checked")){
      $('.targetDiscBottom').css('visibility', 'visible');
      $('.moneyWithoutDiscount').css('background-color', 'transparent');
      calcColumns();
   }else{
      $('.targetDiscBottom').css('visibility', 'hidden');
      $('.moneyWithoutDiscount').css('background-color', '#fee100');
      calcColumns();
   }
  })

  //подсчет итоговой стоимости
   function calcColumns(){
      var $selfColumns = $('.selftotal');
      var sumSelfColumns = 0;
      $selfColumns.each(function(i){
         sumSelfColumns += parseInt($(this).text().replace( /\s/g, ''));
      });
      $('.totalSelf').text(sumSelfColumns.toLocaleString());

   //общая сумма контракта, доставка, монтаж
      var $totalColumns = $('.total');
         var totalContract = 0;
         $totalColumns.each(function(i){
            totalContract += parseInt( $(this).text().replace( /\s/g, ''));
         });
         var montage = parseInt((totalContract * montageMar).toFixed(0));
         var delivery = parseInt((totalContract * deliveryMar).toFixed(0));

         var sum = 0;
         if ($('#isMontage').is(':checked')) {
            sum = totalContract + montage + delivery;
         }else{
            sum = totalContract + delivery;
         }

         $('.totalContract').text(totalContract.toLocaleString());
         $('.montage').text(montage.toLocaleString());
         $('.delivery').text(delivery.toLocaleString());
         $('.sum').text(sum.toLocaleString());
         $(".discountMargin").click();

      //расчет маржинальности
      var margin = (100 - (100*(sumSelfColumns/totalContract))).toFixed(2);
      var profit = ((totalContract - sumSelfColumns)/1.2).toFixed(0);
      profit = parseInt(profit);
      $('.profit').text(profit.toLocaleString());
      $('.margin').text(margin);
      if (margin<30){
         $('.marginLvl').text('меньше 30');
         $('.marginLvlColor').css('color', 'red');
         $('.attention').text("Свяжитесь с РОП").css('color', 'red').show();
      } else {
         $('.marginLvl').text('больше 30');
         $('.marginLvlColor').css('color', 'green');
         $('.attention').text('.');
         $('.attention').css('color', 'green');
      }
  }

  //Дата и номер заказа
  function randSetting(){

   var rand = Math.floor(Math.random() * 9999);
   $(".order").text(rand);

   var today = new Date();
   var dd = String(today.getDate()).padStart(2, '0');
   var mm = String(today.getMonth() + 1).padStart(2, '0');
   var yy = today.getYear() - 100;
   today = dd + '.' + mm + '.' + yy;
   $(".date").text(today);

   setDeliveryDate();

  } 
  randSetting();

  //Срок действия КП
  function setDeliveryDate() {
   var expDate = new Date();
   expDate.setDate(expDate.getDate() + parseInt($(".expirationDays").text()));
   var dd = String(expDate.getDate()).padStart(2, '0');
   var mm = String(expDate.getMonth() + 1).padStart(2, '0');
   var yy = expDate.getYear() - 100;

   expDate = dd + '.' + mm + '.' + yy;
   $(".expirationDate").text(expDate);

   var secondPayment = 100 - parseInt($(".firstPayment").text());
   $(".secondPayment").text(secondPayment);

  }

//Закрыть всплывающее меню
$(document).on("click", function(event){
      if(!$(event.target).closest("#result").length){
         $("#result").html('');
      }
});

});

function shelbyQuestion () {
   var x = prompt("Привет:) \nЧто любит кушать енот Шелбик?");
   if (x === "999"){ 
   } else {
      shelbyQuestion();
   }
}

