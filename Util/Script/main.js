//CONFIGURAÇÕES DO MAPA / MAP SETUP
console.log("Script carregado");

const boundsSaoPaulo = L.latLngBounds(
  L.latLng(-24.008697, -46.825466),
  L.latLng(-23.356792, -46.365052)
);

const allMarkers = [];

let coordCard = null;
let openCard = false;

//Definir mapa / Set up map
let map = L.map("map", {
  maxBounds: boundsSaoPaulo,
  maxBoundsViscosity: 1.2,
  minZoom: 11,
  maxZoom: 18,
}).setView([-23.55052, -46.633308], 12);

//Adicionar atributos de acessibilidade / Add accessibility attributes
map.getContainer().setAttribute('role', 'application');
map.getContainer().setAttribute('aria-label', 'Mapa interativo de restaurantes latino-americanos em São Paulo');

L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
  attribution: '&copy; <a href="https://carto.com/">Carto</a>',
}).addTo(map);

//Alterar controle de zoom / Change zoom control
map.removeControl(map.zoomControl);
L.control
  .zoom({
    position: "bottomright",
  })
  .addTo(map);

//POSICIONAR USUÁRIO / USER LOCATION


//CARREGAR DE DADOS / DATA LOAD
async function loadRestaurants() {
  try {
    const response = await fetch("Controller/RestaurantController.php");
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Erro ao buscar dados dos restaurantes:", error);
    return [];
  }
}

async function loadCountries() {
  try {
    const response = await fetch("Controller/CountryController.php");
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Erro ao buscar dados dos países:", error);
    return [];
  }
}

async function loadData() {
  const restaurants = await loadRestaurants();
  const countries = await loadCountries();

  const countriesMap = {};
  countries.forEach((c) => {
    countriesMap[c.id] = c;
  });

  const scheduleMap = {};
  for (const restaurant of restaurants) {
    const response = await fetch(`Controller/ScheduleRestaurantController.php?restaurant_id=${restaurant.id}`);
    const horarios = await response.json();
    scheduleMap[restaurant.id] = horarios;
  }

  const uniqueTags = extractTags(restaurants);
  renderTagCheckbox(uniqueTags);

  placeMarkers(restaurants, countriesMap, scheduleMap);
}

//COLOCAR MARCADORES / PLACE MARKERS
async function placeMarkers(restaurants, countriesMap, scheduleMap) {
  restaurants.forEach((r) => {
    const c = countriesMap[r.country_id];
    const h = scheduleMap[r.id];

    let myIcon = L.icon({
      iconUrl: `Util/Images/Flags/${c.name}-pin.png`,
      iconSize: [38, 50],
      iconAnchor: [22, 94],
      popupAnchor: [-3, -76],
    });

    const tags =  r.description
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)

    const open = isOpen(scheduleMap[r.id]);

    const marker = L.marker([r.lat, r.lon], {
      icon: myIcon,
      country: String(r.country_id),
      price: String(r.price),
      rating: String(r.rating),
      tags: tags,
      openNow: open
    }).addTo(map);

    allMarkers.push(marker);

    marker.on("click", () => {
      const miniCard = document.querySelector("#miniCard");
      const bigCard = document.querySelector("#bigCard");
      const screenCard = document.querySelector("#screenCard");

      coordCard = L.latLng(r.lat, r.lon);
      openCard = true;

      map.setView(coordCard, Math.max(map.getZoom(), 12), { animate: true });

      updatePos();

      miniCard.innerHTML = renderMiniCard(r, c);
      initCarrousel(miniCard);

      miniCard.querySelector(".close").addEventListener("click", closeMiniCard);

      miniCard.style.display = "flex";
      setTimeout(() => miniCard.classList.add("active"), 10);

      miniCard.querySelector(".showMore").addEventListener("click", function(event) {
        event.stopPropagation(); // Usa 'event' em vez de 'e'

        const bigCard = document.querySelector("#bigCard");
        const screenCard = document.querySelector("#screenCard");

        bigCard.innerHTML = renderBigCard(miniCard, c, h);

        // Remove event listener antigo do screenCard
        const newScreenCard = screenCard.cloneNode(true);
        screenCard.parentNode.replaceChild(newScreenCard, screenCard);

        // Adiciona novos listeners
        newScreenCard.addEventListener("click", closeBigCard);
        bigCard.querySelector(".close").addEventListener("click", closeBigCard);

        closeMenuMobile();

        bigCard.style.display = "flex";
        initCarrousel(bigCard);
        newScreenCard.style.display = "block";

        setTimeout(() => {
          bigCard.classList.add("active");
          bigCard.setAttribute('aria-hidden', 'false');
        }, 10);
      });
});
});
}

function updatePos() {
  const miniCard = document.querySelector("#miniCard");
  const pos = map.latLngToContainerPoint(coordCard);
  
  const cardWidth = miniCard.offsetWidth;
  const cardHeight = miniCard.offsetHeight;
  const mapWidth = map.getContainer().offsetWidth;
  const mapHeight = map.getContainer().offsetHeight;
  
  const left = Math.max(20, Math.min(pos.x + 20, mapWidth - cardWidth - 20));
  const top = Math.max(20, Math.min(pos.y - 200, mapHeight - cardHeight - 20));
  
  miniCard.style.left = `${left}px`;
  miniCard.style.top = `${top}px`;
}

let moveTimeout;
map.on("move zoom", () => {
  if (openCard && coordCard) {
    clearTimeout(moveTimeout);
    moveTimeout = setTimeout(() => {
      requestAnimationFrame(updatePos);
    }, 50);
  }
});

//CRIAR FUNÇÃO DOS CARDS / SET CARD FUNCTION
function setTags(r) {
  return r.description
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
    .map((t) => `<p class="tag">${t}</p>`)
    .join("");
}

function initCarrousel(container) {
  const carrousel = container.querySelector(".miniCarrousel, .bigCarrousel");
  if (!carrousel) return;

  const items = carrousel.querySelectorAll(".carrouselItem");
  let currentIndex = 0;

  const prevBtn = carrousel.querySelector(".prev");
  const nextBtn = carrousel.querySelector(".next");

  function showItem(index) {
    items.forEach((item, i) => {
      item.classList.toggle("active", i === index);
    });
  }

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    showItem(currentIndex);
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % items.length;
    showItem(currentIndex);
  });
}

function setCarrousel(r) {
  const numImages = 5;
  let carrouselItems = "";

  let classe;

  for (let i = 1; i <= numImages; i++) {
    if (i === 1) {
      classe = "active";
    } else {
      classe = "";
    }

    carrouselItems += `
      <div class="carrouselItem ${classe}">
        <img src="Util/Images/Restaurants/${r.name}-restaurant${i}.png" alt="${r.name} imagem ${i}" onerror="this.onerror=null; this.src='Util/Images/Restaurants/restaurant-noImage.png'">
      </div>
    `;
  }

  return carrouselItems;
}

function setPriceValue(r){
  let priceValue = "";
  switch (r.price) {
    case "$":
      priceValue = "R$1 - R$59";
      break;
    case "$$":
      priceValue = "R$60 - R$99";
      break;
    case "$$$":
      priceValue = "R$100 - R$200";
      break;
  }
  return priceValue;
}

function setRatingStars(r){
  const starSVG = `
    <svg focusable="false" width="20" height="20" fill="#e18943" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27Z"></path>
    </svg>
  `;
  let stars = starSVG.repeat(r.rating);
  const starCount = stars.split('<svg').length - 1;
  if ((r.rating - starCount) > 0){
    stars += `
      <svg width="20" height="20" fill="#ff8943" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="m14.81 8.62 7.19.62-5.45 4.73L18.18 21 12 17.27 5.82 21l1.64-7.03L2 9.24l7.19-.61L12 2l2.81 6.62ZM12 6.1v9.3l3.77 2.28-1-4.28 3.32-2.88-4.38-.38L12 6.1Z" clip-rule="evenodd"></path>
      </svg>
    `;
  }

  return stars;
}

//INICIAR O SCRIPT / INITIALIZE SCRIPT
loadData();
renderFilters();