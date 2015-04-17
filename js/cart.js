var count = 0; //all items
var totalCost = 0;
var newItem = '';


// $('.increase_count').click(function () {
$(document).on('click', ".increase_count", function(){
	
	count ++;
	$(this).closest('div').children('.reduce_count').css( "display", "block" );
	$(this).closest('.product').children('.item_count').css( "display", "block" );
	$(this).closest('.product').children('.item_count').html(function(i, val) { 
		value = val*1 +1;
		return value; 
	});

	newItem = (
				'<tr class="ordered-item" id="cart-'+$(this).closest('.product').attr('id')+'"> '+
					'<td class="image">'+ $(this).closest('.product').children('img')[0].outerHTML + '</td>' +
					'<td class="name">'+$(this).closest('.product').find('.product-name').html()+'</td>' +
					'<td class="price">'+parseFloat($(this).closest('.product').find('.product-price').html())+' &#8381;</td>' +
					'<td class="quantity"> x '+value+'</td>' +
					'<td class="total"> = '+ parseFloat($(this).closest('.product').find('.product-price').html())*parseFloat(value)+' &#8381; </td>'+
				'</tr>');

	
	$('#cart-number').html(count);

	if (count == 1) {
		$('#cart-number').css( "display", "block" );
	}

	if (count == 10) {
		$('#cart-number').css( "width", "27px" );
	}
	var itemId = $(this).closest('.product');
	// if (value > 1) {
		$("#cart-"+ itemId.attr('id')).remove();
	// }

	$("#ordered-items").prepend(newItem);

	totalCost = totalCost + parseFloat($(this).closest('.product').find('.product-price').html())


	$('#cart-price').html(totalCost);

	// $( "iframe" ).attr({
	//   src: "https://money.yandex.ru/embed/small.xml?account=410013034873931&quickpay=small&any-card-payment-type=on&button-text=02&button-size=l&button-color=orange&targets=expfood&default-sum="+totalCost+"&successURL=",
	// });

	return newItem;
});


// $('.reduce_count').click(function () {
$(document).on('click', ".reduce_count", function(){
	// console.log(newItem);

	count --;
	$(this).closest('.product').children('.item_count').html(function(i, val) { 
		value = val*1 -1;
		return value; 
	});

	newItem = (
				'<tr class="ordered-item" id="cart-'+$(this).closest('.product').attr('id')+'"> '+
					'<td class="image">'+ $(this).closest('.product').children('img')[0].outerHTML + '</td>' +
					'<td class="name">'+$(this).closest('.product').find('.product-name').html()+'</td>' +
					'<td class="price">'+parseFloat($(this).closest('.product').find('.product-price').html())+' &#8381;</td>' +
					'<td class="quantity"> x '+value+'</td>' +
					'<td class="total"> = '+ parseFloat($(this).closest('.product').find('.product-price').html())*parseFloat(value)+'</td>'+
				'</tr>');
	var itemId = $(this).closest('.product');

	$("#cart-"+ itemId.attr('id')).remove();


	if (value <= 0) {
		$(this).closest('div').children('.reduce_count').css( "display", "none" );
		$(this).closest('.product').children('.item_count').css( "display", "none" );
	}
	else {
		$("#ordered-items").prepend(newItem);
	}

	$('#cart-number').html(count);

	if (count == 9) {
		$('#cart-number').css( "width", "20px" );
	}
	if (count <= 0) {
		$('#cart-number').css( "display", "none" );
	}

	totalCost = totalCost - parseFloat($(this).closest('.product').find('.product-price').html());

	$('#cart-price').html(totalCost);



	// $( "iframe" ).attr({
	//   src: "https://money.yandex.ru/embed/small.xml?account=410013034873931&quickpay=small&any-card-payment-type=on&button-text=02&button-size=l&button-color=orange&targets=expfood&default-sum="+totalCost+"&successURL=",
	// });




	return newItem;
});
var h;
var m;
function updateClock() {
	var d = new Date();
	var h = d.getHours() + 1;
	var m = d.getMinutes();
	$("#cart_time_b").html(h+':'+ (d.getMinutes()<10?'0':'') + m);
	$(".order-time").html(h+':'+ (d.getMinutes()<10?'0':'') + m);
    setTimeout(updateClock, 6000);
    return [h,m];
}
updateClock(); // initial call


// $('.dropdown').click(function () {
// 	$('.dropdown-menu').css( "display", "block" );
// 	$('.dropdown-menu').css( "width", "350px" );
// });


// $( ".paybtn" ).click(function() {
//   $( "iframe" ).trigger( "click" );
// });

$(".paybtn").click(function(){
   $("#yiframe").click()
});

$('#yiframe').click(function () {
	alert('clicked');
});
$('.dropdown').click(function () {
			$( "iframe" ).attr({
	  src: "https://money.yandex.ru/embed/small.xml?account=410013034873931&quickpay=small&any-card-payment-type=on&button-text=02&button-size=l&button-color=orange&targets=expfood&default-sum="+totalCost+"&successURL=",
	});
});

