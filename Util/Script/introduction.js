//CRIAR FUNÇÃO DE INTRODUÇÃO / SET INTRODUCTION FUNCTION
function showIntro() {
  const screenCard = document.querySelector("#screenCard");
  const introCard = document.querySelector("#introCard");
  
  screenCard.style.display = "block";
  introCard.style.display = "flex";
  
  setTimeout(() => {
    introCard.classList.add("active");
  }, 10);

  closeMenuMobile();
  closeMiniCard();
}

function closeIntro() {
  const screenCard = document.querySelector("#screenCard");
  const introCard = document.querySelector("#introCard");
  
  introCard.classList.remove("active");
  screenCard.style.display = "none";
  introCard.style.display = "none";
}

document.querySelector("#skipIntro").addEventListener("click", closeIntro);
document.querySelector("#screenCard").addEventListener("click", closeIntro);
document.querySelector("#startTutorial").addEventListener("click", startTutorial);
document.querySelector("#helpButton").addEventListener("click", startTutorial);

// VARIÁVEIS DO TUTORIAL / TUTORIAL VARIABLES
let currentTutorialSlide = 1;
const totalSlides = 7;

// FUNÇÃO PARA INICIAR TUTORIAL / FUNCTION TO START TUTORIAL
function startTutorial() {
  closeIntro();
  
  currentTutorialSlide = 1;
  
  const tutorialCard = document.querySelector('#tutorialCard');
  const screenCard = document.querySelector('#screenCard');
  
  screenCard.style.display = 'block';
  tutorialCard.style.display = 'flex';
  
  setTimeout(() => {
    tutorialCard.classList.add('active');
  }, 10);
  
  // Mostrar slide inicial
  showTutorialSlide(currentTutorialSlide);
  updateProgressText();
}

// FUNÇÃO PARA MOSTRAR SLIDE / FUNCTION TO SHOW SLIDE
function showTutorialSlide(slideNumber) {
  // Esconder todos os slides
  document.querySelectorAll('.tutorialSlide').forEach(slide => {
    slide.classList.remove('active');
  });
  
  // Mostrar slide atual
  const currentSlide = document.querySelector(`.tutorialSlide[data-slide="${slideNumber}"]`);
  if (currentSlide) {
    currentSlide.classList.add('active');
  }
  
  // Atualizar botões
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');
  
  if (prevBtn) {
    prevBtn.disabled = slideNumber === 1;
  }
  
  if (nextBtn) {
    nextBtn.textContent = slideNumber === totalSlides ? "Concluir" : "Próximo";
  }
}

// FUNÇÃO PARA ATUALIZAR TEXTO DE PROGRESSO / UPDATE PROGRESS TEXT
function updateProgressText() {
  const currentSlideSpan = document.querySelector('.currentSlide');
  const totalSlidesSpan = document.querySelector('.totalSlides');
  
  if (currentSlideSpan) currentSlideSpan.textContent = currentTutorialSlide;
  if (totalSlidesSpan) totalSlidesSpan.textContent = totalSlides;
}

// FUNÇÃO PARA PRÓXIMO SLIDE / NEXT SLIDE FUNCTION
function nextTutorialSlide() {
  if (currentTutorialSlide < totalSlides) {
    currentTutorialSlide++;
    showTutorialSlide(currentTutorialSlide);
    updateProgressText();
  } else {
    closeTutorial();
  }
}

// FUNÇÃO PARA SLIDE ANTERIOR / PREVIOUS SLIDE FUNCTION
function prevTutorialSlide() {
  if (currentTutorialSlide > 1) {
    currentTutorialSlide--;
    showTutorialSlide(currentTutorialSlide);
    updateProgressText();
  }
}

// FUNÇÃO PARA FECHAR TUTORIAL / CLOSE TUTORIAL FUNCTION
function closeTutorial() {
  const tutorialCard = document.querySelector('#tutorialCard');
  const screenCard = document.querySelector('#screenCard');
  
  tutorialCard.classList.remove('active');
  
  // Esperar transição antes de esconder
  setTimeout(() => {
    tutorialCard.style.display = 'none';
    screenCard.style.display = 'none';
  }, 300); // Match this with CSS transition duration
}

// EVENT LISTENERS (devem estar no escopo global)
document.addEventListener('DOMContentLoaded', function() {
  // Tutorial
  document.querySelector('#skipTutorial').addEventListener('click', closeTutorial);
  document.querySelector('#prevSlide').addEventListener('click', prevTutorialSlide);
  document.querySelector('#nextSlide').addEventListener('click', nextTutorialSlide);
  
  // Fechar tutorial ao clicar no overlay
  document.querySelector('#screenCard').addEventListener('click', function(e) {
    if (e.target === this) {
      closeTutorial();
    }
  });
  
  // Navegação por teclado
  document.addEventListener('keydown', function(e) {
    const tutorialCard = document.querySelector('#tutorialCard');
    if (tutorialCard && tutorialCard.style.display === 'flex') {
      if (e.key === 'ArrowLeft') {
        prevTutorialSlide();
      } else if (e.key === 'ArrowRight' || e.key === ' ') {
        nextTutorialSlide();
      } else if (e.key === 'Escape') {
        closeTutorial();
      }
    }
  });
});