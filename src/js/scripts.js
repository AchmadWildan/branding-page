$(document).ready(function () {

    // Saat tombol video diklik
    $('.btn-video').on('click', function () {
        var src = $(this).data('video');   // Ambil URL video
        $('#videoSource').attr('src', src);
        $('#modalVideo')[0].load();        // Reload video baru
    });

    // Hentikan video saat modal ditutup
    $('#videoModal').on('hidden.bs.modal', function () {
        var video = $('#modalVideo')[0];
        video.pause();
        video.currentTime = 0;
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

    // Event klik untuk expand / collapse
    $(document).on("click", ".more-link", function (e) {
        e.preventDefault();

        let parent = $(this).parent();
        let shortText = parent.data("short-text");
        let fullText = parent.data("full-text");

        if ($(this).text().trim() === "Selengkapnya..") {
            parent.html(fullText + ' <a href="#" class="more-link"> Lebih sedikit..</a>');
        } else {
            parent.html(shortText + ' <a href="#" class="more-link"> Selengkapnya..</a>');
        }
    });

});
    