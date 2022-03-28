(function () {
  $(document).on(
    "click",
    '[data-simesyfaq-type="accordion"] .simesyfaq .simesyfaq__question',
    function () {
      $(this).parent(".simesyfaq").attr("data-simesyfaq-state");
      $('[data-simesyfaq-type="accordion"]')
        .find(".simesyfaq")
        .attr("data-simesyfaq-state", "closed");
      $(this).parent(".simesyfaq").attr("data-simesyfaq-state", "expanded");
    }
  ),
    $(document).on(
      "click",
      '[data-simesyfaq-type="toggle"] .simesyfaq .simesyfaq__question',
      function () {
        $(this).parent(".simesyfaq").attr("data-simesyfaq-state") == "expanded"
          ? $(this).parent(".simesyfaq").attr("data-simesyfaq-state", "closed")
          : $(this)
              .parent(".simesyfaq")
              .attr("data-simesyfaq-state", "expanded");
      }
    );
})();
