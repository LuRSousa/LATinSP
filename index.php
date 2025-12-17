<!DOCTYPE html>
<html lang="pt-br">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <link rel="stylesheet" href="Util/Leaftlet/leaflet.css" />
    <link rel="stylesheet" href="Util/Style/style.css" />

    <link rel="shortcut icon" type="image/x-icon" href="Util/Images/LATinSP/miniIcon.png">
    <title>LATinSP - Mapa Interativo da Cultura Latina</title>
  </head>

  <body>
    <nav id="menu">
      <div class="logo">
        <img src="Util/Images/LATinSP/logo.png" alt="LATinSP - Mapa Interativo da Cultura Latina" srcset="">
      </div>
      
    </nav>

    <main>
      <div id="map" aria-describedby="map-description"></div>
      <div id="map-description" class="sr-only">
        Mapa interativo mostrando a localização de restaurantes latino-americanos em São Paulo. 
        Clique nos marcadores para ver informações sobre cada restaurante.
      </div>

      <article id="miniCard" role="dialog" aria-labelledby="miniCardTitle" aria-describedby="miniCardDesc"></article>

      <div id="screenCard"></div>

      <article id="bigCard" role="dialog" aria-labelledby="bigCardTitle" aria-describedby="bigCardDesc"></article>

      <article id="introCard" role="alertdialog" aria-labelledby="introTitle" aria-describedby="introDescription">
        <header class="introHeader" style="background-color: $contraste100;">
          <div class="introLogo">
            <img src="Util/Images/LATinSP/logo.png" alt="LATinSP - Mapa Interativo da Cultura Latina">
          </div>
        </header>

        <section class="introMain">
          <div class="introContent">
            <h2 id="introTitle">Bem-vindo ao LATinSP!</h2>
            <div id="introDescription">
              <p>Explore a riqueza da culinária latino-americana em São Paulo através do nosso mapa interativo.</p>
              <p>Descubra restaurantes autênticos de diversos países, filtre por suas preferências e encontre o lugar perfeito para sua próxima refeição.</p>
            </div>

            <div class="introFeatures">
              <div class="feature">
                <svg aria-hidden="true" width="40" height="40" fill="currentColor" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7ZM7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.88-2.88 7.19-5 9.88C9.92 16.21 7 11.85 7 9Z"></path>
                  <path d="M12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"></path>
                </svg>
                <span>Mapa interativo com localização precisa</span>
              </div>
              <div class="feature">
                <svg width="40" height="40" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M3 6v2h18V6H3Zm7 12h4v-2h-4v2Zm8-5H6v-2h12v2Z" clip-rule="evenodd"></path>
                </svg>
                <span>Filtros por país, preço e avaliação</span>
              </div>
              <div class="feature">
                <svg width="40" height="40" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2ZM9 4h2v5l-1-.75L9 9V4Zm9 16H6V4h1v9l3-2.25L13 13V4h5v16Z"></path>
                </svg>
                <span>Informações detalhadas de cada restaurante</span>
              </div>
            </div>
          </div>

          <div class="introActions">
            <button type="button" id="startTutorial" class="btnPrimary" aria-label="Iniciar tutorial passo a passo">
              Tutorial
            </button>
            <button type="button" id="skipIntro" class="btnSecondary" aria-label="Pular introdução e ir direto para o mapa" onclick="closeIntro()">
              Explorar Agora
            </button>
          </div>
        </section>

        <section class="footer" role="contentinfo" aria-label="Informações de progresso e copyright">
          <p>Alimentação do banco de dados ainda em progresso*</p>
          <p>2025 LATinSP - Todos os direitos reservados.</p>
        </section>
      </article>

      <button id="helpButton" class="helpFloating" aria-label="Abrir tutorial e ajuda">
        <img src="Util/Images/LATinSP/tinaHelp.png" alt="Ajuda e Tutorial">
      </button>

      <article id="tutorialCard" role="dialog" aria-labelledby="tutorialTitle" aria-modal="true">
          <header class="tutorialHeader">
            <button type="button" id="skipTutorial" class="btnText" aria-label="Pular tutorial">Pular Tutorial</button>
          </header>

          <section class="tutorialContent">
            <!-- Slide 1 -->
            <div class="tutorialSlide active" data-slide="1">
              <div class="tutorialText">
                <h4>Mapa Interativo</h4>
                <img class="tutorialImage" src="Util/Images/Tutorial/tina-tutorial1.png" alt="Ilustração da Tina se apresentando como guia do site" style="border: none; box-shadow: none;">
                <p>Olá, eu sou a Tina! Vou te guiar pelo nosso mapa interativo de restaurantes latino-americanos em São Paulo. Use o mouse ou toque na tela para navegar pelo mapa e descobrir diversas opções gastronômicas.</p>
              </div>
            </div>

            <!-- Slide 2 -->
            <div class="tutorialSlide" data-slide="2">
              <div class="tutorialText">
                <h4>Marcadores com Bandeiras</h4>
                <img class="tutorialImage" src="Util/Images/Tutorial/markers.png" alt="Exemplo dos diferentes marcadores por bandeiras no mapa">
                <p>Os marcadores indicam a culinária daquele restaurante e o marcador laranja representa restaurantes que possuem pratos de diversos países. Clique em qualquer marcador para ver mais detalhes.</p>
              </div>
            </div>

            <!-- Slide 3 -->
            <div class="tutorialSlide" data-slide="3">
              <div class="tutorialText">
                <h4>Card Rápido</h4>
                <img class="tutorialImage" src="Util/Images/Tutorial/miniCard.png" alt="Visualização do card pequeno com informações básicas do restaurante">
                <p>Ao clicar em um marcador, este card aparece com informações essenciais: nome, culinária, avaliação, preço e endereço. Use o botão 'Saiba Mais' para detalhes completos.</p>
              </div>
            </div>

            <!-- Slide 4 -->
            <div class="tutorialSlide" data-slide="4">
              <div class="tutorialText">
                <h4>Card Completo (Desktop)</h4>
                <img class="tutorialImage" src="Util/Images/Tutorial/bigCardD.png" alt="Visualização do card grande em computadores">
                <p>Na versão desktop, você vê todas as informações divididas em duas seções: informações detalhadas à esquerda e imagens à direita. Navegue entre as abas para ver fotos do restaurante e dos pratos.</p>
              </div>
            </div>

            <!-- Slide 5 -->
            <div class="tutorialSlide" data-slide="5">
              <div class="tutorialText">
                <h4>Card Completo (Mobile)</h4>
                <img class="tutorialImage" src="Util/Images/Tutorial/bigCardM.png" alt="Visualização do card grande em dispositivos móveis">
                <p>Em celulares, o card ocupa toda a tela. Use as abas no topo para alternar entre 'Informações' e 'Imagens'. Clique para ver fotos e conheça os pratos principais.</p>
              </div>
            </div>

            <!-- Slide 6 -->
            <div class="tutorialSlide" data-slide="6">
              <div class="tutorialText">
                <h4>Filtros Inteligentes</h4>
                <img class="tutorialImage" src="Util/Images/Tutorial/filters.png" alt="Painel de filtros do lado esquerdo da tela">
                <p>Encontre exatamente o que procura! Filtre por país, faixa de preço, avaliação mínima, características especiais e até restaurantes abertos no momento. Clique em 'Aplicar' para ver os resultados.</p>
              </div>
            </div>

            <!-- Slide 7 -->
            <div class="tutorialSlide" data-slide="7">
              <div class="tutorialText">
                <h4>Pronto para Explorar!</h4>
                <img class="tutorialImage" src="Util/Images/Tutorial/tina-tutorial2.png" alt="Ilustração da Tina dando as boas-vindas" style="border: none; box-shadow: none;">
                <p>Agora você está pronto para explorar a rica culinária latino-americana em São Paulo! Lembre-se: pode voltar a este tutorial a qualquer momento pelo ícone da Tina no canto inferior da tela. Bom apetite!</p>
              </div>
            </div>
          </section>

          <footer class="tutorialFooter">
            <button type="button" id="prevSlide" class="btnSecondary" aria-label="Voltar passo anterior">Anterior</button>
            <div class="tutorialProgress" aria-live="polite">
              <span class="currentSlide">1</span> / <span class="totalSlides">7</span>
            </div>
            <button type="button" id="nextSlide" class="btnPrimary" aria-label="Avançar para próximo passo">Próximo</button>
          </footer>
        </article>
      
      <nav id="filters" aria-label="Filtros de restaurantes">
        <div class="dropdownBar">
          <button class="dropdown" id="dropdownFilters" aria-expanded="false" aria-controls="filterForm" aria-label="Abrir menu de filtros">
            <div>
              <svg width="30" height="30" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M3 6v2h18V6H3Zm7 12h4v-2h-4v2Zm8-5H6v-2h12v2Z" clip-rule="evenodd"></path>
              </svg>

              Filtros
            </div>

            <svg class="arrow" width="30" height="30" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="transform: rotate(90deg);">
              <path d="M6.115 20.23 7.885 22l10-10-10-10-1.77 1.77 8.23 8.23-8.23 8.23Z"></path>
            </svg>
          </button>
        </div>

        <form class="filterForm" id="filterForm" aria-labelledby="dropdownFilters">
          <section class="filterSection" aria-labelledby="countries-heading">
            <div class="sectionTitle" onclick="dropdown(this)" role="button" tabindex="0" aria-expanded="false" aria-controls="countries-options" onkeypress="if(event.key === 'Enter') dropdown(this)">
              <div id="countries-heading">
                Países
              </div>

              <svg class="arrow" width="30" height="30" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="transform: rotate(90deg);">
                <path d="M6.115 20.23 7.885 22l10-10-10-10-1.77 1.77 8.23 8.23-8.23 8.23Z"></path>
              </svg>
            </div>
            
            <div class="filterOptions" id="countries-options" aria-labelledby="countries-heading">
              <label class="option"><input type="checkbox" name="country" value="1" aria-label="Filtrar restaurantes da Argentina"><span class="label">Argentina</span></label>
              <label class="option"><input type="checkbox" name="country" value="2" aria-label="Filtrar restaurantes da Bolívia"><span class="label">Bolívia</span></label>
              <label class="option"><input type="checkbox" name="country" value="3" aria-label="Filtrar restaurantes do Brasil"><span class="label">Brasil</span></label>
              <label class="option"><input type="checkbox" name="country" value="4" aria-label="Filtrar restaurantes do Chile"><span class="label">Chile</span></label>
              <label class="option"><input type="checkbox" name="country" value="5" aria-label="Filtrar restaurantes da Colômbia"><span class="label">Colômbia</span></label>
              <label class="option"><input type="checkbox" name="country" value="6" aria-label="Filtrar restaurantes da Costa Rica"><span class="label">Costa Rica</span></label>
              <label class="option"><input type="checkbox" name="country" value="7" aria-label="Filtrar restaurantes de Cuba"><span class="label">Cuba</span></label>
              <label class="option"><input type="checkbox" name="country" value="8" aria-label="Filtrar restaurantes do Equador"><span class="label">Equador</span></label>
              <label class="option"><input type="checkbox" name="country" value="9" aria-label="Filtrar restaurantes de El Salvador"><span class="label">El Salvador</span></label>
              <label class="option"><input type="checkbox" name="country" value="10" aria-label="Filtrar restaurantes da Guatemala"><span class="label">Guatemala</span></label>
              <label class="option"><input type="checkbox" name="country" value="11" aria-label="Filtrar restaurantes do Haiti"><span class="label">Haiti</span></label>
              <label class="option"><input type="checkbox" name="country" value="12" aria-label="Filtrar restaurantes de Honduras"><span class="label">Honduras</span></label>
              <label class="option"><input type="checkbox" name="country" value="13" aria-label="Filtrar restaurantes do México"><span class="label">México</span></label>
              <label class="option"><input type="checkbox" name="country" value="14" aria-label="Filtrar restaurantes da Nicarágua"><span class="label">Nicarágua</span></label>
              <label class="option"><input type="checkbox" name="country" value="15" aria-label="Filtrar restaurantes do Panamá"><span class="label">Panamá</span></label>
              <label class="option"><input type="checkbox" name="country" value="16" aria-label="Filtrar restaurantes do Paraguai"><span class="label">Paraguai</span></label>
              <label class="option"><input type="checkbox" name="country" value="17" aria-label="Filtrar restaurantes do Peru"><span class="label">Peru</span></label>
              <label class="option"><input type="checkbox" name="country" value="18" aria-label="Filtrar restaurantes de Porto Rico"><span class="label">Porto Rico</span></label>
              <label class="option"><input type="checkbox" name="country" value="19" aria-label="Filtrar restaurantes da Rep. Dominicana"><span class="label">Rep. Dominicana</span></label>
              <label class="option"><input type="checkbox" name="country" value="20" aria-label="Filtrar restaurantes do Uruguai"><span class="label">Uruguai</span></label>
              <label class="option"><input type="checkbox" name="country" value="21" aria-label="Filtrar restaurantes da Venezuela"><span class="label">Venezuela</span></label>
              <label class="option"><input type="checkbox" name="country" value="22" aria-label="Filtrar restaurantes gerais"><span class="label">Geral</span></label>
            </div>
          </section>

          <section class="filterSection"  aria-labelledby="price-heading">
            <div class="sectionTitle" onclick="dropdown(this)" role="button" tabindex="0" aria-expanded="false" aria-controls="price-options" onkeypress="if(event.key === 'Enter') dropdown(this)">
              <div id="price-heading">
                Preço:
                <span id="priceLabelMax" aria-live="polite">$</span>
              </div>

              <svg class="arrow" width="30" height="30" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="transform: rotate(90deg);">
                <path d="M6.115 20.23 7.885 22l10-10-10-10-1.77 1.77 8.23 8.23-8.23 8.23Z"></path>
              </svg>
            </div>
            
            <div class="filterOptions" id="price-options" aria-labelledby="price-heading">
              <p class="value" id="price-min">$</p>
              <input id="priceRange" type="range" name="price" min="0" max="3" value="0" step="1" aria-labelledby="price-heading" aria-valuetext="Todos os preços">
              <p class="value" id="price-max">$$$</p>
            </div>
          </section>

          <section class="filterSection" aria-labelledby="rating-heading">
            <div class="sectionTitle" onclick="dropdown(this)" role="button" tabindex="0" aria-expanded="false" aria-controls="rating-options" onkeypress="if(event.key === 'Enter') dropdown(this)">
              <div id="rating-heading">
                Avaliação:
                <span id="ratingLabelMax" aria-live="polite">
                  <svg focusable="false" width="20" height="20" fill="#e18943" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27Z"></path>
                  </svg>
                </span>
              </div>

              <svg class="arrow" width="30" height="30" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="transform: rotate(90deg);">
                <path d="M6.115 20.23 7.885 22l10-10-10-10-1.77 1.77 8.23 8.23-8.23 8.23Z"></path>
              </svg>
            </div>
            
            <div class="filterOptions" id="rating-options" aria-labelledby="rating-heading">
              <p class="value" id="rating-min">
                1
                <svg focusable="false" width="20" height="20" fill="#e18943" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27Z"></path>
                </svg>
              </p>
              <input id="ratingRange" type="range" name="price" min="1" max="5" value="0" step="1" aria-labelledby="rating-heading" aria-valuetext="Todas as avaliações">
              <p class="value" id="rating-max">
                5
                <svg focusable="false" width="20" height="20" fill="#e18943" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27Z"></path>
                </svg>
              </p>
            </div>
          </section>

          <section class="filterSection" aria-labelledby="tags-heading">
            <div class="sectionTitle" onclick="dropdown(this)" role="button" tabindex="0" aria-expanded="false" aria-controls="tags-options" onkeypress="if(event.key === 'Enter') dropdown(this)">
              <div id="tags-heading">
                Tags
              </div>

              <svg class="arrow" width="30" height="30" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="transform: rotate(90deg);">
                <path d="M6.115 20.23 7.885 22l10-10-10-10-1.77 1.77 8.23 8.23-8.23 8.23Z"></path>
              </svg>
            </div>
            
            <div class="filterOptions" id="tagFilters" aria-labelledby="tags-heading"></div>
          </section>

          <section class="filterSection" aria-labelledby="open-now-heading">            
            <div class="filterOptions" style="max-height: 700px; opacity: 1; padding: 8px 8px; justify-content: flex-start;" id="open-now-options">
              <label class="option" style="width: 60%;">
                <span class="label" id="open-now-heading" style="font-size: 1.2rem;">Aberto agora</span>  
                <input type="checkbox" name="isOpen" value="1" style="width: 18px; height: 18px;" aria-labelledby="open-now-heading">
              </label>
            </div>
          </section>

          <section class="btns">
            <button type="button" id="clearFilters" aria-label="Limpar todos os filtros">Limpar</button>
            <button type="button" id="applyFilters" aria-label="Aplicar filtros selecionados">Aplicar</button>
          </section>
        </form>
      </nav>
      
      <article id="alert" role="alertdialog" aria-labelledby="alertTitle" aria-describedby="alertDescription">
        <div class="top">
          <button class="close" type="button" tabindex="0" aria-label="Fechar alerta">
            <svg focusable="false" width="15" height="15" viewBox="5 5 14 14" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <title>Ícone de fechar</title>
              <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12Z"/>
            </svg>
          </button>
        </div>
        <div class="text">
          <h2 id="alertTitle">Oops!</h2>
          <div id="alertDescription">
            <p>Parece que não há nenhum restaurante com essas características.</p>
            <p>Tente selecionar outros filtros.</p>
          </div>
        </div>
        <button type="button" id="clearFiltersAlert" aria-label="Limpar filtros e fechar alerta">Limpar</button>
      </article>
    </main>

    <script src="Util/Leaftlet/leaflet.js"></script>

    <script src="Util/Script/introduction.js" defer></script>
    <script src="Util/Script/schedules.js" defer></script>
    <script src="Util/Script/renderMiniCard.js" defer></script>
    <script src="Util/Script/renderBigCard.js" defer></script>
    <script src="Util/Script/filters.js" defer></script>
    <script src="Util/Script/main.js" defer></script>
  </body>
</html>
