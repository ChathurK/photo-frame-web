-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: photoframe
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `design_samples`
--

DROP TABLE IF EXISTS `design_samples`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `design_samples` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `code` varchar(255) DEFAULT NULL,
  `display_name` varchar(255) DEFAULT NULL,
  `category_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `design_samples_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=128 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `design_samples`
--

LOCK TABLES `design_samples` WRITE;
/*!40000 ALTER TABLE `design_samples` DISABLE KEYS */;
INSERT INTO `design_samples` VALUES (1,'DT1','Design 1',2),(2,'DT2','Design 2',2),(3,'DT3','Design 3',2),(4,'DT4','Design 4',2),(5,'DT5','Design 5',2),(6,'DT6','Design 6',2),(7,'DT7','Design 7',2),(8,'DT8','Design 8',2),(9,'DT9','Design 9',2),(10,'DT10','Design 10',2),(11,'DT11','Design 11',2),(12,'DT12','Design 12',2),(13,'DT13','Design 13',2),(14,'DT14','Design 14',2),(15,'DT15','Design 15',2),(16,'DT16','Design 16',2),(17,'DT17','Design 17',2),(18,'DT18','Design 18',2),(19,'DT19','Design 19',2),(20,'DT20','Design 20',2),(21,'DT21','Design 21',2),(22,'DT22','Design 22',2),(23,'DT23','Design 23',2),(24,'DT24','Design 24',2),(25,'DT25','Design 25',2),(26,'DT26','Design 26',2),(27,'DT27','Design 27',2),(28,'DT28','Design 28',2),(29,'DT29','Design 29',2),(30,'DT30','Design 30',2),(31,'DT31','Design 31',2),(32,'DT32','Design 32',2),(33,'DT33','Design 33',2),(34,'DT34','Design 34',2),(35,'DT35','Design 35',2),(36,'DT36','Design 36',2),(37,'DT37','Design 37',2),(38,'DT38','Design 38',2),(39,'DT39','Design 39',2),(40,'DT40','Design 40',2),(41,'DT41','Design 41',2),(42,'DT42','Design 42',2),(43,'DT43','Design 43',2),(44,'DT44','Design 44',2),(45,'DT45','Design 45',2),(46,'DT46','Design 46',2),(47,'DT47','Design 47',2),(48,'DT48','Design 48',2),(49,'DT49','Design 49',2),(50,'DT50','Design 50',2),(51,'DT51','Design 51',2),(52,'DT52','Design 52',2),(53,'DT53','Design 53',2),(54,'DT54','Design 54',2),(55,'DT55','Design 55',2),(56,'DT56','Design 56',2),(57,'DT57','Design 57',2),(58,'DT58','Design 58',2),(59,'DT59','Design 59',2),(60,'DT60','Design 60',2),(61,'DT61','Design 61',2),(62,'DT62','Design 62',2),(63,'DT63','Design 63',2),(64,'DT64','Design 64',2),(65,'DT65','Design 65',2),(66,'DT66','Design 66',2),(67,'DT67','Design 67',2),(68,'DT68','Design 68',2),(69,'DT69','Design 69',2),(70,'DT70','Design 70',2),(71,'DT71','Design 71',2),(72,'DT72','Design 72',2),(73,'DT73','Design 73',2),(74,'DT74','Design 74',2),(75,'DT75','Design 75',2),(76,'DT76','Design 76',2),(77,'DT77','Design 77',2),(78,'DT78','Design 78',2),(79,'DT79','Design 79',2),(80,'DT80','Design 80',2),(81,'DT81','Design 81',2),(82,'DT82','Design 82',2),(83,'DT83','Design 83',2),(84,'DT84','Design 84',2),(85,'DT85','Design 85',2),(86,'DT86','Design 86',2),(87,'DT87','Design 87',2),(88,'DT88','Design 88',2),(89,'DT89','Design 89',2),(90,'DT90','Design 90',2),(91,'DT91','Design 91',2),(92,'DT92','Design 92',2),(93,'DT93','Design 93',2),(94,'DT94','Design 94',2),(95,'DT95','Design 95',2),(96,'DT96','Design 96',2),(97,'DT97','Design 97',2),(98,'DT98','Design 98',2),(99,'DT99','Design 99',2),(100,'DT100','Design 100',2);
/*!40000 ALTER TABLE `design_samples` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-10-05  9:36:21
