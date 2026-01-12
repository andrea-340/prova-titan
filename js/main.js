/* ============================================================
   TITAN WEBAPP - LOGICA COMPLETA (GITHUB COMPATIBLE)
   ============================================================ */

const main = document.getElementById("home1");
let genereSelezionato = "";
let carrelloConteggio = 0;
let totalePrezzo = 0;

// Elementi UI Fissi
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

// Auto-play carosello ogni 5 secondi
setInterval(() => {
    currentSlide++;
    showSlide(currentSlide);
}, 5000);

/* 3. UTILITY: FRECCIA INDIETRO */
function gestisciFrecciaIndietro(mostra, destinazione) {
    const backBtnContainer = document.getElementById("back-button-container");
    const backBtn = document.getElementById("btn-back");
    if (!backBtnContainer || !backBtn) return;

    if (mostra) {
        backBtnContainer.style.display = "block";
        backBtn.onclick = () => {
            if (destinazione === "mostraHomeUtente") mostraHomeUtente();
            else if (destinazione === "mostraHomeUtente3") mostraHomeUtente3();
            else if (destinazione === "mostraSceltaAllenamento") mostraSceltaAllenamento();
        };
    } else {
        backBtnContainer.style.display = "none";
    }
}

/* 4. NAVIGAZIONE PRINCIPALE */
function mostraHomeUtente() {
    if (!main) return;
    gestisciFrecciaIndietro(false);
    main.innerHTML = `
        <section class="welcome-guide" style="padding: 20px; color: white; text-align: center;">
            <h2 style="color: #ff4d4d;">BENVENUTO IN TITAN 💪</h2>
            <p>Scarica la tua scheda gratuita o evolvi con i nostri piani PRO.</p>
            <div style="margin-top: 30px; display: flex; flex-direction: column; gap: 15px; align-items: center;">
                <button id="startButton" class="submit-button" style="max-width: 300px;">INIZIA ORA (Gratis)</button>
                <button id="shopBtn" class="submit-button" style="max-width: 300px; background: #444;">VAI ALLO SHOP</button>
            </div>
            <p style="margin-top: 40px; font-style: italic; color: #ff4d4d;">"TITAN: NO PAIN, NO GAIN."</p>
        </section>
    `;
    document.getElementById("startButton").onclick = mostraHomeUtente3;
    document.getElementById("shopBtn").onclick = mostraShop;
}

/* 5. PROFILO E SCELTA SCHEDA */
function mostraHomeUtente3() {
    gestisciFrecciaIndietro(true, "mostraHomeUtente");
    main.innerHTML = `
        <div class="form-container-dati" style="max-width:400px; margin:0 auto;">
            <h2 style="text-align:center;">IL TUO PROFILO</h2>
            <div class="form-group"><label>Genere</label>
                <select id="genere"><option value="Uomo">Uomo</option><option value="Donna">Donna</option></select>
            </div>
            <button id="btn-conferma-dati" class="submit-button">CONTINUA</button>
        </div>
    `;
    document.getElementById("btn-conferma-dati").onclick = () => {
        genereSelezionato = document.getElementById("genere").value;
        mostraSceltaAllenamento();
    };
}

function mostraSceltaAllenamento() {
    gestisciFrecciaIndietro(true, "mostraHomeUtente3");
    main.innerHTML = `
        <div style="text-align:center;">
            <h2>SCEGLI IL TUO GOAL</h2>
            <button class="submit-button" onclick="mostraPaginaDownload('FULL BODY', 'scheda-fullbody-uomo.pdf', 'full-body-donna.pdf')" style="margin:10px;">FULL BODY</button>
            <button class="submit-button" onclick="mostraPaginaDownload('POWER', 'power-uomo.pdf', 'power-donna.pdf')" style="margin:10px;">POWER & MASS</button>
        </div>
    `;
}

window.mostraPaginaDownload = function(titolo, fileUomo, fileDonna) {
    gestisciFrecciaIndietro(true, "mostraSceltaAllenamento");
    let file = genereSelezionato === "Uomo" ? fileUomo : fileDonna;
    main.innerHTML = `
        <div style="text-align:center; padding: 40px;">
            <h2>${titolo}</h2>
            <p>La tua scheda è pronta per il download.</p>
            <a href="schede-personalizzate/${file}" download class="submit-button" style="text-decoration:none; display:inline-block; margin-top:20px;">SCARICA PDF</a>
        </div>
    `;
};

/* 6. SHOP */
window.mostraShop = function() {
    gestisciFrecciaIndietro(true, "mostraHomeUtente");
    main.innerHTML = `
        <div class="shop-container" style="display: flex; flex-wrap: wrap; gap: 20px; justify-content: center;">
            <div class="price-card" style="border: 1px solid #ff4d4d; padding: 20px; border-radius: 10px; width: 200px; text-align: center;">
                <h3>PIANO MEDIUM</h3>
                <p style="font-size: 1.5rem; color: #ff4d4d;">59€</p>
                <button class="submit-button" onclick="aggiungiAlCarrello('MEDIUM', 59)">AGGIUNGI</button>
            </div>
            <div class="price-card" style="border: 1px solid #ff4d4d; padding: 20px; border-radius: 10px; width: 200px; text-align: center;">
                <h3>PIANO PRO</h3>
                <p style="font-size: 1.5rem; color: #ff4d4d;">99€</p>
                <button class="submit-button" onclick="aggiungiAlCarrello('PRO', 99)">AGGIUNGI</button>
            </div>
        </div>
    `;
};

window.aggiungiAlCarrello = function(piano, prezzo) {
    carrelloConteggio++;
    totalePrezzo += prezzo;
    if (cartCountVisivo) cartCountVisivo.innerText = carrelloConteggio;
    alert(`Piano ${piano} aggiunto! Totale: €${totalePrezzo}`);
};

/* 7. CHATBOT LOGIC */
const chatBubble = document.getElementById("chat-bubble");
const chatContainer = document.getElementById("chatbot-container");
const closeChat = document.getElementById("close-chat");
const chatMessages = document.getElementById("chatbot-messages");

chatBubble?.addEventListener("click", () => chatContainer.style.display = "flex");
closeChat?.addEventListener("click", () => chatContainer.style.display = "none");

window.chatResponse = function(tipo) {
    let msg = "";
    if (tipo === 'scheda') msg = "Puoi scaricare la tua scheda omaggio cliccando su 'Inizia Ora' nella Home!";
    if (tipo === 'professionale') msg = "I piani PRO includono coaching 1:1 e dieta. Li trovi nello Shop!";
    if (tipo === 'gare') msg = "Siamo specializzati in Powerlifting. Scrivici a altomarea59@gmail.com per una consulenza gara.";
    if (tipo === 'contatto') msg = "Chiama il +39 342 501 5092 per parlare subito con un Coach.";

    const botDiv = document.createElement("div");
    botDiv.className = "bot-msg";
    botDiv.innerText = msg;
    chatMessages.appendChild(botDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
};

// Avvio Navbar
document.getElementById("nav-home")?.addEventListener("click", mostraHomeUtente);
document.getElementById("nav-shop")?.addEventListener("click", mostraShop);
document.getElementById("nav-about")?.addEventListener("click", () => alert("TITAN: Fondato da un Powerlifter per i futuri campioni."));

// Init Home
mostraHomeUtente();
showSlide(currentSlide);
