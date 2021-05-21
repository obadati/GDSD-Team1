-- MySQL dump 10.13  Distrib 8.0.24, for Win64 (x86_64)
--
-- Host: localhost    Database: dev_real_state
-- ------------------------------------------------------
-- Server version	8.0.25-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `propertyDetails`
--

DROP TABLE IF EXISTS `propertyDetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `propertyDetails` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `categoryId` int DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `price` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `room` varchar(255) DEFAULT NULL,
  `size` varchar(255) DEFAULT NULL,
  `images` varchar(255) DEFAULT NULL,
  `status` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `propertyDetails`
--

LOCK TABLES `propertyDetails` WRITE;
/*!40000 ALTER TABLE `propertyDetails` DISABLE KEYS */;
INSERT INTO `propertyDetails` VALUES (1,'House 4 rooms in Zemmer',2,'Hell und freundlich, das sind Attribute der edlen Stadtvilla Fino, die sich durch das ganze Haus ziehen. Mit großen Fensterelementen in Erd- und Dachgeschoss fällt das stetig wechselnde Tageslicht zu jeder Zeit ins Haus und erhellt die Räume.','378,900','Fulda, Hessen  Germany 123 Street. ','4','127 meter square','assests/uploads/propertyImage/property-1621601087884.jpg',0,'2021-05-21 12:36:00','2021-05-21 12:44:48'),(2,'House 4 rooms in Zemmer',2,'Werden Sie jetzt Besitzer dieses traumhaften Eigenheims. Das Satteldachhaus Cara zeigt schon von außen einige Besonderheiten und seinen ganz speziellen Charme: Neben einer flachen Dachneigung wurden','325,900','Megdeburg, Germany','4','121 meter square','assests/uploads/propertyImage/property-1621601224357.jpg',0,'2021-05-21 12:36:00','2021-05-21 12:47:04'),(3,'House 4 rooms in Zemmer',2,'Werden Sie jetzt Besitzer dieses traumhaften Eigenheims. Das Satteldachhaus Cara zeigt schon von außen einige Besonderheiten und seinen ganz speziellen Charme: Neben einer flachen Dachneigung wurden','332,900','FrankFurt, Germany','4','116 meter square','assests\\uploads\\propertyImage\\property-1621601498600.jpg',0,'2021-05-21 12:51:00','2021-05-21 12:51:38'),(6,'Apartment 2 bedrooms in Bollendorf',3,'MMO EXCELLENCE vous propose en exclusivité un appartement d\'une surface habitable d\'environ 82.10 m2 situé au 1er étage d\'une Résidence à seulement 5 unités. L\'appartement se compose comme suit : Un hall d\'entrée, un double séjour, une cuisine équipée,','227,000','Bollendorf, Germany','2','82.1 meter square','assests\\uploads\\propertyImage\\property-1621602321680.jpg',0,'2021-05-21 12:51:00','2021-05-21 13:05:21'),(7,'Apartment 5 rooms in Perl-Nennig',3,'PERL-NENNIG, 315.000 Euros\n\nA 5 minutes de la frontière luxembourgeoise.\n\nAppartement au 1ier étage sans ascenseur (+-73m2)\ndans une résidence de 6 unités avec Jardin commun.\nConstruction 2004. Objet dans une situation calme et verdoyante.','315,000','Perl-Nennig, Germany','5','73  meter square','assests/uploads/propertyImage/property-1621602534385.jpg',0,'2021-05-21 12:36:00','2021-05-21 13:08:54'),(8,'Apartment 4 rooms in Echternacherbrück',3,'Contact me for our detailed synopsis! - Kontakt: German, English, French, Luxembourgish - The barrier-free apartment has a large living / dining / kitchen area, three bedrooms, two bathrooms, a storage room and a balcony','533,800','Echternacherbrück, Germany','4','133 meter square','assests/uploads/propertyImage/property-1621602703506.jpg',0,'2021-05-21 12:36:00','2021-05-21 13:11:43'),(9,'Apartment 3 rooms in Merzig',3,'This bright condominium is located in a quiet location in Merzig. It was completely renovated in 2017 and is in mint condition. The apartment has two rooms and a living room with an adjoining kitchen. The apartment includes a basement room.','533,800','Merzig , Germany','3','72 meter square','assests/uploads/propertyImage/property-1621603504136.jpg',0,'2021-05-21 12:36:00','2021-05-21 13:25:04'),(10,'House 6 rooms',2,'he ideal solution for the hillside property! In the basement is the entrance area with hall, bathroom, shower and guest room, as well as the integrated double garage with direct access to the apartment','519,800','Merzig , Germany','3','154 meter square','assests/uploads/propertyImage/property-1621609358303.jpg',0,'2021-05-21 13:32:00','2021-05-21 15:02:39'),(12,'Apartment 6 rooms in Echternacherbrück',3,'New construction of a residential complex in Echternacherbrück. Residential and commercial from 35sqm to 205sqm energy pass according to EnEV 2009 There are a total of 51 parking spaces. The price per parking space is EUR 12,000.','431,414','Echternacherbrück, Germany','6','113.53 m²','assests/uploads/propertyImage/property-1621609809384.jpg',0,'2021-05-21 13:32:00','2021-05-21 15:10:09'),(14,'Apartment 2 rooms in Trier',3,'Penthouse apartment in the immediate vicinity of Porta Niga This residential and commercial complex was built in a central location in the heart of Trier. The facility consists of 2 buildings that are connected to each other via an underground car park.','695,000','Numberg, Germany','2','167 m²','assests/uploads/propertyImage/property-1621610048377.jpg',0,'2021-05-21 13:32:00','2021-05-21 15:14:08');
/*!40000 ALTER TABLE `propertyDetails` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-05-22  2:50:55
