/* ============================================================
   TITAN WEBAPP - LOGICA ORIGINALE (PERCORSI AGGIORNATI)
   ============================================================ */

const main = document.getElementById("home1");
let genereSelezionato = "";
let carrelloConteggio = 0;
let totalePrezzo = 0;

// Elementi UI
const navMenu = document.getElementById("nav-menu");
const mobileMenuBtn = document.getElementById("mobile-menu");
const cartCountVisivo = document.getElementById("cart-count");

/* 1. GESTIONE MENU MOBILE */
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });
}

/* 2. GESTIONE CAROSELLO */
let currentSlide = 0;
const slides = document.querySelectorAll(".slides img");

function showSlide(index) {
    if (slides.length === 0) return;
    slides.forEach(img => img.classList.remove("active"));
    if (index >= slides.length) currentSlide = 0;
    if (index < 0) currentSlide = slides.length - 1;
    slides[currentSlide].classList.add("active");
}

document.querySelector(".next")?.addEventListener("click", () => {
    currentSlide++;
    showSlide(currentSlide);
});

document.querySelector(".prev")?.addEventListener("click", () => {
    currentSlide--;
    showSlide(currentSlide);
});

// Auto-play
setInterval(() => {
    currentSlide++;
    showSlide(currentSlide);
}, 5000);

/* 3. NAVIGAZIONE TITAN (Richiamate dai tuoi pulsanti) */
window.mostraHomeUtente = function() {
    if (!main) return;
    main.innerHTML = `
        <section class="welcome-guide" style="padding: 20px; color: white; text-align: center;">
            <h2 style="color: #ff4d4d;">BENVENUTO IN TITAN 💪</h2>
            <p>Evolvi con i nostri piani PRO.</p>
            <div style="margin-top: 30px; display: flex; flex-direction: column; gap: 15px; align-items: center;">
                <button id="startButton" class="submit-button" onclick="mostraHomeUtente3()">INIZIA ORA</button>
                <button class="submit-button" style="background: #444;" onclick="mostraShop()">VAI ALLO SHOP</button>
            </div>
        </section>
    `;
};

window.mostraHomeUtente3 = function() {
    main.innerHTML = `
        <div class="form-container-dati">
            <h2>IL TUO PROFILO</h2>
            <select id="genere" style="width:100%; padding:10px; margin-bottom:10px;">
                <option value="Uomo">Uomo</option>
                <option value="Donna">Donna</option>
            </select>
            <button class="submit-button" onclick="mostraSceltaAllenamento()">CONTINUA</button>
        </div>
    `;
};

window.mostraSceltaAllenamento = function() {
    main.innerHTML = `
        <div style="text-align:center;">
            <h2>SCEGLI IL TUO GOAL</h2>
            <button class="submit-button" onclick="mostraPaginaDownload('FULL BODY', 'scheda-fullbody-uomo.pdf', 'full-body-donna.pdf')">FULL BODY</button>
        </div>
    `;
};

// Percorso corretto per la cartella schede su GitHub
window.mostraPaginaDownload = function(titolo, fileUomo, fileDonna) {
    let genere = document.getElementById("genere")?.value || "Uomo";
    let file = genere === "Uomo" ? fileUomo : fileDonna;
    main.innerHTML = `
        <div style="text-align:center; padding: 20px;">
            <h2>${titolo}</h2>
            <a href="schede-personalizzate/${file}" download class="submit-button" style="text-decoration:none; display:inline-block;">SCARICA PDF</a>
            <button class="submit-button" style="background:#333; margin-top:10px;" onclick="mostraHomeUtente()">INDIETRO</button>
        </div>
    `;
};

/* 4. SHOP E CHATBOT */
window.mostraShop = function() {
    main.innerHTML = `
        <div style="text-align:center;">
            <h2>SHOP</h2>
            <p>Piano PRO: 99€</p>
            <button class="submit-button" onclick="aggiungiAlCarrello('PRO', 99)">AGGIUNGI</button>
            <button class="submit-button" style="background:#333; margin-top:10px;" onclick="mostraHomeUtente()">INDIETRO</button>
        </div>
    `;
};

window.aggiungiAlCarrello = function(piano, prezzo) {
    carrelloConteggio++;
    if (cartCountVisivo) cartCountVisivo.innerText = carrelloConteggio;
    alert(`Aggiunto: ${piano}. Totale carrello: ${carrelloConteggio}`);
};

window.chatResponse = function(tipo) {
    const chatMessages = document.getElementById("chatbot-messages");
    let msg = tipo === 'scheda' ? "La trovi nella sezione allenamento!" : "Contattaci al +39 342 501 5092";
    const botDiv = document.createElement("div");
    botDiv.className = "bot-msg";
    botDiv.innerText = msg;
    chatMessages.appendChild(botDiv);
};

// Gestione apertura/chiusura chat
const chatBubble = document.getElementById("chat-bubble");
const chatContainer = document.getElementById("chatbot-container");
if(chatBubble) chatBubble.onclick = () => chatContainer.style.display = "flex";
if(document.getElementById("close-chat")) document.getElementById("close-chat").onclick = () => chatContainer.style.display = "none";

// NOTA: Non ho inserito chiamate automatiche (mostraHomeUtente) 
// così il tuo modulo di registrazione HTML resterà visibile all'inizio.
