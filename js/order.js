var mainBack;
var orderBack;
var deliveryCost = 100;

$(document).on('click', ".checkout", function(){

var time = updateClock();
mainBack = $(".page-container").html();
$('.page-container').html('<link rel="stylesheet" type="text/css" href="css/order.css"> <div class="header navbar-fixed-top"> <nav class="navbar fluid-container"> <div class="navbar-header"> <img class="logo" id="logo_icon" src="img/icon_trans.png" alt="expfood"> <img class="logo" id="logo_text" src="img/logo_main.png" alt="expfood"> </div> <div class="navbar-collapse collapse navbar-right"> </div> </nav> </div> <div class="container"> <div class="jumbotron content"> <form class="form-horizontal" name="sentMessage" id="contactForm" novalidate> <div class="form-group"> <label for="inputAddress" class="col-sm-2 control-label">Ваше имя </label> <div class="col-sm-10"> <!-- <input type="text" required class="form-control" id="inputAddress" placeholder="Например Маковского 2"> --> <input type="text" required class="form-control" placeholder="Например Маша" id="name"> <p class="help-block text-danger"></p> </div> </div> <div class="form-group"> <label for="inputMobile" required class="col-sm-2 control-label">Номер мобильного </label> <div class="col-sm-10"> <!-- <input type="text" required class="form-control" id="inputMobile" placeholder="По нему мы будем звязываться с Вами по всем вопросам заказа"> --> <input type="tel" required class="form-control" placeholder="В формате 8 *** *** ** **" id="phone"> <p class="help-block text-danger"></p> </div> </div> <div class="form-group"> <label for="inputName" class="col-sm-2 control-label">Ваш адрес </label> <div class="col-sm-10"> <!-- <input type="text" class="form-control" id="inputName" placeholder="Например Маша"> --> <input type="email" required class="form-control" placeholder="Маковского 2" id="email"> <p class="help-block text-danger"></p> </div> </div> <div class="form-group"> <label for="inputExtra" class="col-sm-2 control-label" >Дополнительные инструкции </label> <div class="col-sm-10"> <!-- <textarea id="inputExtra" class="form-control" rows="3" placeholder="Позвонить когда доставят"> </textarea> --> <textarea class="form-control" placeholder="Позвонить когда доставят" id="message"></textarea> <p class="help-block text-danger"></p> </div> </div> <!-- <div class="form-group"> <label for="inputPassword3" class="col-sm-2 control-label">Доставим сегодня до </label> <div type="text" class="col-sm-10 order-time"> '+time[0]+':'+time[1]+' </div> </div> --> <div class="clearfix"></div> <div class="col-lg-12 text-center"> <div id="success"></div> <button id="submitOrder" type="submit" class="btn btn-xl">Send</button> </div> </form> <nav> <ul class="pager"> <li class="previous"><a id="backToMain" href="#" class="backForth"> <span aria-hidden="true">&larr; </span> Назад</a></li> <li id="tt" class="next" data-toggle="tooltip" data-placement="right" title="Tooltip on top"><a href="#payment" id="toPay" class="backForth">Оплатить <span aria-hidden="true">&rarr; </span></a></li> </ul> </nav> </div> </div> <script src="js/jqBootstrapValidation.js"></script> <script src="js/contact_me.js"></script>')



$(document).on('click', "#toPay", function(){
    $("#submitOrder").click();
});

//     $(function () {
//         $("#tt").tooltip();
//     });
//     $('[data-toggle="tooltip"]').tooltip({
//     container: 'body'
// });

function validate(){
    if ($('#name').val().length   >   0   &&
        $('#email').val().length  >   0   &&
        $('#phone').val().length  >   0) 
        {
            $(".next").attr("class", "next");
            $(document).on('click', "#toPay", function(){
                orderBack = $(".page-container").html();
                $('.page-container').html('<link rel="stylesheet" type="text/css" href="css/order.css"> <link rel="stylesheet" type="text/css" href="css/payment.css"> <div class="header navbar-fixed-top"> <nav class="navbar fluid-container"> <div class="navbar-header"> <img class="logo" id="logo_icon" src="img/icon_trans.png" alt="expfood"> <img class="logo" id="logo_text" src="img/logo_main.png" alt="expfood"> </div> <div class="navbar-collapse collapse navbar-right"> </div> </nav> </div> <div class="container"> <div class="jumbotron content paybox"> <form class="form-horizontal"> <div class="form-group"> <label for="inputPassword3" class="col-sm-4 control-label">Продуктов на </label> <div type="text" class="col-sm-8 order-price"> '+totalCost+' рублей </div> </div> <div class="form-group"> <label for="inputPassword3" class="col-sm-4 control-label">Стоимость доставки</label> <div type="text" class="col-sm-8 order-price"> '+deliveryCost+' рублей </div> </div> <div class="form-group"> <label for="inputPassword3" class="col-sm-4 control-label">Итого к оплате </label> <div type="text" class="col-sm-8 order-price"> '+(totalCost + deliveryCost)+' рублей</div> </div> </form> <nav> <ul class="pager"> <li class="previous"> <a href="#" id="backToOrder" class="backForth"><span aria-hidden="true">&larr;</span> Назад</a> </li> <li id="tt" class="next" data-toggle="tooltip" data-placement="right" title="Tooltip on top"> <iframe frameborder="0" allowtransparency="true" scrolling="no" src="" width="195" height="54"></iframe> </li> </ul> </nav> </div> </div>')

                $( "iframe" ).attr({
                      src: 'https://money.yandex.ru/embed/small.xml?account=410013085842859&quickpay=small&any-card-payment-type=on&button-text=02&button-size=l&button-color=white&targets=expfood&default-sum='+(totalCost + deliveryCost)+'&successURL=samat.info'
                });
            });
        }
        else {
            $(".next").attr("class", "next disabled");
        }
}

$(document).ready(function (){
    validate();
    $('#name, #email, #phone').change(validate);
});

$('body').on('click', 'li.disabled', function(event) {
    event.preventDefault();
});


}); // end checkout click












$(document).on('click', "#backToMain", function(){
	$('.page-container').html(mainBack);
});

$(document).on('click', "#backToOrder", function(){
	$('.page-container').html(orderBack);
});
