-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 21, 2021 at 06:38 PM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 7.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'House', '2021-05-16 09:52:00', '2021-05-16 09:52:31'),
(2, 'Apartment', '2021-05-16 09:52:00', '2021-05-16 09:52:46'),
(3, 'Rent', '2021-05-16 09:52:00', '2021-05-16 09:52:53');

-- --------------------------------------------------------

--
-- Table structure for table `propertydetails`
--

CREATE TABLE `propertydetails` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `categoryId` int(11) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `price` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `room` varchar(255) DEFAULT NULL,
  `size` varchar(255) DEFAULT NULL,
  `images` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `propertydetails`
--

INSERT INTO `propertydetails` (`id`, `title`, `categoryId`, `description`, `price`, `location`, `room`, `size`, `images`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'House 4 rooms in Zemmer', 2, 'Hell und freundlich, das sind Attribute der edlen Stadtvilla Fino, die sich durch das ganze Haus ziehen. Mit großen Fensterelementen in Erd- und Dachgeschoss fällt das stetig wechselnde Tageslicht zu jeder Zeit ins Haus und erhellt die Räume.', '378,900', 'Fulda, Hessen  Germany 123 Street. ', '4', '127 meter square', 'assests\\uploads\\propertyImage\\property-1621601045730.jpg', 0, '2021-05-21 12:43:00', '2021-05-21 12:44:05'),
(2, 'House 4 rooms in Zemmer', 2, 'Werden Sie jetzt Besitzer dieses traumhaften Eigenheims. Das Satteldachhaus Cara zeigt schon von außen einige Besonderheiten und seinen ganz speziellen Charme: Neben einer flachen Dachneigung wurden', '325,900', 'Megdeburg, Germany', '4', '121 meter square', 'assests\\uploads\\propertyImage\\property-1621601246123.jpg', 0, '2021-05-21 12:47:00', '2021-05-21 12:47:26'),
(3, 'House 4 rooms in Zemmer', 2, 'Werden Sie jetzt Besitzer dieses traumhaften Eigenheims. Das Satteldachhaus Cara zeigt schon von außen einige Besonderheiten und seinen ganz speziellen Charme: Neben einer flachen Dachneigung wurden', '332,900', 'FrankFurt, Germany', '4', '116 meter square', 'assests\\uploads\\propertyImage\\property-1621601481719.jpg', 0, '2021-05-21 12:51:00', '2021-05-21 12:51:21'),
(4, 'Apartment 2 bedrooms in Bollendorf', 3, 'MMO EXCELLENCE vous propose en exclusivité un appartement d\'une surface habitable d\'environ 82.10 m2 situé au 1er étage d\'une Résidence à seulement 5 unités. L\'appartement se compose comme suit : Un hall d\'entrée, un double séjour, une cuisine équipée,', '227,000', 'Bollendorf, Germany', '2', '82.1 meter square', 'assests\\uploads\\propertyImage\\property-1621602367626.jpg', 0, '2021-05-21 13:06:00', '2021-05-21 13:06:07'),
(5, 'Apartment 5 rooms in Perl-Nennig', 3, 'PERL-NENNIG, 315.000 Euros\n\nA 5 minutes de la frontière luxembourgeoise.\n\nAppartement au 1ier étage sans ascenseur (+-73m2)\ndans une résidence de 6 unités avec Jardin commun.\nConstruction 2004. Objet dans une situation calme et verdoyante.', '315,000', 'Perl-Nennig, Germany', '5', '73  meter square', 'assests\\uploads\\propertyImage\\property-1621602510714.jpg', 0, '2021-05-21 13:06:00', '2021-05-21 13:08:30'),
(6, 'Apartment 4 rooms in Echternacherbrück', 3, 'Contact me for our detailed synopsis! - Kontakt: German, English, French, Luxembourgish - The barrier-free apartment has a large living / dining / kitchen area, three bedrooms, two bathrooms, a storage room and a balcony', '533,800', 'Echternacherbrück, Germany', '4', '133 meter square', 'assests\\uploads\\propertyImage\\property-1621603228433.jpg', 0, '2021-05-21 13:20:00', '2021-05-21 13:20:28'),
(7, 'Apartment 3 rooms in Merzig', 3, 'This bright condominium is located in a quiet location in Merzig. It was completely renovated in 2017 and is in mint condition. The apartment has two rooms and a living room with an adjoining kitchen. The apartment includes a basement room.', '533,800', 'Merzig , Germany', '3', '72 meter square', 'assests\\uploads\\propertyImage\\property-1621603473161.jpg', 0, '2021-05-21 13:20:00', '2021-05-21 13:24:33'),
(8, 'House 6 rooms', 2, 'he ideal solution for the hillside property! In the basement is the entrance area with hall, bathroom, shower and guest room, as well as the integrated double garage with direct access to the apartment', '519,800', 'Merzig , Germany', '3', '154 meter square', 'assests\\uploads\\propertyImage\\property-1621609584162.jpg', 0, '2021-05-21 15:06:00', '2021-05-21 15:06:24'),
(9, 'Apartment 6 rooms in Echternacherbrück', 3, 'New construction of a residential complex in Echternacherbrück. Residential and commercial from 35sqm to 205sqm energy pass according to EnEV 2009 There are a total of 51 parking spaces. The price per parking space is EUR 12,000.', '431,414', 'Echternacherbrück, Germany', '6', '113.53 m²', 'assests\\uploads\\propertyImage\\property-1621609789092.jpg', 0, '2021-05-21 15:06:00', '2021-05-21 15:09:49'),
(10, 'Apartment 2 rooms in Trier', 3, 'Penthouse apartment in the immediate vicinity of Porta Niga This residential and commercial complex was built in a central location in the heart of Trier. The facility consists of 2 buildings that are connected to each other via an underground car park.', '695,000', 'Numberg, Germany', '2', '167 m²', 'assests\\uploads\\propertyImage\\property-1621610016171.jpg', 0, '2021-05-21 15:13:00', '2021-05-21 15:13:36');

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20210516095158-create-category.js'),
('20210521123125-create-property-detail.js');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `propertydetails`
--
ALTER TABLE `propertydetails`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `propertydetails`
--
ALTER TABLE `propertydetails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
