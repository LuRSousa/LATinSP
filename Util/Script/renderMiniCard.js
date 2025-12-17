//RENDERIZAR MINI CARD DO RESTAURANTE / RENDER RESTAURANT MINI CARD
function renderMiniCard(r, c) {
  //Preparar dados do restaurante / Prepare restaurant data
  const tags = setTags(r);
  const stars = setRatingStars(r);
  const priceValue = setPriceValue(r);
  const carrouselItems = setCarrousel(r);

  //Configurar atributos de acessibilidade / Set accessibility attributes
  miniCard.dataset.restaurant = JSON.stringify(r);
  miniCard.setAttribute('aria-hidden', 'false');
  miniCard.setAttribute('role', 'dialog');
  miniCard.setAttribute('aria-labelledby', `restaurant-title-${r.id}`);
  miniCard.setAttribute('aria-describedby', `restaurant-desc-${r.id}`);

  return `
    <header class="miniFlag" style="background-image: url('Util/Images/Flags/${c.name}-flagS.png');" role="img" aria-label="Bandeira do ${c.name}">
      <button class="close" tabindex="0" aria-label="Fechar card do restaurante ${r.name}" onclick="closeMiniCard()">
        <svg focusable="false" aria-hidden="true" width="15" height="15" viewBox="5 5 14 14" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12Z"/>
        </svg>
      </button>
    </header>

    <section class="miniMain" aria-labelledby="restaurant-title-${r.id}">
      <h3 id="restaurant-title-${r.id}" tabindex="0">${r.name}</h3>
      <p id="restaurant-desc-${r.id}">
        <span class="sr-only">Culinária</span> 
        ${c.demonym}
      </p>

      <nav class="miniCarrousel" aria-label="Carrossel de imagens do restaurante ${r.name}" aria-live="polite">
        <button class="prev" aria-label="Imagem anterior" aria-controls="carousel-images-${r.id}">
          <svg focusable="false" aria-hidden="true" width="30" height="30" fill="#2f2f2f" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.51 3.87 15.73 2.1 5.84 12l9.9 9.9 1.77-1.77L9.38 12l8.13-8.13Z"></path>
          </svg>
        </button>

        <div id="carousel-images-${r.id}" class="carousel-container" aria-live="polite" aria-atomic="false">
          ${carrouselItems}
        </div>

        <button class="next" aria-label="Próxima imagem" aria-controls="carousel-images-${r.id}">
          <svg focusable="false" aria-hidden="true" width="30" height="30" fill="#2f2f2f" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="m6.49 20.13 1.77 1.77 9.9-9.9-9.9-9.9-1.77 1.77L14.62 12l-8.13 8.13Z"></path>
          </svg>
        </button>
      </nav>

      <div class="ratingPrice">
        <p>
          <span class="sr-only">Avaliação:</span>
          ${stars} 
          <span class="sr-only">${r.rating} estrelas de 5</span>
          (${r.rating})
        </p>
        <p>
          <span class="sr-only">Faixa de preço:</span>
          ${r.price}
          <span class="sr-only">${priceValue}</span>
          (${priceValue})
        </p>
      </div>
    </section>

    <section class="miniInfo" style="background-color: ${c.primary_color}">
      <div class="addressDesc">
        <address class="address" aria-label="Endereço do restaurante">
          <svg aria-hidden="true" width="20" height="28" fill="#e18943" viewBox="0 0 15 22" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7ZM7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.88-2.88 7.19-5 9.88C9.92 16.21 7 11.85 7 9Z"></path>
            <path d="M12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"></path>
          </svg>
          <p>${r.address}</p>
        </address>

        <div class="tagsContainer" aria-label="Características do restaurante">
          ${tags}
        </div>
      </div>

      <button class="showMore" tabindex="0" aria-label="Ver mais informações sobre ${r.name}" data-restaurant-id="${r.id}">
        <span>Saiba Mais</span>
        <svg focusable="false" aria-hidden="true" width="30" height="30" fill="#faf3e0" style="background-color: ${c.second_color};" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8Z"></path>
        </svg>
      </button>
    </section>
  `;
}

//FECHAR MINI CARD / CLOSE MINI CARD
function closeMiniCard() {
  const previousActiveElement = document.activeElement;
  
  miniCard.classList.remove("active");
  openCard = false;
  coordCard = null;
  miniCard.setAttribute('aria-hidden', 'true');

  miniCard.addEventListener("transitionend", function handler() {
    miniCard.style.display = "none";
    miniCard.innerHTML = "";
    miniCard.removeAttribute('aria-labelledby');
    miniCard.removeAttribute('aria-describedby');
    miniCard.removeEventListener("transitionend", handler);
    
    if (previousActiveElement && document.contains(previousActiveElement)) {
      previousActiveElement.focus();
    }
  });
}