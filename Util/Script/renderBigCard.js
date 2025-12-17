//RENDERIZAR BIG CARD DO RESTAURANTE / RENDER RESTAURANT BIG CARD
function renderBigCard(bigCard, c, h) {
  const r = JSON.parse(bigCard.dataset.restaurant);

  //Preparar dados do restaurante / Prepare restaurant data
  const tags = setTags(r);
  const stars = setRatingStars(r);
  const priceValue = setPriceValue(r);
  const dishes = r.dishes
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
  const carrouselItems = setCarrousel(r);

  //Processar URL do site / Process site URL
  let hostname = '';
  try {
    hostname = new URL(r.site).hostname;
  } catch (e) {
    hostname = r.site;
  }

  //Obter informações de horário / Get schedule information
  const open = isOpen(h);
  const stats = open ? "<span style='color: #007C76'>Aberto</span>" : "<span style='color: #B23A48'>Fechado</span>";
  const openingInfo = getNextSchedule(h);
  const { dayOfWeek } = getScheduleInfo(h);

  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${r.lat},${r.lon}`;

  //Configurar atributos de acessibilidade / Set accessibility attributes
  bigCard.setAttribute('aria-hidden', 'false');
  bigCard.setAttribute('role', 'dialog');
  bigCard.setAttribute('aria-labelledby', `bigCardTitle-${r.id || r.name}`);
  bigCard.setAttribute('aria-describedby', `bigCardDesc-${r.id || r.name}`);

  return `
    <header class="bigFlag" style="background-image: url('Util/Images/Flags/${c.name}-flagB.png');" role="img" aria-label="Bandeira do ${c.name}">
      <button class="close" tabindex="0" aria-label="Fechar card do restaurante ${r.name}" onclick="closeBigCard()">
        <svg focusable="false" aria-hidden="true" width="15" height="15" viewBox="5 5 14 14" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12Z"/>
        </svg>
      </button>
    </header>

    <section class="bigMain" role="document" aria-modal="true" aria-labelledby="bigCardTitle-${r.id || r.name}" aria-describedby="bigCardDesc-${r.id || r.name}">
      <div class="bigTop">
        <h2 id="bigCardTitle-${r.id || r.name}" tabindex="0">${r.name}</h2>
        <p aria-hidden="true">|</p>
        <h3 id="bigCardDesc-${r.id || r.name}">Culinária ${c.demonym}</h3>
      </div>

      <div class="bigMiddle" role="tablist" aria-label="Seções do restaurante">
        <button class="info btnInfo active" onclick="changeSection('info')" tabindex="0" aria-label="Ver informações do restaurante ${r.name}" role="tab" aria-selected="true" aria-controls="bigInfoAll">
          Informações
        </button>
        <p aria-hidden="true">|</p>
        <button class="info btnImgs" onclick="changeSection('images')" tabindex="0" aria-label="Ver imagens do restaurante ${r.name}" role="tab" aria-selected="false" aria-controls="bigImgs">
          Imagens
        </button>
      </div>

      <div class="bigBottom">
        <section class="bigInfoAll" style="background-color: ${c.primary_color};" id="bigInfoAll" role="tabpanel" aria-labelledby="bigCardTitle-${r.id || r.name}">
          <div class="bigInfo">
            <div class="top">
              <h3>Informações</h3>

              <address aria-label="Endereço do restaurante">
                <p>
                  <svg aria-hidden="true" width="32" height="32" fill="#e18943" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7ZM7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.88-2.88 7.19-5 9.88C9.92 16.21 7 11.85 7 9Z"></path>
                    <path d="M12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"></path>
                  </svg>
                  ${r.address}
                </p>
              </address>

              <p aria-label="Telefone do restaurante">
                <svg focusable="false" aria-hidden="true" width="32" height="32" fill="#e18943" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.54 5c.06.89.21 1.76.45 2.59l-1.2 1.2c-.41-1.2-.67-2.47-.76-3.79h1.51Zm9.86 12.02c.85.24 1.72.39 2.6.45v1.49c-1.32-.09-2.59-.35-3.8-.75l1.2-1.19ZM7.5 3H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.49c0-.55-.45-1-1-1-1.24 0-2.45-.2-3.57-.57a.84.84 0 0 0-.31-.05c-.26 0-.51.1-.71.29l-2.2 2.2a15.149 15.149 0 0 1-6.59-6.59l2.2-2.2c.28-.28.36-.67.25-1.02A11.36 11.36 0 0 1 8.5 4c0-.55-.45-1-1-1Z"></path>
                </svg>
                ${r.phone}
              </p>

              <p aria-label="Site do restaurante">
                <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#e18943" aria-hidden="true"><path d="M838-65 720-183v89h-80v-226h226v80h-90l118 118-56 57ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 20-2 40t-6 40h-82q5-20 7.5-40t2.5-40q0-20-2.5-40t-7.5-40H654q3 20 4.5 40t1.5 40q0 20-1.5 40t-4.5 40h-80q3-20 4.5-40t1.5-40q0-20-1.5-40t-4.5-40H386q-3 20-4.5 40t-1.5 40q0 20 1.5 40t4.5 40h134v80H404q12 43 31 82.5t45 75.5q20 0 40-2.5t40-4.5v82q-20 2-40 4.5T480-80ZM170-400h136q-3-20-4.5-40t-1.5-40q0-20 1.5-40t4.5-40H170q-5 20-7.5 40t-2.5 40q0 20 2.5 40t7.5 40Zm34-240h118q9-37 22.5-72.5T376-782q-55 18-99 54.5T204-640Zm172 462q-18-34-31.5-69.5T322-320H204q29 51 73 87.5t99 54.5Zm28-462h152q-12-43-31-82.5T480-798q-26 36-45 75.5T404-640Zm234 0h118q-29-51-73-87.5T584-782q18 34 31.5 69.5T638-640Z"/></svg>
                <a href="${r.site}" target="_blank" rel="noopener noreferrer" aria-label="Visitar site do restaurante (abre em nova janela)">${hostname}</a>
              </p>

              <p aria-label="Faixa de preço do restaurante">
                <svg focusable="false" aria-hidden="true" width="32" height="32" fill="#e18943" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8Zm.89-8.9c-1.78-.59-2.64-.96-2.64-1.9 0-1.02 1.11-1.39 1.81-1.39 1.31 0 1.79.99 1.9 1.34l1.58-.67c-.15-.44-.82-1.91-2.66-2.23V5h-1.75v1.26c-2.6.56-2.62 2.85-2.62 2.96 0 2.27 2.25 2.91 3.35 3.31 1.58.56 2.28 1.07 2.28 2.03 0 1.13-1.05 1.61-1.98 1.61-1.82 0-2.34-1.87-2.4-2.09l-1.66.67c.63 2.19 2.28 2.78 3.02 2.96V19h1.75v-1.24c.52-.09 3.02-.59 3.02-3.22.01-1.39-.6-2.61-3-3.44Z"></path>
                </svg>
                ${r.price} <span class="sr-only">${priceValue}</span> (${priceValue})
              </p>

              <p aria-label="Horário de funcionamento do restaurante">
                <svg width="32" height="32" fill="#e18943" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path fill-rule="evenodd" d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2ZM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8ZM11 7h1.5v5.25l4.5 2.67-.75 1.23L11 13V7Z" clip-rule="evenodd"></path>
                </svg>
                ${dayOfWeek}: ${stats} (${openingInfo})
              </p>
            </div>

            <div class="bottom">
              <div class="starsBox" aria-label="Avaliação do restaurante: ${r.rating} estrelas de 5">
                ${stars} <span class="sr-only">${r.rating} estrelas</span> (${r.rating})
              </div>
              <div class="tagsContainer" aria-label="Características do restaurante">
                ${tags}
              </div>
            </div>
          </div>

          <a href="${mapsUrl}" target="_blank" rel="noopener noreferrer"  aria-label="Visitar ${r.name} no Google Maps (abre em nova janela)" class="bigInfoBtn" tabindex="0" aria-label="Abrir rota no Google Maps para ${r.name}">
            <span>Visitar ${r.name}</span>
            <svg focusable="false" aria-hidden="true" width="32" height="32" fill="#faf3e0" style="background-color: ${c.second_color};" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8Z"></path>
            </svg>
          </a>
        </section>

        <section class="bigImgs" id="bigImgs" role="tabpanel" aria-labelledby="bigCardTitle-${r.id || r.name}">
          <div class="bigRestaurantImgs">
            <nav class="bigCarrousel" aria-label="Carrossel de imagens do restaurante ${r.name}" aria-live="polite">
              <button class="prev" aria-label="Imagem anterior" aria-controls="bigCarouselImages">
                <svg focusable="false" aria-hidden="true" width="30" height="30" fill="#2f2f2f" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.51 3.87 15.73 2.1 5.84 12l9.9 9.9 1.77-1.77L9.38 12l8.13-8.13Z"></path>
                </svg>
              </button>

              <div id="bigCarouselImages" class="carousel-container" aria-live="polite">
                ${carrouselItems}
              </div>

              <button class="next" aria-label="Próxima imagem" aria-controls="bigCarouselImages">
                <svg focusable="false" aria-hidden="true" width="30" height="30" fill="#2f2f2f" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="m6.49 20.13 1.77 1.77 9.9-9.9-9.9-9.9-1.77 1.77L14.62 12l-8.13 8.13Z"></path>
                </svg>
              </button>
            </nav>
          </div>

          <div class="bigDishesImgs" aria-label="Imagens dos pratos do restaurante ${r.name}" role="group">
            <h3>Pratos Principais</h3>

            <div class="platesContainer">
              ${dishes.map((dish, index) => `
                <div class="plate" role="img" aria-label="Prato ${dish}">
                  <img src="Util/Images/Dishes/${r.name}-${dish}.png" alt="Imagem do prato ${dish} do restaurante ${r.name}" onerror="this.onerror=null; this.src='Util/Images/Dishes/dishes-noImage.png'">
                  <p>${dish}</p>
                </div>
              `).join('')}
            </div>
          </div>
        </section>
      </div>
    </section>    
  `;
}

//ALTERAR SEÇÃO DO BIG CARD (Mobile) / CHANGE BIG CARD SECTION (Mobile)
function changeSection(section) {
  const bigInfoAll = document.querySelector(".bigInfoAll");
  const bigImgs = document.querySelector(".bigImgs");
  const btnInfo = document.querySelector(".btnInfo");
  const btnImgs = document.querySelector(".btnImgs");
  
  if(section == 'info'){
    bigInfoAll.style.display = "flex";
    bigImgs.style.display = "none";
    btnInfo.classList.add("active");
    btnImgs.classList.remove("active");
    
    btnInfo.setAttribute('aria-selected', 'true');
    btnImgs.setAttribute('aria-selected', 'false');
    bigInfoAll.setAttribute('aria-hidden', 'false');
    bigImgs.setAttribute('aria-hidden', 'true');
  } else{
    bigInfoAll.style.display = "none";
    bigImgs.style.display = "block";
    btnImgs.classList.add("active");
    btnInfo.classList.remove("active");
    
    btnImgs.setAttribute('aria-selected', 'true');
    btnInfo.setAttribute('aria-selected', 'false');
    bigImgs.setAttribute('aria-hidden', 'false');
    bigInfoAll.setAttribute('aria-hidden', 'true');
  }
}

//FECHAR BIG CARD / CLOSE BIG CARD
function closeBigCard() {
  const previousActiveElement = document.activeElement;
    
  closeMiniCard();
  
  bigCard.classList.remove("active");
  bigCard.setAttribute('aria-hidden', 'true');

  bigCard.addEventListener("transitionend", function handler() {
    bigCard.style.display = "none";
    bigCard.innerHTML = "";
    screenCard.style.display = "none";
    bigCard.removeAttribute('aria-labelledby');
    bigCard.removeAttribute('aria-describedby');
    bigCard.removeEventListener("transitionend", handler);
    
    if (previousActiveElement && document.contains(previousActiveElement)) {
      previousActiveElement.focus();
    }
  });
}