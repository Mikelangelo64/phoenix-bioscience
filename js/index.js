$(document).ready(function(){
    
    /* $(".carousel").swipe({

        swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
      
          if (direction == 'left') $(this).carousel('next');
          if (direction == 'right') $(this).carousel('prev');
      
        },
        allowPageScroll:"vertical"
      
      }); */
    /* $('.carousel-announcements__indicator ').click(()=>{
        $('.carousel-announcements__indicator ').addClass('_active-slide')
        console.log($('.carousel-announcements__indicator'))
        console.log($(this))
        $('.carousel-announcements__indicator, active').not($(this)).removeClass('_active-slide')
    }) */

    //lock body
    //console.log($('.btn__burger[aria-expanded=false]'));
    $('.btn__burger').click(()=>{
        $(document.body).toggleClass('_lock')
    })
    
    //lock when search
    if(document.documentElement.clientWidth > 1199){
        $('.btn__search__appear').click(function(e){
            $(document.body).toggleClass('_lock')
        })
    }

    //header & scroll-appear
    const headerInitialPos = $('.header').offset().top

    $(window).scroll(function(){
        const scrolled = $(this).scrollTop()

        if(document.documentElement.clientWidth > 768){
            if(headerInitialPos + 108 < scrolled){
                $('.header').addClass('_header__scroll')
                $('.btn__burger__wrapper').addClass('_header__scroll')
            } else{
                $('.header').removeClass('_header__scroll')
                $('.btn__burger__wrapper').removeClass('_header__scroll')
            }

            
        }

        if(document.documentElement.clientWidth > 587){
            if(scrolled > 600){
                $('._scroll-to-top').addClass('_scroll-appear')
            } else{
                $('._scroll-to-top').removeClass('_scroll-appear')
            }
        }
        if(document.documentElement.clientWidth <= 587){
            if(scrolled > 400){
                $('._scroll-to-top').addClass('_scroll-appear')
            } else{
                $('._scroll-to-top').removeClass('_scroll-appear')
            }
        }
        


        
    })

    //slider announcements
    let announcementsSwiper = new Swiper('.swiper.carousel-announcements', {
        slidesPerView: 1,
        spaceBetween: 30,
        //autoHeight: true,
        loop: false,
        pagination: {
            
            el: '.swiper-pagination',
            clickable: true,
            renderBullet: function (index, className) {
                return `<span class= "carousel-announcements__indicator ${className} "></span>`;
            }
        },
        breakpoints: {
            750:{
                slidesPerView: 2,
            },
            910:{
                slidesPerView: 3,
            },
        }
    })

    //picture accordion
    $('.main-section .main__picture__container .accordion-pictures__img.imgOne').parent().addClass('show-accordion-picture')
    $('.workforce .main__picture__container .accordion-pictures__img.imgOne').parent().addClass('show-accordion-picture')

    $(`.main-section .accordion-header.firstItem`).css('pointer-events', 'none')
    $(`.main-section .accordion-header.firstItem`).attr('aria-expanded', 'true')
    $(`.workforce .accordion-header.firstItem`).css('pointer-events', 'none')
    $(`.workforce .accordion-header.firstItem`).attr('aria-expanded', 'true')

    $('.main-section .accordion-header').click( function(e) {
        
        togglePicAccordion.apply(this, ['.main-section'])
    })

    $('.workforce .accordion-header').click( function(e) {
        
        togglePicAccordion.apply(this, ['.workforce'])
    })

    function togglePicAccordion(section){
        //event.preventDefault();
        const attribute = $(this).attr('dopAttr')
        // console.log('attribute', attribute);
        // console.log('parent:', $(`${section} .main__picture__container .accordion-pictures__img.${attribute}`).parent());
        // console.log('current:', $(`${section} .main__picture__container .accordion-pictures__img.${attribute}`));

        const firstTextItem = $(`${section} .accordion-header.firstItem`)
        const firstItem = $(`${section} .main__picture__container .accordion-pictures__img.imgOne`).parent()
        const changedItem = $(`${section} .main__picture__container .accordion-pictures__img.${attribute}`).parent()

        //unclosed sections
        $(`${section} .accordion-header`).css('pointer-events', 'unset')
        if($(this).attr('aria-expanded') === 'true'){

            //text
            $(this).css('pointer-events', 'none')

            //console.log('unclosed sections', this);
            // return
        }

        // if(attribute === 'imgOne'){
        //     $(firstTextItem).css('pointer-events', 'none')
        // }


        //unused logic
    //     if(changedItem.hasClass('show-accordion-picture')){
    //         text
    //         $(firstTextItem).css('pointer-events', 'none')
    //         $(firstTextItem).attr('aria-expanded', 'true')
    //         $(firstTextItem).addClass('collapsed')

    //         console.log('hui', $(firstTextItem).children('.accordion-info__title__btn'));
            
    //         $(firstTextItem).children('.accordion-info__title__btn').attr('aria-expanded', "true")
    //         $(firstTextItem).children('.accordion-info__title__btn').addClass('collapsed')
    //         $(firstTextItem).next().addClass('show')
    //         $(firstTextItem).prev().addClass('show')


    //         picture
    //         firstItem.addClass('show-accordion-picture')
    //         $(`${section} .main__picture__container .accordion-pictures__img`).parent().not(firstItem).removeClass('show-accordion-picture')
    //         return
    //     }


        $(changedItem).addClass('show-accordion-picture')
        $(`${section} .main__picture__container .accordion-pictures__img`).parent().not(changedItem).removeClass('show-accordion-picture')

       
    }

    //accordion`s timer

    addEventListener('load', function() {
        let elements = Array.from($(`.main-section .accordion-header`))
        let currentItem //= elements[0]
        let nextItem //= elements[1]
        let indexArr = -1

        function autoToggleSlide(){
            indexArr++
            if(indexArr > elements.length - 1){
                indexArr = 0
                //currentItem = elements[indexArr]
            }
            if(indexArr > elements.length - 2){
                nextItem = elements[0]
            }
            else{
                nextItem = elements[indexArr+1]
            }
            currentItem = elements[indexArr]
            
            
            changeItemOnTimer(currentItem, nextItem)
            togglePicAccordion.apply(nextItem, ['.main-section'])
            //console.log(elements);
        }

        let autoTransition = setInterval(autoToggleSlide, 3000);

        $(`.main-section .accordion-header`).click(function (e) { 
            //e.preventDefault();
            elements.forEach((item, index)=>{
                if(item === this){
                    indexArr = index -1
                }
            })

            clearInterval(autoTransition);
            autoTransition = setInterval(autoToggleSlide, 3000);
        });
        
    })
    addEventListener('load', function() {
        let elementsWorkforce = Array.from($(`.workforce .accordion-header`))
        let currentItemWorkforce //= elements[0]
        let nextItemWorkforce //= elements[1]
        let indexArrWorkforce = -1

        function autoToggleSlideWorkforce(){
            indexArrWorkforce++
            if(indexArrWorkforce > elementsWorkforce.length - 1){
                indexArrWorkforce = 0
                //currentItem = elements[indexArr]
            }
            if(indexArrWorkforce > elementsWorkforce.length - 2){
                nextItemWorkforce = elementsWorkforce[0]
            }
            else{
                nextItemWorkforce = elementsWorkforce[indexArrWorkforce+1]
            }
            currentItemWorkforce = elementsWorkforce[indexArrWorkforce]
            
            
            changeItemOnTimer(currentItemWorkforce, nextItemWorkforce)
            togglePicAccordion.apply(nextItemWorkforce, ['.workforce'])
            //console.log(elementsWorkforce);
        }

        let autoTransitionWorkforce = setInterval(autoToggleSlideWorkforce, 3000);

        $(`.workforce .accordion-header`).click(function (e) { 
            //e.preventDefault();
            elementsWorkforce.forEach((item, index)=>{
                if(item === this){
                    indexArrWorkforce = index -1
                }
            })

            clearInterval(autoTransitionWorkforce);
            autoTransitionWorkforce = setInterval(autoToggleSlideWorkforce, 3000);
        });
        
    })

    

    function changeItemOnTimer(currentItem, nextItem){

        $(currentItem).attr('aria-expanded', "false")
        $(currentItem).css('pointer-events', 'unset')
        $(currentItem).removeClass('collapsed')
        $(currentItem).children('.accordion-info__title__btn').attr('aria-expanded', "false")
        $(currentItem).children('.accordion-info__title__btn').removeClass('collapsed')
        $(currentItem).next().removeClass('show')
        $(currentItem).prev().removeClass('show')
    
        $(currentItem).parent().removeClass('current-to-show')
    
            $(nextItem).attr('aria-expanded', 'true')
            $(nextItem).css('pointer-events', 'none')
                
            $(nextItem).addClass('collapsed')
            $(nextItem).children('.accordion-info__title__btn').attr('aria-expanded', "true")
            $(nextItem).children('.accordion-info__title__btn').addClass('collapsed')
            $(nextItem).next().addClass('show')
            $(nextItem).prev().addClass('show')
    
            $(nextItem).parent().addClass('current-to-show')

        //console.log('elements', currentItem, nextItem);
        // return [currentItem, nextItem]
    }

    // function infinityCollapse(counter){
    //     if(counter > 20){
    //         counter = 0
    //         console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    //         createProgressbar(`.main-section .accordion-info .accordion-item .accordion-header[aria-expanded="true"] .progressbar`, '1s', function(){
    //             changeItemOnTimer('.main-section')

    //             //$(`.main-section .accordion-info .accordion-item .accordion-header .progressbar .inner`).remove()

    //             return infinityCollapse(counter)
    //         })
    //         return
    //     }else{
    //         createProgressbar(`.main-section .accordion-info .accordion-item .accordion-header[aria-expanded="true"] .progressbar`, '1s', function(){
    //             changeItemOnTimer('.main-section')

    //             //$(`.main-section .accordion-info .accordion-item .accordion-header .progressbar .inner`).remove()

    //             return infinityCollapse(counter++)
    //         })
    //     }
    // }

    //main additional function for accordion
    // $(`.main-section .main__picture__container .accordion-collapse#imgOne`).parent().addClass('show')
    // $('.main-section .accordion-header').click(function (e) { 
    //     e.preventDefault();

    //     const attribute = $(this).attr('dopAttr')
    //     console.log('parent:', $(`.main-section .main__picture__container .accordion-collapse#${attribute}`).parent());
    //     console.log('current:', $(`.main-section .main__picture__container .accordion-collapse#${attribute}`));
         
    //     const changedPic = $(`.main-section .main__picture__container .accordion-collapse#${attribute}`)
         
    //     console.log('ATTRIBUTE', attribute);
    //      $(`.main-section .main__picture__container .accordion-collapse#${attribute}`).parent().toggleClass('show')

         
    //      $(`.main-section .main__picture__container .accordion-collapse`).not(changedPic).parent().removeClass('show')
    //  });

    // //workforce
    // $(`.workforce .main__picture__container .accordion-collapse#workforceImgOne`).parent().addClass('show')
    // $('.workforce .accordion-header').click(function (e) { 
    //     e.preventDefault();

    //     const attribute = $(this).attr('dopAttr')
    //     console.log('parent:', $(`.workforce .main__picture__container .accordion-collapse#${attribute}`).parent());
    //     console.log('current:', $(`.workforce .main__picture__container .accordion-collapse#${attribute}`));
         
    //     const changedPic = $(`.workforce .main__picture__container .accordion-collapse#${attribute}`)
         
    //     console.log('ATTRIBUTE', attribute);
    //      $(`.workforce .main__picture__container .accordion-collapse#${attribute}`).parent().toggleClass('show')

         
    //      $(`.workforce .main__picture__container .accordion-collapse`).not(changedPic).parent().removeClass('show')
    //  });
})