function showAbout() {
    var popupElement = document.getElementById('popup');
    popupElement.style.display = 'block';
    document.getElementById("title").innerHTML = "<i class='bi bi-question-circle'></i> About";
    const content = `
    <p>Sebuah kegabutan di libur semester, yang coba menggunakan resource yang dimiliki untuk membuat apalah ini</p>
    <p>Game ini terinspirasi dari permainan catur, tapi ya... gitu</p>
    <h5 class='text-success'>Have fun!</h5>
    <hr>
    <p class='text=secondary'>Mainnya ama teman btw, kami blm bisa bikin AI v:</p>
    <a href="https://www.instagram.com/baghaztra/" target="_blank" class="text-black text-decoration-none text-end">Baghaztra</a><br>
    <a href="https://www.instagram.com/topanisme_/" target="_blank" class="text-black text-decoration-none text-end">Topan</a>
    `;
    document.getElementById("content").innerHTML = content;
}

function showRules() {
    var popupElement = document.getElementById('popup');
    popupElement.style.display = 'block';
    document.getElementById("title").innerHTML = "<i class='bi bi-list-check'></i> Rules";
    const content = `
    <ul class="list-group">
        <li class="list-group-item">Setiap bidak adalah seorang prajurit dengan max hp 6.</li>
        <li class="list-group-item">Setiap serangan akan dilakukan dengan roll dadu 6, dan angka yang keluar menunjukkan damege yang dihasilkan.</li>
        <li class="list-group-item">Pada setiap kesempatan, player dapat melakukan gerakan yang tersedia.</li>
        <li class="list-group-item">Perpindahan unit atau penyerangan akan menembakkan panah mengakhiri giliran, serangan dari unit meele tidak dihitung akhir giliran.</li>
        <li class="list-group-item">Permainan berakhir jika salah satu tim menyerah, atau squadnya telah habis.</li>
    </ul>
    `;
    document.getElementById("content").innerHTML = content;
}

function closePopup() {
    var popupElement = document.getElementById('popup');
    popupElement.style.display = 'none';
}