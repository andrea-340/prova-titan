const main = document.getElementById("home1");
let carrelloConteggio = 0;

// GESTIONE CAROSELLO
let slideIndex = 1;
const slides = document.querySelectorAll(".slides img");
function showSlides(n) {
    if (slides.length === 0) return;
    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
    }
    slides[slideIndex - 1].classList.add("active");
}
window.plusSlides = function(n) { showSlides(slideIndex += n); };
if (slides.length > 0) {
    showSlides(slideIndex);
    setInterval(() => { plusSlides(1); }, 4000);
}

// NAVIGAZIONE E AREA UTENTE (TUA LOGICA ORIGINALE)
window.mostraHomeUtente = function() {
    main.innerHTML = `
        <div style="text-align:center; color:white;">
            <h2 style="color:#ff4d4d;">BENVENUTO ATLETA</h2>
            <p>Seleziona il tuo obiettivo:</p>
            <button class="submit-button" onclick="mostraHomeUtente3()">AREA ALLENAMENTO</button>
            <button class="submit-button" style="background:#333; margin-top:10px;" onclick="mostraShop()">SHOP TITAN</button>
        </div>
    `;
};

window.mostraHomeUtente3 = function() {
    main.innerHTML = `
        <div class="form-container-dati">
            <h2>I TUOI DATI</h2>
            <div class="form-group">
                <select id="genere" style="width:100%; padding:10px;">
                    <option value="Uomo">Uomo</option>
                    <option value="Donna">Donna</option>
                </select>
            </div>
            <button class="submit-button" onclick="mostraSceltaAllenamento()">CONTINUA</button>
        </div>
    `;
};

window.mostraSceltaAllenamento = function() {
    main.innerHTML = `
        <div style="text-align:center;">
            <h2>SCEGLI IL TUO GOAL</h2>
            <button class="submit-button" onclick="mostraPaginaDownload('FULL BODY', 'scheda-fullbody-uomo.pdf', 'full-body-donna.pdf')">FULL BODY</button>
            <button class="submit-button" style="margin-top:10px;" onclick="mostraPaginaDownload('SPLIT 3 GIORNI', 'split-3-uomo.pdf', 'split-3-donna.pdf')">SPLIT 3 GIORNI</button>
            <button class="submit-button" style="background:#333; margin-top:10px;" onclick="mostraHomeUtente()">INDIETRO</button>
        </div>
    `;
};

// DOWNLOAD SCHEDE (CORRETTO PER GITHUB)
window.mostraPaginaDownload = function(titolo, fileUomo, fileDonna) {
    const genere = document.getElementById("genere") ? document.getElementById("genere").value : "Uomo";
    const file = (genere === "Uomo") ? fileUomo : fileDonna;
    main.innerHTML = `
        <div style="text-align:center;">
            <h2>${titolo}</h2>
            <p>Genere: ${genere}</p>
            <a href="schede-personalizzate/${file}" download class="submit-button" style="text-decoration:none; display:inline-block; text-align:center;">SCARICA PDF</a>
            <button class="submit-button" style="background:#333; margin-top:10px;" onclick="mostraSceltaAllenamento()">INDIETRO</button>
        </div>
    `;
};

// SHOP COMPLETO
window.mostraShop = function() {
    main.innerHTML = `
        <div style="text-align:center;">
            <h2>TITAN SHOP</h2>
            <div style="border:1px solid #ff4d4d; padding:15px; margin-bottom:10px; border-radius:10px;">
                <p>PIANO PRO - 99€</p>
                <button class="submit-button" onclick="aggiungiCarrello()">AGGIUNGI AL CARRELLO</button>
            </div>
            <button class="submit-button" style="background:#333" onclick="mostraHomeUtente()">INDIETRO</button>
        </div>
    `;
};

window.aggiungiCarrello = function() {
    carrelloConteggio++;
    document.getElementById("cart-count").innerText = carrelloConteggio;
    alert("Prodotto aggiunto!");
};

// CHATBOT
const bubble = document.getElementById("chat-bubble");
const chatContainer = document.getElementById("chatbot-container");
if (bubble) bubble.onclick = function() { chatContainer.style.display = (chatContainer.style.display === "flex") ? "none" : "flex"; };
if (document.getElementById("close-chat")) document.getElementById("close-chat").onclick = function() { chatContainer.style.display = "none"; };
window.chatResponse = function(tipo) {
    const msgBox = document.getElementById("chatbot-messages");
    let testo = (tipo === 'scheda') ? "Le schede sono in Area Allenamento!" : "Contattaci: +39 342 501 5092";
    msgBox.innerHTML += `<div class="bot-msg">${testo}</div>`;
};
