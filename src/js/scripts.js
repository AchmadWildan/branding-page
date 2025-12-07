$(document).ready(function () {
  $("#videoModal").on("show.bs.modal", function (event) {
    // Ambil tombol pemicu modal
    var button = $(event.relatedTarget);

    // Ambil URL video
    var src = button.data("video");

    // Set video baru
    $("#videoSource").attr("src", src);
    $("#modalVideo")[0].load();
  });

  $("#videoModal").on("hidden.bs.modal", function () {
    var video = $("#modalVideo")[0];
    video.pause();
    video.currentTime = 0;

    // Reset src untuk benar-benar hapus cache video
    $("#videoSource").attr("src", "");
  });

  $(".limit-text").each(function () {
    let max = 250; // jumlah karakter maksimal
    let fullText = $(this).text().trim();

    if (fullText.length > max) {
      let shortText = fullText.substring(0, max) + "...";
      let moreLink = $('<a href="#" class="more-link"> Selengkapnya..</a>');

      $(this).data("full-text", fullText);
      $(this).data("short-text", shortText);

      $(this).html(shortText).append(moreLink);
    }
  });

  $(document).on("click", ".more-link", function (e) {
    e.preventDefault();

    let parent = $(this).parent();
    let shortText = parent.data("short-text");
    let fullText = parent.data("full-text");

    if ($(this).text().trim() === "Selengkapnya..") {
      parent.html(
        fullText + ' <a href="#" class="more-link"> Lebih sedikit..</a>'
      );
    } else {
      parent.html(
        shortText + ' <a href="#" class="more-link"> Selengkapnya..</a>'
      );
    }
  });
});
