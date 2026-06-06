-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: sql106.infinityfree.com
-- Tempo de geração: 06/06/2026 às 18:17
-- Versão do servidor: 11.4.12-MariaDB
-- Versão do PHP: 7.2.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `if0_40409344_latinsp`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `countries`
--

CREATE TABLE `countries` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `demonym` varchar(100) DEFAULT NULL,
  `primary_color` char(7) DEFAULT NULL,
  `second_color` char(7) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `countries`
--

INSERT INTO `countries` (`id`, `name`, `demonym`, `primary_color`, `second_color`) VALUES
(1, 'Argentina', 'Argentina', '#74acdf', '#eaa70e'),
(2, 'Bolívia', 'Boliviana', '#d52b1e', '#007934'),
(3, 'Brasil', 'Brasileira', '#009440', '#ffcb00'),
(4, 'Chile', 'Chilena', '#da291c', '#0032a0'),
(5, 'Colômbia', 'Colombiana', '#ffcd00', '#003087'),
(6, 'Costa Rica', 'Costarriquenha', '#da291c', '#001489'),
(7, 'Cuba', 'Cubana', '#002a8f', '#cb1515'),
(8, 'Equador', 'Equatoriana', '#ffdd00', '#034ea2'),
(9, 'El Salvador', 'Salvadorenha', '#0047ab', '#0073cf'),
(10, 'Guatemala', 'Guatemalteca', '#4997d0', '#0073cf'),
(11, 'Haiti', 'Haitiana', '#00209f', '#d21034'),
(12, 'Honduras', 'Hondurenha', '#00bce4', '#0033a0'),
(13, 'México', 'Mexicana', '#006847', '#ce1126'),
(14, 'Nicarágua', 'Nicaraguense', '#0067c6', '#003893'),
(15, 'Panamá', 'Panamenha', '#da121a', '#072357'),
(16, 'Paraguai', 'Paraguaia', '#d52b1e', '#0038a8'),
(17, 'Peru', 'Peruana', '#d91023', '#003893'),
(18, 'Porto Rico', 'Portorriquenha', '#ee0000', '#0044ff'),
(19, 'República Dominicana', 'Dominicana', '#ce1126', '#002d62'),
(20, 'Uruguai', 'Uruguaia', '#0038a8', '#ffcc00'),
(21, 'Venezuela', 'Venezuelana', '#ffcc00', '#cf142b'),
(22, 'Geral', 'Geral', '#FF8C42', '#E67329');

-- --------------------------------------------------------

--
-- Estrutura para tabela `restaurants`
--

CREATE TABLE `restaurants` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `country_id` int(11) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone` varchar(30) NOT NULL,
  `description` mediumtext DEFAULT NULL,
  `site` varchar(255) DEFAULT NULL,
  `rating` float DEFAULT NULL,
  `lat` decimal(10,7) NOT NULL,
  `lon` decimal(10,7) NOT NULL,
  `price` varchar(255) DEFAULT NULL,
  `dishes` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `restaurants`
--

INSERT INTO `restaurants` (`id`, `name`, `country_id`, `address`, `phone`, `description`, `site`, `rating`, `lat`, `lon`, `price`, `dishes`) VALUES
(1, 'Azulejo', 3, 'R. Caraíbas, 871 - Perdizes', '(11) 3804-7143', 'Happy Hour, Opção Vegetariana', 'https://restauranteazulejo.com.br', 4.5, '-23.5351056', '-46.6841000', '$', 'Queijo Coalho e Banana da Terra, Torresmo Crocante, Dadinho de Tapioca, Macaxeira Metida à Besta, Siri no Molho de Coco, Bolinho de Feijoada'),
(2, 'Mexicaníssimo', 13, 'Av. Goiás, 503 - São Caetano', '(11) 4318-0200', 'Ótimos Coquetéis, Opção Vegetariana', 'https://mexicanissimo.com.br/', 4.8, '-23.5817410', '-46.5224352', '$$', 'Pescadilhas, Quesadilha, Tostada, Flautas, Taco de Carnitas, Molcajete'),
(3, 'La Guapa', 1, 'R. Itapura, 1392 - Tatuapé', '(11) 2091-5528', 'Artesanais, Produtos Exclusivos', 'https://laguapa.com.br/', 4.5, '-23.5507839', '-46.5651343', '$', 'Humita, Salteña, Amarrito, Planteña, Pucacapa, Julieta'),
(4, 'Patacón Pisao', 5, 'R. Cap. Macedo, 504 - Vila Clementino', '(11) 93386-9422', 'Opção Vegetariana, Cadeirinhas Altas', 'https://instagram.com/pataconpisaobr/', 4.7, '-23.5928144', '-46.6445307', '$', 'Patacón, Empanadas Recheadas, Bandeja Paisa, Arroz Atolado, Aborrajados de Pescado, Limonada de Coco'),
(5, 'Rancho dos Peruanos', 17, 'R. da Mooca, 3475 - Mooca', '(11) 95245-3298', 'Ótimos Coquetéis, Música ao Vivo', 'https://ranchodosperuanos.com.br/', 5, '-23.5577531', '-46.5917556', '$', 'Ceviche Mixto, Ceviche de Pescado, Ceviche de Salmón, Ceviche de Camarón, Pollo Grillado, Arroz con Mariscos'),
(6, 'La Peruana Cevicheria', 17, 'Ala. Campinas, 1357 - Jardim Paulista', '(11) 5990-0623', 'Mesas Externas, Opção Vegetariana', 'https://menu.getinapp.com.br/pt-br/5d6NOrkV/menus/g1gEpEkw', 4.6, '-23.5716018', '-46.6587376', '$', 'Lulitas al Carbón, Ceviche Apaltado, Arroz Chaufa Escondido, Tacu Tacu de la Isla, Picarones, Semifredo de Chocolate '),
(7, 'O Boteco Argentino', 1, 'Av. Susana, 146 - Vila Gumercindo', '(11) 4301-1361', 'Happy Hour, Wi-Fi', 'https://obotecoargentino.com.br/', 4.5, '-23.6044728', '-46.6203857', '$', 'Empanada de Carne, Empanada de Frango, Empanada de Queijo, Churros, Choripan, Alfajor'),
(8, 'Bracia Parrilla', 1, 'R. Azevedo Soares, 1008 - Tatuapé', '(11) 2227-5510', 'Espaço para Eventos, Música ao Vivo', 'http://www.braciaparrilla.com.br/', 4.6, '-23.5490959', '-46.5667373', '$$', 'Bife Parrillero, Brownie com Sorvete, Tomahawk Steak, Espeto, Picanha na Parrilla, Vacio'),
(9, 'Che Bárbaro', 1, 'R. Harmonia, 277 - Sumarezinho', '(11) 3032-0223', 'Mesas Externas, Ótimos Coquetéis', 'https://chebarbaro.com.br/wp-content/uploads/menu_che-2.pdf', 4.6, '-23.5553569', '-46.6879269', '$$', 'Biscuit, Carré de Cordeiro, Papa Quimérica, Ravioli Frito, Salsicha Parrilleira, Vacio'),
(10, 'Sabores de Mi Tierra', 2, 'Calçada Das Azaléias, 15 - Alphaville', '(11) 95589-8944', 'Reserva, Mesas na Cobertura', 'https://www.instagram.com/saboresdemitierra_22/', 4.7, '-23.4961699', '-46.8490774', '$', 'Sillp\'ancho, Sopa de Maní, Salteña de Carne, Majadito, Picante de Pollo, Pique a Lo Macho'),
(11, 'Jardín Paceño', 2, 'R. Dr. Ornelas, 110 - Pari', '(11) 96385-6526', 'Bebidas Tradicionais, Wi-Fi', 'https://www.tiktok.com/@jardinpaceorestau', 4.5, '-23.5318139', '-46.6174743', '$', 'Pique Macho, Sillp\'ancho, Pescado Frito, Sopa de Quinua, Chicharrón de Cerdo, Costilla de Res'),
(12, 'Preto Cozinha', 3, 'R. Fradique Coutinho, 276 - Pinheiros', '(11) 99114-3539', 'Reserva, Mesas Externas', 'https://www.getinapp.com.br/sao-paulo/preto-cozinha', 4, '-23.5639981', '-46.6851865', '$$', 'Arroz de Xinxim, Baião de Camarão, Peixe ao Molho de Moqueca, Feijoada de Frutos do Mar, Ragu com Polenta, Pastel de Arraia'),
(13, 'Jiquitaia', 3, 'R. Coronel Oscar Porto, 808 - Paraíso', '(11) 3051-5638', 'Espaço para Eventos, Opção Vegana', 'https://jiquitaia.com.br/', 4.6, '-23.5759956', '-46.6453988', '$', 'Arroz de Pato no Tucupi e Magret, Bochecha de Porco Grelhada, Brigadeiro com Farofa de Pé de Moleque, Coxinha Caipira, Quiabada com Camarão, Torresmo'),
(14, 'Banzeiro', 3, 'R. Tabapuã, 830 - Itaim Bibi', '(11) 2501-4777', 'Mesas Externas, Espaço para Eventos', 'https://grupobanzeiro.com.br/banzeiro-sao-paulo/', 4.7, '-23.5834910', '-46.6778685', '$$', 'Arroz Caboclo com Camarão, Bao de Pirarucu, Croquete de Tambaqui, Descubramanaus, Matrinxã, Tagliatelle com Carne Seca'),
(15, 'El Guatón', 4, 'R. Artur De Azevedo, 906 - Pinheiros', '(11) 3807-9647', 'Ótimos Coquetéis, Opção Vegana', 'https://www.instagram.com/elguatonrestaurante/?hl=en', 4.5, '-23.5616273', '-46.6804633', '$', 'Ceviche de Pescada Branca, Empanadas ao Forno, Empanadas Fritas, Humitas, Salada Chilena, Torta Milhojas'),
(16, 'Dona Luz Empanadas', 4, 'R. Dos Sorocabanos, 315 - Ipiranga', '(11) 96371-1768', 'Mesas Externas, Ótimos Coquetéis', 'https://instagram.com/dona_luz_empanadas/', 4.6, '-23.5797013', '-46.6072155', '$', 'Batatas Rústicas, Empanadas, Empanada de Doce de Leite, Hambúrguer, Pastel de Choclo, Torta Milhojas'),
(17, 'La Empanada', 4, 'Av. Jamaris, 505 - Moema', '(11) 5052-8681', 'Mesas Externas, Wi-Fi', 'https://drive.google.com/file/d/1aOBAv9DOqqpFDykgNsCIR0VvIM6BiNo6/view', 4.7, '-23.6023664', '-46.6577892', '$', 'Empanadas Salgadas, Empanadas Doces, Empanada Romeu e Julieta, Mix de Folhas Verdes, Café, Torta Milhojas'),
(18, 'Café Colombiano', 5, 'Al. Eduardo Prado, 493 - Campos Elíseos', '(11) 3331-5689', 'Espaço para Eventos, Música ao Vivo', 'https://www.instagram.com/cafecolombiano/', 4.6, '-23.5308031', '-46.6496405', '$', 'Arepa com Queijo, Bandeja Paisa, Buñuelo, Capuccino, Empanadas, Salada Juliana'),
(19, 'Macondo Raízes Colombianas', 5, 'R. Cardeal Arcoverde, 1361 - Pinheiros', '(11) 98616-4184', 'Espaço para Eventos, Ótimos Coquetéis', 'https://instagram.com/macondo_raizes_colombianas/', 4.5, '-23.5595655', '-46.6849938', '$', 'Patacon, Arepas, Empanada Colombiana, Picada Colombiana, Ceviche Clássico, Limonada de Coco'),
(20, 'La Candelaria', 5, 'R. Medeiros De Albuquerque, 120 - Jardim Das Bandeiras', 'Sem telefone', 'Mesas Externas, Ótimos Coquetéis', 'https://www.instagram.com/lacandelaria_becobatman/', 4.5, '-23.5563155', '-46.6860142', '$', 'Arepas Recheadas, Banana da Terra Frita, Empanadas, Limonada de Coco, Obleas, Patacon'),
(21, 'Sí Señor', 13, 'R. Azevedo Soares, 1015 - Vl. Gomes Cardim', '(11) 2659-1106', 'Ótimos Coquetéis, Opção Vegana', 'sisenor.com.br', 4.4, '-23.5487874', '-46.5668044', '$$', 'Chili con Carne, Fajitas, Guaca Salad, Nachos, Quesadillas, Tacos'),
(22, 'Nuevo México Bar', 13, 'R. Alfredo Pujol, 668 - Santana', '(11) 2368-4253', 'Ótimos Coquetéis, Opção Vegetariana', 'http://nuevomexico.com.br/', 4.4, '-23.4999644', '-46.6317734', '$', 'Camarones Tacos, Chimichanga com Sorvete, Enchiladas, Nachos, Parrilla Mexicana, Tacos'),
(23, 'Waska', 17, 'R. Padre Carvalho, 46 - Alto De Pinheiros', '(11) 3814-9899', 'Espaço para Eventos, Opção Vegana', 'https://instagram.com/waska.barepetiscos/', 4.8, '-23.5599631', '-46.6962993', '$', 'Anticucho, Arroz com Mariscos, Ceviche Clássico, Lomo Saltado, Patacones, Tacos de Adobo'),
(24, 'Punto Peru', 17, 'R. Toledo Barbosa, 401 - Belenzinho', '(11) 2796-5515', 'Reserva, Opção Vegetariana', 'https://instagram.com/punto.peru/', 4.9, '-23.5413288', '-46.5867810', '$', 'Arroz Chaufa de Carne, Causa Rallena de Camarón, Lomo a Lo Pobre, Lomo Saltado, Salchipapa Especial, Tallarin Saltado de Carne'),
(25, 'Quinoa Restobar', 17, 'R. Anhaia, 1034 - Bom Retiro', '(11) 91203-2660', 'Mesas Externas, Opção Vegana', 'https://quinoarestobar.com.br/', 4.8, '-23.5212950', '-46.6464314', '$', 'Arroz Pollito Nikkei, Ceviche Frutos do Mar dos Texturas, Ent Maki em Trio de Ceviches, Fettuccine a La Huancaina, Leche Assada, Pulpito Parrilero'),
(26, 'El Tranvia', 20, 'R. Itaguaba, 270 - Santa Cecilia', '(11) 3664-8313', 'Happy Hour, Espaço para Eventos', 'http://eltranvia.com.br/', 4.6, '-23.5421955', '-46.6635838', '$$', 'Bife Ancho, Bife El Tranvia, Ensalada La Barra, Galeto Desossado com Creme de Milho, Papas al Plomo, Torta de Alfajor'),
(27, 'El Punto Uruguayo', 20, 'R. Dr. César, 1180 - Santana', '(11) 92040-0416', 'Wi-Fi, Cardápio Infantil', 'https://instagram.com/uyparrilla/', 5, '-23.5020269', '-46.6366087', '$$', 'Bife de Chorizo, Empanadas, Flan, Ojo de Bife Black Angus, Panqueca com Doce de Leite, Tortilla de Papa'),
(28, 'Parrillada Fuego Celeste', 20, 'R. Dr. Roberto Kikawa, 157 - Pinheiros', '(11) 3032-0050', 'Reserva, Espaço para Eventos', 'http://fuegoceleste.com.br/', 4.8, '-23.5627522', '-46.6802957', '$$', 'Assado de Tira, Empanadas, Linguiça Uruguaya, Panqueca Caramelizada com Sorvete, Pimentão Assado, Provoleta'),
(29, 'Aromas Café & Cake', 21, 'R. Caraíbas, 64 - Pompeia', '(11) 95978-6122', 'Espaço para Eventos, Encomendas', 'https://www.instagram.com/aromascafe.64/', 4.7, '-23.5240129', '-46.6813842', '$', 'Arepas, Bolos, Cachapa Venezuelana, Cafés, Megasandwich, Pabellón Criollo Venezuelano'),
(30, 'La Perla', 21, 'R. Coronel Melo De Oliveira, 651 - Pompeia', '(11) 99491-8256', 'Happy Hour, Espaço para Eventos', 'https://instagram.com/laperlabyarepaspicatta/', 5, '-23.5316881', '-46.6872684', '$', 'Cachapa, Patacón, Arepas Recheadas, Arepas Fritas, Platano Real, Tequeños'),
(31, 'Urbanika Gastronomia Latina', 22, 'R. França Pinto, 381 - Vila Mariana', '(11) 98551-9458', 'Happy Hour, Espaço para Eventos', 'https://acrobat.adobe.com/id/urn:aaid:sc:VA6C2:f6632d6d-1d27-46a1-9feb-d170de5f8abc', 4.6, '-23.5867469', '-46.6396364', '$', 'Pabellón Criollo, Arroz con Pollo, Nachos, Patacón, Bistec de Palomilla, Arepa Recheada'),
(32, 'Restaurante Sabor Latino', 22, 'R. Amaro Cavalheiro, 348 - Pinheiros', '(11) 97996-0069', 'Ótimos Coquetéis, Cadeirinhas Altas', 'http://saborlatino.menudino.com/', 4.4, '-23.5619907', '-46.6991327', '$', 'Arroz do Sol, Bolo 3 Leches, Chicha Morada, Moqueca de Camarão, Risoto de Camarão, Ceviche'),
(33, 'Suri Ceviche Bar', 22, 'R. Costa Carvalho, 72 - Pinheiros', '(11) 3034-1763', 'Mesas Externas, Opção Vegana', 'https://www.suri.com.br/menu', 4.5, '-23.5603897', '-46.6990714', '$$', 'Ceviche de La Casa, Ceviche Mixto, Parrillada Atamar, Patacones, Pulled Pork, Torta de Café'),
(34, 'Chévere Cozinha e Bar', 22, 'R. Sousa Lima, 321 - Barra Funda', 'Sem telefone', 'Mesas Externas, Ótimos Coquetéis', 'https://instagram.com/cheverecozinhaebar', 4.4, '-23.5298770', '-46.6554076', '$', 'Empanadas, Milanesa Napolitana, Sanduíche de Chola, Sanduíche de Costela, Taco de Lengua, Tequeños');

-- --------------------------------------------------------

--
-- Estrutura para tabela `restaurants_schedule`
--

CREATE TABLE `restaurants_schedule` (
  `id` int(11) NOT NULL,
  `restaurant_id` int(11) NOT NULL,
  `week_day` varchar(10) NOT NULL,
  `open` time NOT NULL,
  `close` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `restaurants_schedule`
--

INSERT INTO `restaurants_schedule` (`id`, `restaurant_id`, `week_day`, `open`, `close`) VALUES
(15, 2, 'Sexta', '12:00:00', '15:00:00'),
(16, 2, 'Sexta', '18:00:00', '00:00:00'),
(17, 2, 'Sábado', '12:00:00', '15:00:00'),
(18, 2, 'Sábado', '18:00:00', '00:00:00'),
(19, 2, 'Domingo', '12:00:00', '22:00:00'),
(20, 2, 'Segunda', '12:00:00', '15:00:00'),
(21, 2, 'Segunda', '18:00:00', '23:30:00'),
(22, 2, 'Terça', '12:00:00', '15:00:00'),
(23, 2, 'Terça', '18:00:00', '23:30:00'),
(24, 2, 'Quarta', '12:00:00', '15:00:00'),
(25, 2, 'Quarta', '18:00:00', '23:30:00'),
(26, 2, 'Quinta', '12:00:00', '15:00:00'),
(27, 2, 'Quinta', '18:00:00', '23:30:00'),
(28, 1, 'Sexta', '11:30:00', '23:00:00'),
(29, 1, 'Sábado', '11:30:00', '23:00:00'),
(30, 1, 'Domingo', '11:30:00', '18:00:00'),
(31, 1, 'Segunda', '11:30:00', '16:00:00'),
(32, 1, 'Terça', '11:30:00', '23:00:00'),
(33, 1, 'Quarta', '11:30:00', '23:00:00'),
(34, 1, 'Quinta', '11:30:00', '23:00:00'),
(35, 3, 'Sexta', '10:00:00', '23:00:00'),
(36, 3, 'Sábado', '12:00:00', '23:00:00'),
(37, 3, 'Domingo', '12:00:00', '22:00:00'),
(38, 3, 'Segunda', '10:00:00', '22:00:00'),
(39, 3, 'Terça', '10:00:00', '22:00:00'),
(40, 3, 'Quarta', '10:00:00', '22:00:00'),
(41, 3, 'Quinta', '10:00:00', '23:00:00'),
(42, 4, 'Sexta', '12:00:00', '22:00:00'),
(43, 4, 'Sábado', '12:00:00', '22:00:00'),
(44, 4, 'Domingo', '12:00:00', '17:00:00'),
(45, 4, 'Terça', '12:00:00', '22:00:00'),
(46, 4, 'Quarta', '12:00:00', '22:00:00'),
(47, 4, 'Quinta', '12:00:00', '22:00:00'),
(48, 4, 'Segunda', '00:00:00', '00:00:00'),
(49, 5, 'Sexta', '12:00:00', '22:00:00'),
(50, 5, 'Sábado', '12:00:00', '22:00:00'),
(51, 5, 'Domingo', '12:00:00', '21:00:00'),
(52, 5, 'Segunda', '12:00:00', '22:00:00'),
(53, 5, 'Terça', '12:00:00', '22:00:00'),
(54, 5, 'Quarta', '12:00:00', '22:00:00'),
(55, 5, 'Quinta', '12:00:00', '22:00:00'),
(56, 6, 'Sexta', '12:00:00', '15:00:00'),
(57, 6, 'Sexta', '19:00:00', '23:00:00'),
(58, 6, 'Sábado', '12:00:00', '16:30:00'),
(59, 6, 'Sábado', '19:00:00', '23:00:00'),
(60, 6, 'Domingo', '12:00:00', '17:00:00'),
(61, 6, 'Segunda', '00:00:00', '00:00:00'),
(62, 6, 'Terça', '19:00:00', '23:00:00'),
(63, 6, 'Quarta', '19:00:00', '23:00:00'),
(64, 6, 'Quinta', '19:00:00', '23:00:00'),
(65, 7, 'Sexta', '17:00:00', '23:00:00'),
(66, 7, 'Sábado', '12:00:00', '15:00:00'),
(67, 7, 'Sábado', '17:00:00', '23:00:00'),
(68, 7, 'Domingo', '00:00:00', '00:00:00'),
(69, 7, 'Segunda', '00:00:00', '00:00:00'),
(70, 7, 'Terça', '17:00:00', '22:00:00'),
(71, 7, 'Quarta', '17:00:00', '22:00:00'),
(72, 7, 'Quinta', '17:00:00', '22:00:00'),
(73, 8, 'Sexta', '12:00:00', '23:00:00'),
(74, 8, 'Sábado', '12:00:00', '23:00:00'),
(75, 8, 'Domingo', '12:00:00', '17:00:00'),
(76, 8, 'Segunda', '12:00:00', '17:00:00'),
(77, 8, 'Terça', '12:00:00', '23:00:00'),
(78, 8, 'Quarta', '12:00:00', '23:00:00'),
(79, 8, 'Quinta', '12:00:00', '23:00:00'),
(80, 9, 'Domingo', '12:00:00', '18:00:00'),
(81, 9, 'Segunda', '12:00:00', '23:00:00'),
(82, 9, 'Terça', '12:00:00', '23:00:00'),
(83, 9, 'Quarta', '12:00:00', '23:00:00'),
(84, 9, 'Quinta', '12:00:00', '23:00:00'),
(85, 9, 'Sexta', '12:00:00', '23:00:00'),
(86, 9, 'Sábado', '12:00:00', '23:00:00'),
(87, 10, 'Domingo', '10:00:00', '17:00:00'),
(88, 10, 'Sexta', '10:00:00', '15:00:00'),
(89, 10, 'Sábado', '10:00:00', '17:00:00'),
(90, 11, 'Domingo', '10:00:00', '16:00:00'),
(91, 11, 'Segunda', '06:00:00', '14:30:00'),
(92, 11, 'Terça', '06:00:00', '14:30:00'),
(93, 11, 'Quarta', '06:00:00', '14:30:00'),
(94, 11, 'Quinta', '06:00:00', '14:30:00'),
(95, 11, 'Sábado', '06:00:00', '16:00:00'),
(96, 12, 'Domingo', '11:30:00', '20:00:00'),
(97, 12, 'Segunda', '12:00:00', '23:00:00'),
(98, 12, 'Terça', '12:00:00', '23:00:00'),
(99, 12, 'Quarta', '12:00:00', '23:00:00'),
(100, 12, 'Quinta', '12:00:00', '23:00:00'),
(101, 12, 'Sexta', '12:00:00', '00:00:00'),
(102, 12, 'Sábado', '12:00:00', '00:00:00'),
(103, 13, 'Domingo', '12:00:00', '16:00:00'),
(104, 13, 'Terça', '12:00:00', '15:00:00'),
(105, 13, 'Terça', '19:00:00', '22:30:00'),
(106, 13, 'Quarta', '12:00:00', '15:00:00'),
(107, 13, 'Quarta', '19:00:00', '22:30:00'),
(108, 13, 'Quinta', '12:00:00', '15:00:00'),
(109, 13, 'Quinta', '19:00:00', '22:30:00'),
(110, 13, 'Sexta', '12:00:00', '16:00:00'),
(111, 13, 'Sexta', '19:00:00', '22:30:00'),
(112, 13, 'Sábado', '12:00:00', '16:00:00'),
(113, 13, 'Sábado', '19:00:00', '22:30:00'),
(114, 14, 'Domingo', '12:00:00', '16:30:00'),
(115, 14, 'Segunda', '12:00:00', '15:30:00'),
(116, 14, 'Segunda', '19:00:00', '23:30:00'),
(117, 14, 'Terça', '12:00:00', '15:30:00'),
(118, 14, 'Terça', '19:00:00', '23:30:00'),
(119, 14, 'Quarta', '12:00:00', '15:30:00'),
(120, 14, 'Quarta', '19:00:00', '23:30:00'),
(121, 14, 'Quinta', '12:00:00', '15:30:00'),
(122, 14, 'Quinta', '19:00:00', '23:30:00'),
(123, 14, 'Sexta', '12:00:00', '15:30:00'),
(124, 14, 'Sexta', '19:00:00', '23:30:00'),
(125, 14, 'Sábado', '12:00:00', '16:30:00'),
(126, 14, 'Sábado', '19:00:00', '00:00:00'),
(127, 15, 'Segunda', '11:30:00', '23:55:00'),
(128, 15, 'Terça', '11:30:00', '23:55:00'),
(129, 15, 'Quarta', '11:30:00', '23:55:00'),
(130, 15, 'Quinta', '11:30:00', '23:55:00'),
(131, 15, 'Sexta', '11:30:00', '23:55:00'),
(132, 15, 'Sábado', '12:00:00', '23:55:00'),
(133, 16, 'Domingo', '12:00:00', '22:00:00'),
(134, 16, 'Terça', '12:00:00', '22:30:00'),
(135, 16, 'Quarta', '12:00:00', '22:30:00'),
(136, 16, 'Quinta', '12:00:00', '22:30:00'),
(137, 16, 'Sexta', '12:00:00', '22:30:00'),
(138, 16, 'Sábado', '12:00:00', '22:30:00'),
(139, 17, 'Domingo', '12:00:00', '20:00:00'),
(140, 17, 'Segunda', '10:00:00', '21:00:00'),
(141, 17, 'Terça', '10:00:00', '21:00:00'),
(142, 17, 'Quarta', '10:00:00', '21:00:00'),
(143, 17, 'Quinta', '10:00:00', '21:00:00'),
(144, 17, 'Sexta', '10:00:00', '21:00:00'),
(145, 17, 'Sábado', '10:00:00', '21:00:00'),
(146, 18, 'Domingo', '09:00:00', '18:00:00'),
(147, 18, 'Segunda', '12:00:00', '20:00:00'),
(148, 18, 'Terça', '12:00:00', '20:00:00'),
(149, 18, 'Quarta', '12:00:00', '20:00:00'),
(150, 18, 'Quinta', '12:00:00', '20:00:00'),
(151, 18, 'Sexta', '12:00:00', '20:00:00'),
(152, 18, 'Sábado', '09:00:00', '20:00:00'),
(153, 19, 'Domingo', '12:00:00', '18:00:00'),
(154, 19, 'Quarta', '12:00:00', '16:00:00'),
(155, 19, 'Quarta', '17:00:00', '22:00:00'),
(156, 19, 'Quinta', '12:00:00', '16:00:00'),
(157, 19, 'Quinta', '17:00:00', '22:00:00'),
(158, 19, 'Sexta', '12:00:00', '16:00:00'),
(159, 19, 'Sexta', '17:00:00', '22:00:00'),
(160, 19, 'Sábado', '12:00:00', '22:00:00'),
(161, 20, 'Domingo', '13:00:00', '19:30:00'),
(162, 20, 'Quinta', '12:00:00', '19:00:00'),
(163, 20, 'Sexta', '12:00:00', '19:00:00'),
(164, 20, 'Sábado', '12:00:00', '20:00:00'),
(165, 21, 'Domingo', '12:00:00', '17:00:00'),
(166, 21, 'Segunda', '12:00:00', '00:00:00'),
(167, 21, 'Terça', '12:00:00', '00:00:00'),
(168, 21, 'Quarta', '12:00:00', '00:00:00'),
(169, 21, 'Quinta', '12:00:00', '00:00:00'),
(170, 21, 'Sexta', '12:00:00', '00:00:00'),
(171, 21, 'Sábado', '12:00:00', '00:00:00'),
(172, 22, 'Domingo', '13:00:00', '21:30:00'),
(173, 22, 'Segunda', '12:00:00', '23:30:00'),
(174, 22, 'Terça', '12:00:00', '23:30:00'),
(175, 22, 'Quarta', '12:00:00', '23:30:00'),
(176, 22, 'Quinta', '12:00:00', '23:30:00'),
(177, 22, 'Sexta', '12:00:00', '23:30:00'),
(178, 22, 'Sábado', '12:00:00', '23:30:00'),
(179, 23, 'Domingo', '12:00:00', '18:00:00'),
(180, 23, 'Terça', '17:00:00', '23:30:00'),
(181, 23, 'Quarta', '17:00:00', '23:30:00'),
(182, 23, 'Quinta', '17:00:00', '23:30:00'),
(183, 23, 'Sexta', '17:00:00', '23:30:00'),
(184, 23, 'Sábado', '12:00:00', '23:30:00'),
(185, 24, 'Domingo', '12:00:00', '17:00:00'),
(186, 24, 'Terça', '11:00:00', '17:00:00'),
(187, 24, 'Quarta', '11:00:00', '22:00:00'),
(188, 24, 'Quinta', '11:00:00', '22:00:00'),
(189, 24, 'Sexta', '11:00:00', '22:00:00'),
(190, 24, 'Sábado', '11:00:00', '22:00:00'),
(191, 25, 'Domingo', '12:00:00', '17:00:00'),
(192, 25, 'Terça', '12:00:00', '15:30:00'),
(193, 25, 'Terça', '18:30:00', '22:00:00'),
(194, 25, 'Quarta', '12:00:00', '15:30:00'),
(195, 25, 'Quarta', '18:30:00', '22:00:00'),
(196, 25, 'Quinta', '12:00:00', '15:30:00'),
(197, 25, 'Quinta', '19:00:00', '22:00:00'),
(198, 25, 'Sexta', '12:00:00', '15:30:00'),
(199, 25, 'Sexta', '18:30:00', '22:00:00'),
(200, 25, 'Sábado', '12:00:00', '17:00:00'),
(201, 25, 'Sábado', '18:30:00', '22:00:00'),
(202, 26, 'Domingo', '12:00:00', '17:00:00'),
(203, 26, 'Segunda', '12:00:00', '00:00:00'),
(204, 26, 'Terça', '12:00:00', '00:00:00'),
(205, 26, 'Quarta', '12:00:00', '00:00:00'),
(206, 26, 'Quinta', '12:00:00', '00:00:00'),
(207, 26, 'Sexta', '12:00:00', '00:00:00'),
(208, 26, 'Sábado', '12:00:00', '00:00:00'),
(209, 27, 'Domingo', '12:00:00', '16:00:00'),
(210, 27, 'Segunda', '11:45:00', '15:00:00'),
(211, 27, 'Segunda', '18:30:00', '22:00:00'),
(212, 27, 'Terça', '11:45:00', '15:00:00'),
(213, 27, 'Terça', '18:30:00', '22:00:00'),
(214, 27, 'Quarta', '11:45:00', '15:00:00'),
(215, 27, 'Quarta', '18:30:00', '22:00:00'),
(216, 27, 'Quinta', '11:45:00', '15:00:00'),
(217, 27, 'Quinta', '18:30:00', '22:00:00'),
(218, 27, 'Sexta', '11:45:00', '15:00:00'),
(219, 27, 'Sexta', '18:30:00', '22:00:00'),
(220, 27, 'Sábado', '12:00:00', '23:00:00'),
(221, 28, 'Domingo', '12:00:00', '16:00:00'),
(222, 28, 'Terça', '12:00:00', '15:00:00'),
(223, 28, 'Terça', '18:30:00', '22:00:00'),
(224, 28, 'Quarta', '12:00:00', '15:00:00'),
(225, 28, 'Quarta', '18:30:00', '22:00:00'),
(226, 28, 'Quinta', '12:00:00', '15:00:00'),
(227, 28, 'Quinta', '18:30:00', '22:00:00'),
(228, 28, 'Sexta', '12:00:00', '15:00:00'),
(229, 28, 'Sexta', '18:30:00', '22:00:00'),
(230, 28, 'Sábado', '12:00:00', '22:00:00'),
(231, 29, 'Segunda', '11:30:00', '17:00:00'),
(232, 29, 'Terça', '11:30:00', '17:00:00'),
(233, 29, 'Quarta', '11:30:00', '17:00:00'),
(234, 29, 'Quinta', '11:30:00', '17:00:00'),
(235, 29, 'Sexta', '11:30:00', '17:00:00'),
(236, 29, 'Sábado', '12:05:00', '17:00:00'),
(237, 30, 'Domingo', '12:00:00', '18:00:00'),
(238, 30, 'Terça', '16:00:00', '23:00:00'),
(239, 30, 'Quarta', '16:00:00', '23:00:00'),
(240, 30, 'Quinta', '12:00:00', '23:00:00'),
(241, 30, 'Sexta', '12:00:00', '23:00:00'),
(242, 30, 'Sábado', '12:00:00', '23:00:00'),
(243, 31, 'Domingo', '12:00:00', '16:00:00'),
(244, 31, 'Segunda', '11:30:00', '15:30:00'),
(245, 31, 'Terça', '11:30:00', '15:30:00'),
(246, 31, 'Quarta', '11:30:00', '15:30:00'),
(247, 31, 'Quinta', '11:30:00', '15:30:00'),
(248, 31, 'Sexta', '11:30:00', '15:30:00'),
(249, 31, 'Sábado', '12:00:00', '16:00:00'),
(250, 32, 'Segunda', '12:00:00', '15:00:00'),
(251, 32, 'Terça', '12:00:00', '15:00:00'),
(252, 32, 'Quarta', '12:00:00', '15:00:00'),
(253, 32, 'Quinta', '12:00:00', '15:00:00'),
(254, 32, 'Sexta', '12:00:00', '15:00:00'),
(255, 33, 'Domingo', '12:00:00', '17:00:00'),
(256, 33, 'Terça', '12:00:00', '15:00:00'),
(257, 33, 'Terça', '19:00:00', '23:00:00'),
(258, 33, 'Quarta', '12:00:00', '15:00:00'),
(259, 33, 'Quarta', '19:00:00', '23:00:00'),
(260, 33, 'Quinta', '12:00:00', '15:00:00'),
(261, 33, 'Quinta', '19:00:00', '23:00:00'),
(262, 33, 'Sexta', '12:00:00', '15:00:00'),
(263, 33, 'Sexta', '19:00:00', '23:00:00'),
(264, 33, 'Sábado', '12:00:00', '16:30:00'),
(265, 33, 'Sábado', '19:00:00', '23:00:00'),
(266, 34, 'Domingo', '12:00:00', '21:00:00'),
(267, 34, 'Quarta', '17:00:00', '23:00:00'),
(268, 34, 'Quinta', '17:00:00', '23:00:00'),
(269, 34, 'Sexta', '12:00:00', '23:00:00'),
(270, 34, 'Sábado', '12:00:00', '23:00:00');

--
-- Índices de tabelas apagadas
--

--
-- Índices de tabela `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `restaurants`
--
ALTER TABLE `restaurants`
  ADD PRIMARY KEY (`id`),
  ADD KEY `country_id` (`country_id`);

--
-- Índices de tabela `restaurants_schedule`
--
ALTER TABLE `restaurants_schedule`
  ADD PRIMARY KEY (`id`),
  ADD KEY `restaurant_id` (`restaurant_id`);

--
-- AUTO_INCREMENT de tabelas apagadas
--

--
-- AUTO_INCREMENT de tabela `countries`
--
ALTER TABLE `countries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de tabela `restaurants`
--
ALTER TABLE `restaurants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT de tabela `restaurants_schedule`
--
ALTER TABLE `restaurants_schedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=271;

--
-- Restrições para dumps de tabelas
--

--
-- Restrições para tabelas `restaurants`
--
ALTER TABLE `restaurants`
  ADD CONSTRAINT `restaurants_ibfk_1` FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Restrições para tabelas `restaurants_schedule`
--
ALTER TABLE `restaurants_schedule`
  ADD CONSTRAINT `restaurants_schedule_ibfk_1` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
