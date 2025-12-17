//RENDERIZAR FILTROS / RENDER FILTERS
function renderFilters() {
  const btnDropdown = document.querySelector("#dropdownFilters");
  const filtersMenu = document.querySelector("#filters");
  const dropdown = filtersMenu.querySelector(".dropdown");
  const filterForm = document.querySelector(".filterForm");
  const arrow = dropdown.querySelector(".arrow");

  let stats = false;

  btnDropdown.addEventListener("click", () => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    if (!stats) {
      filtersMenu.style.height = isMobile ? "calc(90vh - 110px)" : "100%";
      filterForm.style.visibility = "visible";
      filterForm.style.opacity = "1";
      arrow.style.transform = "rotate(270deg)";
      btnDropdown.setAttribute('aria-expanded', 'true');
      stats = true;
    } else {
      filtersMenu.style.height = "62px";
      filterForm.style.opacity = "0";
      filterForm.style.visibility = "hidden";
      arrow.style.transform = "rotate(90deg)";
      btnDropdown.setAttribute('aria-expanded', 'false');
      stats = false;
    }
  });
}

//FECHAR MENU MOBILE / CLOSE MOBILE MENU
function closeMenuMobile() {
  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  if (isMobile) {
    const filtersMenu = document.querySelector("#filters");
    const filterForm = document.querySelector(".filterForm");
    const arrow = filtersMenu.querySelector(".arrow");

    filtersMenu.style.height = "62px";
    filterForm.style.opacity = "0";
    filterForm.style.visibility = "hidden";
    arrow.style.transform = "rotate(90deg)";
  }
}

//DROPDOWN DO MENU / MENU DROPDOWN
function dropdown(section) {
  const parent = section.parentElement;
  const filterOptions = parent.querySelector(".filterOptions");
  const arrow = section.querySelector(".arrow");

  const isOpen = filterOptions.classList.contains("open");

  if (!isOpen) {
    filterOptions.classList.add("open");
    arrow.style.transform = "rotate(270deg)";
    section.setAttribute('aria-expanded', 'true'); 

  } else {
    filterOptions.classList.remove("open");
    arrow.style.transform = "rotate(90deg)";
    section.setAttribute('aria-expanded', 'false');
  }
}

//EXTRAIR TAGS / EXTRACT TAGS
function extractTags(restaurants) {
  const tagSet = new Set();

  restaurants.forEach((r) => {
    if (r.description) {
      r.description
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
        .forEach((tag) => tagSet.add(tag));
    }
  });

  return Array.from(tagSet);
}

function renderTagCheckbox(tags){
  const filterOptions = document.querySelector("#tagFilters");

  const html = tags.sort((a, b) => a.localeCompare(b)).map((tag) => `
    <label class="option">
      <input type="checkbox" name="tag" value="${tag}" 
             aria-label="Filtrar por ${tag}">
      <span class="label">${tag}</span>
    </label>
  `).join("");

  filterOptions.innerHTML = html;
}

//ATUALIZAR INPUTS / UPDATE INPUTS
const rangeInputs = document.querySelectorAll('input[type="range"]');

function updateProgress(input) {
  const min = parseFloat(input.min) || 0;
  const max = parseFloat(input.max) || 100;
  const value = parseFloat(input.value);
  const progress = ((value - min) / (max - min)) * 100;
  input.style.setProperty('--progress', `${progress}%`);

  // Verifica qual input está sendo alterado
  if (input.id === 'priceRange') {
    const priceLabel = document.getElementById('priceLabelMax');
    const priceSymbols = ["Todos", "$", "$$", "$$$"];
    const priceString = priceSymbols[value] || "Todos";
    const priceValue = setPriceValue({ price: priceString });
    
    if (priceLabel) {
      if (value === 0) {
        priceLabel.textContent = "Todos";
        input.setAttribute('aria-valuetext', 'Todos os preços');
      } else {
        priceLabel.textContent = `${priceString} (${priceValue})`;
        input.setAttribute('aria-valuetext', `${priceString} - ${priceValue}`);
      }
    }
  } else if (input.id === 'ratingRange') {
    const ratingLabel = document.getElementById('ratingLabelMax');
    if (ratingLabel) {
        const starSVG = `
          <svg focusable="false" width="20" height="20" fill="#e18943" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27Z"></path>
          </svg>
        `;
      const stars = starSVG.repeat(value);
      ratingLabel.innerHTML = `${stars}`;
      input.setAttribute('aria-valuetext', `${value} estrelas ou mais`);
    }
  }
}

//INICIAR NAVEGAÇÃO PELO TECLADO / INIT KEYBOARD NAVIGATION
function initKeyboardNavigation() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const filtersMenu = document.querySelector("#filters");
      const filterForm = document.querySelector(".filterForm");
      
      if (filterForm.style.opacity === "1") {
        closeMenuMobile();
        document.querySelector("#dropdownFilters").focus();
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initKeyboardNavigation();
  
  rangeInputs.forEach(input => {
    updateProgress(input); 
    input.addEventListener('input', (e) => updateProgress(e.target));
  });

  const clearButton = document.querySelector("#clearFilters");
  clearButton.addEventListener("click", clearFilters);

  const applyButton = document.querySelector("#applyFilters");
  applyButton.addEventListener("click", applyFilters);
});

//EXTRAIR FILTROS SELECIONADOS / GET SELECTED FILTERS
function getFilters() {
  const filters = {
    countries: [],
    price: null,
    rating: null,
    tags: [],
    openNow: null
  };

  //Países
  document.querySelectorAll('.option input[type="checkbox"][name="country"]').forEach((checkbox) => {
    if (checkbox.checked) {
      filters.countries.push(checkbox.value);
    }
  });

  //Preço em $
  const priceRange = document.querySelector('#priceRange');
  if (priceRange) {
    const priceLevel = parseInt(priceRange.value);
    if (priceLevel >= 1) {
      filters.price = '$'.repeat(priceLevel);
    }
  }

  //Avaliação
  const ratingRange = document.querySelector('#ratingRange');
  if (ratingRange) {
    const ratingValue = parseInt(ratingRange.value);
    if (ratingValue > 0) {
      filters.rating = ratingValue;
    }
  }

  //Tags
  document.querySelectorAll('.option input[type="checkbox"][name="tag"]').forEach((checkbox) => {
    if (checkbox.checked) {
      filters.tags.push(checkbox.value);
    }
  });

  //Aberto agora
  const openNowCheckbox = document.querySelector('.option input[type="checkbox"][name="isOpen"]');
  if (openNowCheckbox && openNowCheckbox.checked) {
    filters.openNow = true;
  }

  //Todos
  if (!filters.price && !filters.rating && !filters.openNow && filters.countries.length === 0 && filters.tags.length === 0) {
    const chkCountries = document.querySelectorAll('input[name="country"]');
    chkCountries.forEach((c) => {
      filters.countries.push(c.value);
    });
  }

  return filters;
}

//APLICAR FILTROS / APPLY FILTERS
function applyFilters() {
  const filters = getFilters();

  allMarkers.forEach((marker) => {
    const {country, price, rating, tags, openNow} = marker.options;

    const matchCountry = filters.countries.length === 0 || filters.countries.includes(String(country));

    const matchPrice = !filters.price || (typeof price === "string" && price.length <= filters.price.length);

    const matchRating = filters.rating === null || parseFloat(rating) >= filters.rating;

    const matchTags = filters.tags.length === 0 || filters.tags.every((tag) => tags.includes(tag));

    const matchOpen = !filters.openNow || openNow;

    const visible = matchCountry && matchPrice && matchRating && matchTags && matchOpen;

    if (visible) {
      marker.addTo(map);
    } else {
      map.removeLayer(marker);
    }
  });

  closeMiniCard();
  closeMenuMobile();

  const markers = allMarkers.filter((marker) => map.hasLayer(marker)).length;
  const screenCard = document.querySelector("#screenCard");
  const alertBox = document.querySelector("#alert");
  const alertClear = document.querySelector('#clearFiltersAlert');

  console.log(markers);

  if(markers === 0){
    screenCard.style.display = "flex";
    alertBox.style.display = "flex";
    setTimeout(() => alertBox.classList.add("active"), 10);
    screenCard.addEventListener("click", closeAlert);
    alertBox.querySelector(".close").addEventListener("click", closeAlert);
    alertClear.addEventListener("click", closeAlert);
    alertClear.addEventListener("click", clearFilters);
  }
}

//LIMPAR FILTROS / CLEAR FILTERS
function clearFilters() {
  const checkboxes = document.querySelectorAll('.option input[type="checkbox"]');
  const ranges = document.querySelectorAll('input[type="range"]');

  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });

  ranges.forEach((range) => {
      range.value = 0;
      updateProgress(range);
  });

  applyFilters();
}

//FECHAR ALERTA / CLOSE ALERT
function closeAlert(){
  const screenCard = document.querySelector("#screenCard");
  const alertBox = document.querySelector("#alert");

  alertBox.classList.remove("active");

  alertBox.addEventListener("transitionend", function handler() {
    alertBox.style.display = "none";
    screenCard.style.display = "none";
    alertBox.removeEventListener("transitionend", handler);
  });
}