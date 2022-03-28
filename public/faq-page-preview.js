(function() {
  $(document).on("click", '[data-simesyfaq-type="accordion"] .simesyfaq .simesyfaq__question', function () {
    $(this).parent(".simesyfaq").attr("data-simesyfaq-state");
    $('[data-simesyfaq-type="accordion"]').find(".simesyfaq").attr("data-simesyfaq-state", "closed");
    $(this).parent(".simesyfaq").attr("data-simesyfaq-state", "expanded")
  }),
    $(document).on("click", '[data-simesyfaq-type="toggle"] .simesyfaq .simesyfaq__question', function () {
    $(this).parent(".simesyfaq").attr("data-simesyfaq-state") == "expanded"  ? $(this).parent(".simesyfaq").attr("data-simesyfaq-state", "closed") : $(this).parent(".simesyfaq").attr("data-simesyfaq-state", "expanded");
  });
  var groupFAQ = data.groups;
  $(document).on('keyup','.faq-page__search-box input',function(e){
    var keyword = $(this).val();
    if(keyword == ''){
      $('.faq-page__search').html('').hide();
      $('.faq-page__body').show();
      return
    }else{
      $('.faq-page__body').hide();
      $('.faq-page__search').show();
    }
    var arrFAQSearch = [];
    var regex = new RegExp(keyword, "i");
    $.each(groupFAQ,function(i,data){
      var array_item = [];
      var faqGroupConstruct = {};
      faqGroupConstruct["name"] = '';
      faqGroupConstruct["faqs"] = [];
      $.each(data.faqs,function(j,faq){
        if(faq.question.match(regex) != null){

          faqGroupConstruct["name"] = data.name;

          faqGroupConstruct["faqs"].push(faq);
        }
      })
      if(faqGroupConstruct.faqs.length > 0){
        arrFAQSearch.push(faqGroupConstruct)
      }
    })

    if(arrFAQSearch.length == 0){
      $('.faq-page__search').html('<div class="result-faq-empty">'+data.config.searchNotFoundText+'</div>');
      return
    }else{
      var searchFAQHtml = '';
      $.each(arrFAQSearch,function(i,group){
        switch(data.config.faqNameTag){
          case 'h3':
            searchFAQHtml += '<h3>'+group.name+'</h3>';
            break;
          case 'strong':
            searchFAQHtml += '<strong>'+group.name+'</strong>';
            break;
          default:
            break;
        }
        searchFAQHtml += '<ul class="simesyfaqlist" data-simesyfaq-style="'+data.config.faqStyleID+'" data-simesyfaq-type="'+data.config.faqBehavior+'" data-simesyfaq-icon-pos="'+data.config.faqIconPosition+'" data-simesyfaq-icon="'+data.config.faqIconSelect+'" data-simesyfaq-behavior="'+data.config.faqExtras+'">';
        $.each(group.faqs,function(i,faq){
          searchFAQHtml += '<li>';
          searchFAQHtml += '<div class="simesyfaq" data-simesyfaq-state="close">';
          searchFAQHtml += '<div class="simesyfaq__question">';
          searchFAQHtml += '<div class="simesyfaq__icon" style="height:'+data.config.faqIconSize+'px;width:'+data.config.faqIconSize+'px">';
          switch (data.config.faqIconSelect){
            case '1':
              searchFAQHtml += '<svg class="simesyfaq__iconplus" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g stroke-width="2" fill="none" stroke="'+data.config.faqIconOpenColor+'" stroke-linecap="square" stroke-miterlimit="10"><path d="M12 7v10M17 12H7"></path><circle cx="12" cy="12" r="11"></circle></g></svg>';
              searchFAQHtml += '<svg class="simesyfaq__iconminus" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="2"><g fill="none" stroke="'+data.config.faqIconOpenColor+'" stroke-linecap="round" stroke-miterlimit="10" stroke-linejoin="round"><path d="M17 12H7"></path><circle cx="12" cy="12" r="11"></circle></g></svg>';
              break;
            case '2':
              searchFAQHtml += '<svg class="simesyfaq__iconplus" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="'+data.config.faqIconOpenColor+'" d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm5 13h-4v4c0 .6-.4 1-1 1s-1-.4-1-1v-4H7c-.6 0-1-.4-1-1s.4-1 1-1h4V7c0-.6.4-1 1-1s1 .4 1 1v4h4c.6 0 1 .4 1 1s-.4 1-1 1z"/></svg>';
              searchFAQHtml += '<svg class="simesyfaq__iconminus" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="'+data.config.faqIconOpenColor+'" d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm5 13H7c-.6 0-1-.4-1-1s.4-1 1-1h10c.6 0 1 .4 1 1s-.4 1-1 1z"/></svg>';
              break
              case '3':
              searchFAQHtml += '<svg class="simesyfaq__iconplus" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="'+data.config.faqIconOpenColor+'" d="M18 10h-4V6h-4v4H6v4h4v4h4v-4h4"/></svg>';
              searchFAQHtml += '<svg class="simesyfaq__iconminus" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="'+data.config.faqIconOpenColor+'" d="M6 10h12v4H6z"/></svg>';
              break
              case '4':
              searchFAQHtml += '<svg class="simesyfaq__iconplus" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="'+data.config.faqIconOpenColor+'" d="M17 11h-4V7c0-.6-.4-1-1-1s-1 .4-1 1v4H7c-.6 0-1 .4-1 1s.4 1 1 1h4v4c0 .6.4 1 1 1s1-.4 1-1v-4h4c.6 0 1-.4 1-1s-.4-1-1-1z"/></svg>';
              searchFAQHtml += '<svg class="simesyfaq__iconminus" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="'+data.config.faqIconOpenColor+'" d="M17 11H7c-.6 0-1 .4-1 1s.4 1 1 1h10c.6 0 1-.4 1-1s-.4-1-1-1z"/></svg>';
              break;
            case '5':
              searchFAQHtml += '<svg class="simesyfaq__iconplus" xmlns="http://www.w3.org/2000/svg" stroke-width="2" viewBox="0 0 24 24"><g fill="none" stroke="'+data.config.faqIconOpenColor+'" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="11"/><path d="M16 10l-4 4-4-4"/></g></svg>';
              searchFAQHtml += '<svg class="simesyfaq__iconminus" xmlns="http://www.w3.org/2000/svg" stroke-width="2" viewBox="0 0 24 24"><g fill="none" stroke="'+data.config.faqIconOpenColor+'" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="11"/><path d="M8 14l4-4 4 4"/></g></svg>';
              break;
            case '6':
              searchFAQHtml += '<svg class="simesyfaq__iconplus" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="'+data.config.faqIconOpenColor+'" d="M24 12c0-6.617-5.383-12-12-12S0 5.383 0 12s5.383 12 12 12 12-5.383 12-12zM6.586 10L8 8.586l4 4 4-4L17.414 10 12 15.414 6.586 10z"/></svg>';
              searchFAQHtml += '<svg class="simesyfaq__iconminus" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="'+data.config.faqIconOpenColor+'" d="M0 12c0 6.617 5.383 12 12 12s12-5.383 12-12S18.617 0 12 0 0 5.383 0 12zm17.414 2L16 15.414l-4-4-4 4L6.586 14 12 8.586 17.414 14z"/></svg>';
              break;
            case '7':
              searchFAQHtml += '<svg class="simesyfaq__iconplus" xmlns="http://www.w3.org/2000/svg" stroke-width="2" viewBox="0 0 24 24"><path fill="none" stroke="'+data.config.faqIconOpenColor+'" stroke-miterlimit="10" d="M16 10l-4 4-4-4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
              searchFAQHtml += '<svg class="simesyfaq__iconminus" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="'+data.config.faqIconOpenColor+'" d="M16 15.414l-4-4-4 4L6.586 14l4.707-4.707c.391-.391 1.023-.391 1.414 0L17.414 14 16 15.414z"/></svg>';
              break
              case '8':
              searchFAQHtml += '<svg class="simesyfaq__iconplus" xmlns="http://www.w3.org/2000/svg" stroke-width="2" viewBox="0 0 24 24"><path fill="none" stroke="'+data.config.faqIconOpenColor+'" stroke-miterlimit="10" d="M2 7l10 10L22 7" stroke-linecap="round"/></svg>';
              searchFAQHtml += '<svg class="simesyfaq__iconminus" xmlns="http://www.w3.org/2000/svg" stroke-width="2" viewBox="0 0 24 24"><path fill="none" stroke="'+data.config.faqIconOpenColor+'" stroke-miterlimit="10" d="M23 16L12 8 1 16" data-cap="butt"/></svg>';
              break
              case '9':
              searchFAQHtml += '<svg class="simesyfaq__iconplus" xmlns="http://www.w3.org/2000/svg" stroke-width="2" viewBox="0 0 24 24"><g fill="none" stroke="'+data.config.faqIconOpenColor+'" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="11"/><path d="M8 10h8l-4 6z"/></g></svg>';
              searchFAQHtml += '<svg class="simesyfaq__iconminus" xmlns="http://www.w3.org/2000/svg" stroke-width="2" viewBox="0 0 24 24"><g fill="none" stroke="'+data.config.faqIconOpenColor+'" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="11"/><path d="M16 14H8l4-6z"/></g></svg>';
              break
              case '10':
              searchFAQHtml += '<svg class="simesyfaq__iconplus" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="'+data.config.faqIconOpenColor+'" d="M12 24c6.617 0 12-5.383 12-12S18.617 0 12 0 0 5.383 0 12s5.383 12 12 12zm0-7L7 9h10l-5 8z"/></svg>';
              searchFAQHtml += '<svg class="simesyfaq__iconminus" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="'+data.config.faqIconOpenColor+'" d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0zm0 7l5 8H7l5-8z"/></svg>';
              break;
            case '11':
              searchFAQHtml += '<svg class="simesyfaq__iconplus" xmlns="http://www.w3.org/2000/svg" stroke-width="2" viewBox="0 0 24 24"><path fill="none" stroke="'+data.config.faqIconOpenColor+'" stroke-miterlimit="10" d="M7 8h10l-5 8z" stroke-linecap="round" stroke-linejoin="round"/></svg>';
              searchFAQHtml += '<svg class="simesyfaq__iconminus" xmlns="http://www.w3.org/2000/svg" stroke-width="2" viewBox="0 0 24 24"><path fill="none" stroke="'+data.config.faqIconOpenColor+'" stroke-miterlimit="10" d="M7 16h10l-5-8z" stroke-linecap="round" stroke-linejoin="round"/></svg>';
              break;
            case '12':
              searchFAQHtml += '<svg class="simesyfaq__iconplus" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="'+data.config.faqIconOpenColor+'" d="M17 7H7c-.363 0-.698.197-.875.515-.176.318-.166.707.027 1.015l5 8c.183.292.503.47.848.47s.665-.178.848-.47l5-8c.193-.308.203-.697.027-1.015C17.698 7.197 17.363 7 17 7z"/></svg>';
              searchFAQHtml += '<svg class="simesyfaq__iconminus" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="'+data.config.faqIconOpenColor+'" d="M12.848 7.47c-.366-.585-1.33-.585-1.696 0l-5 8c-.192.308-.203.697-.026 1.015S6.636 17 7 17h10c.364 0 .698-.197.875-.515s.166-.707-.026-1.015l-5.001-8z"/></svg>';
              break
              case '13':
              searchFAQHtml += '<svg class="simesyfaq__iconplus" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="'+data.config.faqIconOpenColor+'" d="M7 12h2V9h3V7H9V4H7v3H4v2h3" /><path fill="<?php echo $hfaq_icon_opencolor; ?>" d="M15 0H1C.4 0 0 .4 0 1v14c0 .6.4 1 1 1h14c.6 0 1-.4 1-1V1c0-.6-.4-1-1-1zm-1 14H2V2h12v12z"/></svg>';
              searchFAQHtml += '<svg class="simesyfaq__iconminus" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="'+data.config.faqIconOpenColor+'" d="M4 7h8v2H4z" /><path fill="<?php echo $hfaq_icon_closecolor; ?>" d="M15 0H1C.4 0 0 .4 0 1v14c0 .6.4 1 1 1h14c.6 0 1-.4 1-1V1c0-.6-.4-1-1-1zm-1 14H2V2h12v12z"/></svg>';
              break;
            case '14':
              searchFAQHtml += '<svg class="simesyfaq__iconplus" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="'+data.config.faqIconOpenColor+'" d="M15 0H1C.4 0 0 .4 0 1v14c0 .6.4 1 1 1h14c.6 0 1-.4 1-1V1c0-.6-.4-1-1-1zm-3 9H9v3H7V9H4V7h3V4h2v3h3v2z"/></svg>';
              searchFAQHtml += '<svg class="simesyfaq__iconminus" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="'+data.config.faqIconOpenColor+'" d="M15 0H1C.4 0 0 .4 0 1v14c0 .6.4 1 1 1h14c.6 0 1-.4 1-1V1c0-.6-.4-1-1-1zm-3 9H4V7h8v2z"/></svg>';
              break;
            case '15':
              searchFAQHtml += '<svg class="simesyfaq__iconplus" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><g fill="none" stroke="'+data.config.faqIconOpenColor+'" stroke-miterlimit="10"><path d="M8 4.5v7M4.5 8h7" data-cap="butt"/><path d="M14 15H2c-.552 0-1-.448-1-1V2c0-.552.448-1 1-1h12c.552 0 1 .448 1 1v12c0 .552-.448 1-1 1z" data-cap="butt"/></g></svg>';
              searchFAQHtml += '<svg class="simesyfaq__iconminus" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><g fill="none" stroke="'+data.config.faqIconOpenColor+'" stroke-miterlimit="10"><path d="M4.5 8h7" data-cap="butt" /><path d="M14 15H2c-.552 0-1-.448-1-1V2c0-.552.448-1 1-1h12c.552 0 1 .448 1 1v12c0 .552-.448 1-1 1z" data-cap="butt"/></g></svg>';
              break;
            default:
          }
          searchFAQHtml += '</div>';
          searchFAQHtml += '<span class="simesyfaq__text">'+faq.question+'</span>';
          searchFAQHtml += '</div>';
          searchFAQHtml += '<div class="simesyfaq__answer"><div class="simesyfaq__answercontent">'+faq.answer+'</div></div>';
          searchFAQHtml += '</div>';
          searchFAQHtml += '</li>';
        })
        searchFAQHtml += '</ul>';
        $('.faq-page__search').html(searchFAQHtml);
      })
    }
  });
})();