(function () {
  if (
    $("#sp-testimonial-pro-wrapper")
      .find(".simesy-reviews-wrapper")
      .hasClass("simesy-reviews-layout-slider")
  ) {
    var data = $("#simesy-reviews-slider").attr("data-slider_settings") || {};
    var setOption = "";
    if (data) {
      var dataOptions = JSON.parse(data);
      if (dataOptions.navigation === "dots") {
        setOption = {
          autoplay:
            dataOptions.autoplay === "true"
              ? {
                  autoplay: {
                    delay: dataOptions.autoplay_speed,
                    disableOnInteraction: false
                  }
                }
              : false,
          pagination: {
            el: ".swiper-pagination",
            type: "bullets"
          },
          breakpoints: {
            320: {
              slidesPerView: 1,
              spaceBetween: 0,
              slidesPerGroup: 1
            },
            // when window width is >= 480px
            480: {
              slidesPerView: 2,
              spaceBetween: 20,
              slidesPerGroup: 1
            },
            // when window width is >= 640px
            1024: {
              slidesPerView: parseInt(dataOptions.slidesPerView),
              spaceBetween: parseInt(dataOptions.spaceBetween),
              slidesPerGroup: parseInt(dataOptions.slidesPerGroup)
            }
          }
        };
      } else if (dataOptions.navigation === "arrows") {
        setOption = {
          autoplay:
            dataOptions.autoplay === "true"
              ? {
                  autoplay: {
                    delay: dataOptions.autoplay_speed,
                    disableOnInteraction: false
                  }
                }
              : false,
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
          },
          breakpoints: {
            320: {
              slidesPerView: 1,
              spaceBetween: 0,
              slidesPerGroup: 1
            },
            // when window width is >= 480px
            480: {
              slidesPerView: 2,
              spaceBetween: 20,
              slidesPerGroup: 1
            },
            // when window width is >= 640px
            1024: {
              slidesPerView: parseInt(dataOptions.slidesPerView),
              spaceBetween: parseInt(dataOptions.spaceBetween),
              slidesPerGroup: parseInt(dataOptions.slidesPerGroup)
            }
          }
        };
      } else if (dataOptions.navigation === "arrows_dots") {
        setOption = {
          autoplay:
            dataOptions.autoplay === "true"
              ? {
                  autoplay: {
                    delay: dataOptions.autoplay_speed,
                    disableOnInteraction: false
                  }
                }
              : false,
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
          },
          pagination: {
            el: ".swiper-pagination"
          },
          breakpoints: {
            320: {
              slidesPerView: 1,
              spaceBetween: 0,
              slidesPerGroup: 1
            },
            // when window width is >= 480px
            480: {
              slidesPerView: 2,
              spaceBetween: 20,
              slidesPerGroup: 1
            },
            // when window width is >= 640px
            1024: {
              slidesPerView: parseInt(dataOptions.slidesPerView),
              spaceBetween: parseInt(dataOptions.spaceBetween),
              slidesPerGroup: parseInt(dataOptions.slidesPerGroup)
            }
          }
        };
      } else {
        setOption = {
          autoplay:
            dataOptions.autoplay === "true"
              ? {
                  autoplay: {
                    delay: dataOptions.autoplay_speed,
                    disableOnInteraction: false
                  }
                }
              : false,
          slidesPerView: dataOptions.slidesPerView,
          spaceBetween: dataOptions.spaceBetween,
          slidesPerGroup: dataOptions.slidesPerGroup,
          breakpoints: {
            320: {
              slidesPerView: 1,
              spaceBetween: 0,
              slidesPerGroup: 1
            },
            // when window width is >= 480px
            480: {
              slidesPerView: 2,
              spaceBetween: 20,
              slidesPerGroup: 1
            },
            // when window width is >= 640px
            1024: {
              slidesPerView: dataOptions.slidesPerView,
              spaceBetween: dataOptions.spaceBetween,
              slidesPerGroup: dataOptions.slidesPerGroup
            }
          }
        };
      }
    }
    var swiper = new Swiper(
      "#simesy-reviews-slider .simesy-reviews-slider",
      setOption
    );
  }
  if (
    $("#sp-testimonial-pro-wrapper")
      .find(".simesy-reviews-wrapper")
      .hasClass("simesy-reviews-layout-masonry")
  ) {
    var ele_masonry = $("#sp-testimonial-pro-wrapper").find(
      ".simesy-active-masonry-layout"
    );
    console.log(ele_masonry);
    if (ele_masonry.length) {
      var i = ele_masonry.data("column");
      ele_masonry.masonry({
        itemSelector: ".simesy-col-" + i
      });
    }
  }
  $(document).on("click", ".simesy_read_more", function (e) {
    $(this)
      .parents(".simesy_add_read_more")
      .removeClass("simesy_show_less_content")
      .addClass("simesy_show_more_content");
    if (
      $(this)
        .parents(".simesy-reviews-wrapper")
        .hasClass("simesy-reviews-layout-masonry")
    ) {
      var ele_masonry = $(this)
        .parents(".simesy-reviews-wrapper")
        .find(".simesy-active-masonry-layout");
      if (ele_masonry.length) {
        var i = ele_masonry.data("column");
        ele_masonry.masonry({
          itemSelector: ".simesy-col-" + i
        });
      }
    }
  });
  $(document).on("click", ".simesy_read_less", function (e) {
    $(this)
      .parents(".simesy_add_read_more")
      .removeClass("simesy_show_more_content")
      .addClass("simesy_show_less_content");
    if (
      $(this)
        .parents(".simesy-reviews-wrapper")
        .hasClass("simesy-reviews-layout-masonry")
    ) {
      var ele_masonry = $(this)
        .parents(".simesy-reviews-wrapper")
        .find(".simesy-active-masonry-layout");
      if (ele_masonry.length) {
        var i = ele_masonry.data("column");
        ele_masonry.masonry({
          itemSelector: ".simesy-col-" + i
        });
      }
    }
  });
  $(document).on("click", ".simesy-reviews-loadmore", function (e) {
    var id = $(this).parents(".simesy-testimonial-pro-wrapper").data("view-id");
    var shop = $(this).data("shop");
    var current_page = parseInt($(this).attr("data-page"));
    var total_page = $(this).data("total");
    current_page++;
    $(this).attr("data-page", current_page);
    $.ajax({
      url: "https://testimonial.simesy.com/api/get_more_testimonial",
      type: "post",
      dataType: "JSON",
      async: false,
      data: { id: id, shop: shop, page: current_page },
      success: function (response) {
        var config = response.data.shortCode.config;
        var testimonial_list = response.data.shortCode.testimonials;
        var total_page = response.data.shortCode.totalTestimonialPages;
        var html = ajaxTestiMore(config, id, testimonial_list, total_page);
        setTimeout(function () {
          $('.simesy-testimonial-pro-wrapper[data-view-id="' + id + '"]')
            .find(".simesy_feeds")
            .append(html);
          if (response.data.shortCode.config.layout[0] == "masonry") {
            var ele_masonry = $("#simesy-reviews-grid").find(
              ".simesy-active-masonry-layout"
            );
            if (ele_masonry.length) {
              var i = ele_masonry.data("column");
              $("#simesy-reviews-grid")
                .find(".simesy-active-masonry-layout")
                .masonry("destroy");
              ele_masonry.masonry({
                itemSelector: ".simesy-col-" + i
              });
            }
          }
        }, 800);
      }
    });

    if (current_page == total_page) {
      $(this).hide();
    }
  });
  function ajaxTestiMore(config, id, testimonial_list) {
    var html_load = "";
    $.each(testimonial_list, function (index, item_testi) {
      var html_rate = "",
        html_name = "",
        html_image = "",
        html_platform_icon = "",
        html_review_title = "",
        html_review_des = "",
        html_date = "";
      if (config.testimonial_client_rating) {
        html_rate += '<div class="simesy-rating-wrapper">';
        for (var i = 1; i <= item_testi.config.rating; i++) {
          html_rate +=
            '<i class="' +
            config.tpro_star_icon[0] +
            '" aria-hidden="true"></i>';
        }
        if (item_testi.config.rating < 5) {
          for (var j = item_testi.config.rating + 1; j <= 5; j++) {
            if (config.tpro_star_icon[0].indexOf("smile") > -1) {
              html_rate += '<i class="fa fa-frown-o" aria-hidden="true"></i>';
            } else if (config.tpro_star_icon[0].indexOf("thumbs") > -1) {
              html_rate +=
                '<i class="fa fa-thumbs-o-up" aria-hidden="true"></i>';
            } else {
              html_rate +=
                '<i class="' +
                config.tpro_star_icon[0] +
                '-o" aria-hidden="true"></i>';
            }
          }
        }
        html_rate += "</div>";
      }
      if (config.testimonial_client_name) {
        html_name +=
          '<a href="javascript:void(0)"><h4>' +
          item_testi.config.name +
          "</h4></a>";
      }
      if (config.client_image) {
        html_image += '<div class="simesy-reviewer-image">';
        if (config.image_sizes == "custom") {
          html_image +=
            '<a href="javascript:void(0)"><img src="' +
            imgURL(
              item_testi.config.image_url,
              config.image_sizes,
              "w_" +
                config.image_custom_size.width +
                ",h_" +
                config.image_custom_size.height
            ) +
            '"></a>';
        } else {
          html_image +=
            '<a href="javascript:void(0)"><img src="' +
            item_testi.config.image_url +
            '"></a>';
        }
        html_image += "</div>";
      }
      if (config.testimonial_title) {
        html_review_title +=
          '<h3 class="simesy-review-title">' +
          item_testi.config.title +
          "</h3>";
      }
      if (config.testimonial_text) {
        //html_review_des += '<div class="simesy-review-content">';
        var des = item_testi.config.content.replace(/[\\]/g, "");
        des = des.replace(/(<([^>]+)>)/gi, "");
        var des_full = des;
        if (config.testimonial_content_type[0] == "content_with_limit") {
          var check_array = des.split(" ");
          html_review_des +=
            '<p class="simesy_add_read_more simesy_show_less_content simesy_more_added">';
          des = smartTrim(
            des,
            config.testimonial_characters_limit,
            config.testimonial_read_more_ellipsis
          );
          html_review_des +=
            '<span class="simesy_content_ellipsis">' + des + "</span>";
          html_review_des +=
            '<span class="simesy_add_read_more_slice_content">' +
            des_full +
            "</span>";
          if (check_array.length >= config.testimonial_characters_limit) {
            html_review_des +=
              '<span class="simesy_read_more">' +
              config.testimonial_read_more_text +
              "</span>";
            html_review_des +=
              '<span class="simesy_read_less">' +
              config.testimonial_read_less_text +
              "</span>";
          }
          html_review_des += "</p>";
        } else {
          html_review_des += "<p>" + des + "</p>";
        }

        //html_review_des += '</div>';
      }
      if (config.testimonial_client_date) {
        html_date +=
          '<span class="simesy-review-date">' +
          dateFormat(item_testi.config.createdAt, "mmmm d, yyyy") +
          "</span>";
      }
      if (
        config.theme_style == "theme-three" ||
        config.theme_style == "theme-eight"
      ) {
        html_platform_icon +=
          '<div class="simesy-review-platform"><span>' +
          item_testi.config.platform_name +
          "</span></div>";
      } else {
        html_platform_icon +=
          '<div class="simesy-review-platform"><img src="' +
          item_testi.config.platform_logo +
          '"/></div>';
      }
      if (config.theme_style == "theme-one") {
        if (config.layout[0] == "slider") {
          html_load += '<div class="swiper-slide">';
        } else {
          html_load += '<div class="simesy-col-' + 12 / parseInt(3) + '">';
        }
        html_load +=
          '<div class="simesy-review-template simesy-review-template-one simesy-review-template-amazon">';
        html_load += html_image;
        html_load += '<div class="simesy-review-header">';
        html_load += html_platform_icon;
        html_load += '<div class="simesy-review-info">';
        html_load += html_name;
        html_load += html_rate;
        html_load += html_date;
        html_load += "</div>";
        html_load += "</div>";
        html_load += '<div class="simesy-review-content">';
        html_load += html_review_des;
        html_load += "</div>";
        html_load += "</div>";
        html_load += "</div>";
      } else if (config.theme_style == "theme-two") {
        if (config.layout[0] == "slider") {
          html_load += '<div class="swiper-slide">';
        } else {
          html_load +=
            '<div class="simesy-col-' +
            12 / parseInt(config.number_of_columns) +
            '">';
        }
        html_load +=
          '<div class="simesy-review-template simesy-review-template-two simesy-review-template-amazon">';
        html_load += '<div class="simesy-review-header">';
        html_load += html_platform_icon;
        html_load += html_image;
        html_load += '<div class="simesy-review-info">';
        html_load += html_name;
        html_load += html_rate;
        html_load += html_date;
        html_load += "</div>";
        html_load += "</div>";
        html_load += '<div class="simesy-review-content">';
        html_load += html_review_des;
        html_load += "</div>";
        html_load += "</div>";
        html_load += "</div>";
      } else if (config.theme_style == "theme-three") {
        if (config.layout[0] == "slider") {
          html_load += '<div class="swiper-slide">';
        } else {
          html_load +=
            '<div class="simesy-col-' +
            12 / parseInt(config.number_of_columns) +
            '">';
        }
        html_load +=
          '<div class="simesy-review-template simesy-review-template-three simesy-review-template-amazon">';
        html_load += html_platform_icon;
        html_load += html_rate;
        html_load += '<div class="simesy-review-content">';
        html_load += html_review_des;
        html_load += "</div>";
        html_load += '<div class="simesy-review-header">';
        html_load += html_image;
        html_load += '<div class="simesy-review-info">';
        html_load += html_name;
        html_load += html_date;
        html_load += "</div>";
        html_load += "</div>";
        html_load += "</div>";
        html_load += "</div>";
      } else if (config.theme_style == "theme-four") {
        if (config.layout[0] == "slider") {
          html_load += '<div class="swiper-slide">';
        } else {
          html_load +=
            '<div class="simesy-col-' +
            12 / parseInt(config.number_of_columns) +
            '">';
        }
        html_load +=
          '<div class="simesy-review-template simesy-review-template-four simesy-review-template-amazon">';
        html_load += '<div class="simesy-review-header">';
        html_load += html_platform_icon;
        html_load += html_rate;
        html_load += '<div class="simesy-review-content">';
        html_load += html_review_des;
        html_load += "</div>";
        html_load += "</div>";

        html_load += '<div class="simesy-review-info">';
        html_load += html_image;
        html_load += '<div class="simesy-review-name-date">';
        html_load += html_name;
        html_load += html_date;
        html_load += "</div>";
        html_load += "</div>";
        html_load += "</div>";
        html_load += "</div>";
      } else if (config.theme_style == "theme-five") {
        if (config.layout[0] == "slider") {
          html_load += '<div class="swiper-slide">';
        } else {
          html_load +=
            '<div class="simesy-col-' +
            12 / parseInt(config.number_of_columns) +
            '">';
        }
        html_load +=
          '<div class="simesy-review-template simesy-review-template-five simesy-review-template-amazon">';
        html_load += html_image;
        html_load += '<div class="simesy-review-header">';
        html_load += html_platform_icon;
        html_load += "</div>";
        html_load += '<div class="simesy-review-info">';
        html_load += html_name;
        html_load += "</div>";
        html_load += '<div class="simesy-review-content">';
        html_load += html_review_des;
        html_load += "</div>";
        html_load += html_rate;
        html_load += html_date;
        html_load += "</div>";
        html_load += "</div>";
      } else if (config.theme_style == "theme-six") {
        if (config.layout[0] == "slider") {
          html_load += '<div class="swiper-slide">';
        } else {
          html_load +=
            '<div class="simesy-col-' +
            12 / parseInt(config.number_of_columns) +
            '">';
        }
        html_load +=
          '<div class="simesy-review-template simesy-review-template-six simesy-review-template-amazon">';
        html_load += html_image;
        html_load += '<div class="simesy-review-content">';
        html_load += html_review_des;
        html_load += "</div>";
        html_load += '<div class="simesy-review-header">';
        html_load += '<div class="simesy-review-info">';
        html_load += html_name;
        html_load += html_rate;
        html_load += html_date;
        html_load += "</div>";
        html_load += html_platform_icon;
        html_load += "</div>";
        html_load += "</div>";
        html_load += "</div>";
      } else if (config.theme_style == "theme-seven") {
        if (config.layout[0] == "slider") {
          html_load += '<div class="swiper-slide">';
        } else {
          html_load +=
            '<div class="simesy-col-' +
            12 / parseInt(config.number_of_columns) +
            '">';
        }
        html_load +=
          '<div class="simesy-review-template simesy-review-template-seven simesy-review-template-amazon">';

        html_load += '<div class="simesy-review-content">';
        html_load += html_review_des;
        html_load += "</div>";
        html_load += '<div class="simesy-review-header">';
        html_load += html_image;
        html_load += '<div class="simesy-review-info">';
        html_load += html_name;
        html_load += html_rate;
        html_load += html_date;
        html_load += "</div>";
        html_load += html_platform_icon;
        html_load += "</div>";
        html_load += "</div>";
        html_load += "</div>";
      } else if (config.theme_style == "theme-eight") {
        if (config.layout[0] == "slider") {
          html_load += '<div class="swiper-slide">';
        } else {
          html_load +=
            '<div class="simesy-col-' +
            12 / parseInt(config.number_of_columns) +
            '">';
        }
        html_load +=
          '<div class="simesy-review-template simesy-review-template-eight simesy-review-template-amazon">';
        html_load += '<div class="simesy-reviews-on-hover">';
        html_load += '<div class="simesy-review-content">';
        html_load += html_review_des;
        html_load += "</div>";
        html_load += html_platform_icon;
        html_load += "</div>";
        html_load += '<div class="simesy-review-header">';
        html_load += '<div class="simesy-review-info">';
        html_load += html_image;
        html_load += html_rate;
        html_load += html_name;
        html_load += html_date;
        html_load += "</div>";
        html_load += "</div>";
        html_load += "</div>";
        html_load += "</div>";
      } else {
        if (config.layout[0] == "slider") {
          html_load += '<div class="swiper-slide">';
        } else {
          html_load +=
            '<div class="simesy-col-' +
            12 / parseInt(config.number_of_columns) +
            '">';
        }
        html_load +=
          '<div class="simesy-review-template simesy-review-template-nine simesy-review-template-amazon">';
        html_load += '<div class="simesy-review-header">';
        html_load += html_image;
        html_load += '<div class="simesy-review-info">';
        html_load += html_name;
        html_load += '<div class="simesy-rating-time">';
        html_load += html_rate;
        html_load += html_date;
        html_load += "</div>";
        html_load += '<div class="simesy-review-content">';
        html_load += html_review_des;
        html_load += "</div>";
        html_load += "</div>";
        html_load += "</div>";
        html_load += "</div>";
        html_load += "</div>";
      }
    });
    return html_load;
  }
  // Resize image
  function imgURL(src, image_size, size) {
    src = src.replace(
      /_(pico|icon|thumb|small|compact|medium|large|grande|original|1024x1024|2048x2048|master)+\./g,
      "."
    );
    if (image_size === "default") {
      return src;
    } else {
      var src = src.split("upload/");
      return src[0] + "upload/c_fill," + size + "/" + src[1];
    }
  }
  // Text
  function test_des(testi, config) {
    var des = testi.replace(/[\\]/g, "");
    if (config.testimonial_content_type[0] == "content_with_limit") {
      des = des.replace(/(<([^>]+)>)/gi, "");
      des = smartTrim(
        des,
        config.testimonial_characters_limit,
        config.testimonial_read_more_ellipsis
      );
    }
    return des;
  }
  // Rate
  function render_rate(rating, icon) {
    var html_rate = "";
    for (var i = 1; i <= rating; i++) {
      html_rate += '<i class="' + icon + '" aria-hidden="true"></i>';
    }
    if (rating < 5) {
      for (var j = rating + 1; j <= 5; j++) {
        if (icon.indexOf("smile") > -1) {
          html_rate += '<i class="fa fa-frown-o" aria-hidden="true"></i>';
        } else if (icon.indexOf("thumbs") > -1) {
          html_rate += '<i class="fa fa-thumbs-o-up" aria-hidden="true"></i>';
        } else {
          html_rate += '<i class="' + icon + '-o" aria-hidden="true"></i>';
        }
      }
    }
    return html_rate;
  }
  //smartTrim
  function smartTrim(str, length, appendix) {
    var check_array = str.split(" ");
    var str_title = str.split(/\s+/).slice(0, length).join(" ");
    if (check_array.length >= length) {
      str_title += appendix;
    }
    return str_title;
  }
  /*
   * Date Format 1.2.3
   * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
   * MIT license
   *
   * Includes enhancements by Scott Trenda <scott.trenda.net>
   * and Kris Kowal <cixar.com/~kris.kowal/>
   *
   * Accepts a date, a mask, or a date and a mask.
   * Returns a formatted version of the given date.
   * The date defaults to the current date/time.
   * The mask defaults to dateFormat.masks.default.
   */

  var dateFormat = (function () {
    var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
      timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
      timezoneClip = /[^-+\dA-Z]/g,
      pad = function (val, len) {
        val = String(val);
        len = len || 2;
        while (val.length < len) val = "0" + val;
        return val;
      };

    // Regexes and supporting functions are cached through closure
    return function (date, mask, utc) {
      var dF = dateFormat;

      // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
      if (
        arguments.length == 1 &&
        Object.prototype.toString.call(date) == "[object String]" &&
        !/\d/.test(date)
      ) {
        mask = date;
        date = undefined;
      }

      // Passing date through Date applies Date.parse, if necessary
      date = date ? new Date(date) : new Date();
      if (isNaN(date)) throw SyntaxError("invalid date");

      mask = String(dF.masks[mask] || mask || dF.masks["default"]);

      // Allow setting the utc argument via the mask
      if (mask.slice(0, 4) == "UTC:") {
        mask = mask.slice(4);
        utc = true;
      }

      var _ = utc ? "getUTC" : "get",
        d = date[_ + "Date"](),
        D = date[_ + "Day"](),
        m = date[_ + "Month"](),
        y = date[_ + "FullYear"](),
        H = date[_ + "Hours"](),
        M = date[_ + "Minutes"](),
        s = date[_ + "Seconds"](),
        L = date[_ + "Milliseconds"](),
        o = utc ? 0 : date.getTimezoneOffset(),
        flags = {
          d: d,
          dd: pad(d),
          ddd: dF.i18n.dayNames[D],
          dddd: dF.i18n.dayNames[D + 7],
          m: m + 1,
          mm: pad(m + 1),
          mmm: dF.i18n.monthNames[m],
          mmmm: dF.i18n.monthNames[m + 12],
          yy: String(y).slice(2),
          yyyy: y,
          h: H % 12 || 12,
          hh: pad(H % 12 || 12),
          H: H,
          HH: pad(H),
          M: M,
          MM: pad(M),
          s: s,
          ss: pad(s),
          l: pad(L, 3),
          L: pad(L > 99 ? Math.round(L / 10) : L),
          t: H < 12 ? "a" : "p",
          tt: H < 12 ? "am" : "pm",
          T: H < 12 ? "A" : "P",
          TT: H < 12 ? "AM" : "PM",
          Z: utc
            ? "UTC"
            : (String(date).match(timezone) || [""])
                .pop()
                .replace(timezoneClip, ""),
          o:
            (o > 0 ? "-" : "+") +
            pad(Math.floor(Math.abs(o) / 60) * 100 + (Math.abs(o) % 60), 4),
          S: ["th", "st", "nd", "rd"][
            d % 10 > 3 ? 0 : (((d % 100) - (d % 10) != 10) * d) % 10
          ]
        };

      return mask.replace(token, function ($0) {
        return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
      });
    };
  })();

  // Some common format strings
  dateFormat.masks = {
    default: "ddd mmm dd yyyy HH:MM:ss",
    shortDate: "m/d/yy",
    mediumDate: "mmm d, yyyy",
    longDate: "mmmm d, yyyy",
    fullDate: "dddd, mmmm d, yyyy",
    shortTime: "h:MM TT",
    mediumTime: "h:MM:ss TT",
    longTime: "h:MM:ss TT Z",
    isoDate: "yyyy-mm-dd",
    isoTime: "HH:MM:ss",
    isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
    isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
  };

  // Internationalization strings
  dateFormat.i18n = {
    dayNames: [
      "Sun",
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ],
    monthNames: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ]
  };

  // For convenience...
  Date.prototype.format = function (mask, utc) {
    return dateFormat(this, mask, utc);
  };
})();
