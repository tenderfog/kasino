
$(document).ready(function() {
        // Remove Search if user Resets Form or hits Escape!
        $('body, .navbar-collapse form[role="search"] button[type="reset"]').on('click keyup', function(event) {
            console.log(event.currentTarget);
            if (event.which == 27 && $('.navbar-collapse form[role="search"]').hasClass('active') ||
                $(event.currentTarget).attr('type') == 'reset') {
                closeSearch();
            }
        });

        function closeSearch() {
            var $form = $('.navbar-collapse form[role="search"].active')
            $form.find('input').val('');
            $form.removeClass('active');
        }

        // Show Search if form is not active // event.preventDefault() is important, this prevents the form from submitting
        $(document).on('click', '.navbar-collapse form[role="search"]:not(.active) button[type="submit"]', function(event) {
            event.preventDefault();
            var $form = $(this).closest('form'),
                $input = $form.find('input');
            $form.addClass('active');
            $input.focus();

        });
        // ONLY FOR DEMO // Please use $('form').submit(function(event)) to track from submission
        // if your form is ajax remember to call `closeSearch()` to close the search container
        $(document).on('click', '.navbar-collapse form[role="search"].active button[type="submit"]', function(event) {
            event.preventDefault();
            var $form = $(this).closest('form'),
                $input = $form.find('input');
            $('#showSearchTerm').text($input.val());
            closeSearch()
        });


        $('.slots_game').owlCarousel({
            loop:true,
            margin:30,
            responsive:{
                0:{
                    items:1,
                    nav:true
                },
                600:{
                    items:4,
                    nav:false
                },
                1000:{
                    items:4,
                    nav:true,
                    loop:true
                }
            }
        })

});

// Slider

var in_progress = 0;
jQuery(document).ready(function($){ 
    var visionTrigger = $('.cd-3d-trigger'),
        galleryItems = $('.no-touch #cd-gallery-items').children('li'),
        galleryNavigation = $('.cd-item-navigation a');

    //on mobile - start/end 3d vision clicking on the 3d-vision-trigger
    visionTrigger.on('click', function(){
        $this = $(this);
        if( $this.parent('li').hasClass('active') ) {
            $this.parent('li').removeClass('active');
            hideNavigation($this.parent('li').find('.cd-item-navigation'));
        } else {
            $this.parent('li').addClass('active');
            updateNavigation($this.parent('li').find('.cd-item-navigation'), $this.parent('li').find('.cd-item-wrapper'));
        }
    });

    //on desktop - update navigation visibility when hovering over the gallery images
    galleryItems.hover(
        //when mouse enters the element, show slider navigation
        function(){
            $this = $(this).children('.cd-item-wrapper');
            updateNavigation($this.siblings('nav').find('.cd-item-navigation').eq(0), $this);
        },
        //when mouse leaves the element, hide slider navigation
        function(){
            $this = $(this).children('.cd-item-wrapper');
            hideNavigation($this.siblings('nav').find('.cd-item-navigation').eq(0));
        }
    );

    //change image in the slider
    galleryNavigation.on('click', function(){       
        if(in_progress == 1){
            return false;
        }
        in_progress = 1;
        var navigationAnchor = $(this);
            direction = navigationAnchor.text(),
            activeContainer = navigationAnchor.parents('nav').eq(0).siblings('.cd-item-wrapper');
        
        if( direction=="Next"){         
            showNextSlide(activeContainer);         
        }else{          
            showPreviousSlide(activeContainer);
        }            
    //  updateNavigation(navigationAnchor.parents('.cd-item-navigation').eq(0), activeContainer);
    setTimeout(function(){in_progress = 0;},500);   
    });

/*
        Radio + image
    */

        $(".img-check").change(function () {
        if ($(".img-check").is(":checked")) {
            $('.item').removeClass("active");
            $(this).parents('.item').addClass("active");
        }
        else 
            $('.item').removeClass("active");
        });  
        

/*
        Form .start_project
    */

    $('.start_project fieldset:first-child').fadeIn('slow');
    
    $('.start_project input[type="text"], .start_project input[type="password"], .start_project input[type="range"], .start_project input[type="checkbox"], .start_project textarea').on('focus', function() {
        $(this).removeClass('input-error');
    });
    
    // next step
    $('.start_project .btn-next').on('click', function() {
        var parent_fieldset = $(this).parents('fieldset');
        var next_step = true;
        
        parent_fieldset.find('input[type="text"], input[type="password"], input[type="range"], input[type="checkbox"], textarea').each(function() {
            if( $(this).val() == "" ) {
                $(this).addClass('input-error');
                next_step = false;
            }
            else {
                $(this).removeClass('input-error');
            }
        });
        
        if( next_step ) {
            parent_fieldset.fadeOut(400, function() {
                $(this).next().fadeIn();
            });
        }
        
    });
    
    // previous step
    $('.start_project .btn-previous').on('click', function() {
        $(this).parents('fieldset').fadeOut(400, function() {
            $(this).prev().fadeIn();
        });
    });
    
    // submit
    $('.start_project').on('submit', function(e) {
        
        $(this).find('input[type="text"], input[type="password"], input[type="range"], input[type="checkbox"], textarea').each(function() {
            if( $(this).val() == "" ) {
                e.preventDefault();
                $(this).addClass('input-error');
            }
            else {
                $(this).removeClass('input-error');
            }
        });
        
    });


    $('.calc_open').on('click', function() {
        $(this).parents('.item').addClass('calc_active');
        // var height = $(this).parents('.item').find( '.calculator' ).height();
        // $(this).parents('.item').height(height);
    });
    
    $('.calc_close').on('click', function() {
        $(this).parents('.item').removeClass('calc_active');
        // $(this).parents('.item').css("height", "");
    });


    $(".checkbox_block").change(function () {
        if ($(".checkbox_bl .checkbox", this).is(":checked")) {
            $(this).parent().find('.checkbox_block').addClass("active");
        }
        else {
           $(this).removeClass("active");
       }
    });  
});

function showNextSlide(container) {
    var itemToHide = container.find('.cd-item-front'),
        itemToShow = container.find('.cd-item-middle'),
        itemMiddle = container.find('.cd-item-back'),
        itemToBack = container.find('.cd-item-out');

    itemToHide.addClass('move-right').removeClass('cd-item-front').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
        itemToHide.addClass('cd-item-out').removeClass('move-right');
    });
    itemToShow.addClass('cd-item-front').removeClass('cd-item-middle');
    itemMiddle.addClass('cd-item-middle').removeClass('cd-item-back');
    itemToBack.addClass('cd-item-back').removeClass('cd-item-out');     
}

function showPreviousSlide(container) { 
    var itemToMiddle = container.find('.cd-item-front'),
        itemToBack = container.find('.cd-item-middle'),
        itemToShow = container.find('.cd-item-out'),
        itemToOut = container.find('.cd-item-back');

    itemToOut.addClass('move-left').removeClass('cd-item-back').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
        itemToOut.addClass('cd-item-out').removeClass('move-left');
    });
    itemToShow.removeClass('cd-item-out').addClass('cd-item-front');
    itemToMiddle.removeClass('cd-item-front').addClass('cd-item-middle');
    itemToBack.removeClass('cd-item-middle').addClass('cd-item-back');      
    //itemToOut.removeClass('cd-item-back').addClass('cd-item-out');
    
}

function updateNavigation(navigation, container) {
    /*var isNextActive = ( container.find('.cd-item-middle').length > 0 ) ? true : false,
        isPrevActive =  ( container.children('li').eq(0).hasClass('cd-item-front') ) ? false : true;
    (isNextActive) ? navigation.find('a').eq(1).addClass('visible') : navigation.find('a').eq(1).removeClass('visible');
    (isPrevActive) ? navigation.find('a').eq(0).addClass('visible') : navigation.find('a').eq(0).removeClass('visible');*/
}

function hideNavigation(navigation) {
    navigation.find('a').removeClass('visible');
}