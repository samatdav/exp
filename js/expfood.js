$(window).on('load', function () 
{
	$('.selectpicker').selectpicker({});
});

var count = 0; //all items
var totalCost = 0;
var newItem = '';


	$('.increase_count').click(function () {
		
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

		$('#cart-number').css( "display", "block" );
		$('#cart-number').html(count);
		var itemId = $(this).closest('.product');
		if (value > 1) {
			$("#cart-"+ itemId.attr('id')).remove();
		}

		$("#ordered-items").prepend(newItem);

		totalCost = totalCost + parseFloat($(this).closest('.product').find('.product-price').html())


		$('#cart-price').html(totalCost);

		// $( "iframe" ).attr({
		//   src: "https://money.yandex.ru/embed/small.xml?account=410013034873931&quickpay=small&any-card-payment-type=on&button-text=02&button-size=l&button-color=orange&targets=expfood&default-sum="+totalCost+"&successURL=",
		// });

		return newItem;
	});


	$('.reduce_count').click(function () {
		console.log(newItem);

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


	$('.dropdown').click(function () {
		$('.dropdown-menu').css( "display", "block" );
		$('.dropdown-menu').css( "width", "350px" );
	});

	// $('.dropdown').click(function () {
	// 			$( "iframe" ).attr({
	// 	  src: "https://money.yandex.ru/embed/small.xml?account=410013034873931&quickpay=small&any-card-payment-type=on&button-text=02&button-size=l&button-color=orange&targets=expfood&default-sum="+totalCost+"&successURL=",
	// 	});
	// });

