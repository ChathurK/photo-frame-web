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
-- Table structure for table `frame_types`
--

DROP TABLE IF EXISTS `frame_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `frame_types` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `code` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `category_id` bigint NOT NULL,
  `material` varchar(255) DEFAULT NULL,
  `allows_color` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `frame_types_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `frame_types`
--

LOCK TABLES `frame_types` WRITE;
/*!40000 ALTER TABLE `frame_types` DISABLE KEYS */;
INSERT INTO `frame_types` VALUES (1,'OIL_PLY_NON_MARGIN','Plymount Non-margine',1,'Plymount',0),(2,'OIL_PLY_MARGIN','Plymount Margine',1,'Plymount',0),(3,'OIL_PLY_PLASTIC','Plymount With Plastic Beading',1,'Plymount',0),(4,'OIL_PLY_BOX_PLASTIC','Plymount Box Frame With Plastic Beading',1,'Plymount',0),(5,'OIL_PLY_EMBOSSED','Plymount Embossed',1,'Plymount',0),(6,'HUNDRED_FIBER','Fiber Frame',2,'Fiber',1),(7,'HUNDRED_PLY_NON_MARGIN','Plymount Non-margine',2,'Plymount',0),(8,'HUNDRED_PLY_MARGIN','Plymount Margine',2,'Plymount',0),(9,'HUNDRED_PLY_PLASTIC','Plymount With Plastic Beading',2,'Plymount',0),(10,'HUNDRED_PLY_BOX_PLASTIC','Plymount Box Frame With Plastic Beading',2,'Plymount',0),(11,'HUNDRED_PLY_EMBOSSED','Plymount Embossed',2,'Plymount',0),(12,'HUNDRED_PINEWOOD_DARK','Pinewood Dark Frame',2,'Pinewood',0),(13,'HUNDRED_PINEWOOD_LIGHT','Pinewood Light Frame',2,'Pinewood',0),(14,'CUTE_FIBER','Fiber Frame',3,'Fiber',1),(15,'CUTE_PLY_NON_MARGIN','Plymount Non-margine',3,'Plymount',0),(16,'CUTE_PLY_MARGIN','Plymount Margine',3,'Plymount',0),(17,'CUTE_PLY_PLASTIC','Plymount With Plastic Beading',3,'Plymount',0),(18,'CUTE_PLY_BOX_PLASTIC','Plymount Box Frame With Plastic Beading',3,'Plymount',0),(19,'CUTE_PLY_EMBOSSED','Plymount Embossed',3,'Plymount',0),(20,'MINI_PLY_NON_MARGIN','Plymount Non-margine',4,'Plymount',0),(21,'MINI_PLY_EMBOSSED','Plymount Embossed',4,'Plymount',0),(22,'MINI_ROTATE_LED','Rotate Frame with LED',4,'Plastic',0);
/*!40000 ALTER TABLE `frame_types` ENABLE KEYS */;
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
