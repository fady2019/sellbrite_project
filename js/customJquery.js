$(function(){
    //strat menu
    let menu = document.querySelector(".menu"),
    opened = false;

    menu.addEventListener("click", () => {
        $(".nav .linkWithMenu").slideToggle();
        if(opened){
            menu.classList.remove("open");
            opened = false;
        }else{
            menu.classList.add("open")
            opened = true;
        }
    })
    $(".nav .linkWithMenu>ul>li>a i").click(function(){
        $(this).toggleClass("fa-chevron-down fa-chevron-up")
        $(this).parentsUntil("li").parent().find("ul").slideToggle()
    })
    //end menu


    //things that depended on scroll
    let cardsOffsetTop,
        incrInScroll=0,
        pos = parseFloat( $(":root").css("--pos") ),
        newPos=0;

    let camerasOpacity = $(".sync .cameras>img").css("opacity"),
        syncRotate = $(".sync .cameras div img:last-of-type").css("--rotate"),
        syncOffsetTop,
        newOpacity,
        newRotate,
        diBetScrAndOff=0;

    let postageOffset,
        truckPositionLeft = parseFloat( $(".printPostage .lap div img:last-of-type").css("left") ),
        dif=0,
        newPositionLeft;

    $(window).scroll(function(){
        cardsOffsetTop = $(".inventoryList").offset().top;
        if($(this).scrollTop() >= cardsOffsetTop - 200){
            incrInScroll = $(this).scrollTop() - (cardsOffsetTop-200); 
            newPos = pos - (incrInScroll/10);
            if(newPos>=0){
                $(":root").css("--pos", newPos+"px")
            }else{
                $(":root").css("--pos", 0)
            }

        }else{
            $(":root").css("--pos", pos+"px")
        }


        //sync rotate
        syncOffsetTop = $(".sync").offset().top;
        if($(this).scrollTop() >= syncOffsetTop-200 ){
            diBetScrAndOff = $(this).scrollTop() - (syncOffsetTop-200);
                newOpacity = parseFloat(camerasOpacity) + (diBetScrAndOff/200);
                newRotate = parseFloat( syncRotate ) + (diBetScrAndOff)
                $(".sync .cameras>img").css("opacity", newOpacity)
                if(newRotate<=90){
                    $(".sync .cameras div img:last-of-type").css("--rotate", newRotate + "deg")
                }else if(newRotate>90){
                    $(".sync .cameras div img:last-of-type").css("--rotate","90deg")
                }
        }else{
            $(".sync .cameras>img").css("opacity",camerasOpacity)
            $(".sync .cameras div img:last-of-type").css("--rotate", syncRotate)
        }


        //print postage
        postageOffset = $(".printPostage").offset().top;
        if($(this).scrollTop() >= postageOffset-200){
            dif = $(this).scrollTop() - (postageOffset-200);
            newPositionLeft = truckPositionLeft + (dif/5);
            if(newPositionLeft<=100){
                $(".printPostage .lap div img:last-of-type").css("left",newPositionLeft)
            }
        }else{
            $(".printPostage .lap div img:last-of-type").css("left",truckPositionLeft)
        }
        


        // start scroll top
        if($(this).scrollTop() > 500){
            $(".topIcon").fadeIn();
        }else{
            $(".topIcon").fadeOut();
        }
    })

    //get top
    $(".topIcon").click(function(){
        $("body, html").animate({
            "scrollTop":"0px"
        },2000)
    })
})