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

window.plusSlides = function(n) {
  showSlides(slideIndex += n);
};

// Auto-play carosello
if (slides.length > 0) {
  showSlides(slideIndex);
  setInterval(() => {
    plusSlides(1);
  }, 4000);
}

// FUNZIONI DI NAVIGAZIONE
window.mostraHomeUtente = function() {
  if (!main) return;
  main.innerHTML = `
    <div style="text-align:center; color:white;">
      <h2 style="color:#ff4d4d;">BENVENUTO ATLETA</h2>
      <p>Il tuo percorso TITAN inizia ora.</p>
      <button class="submit-button" onclick="mostraShop()">VAI ALLO SHOP</button>
      <button class="submit-button" style="background:#333; margin-top:10px;" onclick="mostraHomeUtente3()">IL MIO PROFILO</button>
    </div>
  `;
};

window.mostraHomeUtente3 = function() {
  main.innerHTML = `
    <div class="form-container-dati">
      <h2>I TUOI DATI</h2>
      <div class="form-group" style="margin-bottom:15px;">
        <label>Genere:</label>
        <select id="genere" style="width:100%; padding:10px; margin-top:5px;">
          <option value="Uomo">Uomo</option>
          <option value="Donna">Donna</option>
        </select>
      </div>
      <button class="submit-button" onclick="mostraHomeUtente()">INDIETRO</button>
    </div>
  `;
};

window.mostraShop = function() {
  main.innerHTML = `
    <div style="text-align:center;">
      <h2>SHOP PRO</h2>
      <div style="border:1px solid #ff4d4d; padding:15px; margin-bottom:10px; border-radius:10px;">
        <p>ABBONAMENTO MENSILE - 99€</p>
        <button class="submit-button" onclick="aggiungiCarrello()">AGGIUNGI</button>
      </div>
      <button class="submit-button" style="background:#333" onclick="mostraHomeUtente()">INDIETRO</button>
    </div>
  `;
};

window.aggiungiCarrello = function() {
  carrelloConteggio++;
  const cartDisplay = document.getElementById("cart-count");
  if (cartDisplay) cartDisplay.innerText = carrelloConteggio;
  alert("Prodotto aggiunto al carrello!");
};

// CHATBOT
const bubble = document.getElementById("chat-bubble");
const chatContainer = document.getElementById("chatbot-container");

if (bubble) {
  bubble.onclick = function() {
    chatContainer.style.display = chatContainer.style.display === "flex" ? "none" : "flex";
  };
}

const closeBtn = document.getElementById("close-chat");
if (closeBtn) {
  closeBtn.onclick = function() {
    chatContainer.style.display = "none";
  };
}

window.chatResponse = function(tipo) {
  const msgBox = document.getElementById("chatbot-messages");
  let testo = tipo === 'scheda' ? "Le schede sono disponibili nell'area PRO!" : "Contattaci al +39 342 501 5092";
  msgBox.innerHTML += `<div class="bot-msg">${testo}</div>`;
  msgBox.scrollTop = msgBox.scrollHeight;
};
