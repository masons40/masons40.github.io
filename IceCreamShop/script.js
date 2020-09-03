$(document).ready(function(){
    
    var s =new scrollNav();
    s.init();
    
  
    
    let quantities = {
        banana_quantity: 0,
        chocolate_quantity: 0,
        strawberry_quantity: 0,
        peach_quantity: 0
    };
    
    let address = null;
    

    $('#nav-toggle').click(function(){
        $(this).toggleClass('active');
        $('nav').slideToggle();
    });
    
    $('#cofounders-button').click(function(){
        $('#cofounders-box').slideToggle(); 
    });
    
    $('.cart').click(function(){
        $('#overlay-trolley').slideToggle();
    });
    
     $('.cross').click(function(){
        $('#overlay-trolley').slideToggle();
    });
    
    $(".checkout-location").click(function(){
        address = $(this)[0].outerText;
        $(".checkout-location").each(function(){
            $(this).css("background-color", "#00a0d5");
        });
        $(this).css("background-color", "#0080a2");
    });
    
    $('.menu-item-button').click(function (){
        let data  = $(this).parent('.menu-item');
        let bg_colour = $(data).css('background-color');
        let menu_item = null;
        let title = (data[0].children[1].innerText).split(" ")[0].toLowerCase();
        let img_src = $(data[0].children[0]).attr('src');
        let icecream_id = data[0].id;
        
        
        if(checkExistence(title)){
            quantities[title+"_quantity"] = quantities[title+"_quantity"] + 1;
            $('#checkoutItem_'+title)[0].children[1].children[2].innerText = quantities[title+"_quantity"];

        }else{
            quantities[title+"_quantity"] = quantities[title+"_quantity"] + 1;
            menu_item =  createCheckoutItem(img_src, title, quantities[title+"_quantity"], bg_colour);
        }
    
        $('#checkout-items').append(menu_item);
        updateCart();
        
    });
    
    
    $(document).on('click', '.checkout-cross', function(){
        let data_values = $(this).parent()[0].children[2];
        let flavour = ($(this).parent()[0].children[0].innerText).split(" ")[0];
        let cart_decrease_value = parseInt(data_values.innerText);
        removeItem(this);
        quantities[flavour+"_quantity"]-=cart_decrease_value;
        updateCart();
    });
    
    $(document).on('click', '.plus-button', function(){
        let flavour = ($(this).parent()[0].children[0].innerText).split(" ")[0];
        quantities[flavour+"_quantity"]+=1;
        $($(this).parent()[0].children[2]).text(quantities[flavour+"_quantity"]);
        updateCart();
    });
    
    $(document).on('click', '.minus-button', function(){
        let flavour = ($(this).parent()[0].children[0].innerText).split(" ")[0];
        if(quantities[flavour+"_quantity"]==1){
            quantities[flavour+"_quantity"]-=1;
            removeItem(this);
        }else{
            quantities[flavour+"_quantity"]-=1;
            $($(this).parent()[0].children[2]).text(quantities[flavour+"_quantity"]);
        }
        updateCart();
    });
    
    function removeItem(item){
        $(item).parent()[0].parentElement.remove();
    }
    
    function updateCart(){
        $('.cart-number').text( quantities.banana_quantity+quantities.peach_quantity+quantities.chocolate_quantity+quantities.strawberry_quantity);
    }
    
    function createCheckoutItem(img_src, title, quantity, bg_colour){
        return $("<div />", {class:"checkout-item", "style":"background-color:" + bg_colour, id: "checkoutItem_"+ title}).append(
            $("<img />", {src:img_src}),
            $("<div />", {class:"checkout-item-info"}).append(
                $("<h3 />", {text: title + " flavour"}),
                $("<h3 />", {text:"Quantity: "}),
                $("<h3 />", {text:quantity, class:"checkout-item-quantity"}),
                $("<i />", {class:"fas fa-minus-circle minus-button"}),
                $("<i />", {class:"fas fa-plus-circle plus-button"}),
                $("<i />", {class:"fas fa-times checkout-cross"})
            )
        );
    }
    
    function checkExistence(partial_id){
        if ($('#checkoutItem_'+partial_id).length){
            return true;
        }
        return false;
    }
    
      $("#checkout-button").click(function(){
        alert("Your order: \nBanana:" + quantities.banana_quantity + "\nStrawberry:" + quantities.strawberry_quantity + "\nPeach:" + quantities.peach_quantity + "\nChocolate:" + quantities.chocolate_quantity + "\nshop location:" + address + "\nPlease note, that this is a website for demostration purposes");
      });
});