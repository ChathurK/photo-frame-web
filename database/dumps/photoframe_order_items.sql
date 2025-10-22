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
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `order_id` bigint NOT NULL,
  `category_id` bigint NOT NULL,
  `design_sample_id` bigint DEFAULT NULL,
  `frame_type_id` bigint NOT NULL,
  `size_id` bigint NOT NULL,
  `frame_color_id` bigint DEFAULT NULL,
  `number_of_persons` int DEFAULT NULL,
  `background_color` varchar(255) DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  KEY `category_id` (`category_id`),
  KEY `design_sample_id` (`design_sample_id`),
  KEY `frame_type_id` (`frame_type_id`),
  KEY `size_id` (`size_id`),
  KEY `frame_color_id` (`frame_color_id`),
  CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  CONSTRAINT `order_items_ibfk_3` FOREIGN KEY (`design_sample_id`) REFERENCES `design_samples` (`id`),
  CONSTRAINT `order_items_ibfk_4` FOREIGN KEY (`frame_type_id`) REFERENCES `frame_types` (`id`),
  CONSTRAINT `order_items_ibfk_5` FOREIGN KEY (`size_id`) REFERENCES `sizes` (`id`),
  CONSTRAINT `order_items_ibfk_6` FOREIGN KEY (`frame_color_id`) REFERENCES `frame_colors` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (1,1,1,NULL,1,1,NULL,2,'Blue Sky','https://example.com/family-photo.jpg','Please make it look elegant'),(2,2,1,NULL,1,1,NULL,2,'Blue Sky','https://example.com/family-photo.jpg','Please make it look elegant'),(3,3,1,NULL,1,1,NULL,2,'Blue Sky','https://example.com/family-photo.jpg','Please make it look elegant'),(4,4,1,NULL,1,1,NULL,2,'Blue Sky','https://example.com/family-photo.jpg','Please make it look elegant'),(5,5,1,NULL,1,1,NULL,2,'Blue Sky','https://example.com/family-photo.jpg','Please make it look elegant'),(6,6,1,NULL,1,1,NULL,2,'Blue Sky','https://example.com/family-photo.jpg','Please make it look elegant'),(7,7,1,NULL,1,1,NULL,2,'Blue Sky','https://example.com/family-photo.jpg','Please make it look elegant'),(8,8,1,NULL,1,1,NULL,2,'Blue Sky','https://example.com/family-photo.jpg','Please make it look elegant'),(9,9,1,NULL,1,1,NULL,2,'Blue Sky','https://example.com/family-photo.jpg','Please make it look elegant'),(10,10,1,NULL,1,1,NULL,2,'Blue Sky','https://example.com/family-photo.jpg','Please make it look elegant');
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
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
