
-- Creating the table = Building an empty filing cabinet
-- Dumping the data = Filling it with the actual documents (records)
-- The LOCK TABLES and UNLOCK TABLES commands ensure data consistency during the import process by preventing other operations from interfering.

-- Drop existing database if exists and create new one
DROP DATABASE IF EXISTS photo;
CREATE DATABASE photo CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE photo;
--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `code` varchar(50) NOT NULL,
  `price_increment` decimal(10,2) DEFAULT '0.00',
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
INSERT INTO `categories` VALUES (1,'Oil Painting','OIL',0.00),(2,'100 Designs','HUNDRED',0.00),(3,'Cute Collections','CUTE',450.00),(4,'Mini Frames','MINI',0.00);
UNLOCK TABLES;

--
-- Table structure for table `design_samples`
--

DROP TABLE IF EXISTS `design_samples`;
CREATE TABLE `design_samples` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(20) NOT NULL,
  `display_name` varchar(100) DEFAULT NULL,
  `category_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `design_samples_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `design_samples`
--

LOCK TABLES `design_samples` WRITE;
INSERT INTO `design_samples` VALUES (1,'DT1','Design 1',2),(2,'DT2','Design 2',2),(3,'DT3','Design 3',2),(4,'DT4','Design 4',2),(5,'DT5','Design 5',2),(6,'DT6','Design 6',2),(7,'DT7','Design 7',2),(8,'DT8','Design 8',2),(9,'DT9','Design 9',2),(10,'DT10','Design 10',2),(11,'DT11','Design 11',2),(12,'DT12','Design 12',2),(13,'DT13','Design 13',2),(14,'DT14','Design 14',2),(15,'DT15','Design 15',2),(16,'DT16','Design 16',2),(17,'DT17','Design 17',2),(18,'DT18','Design 18',2),(19,'DT19','Design 19',2),(20,'DT20','Design 20',2),(21,'DT21','Design 21',2),(22,'DT22','Design 22',2),(23,'DT23','Design 23',2),(24,'DT24','Design 24',2),(25,'DT25','Design 25',2),(26,'DT26','Design 26',2),(27,'DT27','Design 27',2),(28,'DT28','Design 28',2),(29,'DT29','Design 29',2),(30,'DT30','Design 30',2),(31,'DT31','Design 31',2),(32,'DT32','Design 32',2),(33,'DT33','Design 33',2),(34,'DT34','Design 34',2),(35,'DT35','Design 35',2),(36,'DT36','Design 36',2),(37,'DT37','Design 37',2),(38,'DT38','Design 38',2),(39,'DT39','Design 39',2),(40,'DT40','Design 40',2),(41,'DT41','Design 41',2),(42,'DT42','Design 42',2),(43,'DT43','Design 43',2),(44,'DT44','Design 44',2),(45,'DT45','Design 45',2),(46,'DT46','Design 46',2),(47,'DT47','Design 47',2),(48,'DT48','Design 48',2),(49,'DT49','Design 49',2),(50,'DT50','Design 50',2),(51,'DT51','Design 51',2),(52,'DT52','Design 52',2),(53,'DT53','Design 53',2),(54,'DT54','Design 54',2),(55,'DT55','Design 55',2),(56,'DT56','Design 56',2),(57,'DT57','Design 57',2),(58,'DT58','Design 58',2),(59,'DT59','Design 59',2),(60,'DT60','Design 60',2),(61,'DT61','Design 61',2),(62,'DT62','Design 62',2),(63,'DT63','Design 63',2),(64,'DT64','Design 64',2),(65,'DT65','Design 65',2),(66,'DT66','Design 66',2),(67,'DT67','Design 67',2),(68,'DT68','Design 68',2),(69,'DT69','Design 69',2),(70,'DT70','Design 70',2),(71,'DT71','Design 71',2),(72,'DT72','Design 72',2),(73,'DT73','Design 73',2),(74,'DT74','Design 74',2),(75,'DT75','Design 75',2),(76,'DT76','Design 76',2),(77,'DT77','Design 77',2),(78,'DT78','Design 78',2),(79,'DT79','Design 79',2),(80,'DT80','Design 80',2),(81,'DT81','Design 81',2),(82,'DT82','Design 82',2),(83,'DT83','Design 83',2),(84,'DT84','Design 84',2),(85,'DT85','Design 85',2),(86,'DT86','Design 86',2),(87,'DT87','Design 87',2),(88,'DT88','Design 88',2),(89,'DT89','Design 89',2),(90,'DT90','Design 90',2),(91,'DT91','Design 91',2),(92,'DT92','Design 92',2),(93,'DT93','Design 93',2),(94,'DT94','Design 94',2),(95,'DT95','Design 95',2),(96,'DT96','Design 96',2),(97,'DT97','Design 97',2),(98,'DT98','Design 98',2),(99,'DT99','Design 99',2),(100,'DT100','Design 100',2);
UNLOCK TABLES;

--
-- Table structure for table `frame_colors`
--

DROP TABLE IF EXISTS `frame_colors`;
CREATE TABLE `frame_colors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `frame_type_id` int NOT NULL,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `frame_type_id` (`frame_type_id`),
  CONSTRAINT `frame_colors_ibfk_1` FOREIGN KEY (`frame_type_id`) REFERENCES `frame_types` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `frame_colors`
--

LOCK TABLES `frame_colors` WRITE;
INSERT INTO `frame_colors` VALUES (1,5,'Black'),(2,5,'White'),(3,5,'Brown'),(4,5,'Pinewood'),(5,11,'Black'),(6,11,'White'),(7,11,'Brown'),(8,11,'Pinewood'),(9,1,'Black'),(10,2,'Black'),(11,3,'Black'),(12,4,'Black'),(13,6,'Black'),(14,7,'Black'),(15,8,'Black'),(16,9,'Black'),(17,10,'Black'),(18,12,'Black'),(19,19,'Black'),(20,20,'Black'),(21,1,'White'),(22,2,'White'),(23,3,'White'),(24,4,'White'),(25,6,'White'),(26,7,'White'),(27,8,'White'),(28,9,'White'),(29,10,'White'),(30,12,'White'),(31,19,'White'),(32,20,'White');
UNLOCK TABLES;

--
-- Table structure for table `frame_prices`
--

DROP TABLE IF EXISTS `frame_prices`;
CREATE TABLE `frame_prices` (
  `id` int NOT NULL AUTO_INCREMENT,
  `frame_type_id` int NOT NULL,
  `size_id` int NOT NULL,
  `price_lkr` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `frame_type_id` (`frame_type_id`),
  KEY `size_id` (`size_id`),
  CONSTRAINT `frame_prices_ibfk_1` FOREIGN KEY (`frame_type_id`) REFERENCES `frame_types` (`id`),
  CONSTRAINT `frame_prices_ibfk_2` FOREIGN KEY (`size_id`) REFERENCES `sizes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=144 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `frame_prices`
--

LOCK TABLES `frame_prices` WRITE;
INSERT INTO `frame_prices` VALUES (1,1,1,2800.00),(2,1,2,3400.00),(3,1,3,3850.00),(4,1,4,4200.00),(5,1,5,4600.00),(6,1,6,4950.00),(7,1,7,5250.00),(8,2,1,3100.00),(9,2,2,3500.00),(10,2,3,3950.00),(11,2,4,4200.00),(12,2,5,4750.00),(13,2,6,5000.00),(14,2,7,5500.00),(15,3,1,2800.00),(16,3,2,3400.00),(17,3,3,3850.00),(18,3,4,4100.00),(19,3,5,4450.00),(20,3,6,4750.00),(21,3,7,4950.00),(22,4,1,2750.00),(23,4,2,3300.00),(24,4,3,3650.00),(25,4,4,3950.00),(26,4,5,4150.00),(27,4,6,4400.00),(28,4,7,4750.00),(29,5,1,2800.00),(30,5,3,3700.00),(31,5,4,4000.00),(32,5,5,4350.00),(33,5,6,4650.00),(34,5,7,4950.00),(35,6,1,3000.00),(36,6,2,3450.00),(37,6,3,3900.00),(38,6,4,4200.00),(39,6,5,4500.00),(40,6,6,4950.00),(41,6,7,5200.00),(42,7,1,1950.00),(43,7,2,2500.00),(44,7,3,2850.00),(45,7,4,3200.00),(46,7,5,3550.00),(47,7,6,3950.00),(48,7,7,4250.00),(49,8,1,2200.00),(50,8,2,2600.00),(51,8,3,2950.00),(52,8,4,3200.00),(53,8,5,3750.00),(54,8,6,4100.00),(55,8,7,4450.00),(56,9,1,1950.00),(57,9,2,2550.00),(58,9,3,2850.00),(59,9,4,3100.00),(60,9,5,3450.00),(61,9,6,3750.00),(62,9,7,3950.00),(63,10,1,1900.00),(64,10,2,2450.00),(65,10,3,2800.00),(66,10,4,2950.00),(67,10,5,3150.00),(68,10,6,3400.00),(69,10,7,3750.00),(70,11,1,1950.00),(71,11,3,2850.00),(72,11,4,3150.00),(73,11,5,3350.00),(74,11,6,3650.00),(75,11,7,3950.00),(76,12,1,2250.00),(77,12,2,2600.00),(78,12,3,2950.00),(79,12,4,3200.00),(80,12,5,3550.00),(81,12,6,3950.00),(82,12,7,4250.00),(134,19,8,850.00),(135,19,9,950.00),(136,19,10,1500.00),(137,19,11,1950.00),(138,19,12,1650.00),(139,19,13,2250.00),(140,19,14,2500.00),(141,20,15,1850.00),(142,20,16,1500.00),(143,21,17,2150.00);
UNLOCK TABLES;

--
-- Table structure for table `frame_types`
--

DROP TABLE IF EXISTS `frame_types`;
CREATE TABLE `frame_types` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `code` varchar(100) NOT NULL,
  `material` varchar(50) DEFAULT NULL,
  `allows_color` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `frame_types_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `frame_types`
--

LOCK TABLES `frame_types` WRITE;
INSERT INTO `frame_types` VALUES (1,1,'Plymount Box Frame with Plastic Beading','OIL_BOX_PLASTIC','Plymount',1),(2,1,'Plymount Embossed Frame','OIL_EMBOSSED','Plymount',1),(3,1,'Plymount Margine Frame','OIL_MARGIN','Plymount',1),(4,1,'Plymount Non-Margine Frame','OIL_NON_MARGIN','Plymount',1),(5,1,'Fiber Frame Normal Range','OIL_FIBER','Fiber',1),(6,1,'Plymount Box Frame Non-Margine','OIL_BOX_NON_MARGIN','Plymount',1),(7,2,'Plymount Box Frame with Plastic Beading','HUNDRED_BOX_PLASTIC','Plymount',1),(8,2,'Plymount Embossed Frame','HUNDRED_EMBOSSED','Plymount',1),(9,2,'Plymount Margine Frame','HUNDRED_MARGIN','Plymount',1),(10,2,'Plymount Non-Margine Frame','HUNDRED_NON_MARGIN','Plymount',1),(11,2,'Fiber Frame','HUNDRED_FIBER','Fiber',1),(12,2,'Plymount Box Frame Non-Margine','HUNDRED_BOX_NON_MARGIN','Plymount',1),(19,4,'Plymount Non-Margine','MINI_NON_MARGIN','Plymount',1),(20,4,'Plymount Embossed','MINI_EMBOSSED','Plymount',1),(21,4,'Rotate Frame with LED Light','MINI_ROTATE_LED','Plastic',0);
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
CREATE TABLE `order_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `category_id` int NOT NULL,
  `design_sample_id` int DEFAULT NULL,
  `frame_type_id` int NOT NULL,
  `size_id` int NOT NULL,
  `frame_color_id` int DEFAULT NULL,
  `number_of_persons` int DEFAULT '1',
  `background_color` varchar(100) DEFAULT NULL,
  `package_type` varchar(20) DEFAULT 'free',
  `notes` text,
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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
INSERT INTO `order_items` VALUES (1,1,1,NULL,6,1,NULL,1,NULL,'free','kk'),(2,2,2,24,11,4,5,1,NULL,'premium','kk'),(3,3,2,3,12,2,NULL,1,NULL,'premium','kk'),(4,4,2,3,12,2,NULL,1,NULL,'premium','kk'),(5,5,2,12,12,3,NULL,1,NULL,'premium','test'),(6,6,2,48,7,2,NULL,1,NULL,'premium','test'),(7,7,3,NULL,12,1,5,3,NULL,'premium','test'),(8,8,4,NULL,21,17,NULL,1,NULL,'premium','ll'),(9,9,2,NULL,9,1,28,1,NULL,'premium','kk'),(10,10,2,8,9,3,16,1,NULL,'free',NULL),(11,11,1,NULL,6,4,25,1,NULL,'premium',NULL),(12,12,4,NULL,20,15,20,1,NULL,'free','dd'),(13,13,4,NULL,21,17,NULL,1,NULL,'premium',NULL),(14,14,2,4,7,2,14,1,NULL,'free',NULL),(15,15,4,NULL,19,8,19,1,NULL,'premium',NULL);
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customer_name` varchar(200) NOT NULL,
  `customer_address` text,
  `customer_whatsapp` varchar(50) DEFAULT NULL,
  `delivery_to` varchar(50) NOT NULL,
  `delivery_date` date DEFAULT NULL,
  `total_amount` decimal(10,2) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
INSERT INTO `orders` VALUES (1,'kk','kk','kk','Sri Lanka','2025-10-23',0.00,'2025-10-18 03:28:14'),(2,'kk','kk','kk','Sri Lanka','2025-10-23',0.00,'2025-10-18 03:57:01'),(3,'kk','kk','kk','Sri Lanka','2025-10-23',0.00,'2025-10-18 04:08:37'),(4,'kk','kk','kk','Sri Lanka','2025-10-23',0.00,'2025-10-18 04:09:59'),(5,'dulan','horana','0764007462','Sri Lanka','2025-10-23',0.00,'2025-10-18 04:53:05'),(6,'dulan','horana','0764007562','Sri Lanka','2025-10-23',0.00,'2025-10-18 05:28:03'),(7,'test','test','test','Sri Lanka','2025-10-23',0.00,'2025-10-18 09:37:42'),(8,'ll','ll','ll','Sri Lanka','2025-10-23',0.00,'2025-10-18 09:50:07'),(9,'kk','kk','kk','Sri Lanka','2025-10-23',0.00,'2025-10-18 10:13:36'),(10,'aa','aa','44','Sri Lanka','2025-10-25',0.00,'2025-10-21 15:10:49'),(11,'kk','horana','0764007562','Sri Lanka','2025-10-25',0.00,'2025-10-21 16:11:12'),(12,'dd','dd','dd','Sri Lanka','2025-10-26',0.00,'2025-10-22 14:25:56'),(13,'kk','ll','0764007562','Sri Lanka','2025-10-26',0.00,'2025-10-22 14:53:14'),(14,'bb','hh','0764007562','Sri Lanka','2025-10-26',0.00,'2025-10-22 14:58:32'),(15,'kk','ff','0764007562','Sri Lanka','2025-10-26',0.00,'2025-10-22 15:00:37');
UNLOCK TABLES;

--
-- Table structure for table `sizes`
--

DROP TABLE IF EXISTS `sizes`;
CREATE TABLE `sizes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `width` decimal(5,2) DEFAULT NULL,
  `height` decimal(5,2) DEFAULT NULL,
  `unit` varchar(10) DEFAULT NULL,
  `display` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sizes`
--

LOCK TABLES `sizes` WRITE;
INSERT INTO `sizes` VALUES (1,6.00,8.00,'inch','6 x 8'),(2,8.00,10.00,'inch','8 x 10'),(3,8.00,12.00,'inch','8 x 12'),(4,10.00,12.00,'inch','10 x 12'),(5,10.00,15.00,'inch','10 x 15'),(6,12.00,15.00,'inch','12 x 15'),(7,12.00,18.00,'inch','12 x 18'),(8,3.00,3.00,'inch','3 x 3'),(9,4.00,4.00,'inch','4 x 4'),(10,4.00,8.00,'inch','4 x 8'),(11,4.00,12.00,'inch','4 x 12'),(12,8.00,8.00,'inch','8 x 8'),(13,8.00,10.00,'inch','8 x 10'),(14,8.00,16.00,'inch','8 x 16'),(15,4.00,6.00,'inch','4 x 6'),(16,5.00,7.00,'inch','5 x 7'),(17,6.00,8.00,'inch','6 x 8 (LED)');
UNLOCK TABLES;

