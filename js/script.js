$(document).ready(function(){


    $(".mobile-menu-icon.fa-bars").click(function(){
        $(".mobile-menu").slideToggle();
    });

    $(".mobile-menu-icon.fa-times").click(function(){
        $(".mobile-menu").slideToggle();
    });

});

$(function() {
    var Accordion = function(el, multiple) {
        this.el = el || {};
        this.multiple = multiple || false;

        // Variables privadas
        var links = this.el.find('.link');
        // Evento
        links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown)
    }

    Accordion.prototype.dropdown = function(e) {
        var $el = e.data.el;
        $this = $(this),
            $next = $this.next();

        $next.slideToggle();
        $this.parent().toggleClass('open');

        if (!e.data.multiple) {
            $el.find('.submenu').not($next).slideUp().parent().removeClass('open');
        };
    }

    var accordion = new Accordion($('#accordion'), false);
});



$(document).ready(function(){

    $(".largeGrid").click(function(){
        $(this).find('a').addClass('active');
        $('.smallGrid a').removeClass('active');

        $('.product').addClass('large').each(function(){
        });
        setTimeout(function(){
            $('.info-large').show();
        }, 200);
        setTimeout(function(){

            $('.view_gallery').trigger("click");
        }, 400);

        return false;
    });

    $(".smallGrid").click(function(){
        $(this).find('a').addClass('active');
        $('.largeGrid a').removeClass('active');

        $('div.product').removeClass('large');
        $(".make3D").removeClass('animate');
        $('.info-large').fadeOut("fast");
        setTimeout(function(){
            $('div.flip-back').trigger("click");
        }, 400);
        return false;
    });

    $(".smallGrid").click(function(){
        $('.product').removeClass('large');
        return false;
    });

    $('.colors-large a').click(function(){return false;});


    $('.product').each(function(i, el){

        // Lift card and show stats on Mouseover
        $(el).find('.make3D').hover(function(){
            $(this).parent().css('z-index', "20");
            $(this).addClass('animate');
            $(this).find('div.carouselNext, div.carouselPrev').addClass('visible');
        }, function(){
            $(this).removeClass('animate');
            $(this).parent().css('z-index', "1");
            $(this).find('div.carouselNext, div.carouselPrev').removeClass('visible');
        });

        // Flip card to the back side
        $(el).find('.view_gallery').click(function(){

            $(el).find('div.carouselNext, div.carouselPrev').removeClass('visible');
            $(el).find('.make3D').addClass('flip-10');
            setTimeout(function(){
                $(el).find('.make3D').removeClass('flip-10').addClass('flip90').find('div.shadow').show().fadeTo( 80 , 1, function(){
                    $(el).find('.product-front, .product-front div.shadow').hide();
                });
            }, 50);

            setTimeout(function(){
                $(el).find('.make3D').removeClass('flip90').addClass('flip190');
                $(el).find('.product-back').show().find('div.shadow').show().fadeTo( 90 , 0);
                setTimeout(function(){
                    $(el).find('.make3D').removeClass('flip190').addClass('flip180').find('div.shadow').hide();
                    setTimeout(function(){
                        $(el).find('.make3D').css('transition', '100ms ease-out');
                        $(el).find('.cx, .cy').addClass('s1');
                        setTimeout(function(){$(el).find('.cx, .cy').addClass('s2');}, 100);
                        setTimeout(function(){$(el).find('.cx, .cy').addClass('s3');}, 200);
                        $(el).find('div.carouselNext, div.carouselPrev').addClass('visible');
                    }, 100);
                }, 100);
            }, 150);
        });

        // Flip card back to the front side
        $(el).find('.flip-back').click(function(){

            $(el).find('.make3D').removeClass('flip180').addClass('flip190');
            setTimeout(function(){
                $(el).find('.make3D').removeClass('flip190').addClass('flip90');

                $(el).find('.product-back div.shadow').css('opacity', 0).fadeTo( 100 , 1, function(){
                    $(el).find('.product-back, .product-back div.shadow').hide();
                    $(el).find('.product-front, .product-front div.shadow').show();
                });
            }, 50);

            setTimeout(function(){
                $(el).find('.make3D').removeClass('flip90').addClass('flip-10');
                $(el).find('.product-front div.shadow').show().fadeTo( 100 , 0);
                setTimeout(function(){
                    $(el).find('.product-front div.shadow').hide();
                    $(el).find('.make3D').removeClass('flip-10').css('transition', '100ms ease-out');
                    $(el).find('.cx, .cy').removeClass('s1 s2 s3');
                }, 100);
            }, 150);

        });

        makeCarousel(el);
    });

    $('.add-cart-large').each(function(i, el){
        $(el).click(function(){
            var carousel = $(this).parent().parent().find(".carousel-container");
            var img = carousel.find('img').eq(carousel.attr("rel"))[0];
            var position = $(img).offset();

            var productName = $(this).parent().find('h4').get(0).innerHTML;

            $("body").append('<div class="floating-cart"></div>');
            var cart = $('div.floating-cart');
            $("<img src='"+img.src+"' class='floating-image-large' />").appendTo(cart);

            $(cart).css({'top' : position.top + 'px', "left" : position.left + 'px'}).fadeIn("slow").addClass('moveToCart');
            setTimeout(function(){$("body").addClass("MakeFloatingCart");}, 800);

            setTimeout(function(){
                $('div.floating-cart').remove();
                $("body").removeClass("MakeFloatingCart");


                var cartItem = "<div class='cart-item'><div class='img-wrap'><img src='"+img.src+"' alt='' /></div><span>"+productName+"</span><strong>$39</strong><div class='cart-item-border'></div><div class='delete-item'></div></div>";

                $("#cart .empty").hide();
                $("#cart").append(cartItem);
                $("#checkout").fadeIn(500);

                $("#cart .cart-item").last()
                    .addClass("flash")
                    .find(".delete-item").click(function(){
                    $(this).parent().fadeOut(300, function(){
                        $(this).remove();
                        if($("#cart .cart-item").size() == 0){
                            $("#cart .empty").fadeIn(500);
                            $("#checkout").fadeOut(500);
                        }
                    })
                });
                setTimeout(function(){
                    $("#cart .cart-item").last().removeClass("flash");
                }, 10 );

            }, 1000);


        });
    })

    /* ----  Image Gallery Carousel   ---- */
    function makeCarousel(el){


        var carousel = $(el).find('.carousel ul');
        var carouselSlideWidth = 315;
        var carouselWidth = 0;
        var isAnimating = false;
        var currSlide = 0;
        $(carousel).attr('rel', currSlide);

        // building the width of the casousel
        $(carousel).find('li').each(function(){
            carouselWidth += carouselSlideWidth;
        });
        $(carousel).css('width', carouselWidth);

        // Load Next Image
        $(el).find('div.carouselNext').on('click', function(){
            var currentLeft = Math.abs(parseInt($(carousel).css("left")));
            var newLeft = currentLeft + carouselSlideWidth;
            if(newLeft == carouselWidth || isAnimating === true){return;}
            $(carousel).css({'left': "-" + newLeft + "px",
                "transition": "300ms ease-out"
            });
            isAnimating = true;
            currSlide++;
            $(carousel).attr('rel', currSlide);
            setTimeout(function(){isAnimating = false;}, 300);
        });

        // Load Previous Image
        $(el).find('div.carouselPrev').on('click', function(){
            var currentLeft = Math.abs(parseInt($(carousel).css("left")));
            var newLeft = currentLeft - carouselSlideWidth;
            if(newLeft < 0  || isAnimating === true){return;}
            $(carousel).css({'left': "-" + newLeft + "px",
                "transition": "300ms ease-out"
            });
            isAnimating = true;
            currSlide--;
            $(carousel).attr('rel', currSlide);
            setTimeout(function(){isAnimating = false;}, 300);
        });
    }

    $('.sizes a span, .categories a span').each(function(i, el){
        $(el).append('<span class="x"></span><span class="y"></span>');

        $(el).parent().on('click', function(){
            if($(this).hasClass('checked')){
                $(el).find('.y').removeClass('animate');
                setTimeout(function(){
                    $(el).find('.x').removeClass('animate');
                }, 50);
                $(this).removeClass('checked');
                return false;
            }

            $(el).find('.x').addClass('animate');
            setTimeout(function(){
                $(el).find('.y').addClass('animate');
            }, 100);
            $(this).addClass('checked');
            return false;
        });
    });

    $('.add_to_cart').click(function(){
        var productCard = $(this).parent();
        var position = productCard.offset();
        var productImage = $(productCard).find('img').get(0).src;
        var productName = $(productCard).find('.product_name').get(0).innerHTML;

        $("body").append('<div class="floating-cart"></div>');
        var cart = $('div.floating-cart');
        productCard.clone().appendTo(cart);
        $(cart).css({'top' : position.top + 'px', "left" : position.left + 'px'}).fadeIn("slow").addClass('moveToCart');
        setTimeout(function(){$("body").addClass("MakeFloatingCart");}, 800);
        setTimeout(function(){
            $('div.floating-cart').remove();
            $("body").removeClass("MakeFloatingCart");


            var cartItem = "<div class='cart-item'><div class='img-wrap'><img src='"+productImage+"' alt='' /></div><span>"+productName+"</span><strong>$39</strong><div class='cart-item-border'></div><div class='delete-item'></div></div>";

            $("#cart .empty").hide();
            $("#cart").append(cartItem);
            $("#checkout").fadeIn(500);

            $("#cart .cart-item").last()
                .addClass("flash")
                .find(".delete-item").click(function(){
                $(this).parent().fadeOut(300, function(){
                    $(this).remove();
                    if($("#cart .cart-item").size() == 0){
                        $("#cart .empty").fadeIn(500);
                        $("#checkout").fadeOut(500);
                    }
                })
            });
            setTimeout(function(){
                $("#cart .cart-item").last().removeClass("flash");
            }, 10 );

        }, 1000);
    });
});






jQuery(document).ready(function($){
    //if you change this breakpoint in the style.css file (or _layout.scss if you use SASS), don't forget to update this value as well
    var $L = 1200,
        $menu_navigation = $('#main-nav'),
        $cart_trigger = $('#cd-cart-trigger'),
        $hamburger_icon = $('#cd-hamburger-menu'),
        $lateral_cart = $('#cd-cart'),
        $shadow_layer = $('#cd-shadow-layer');

    //open lateral menu on mobile
    $hamburger_icon.on('click', function(event){
        event.preventDefault();
        //close cart panel (if it's open)
        $lateral_cart.removeClass('speed-in');
        toggle_panel_visibility($menu_navigation, $shadow_layer, $('body'));
    });

    //open cart
    $cart_trigger.on('click', function(event){
        event.preventDefault();
        //close lateral menu (if it's open)
        $menu_navigation.removeClass('speed-in');
        toggle_panel_visibility($lateral_cart, $shadow_layer, $('body'));
    });

    //close lateral cart or lateral menu
    $shadow_layer.on('click', function(){
        $shadow_layer.removeClass('is-visible');
        // firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden
        if( $lateral_cart.hasClass('speed-in') ) {
            $lateral_cart.removeClass('speed-in').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
                $('body').removeClass('overflow-hidden');
            });
            $menu_navigation.removeClass('speed-in');
        } else {
            $menu_navigation.removeClass('speed-in').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
                $('body').removeClass('overflow-hidden');
            });
            $lateral_cart.removeClass('speed-in');
        }
    });

    //move #main-navigation inside header on laptop
    //insert #main-navigation after header on mobile
    move_navigation( $menu_navigation, $L);
    $(window).on('resize', function(){
        move_navigation( $menu_navigation, $L);

        if( $(window).width() >= $L && $menu_navigation.hasClass('speed-in')) {
            $menu_navigation.removeClass('speed-in');
            $shadow_layer.removeClass('is-visible');
            $('body').removeClass('overflow-hidden');
        }

    });
});

function toggle_panel_visibility ($lateral_panel, $background_layer, $body) {
    if( $lateral_panel.hasClass('speed-in') ) {
        // firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden
        $lateral_panel.removeClass('speed-in').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
            $body.removeClass('overflow-hidden');
        });
        $background_layer.removeClass('is-visible');

    } else {
        $lateral_panel.addClass('speed-in').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
            $body.addClass('overflow-hidden');
        });
        $background_layer.addClass('is-visible');
    }
}

function move_navigation( $navigation, $MQ) {
    if ( $(window).width() >= $MQ ) {
        $navigation.detach();
        $navigation.appendTo('header');
    } else {
        $navigation.detach();
        $navigation.insertAfter('header');
    }
}