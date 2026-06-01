-- MySQL dump 10.13  Distrib 8.0.37, for Win64 (x86_64)
--
-- Host: localhost    Database: online_exam
-- ------------------------------------------------------
-- Server version	8.0.37

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `questions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `question` text,
  `option1` varchar(255) DEFAULT NULL,
  `option2` varchar(255) DEFAULT NULL,
  `option3` varchar(255) DEFAULT NULL,
  `option4` varchar(255) DEFAULT NULL,
  `correct_answer` varchar(255) DEFAULT NULL,
  `subject_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_subject` (`subject_id`),
  CONSTRAINT `fk_subject` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questions`
--

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
INSERT INTO `questions` VALUES (1,'Capital of India?','Mumbai','Delhi','Pune','Goa','Delhi',NULL),(2,'2+2?','1','2','3','4','4',NULL),(3,'Capital of India?','Mumbai','Delhi','Pune','Goa','Delhi',NULL),(4,'2+2?','1','2','3','4','4',NULL),(5,'who is prime minister','N modi','Fadnvis','Rane','Pawar','N modi',NULL),(6,'2-2= ?','0','1','2','3','0',NULL),(8,'Capital of India?','Mumbai','Delhi','Pune','Goa','Delhi',4),(9,'2+2?','1','2','3','4','4',4),(10,'who is prime minister','N modi','Fadnvis','Rane','Pawar','N modi',4),(11,'2-2= ?','0','1','2','3','0',4),(12,'Capital of India?','Mumbai','Delhi','Pune','Goa','Delhi',5),(13,'2+2?','1','2','3','4','4',5),(14,'who is prime minister','N modi','Fadnvis','Rane','Pawar','N modi',5),(15,'2-2= ?','0','1','2','3','0',5),(16,'Capital of India?','Mumbai','Delhi','Pune','Goa','Delhi',6),(17,'2+2?','1','2','3','4','4',6),(18,'who is prime minister','N modi','Fadnvis','Rane','Pawar','N modi',6),(19,'2-2= ?','0','1','2','3','0',6),(20,'Capital of India?','Mumbai','Delhi','Pune','Goa','Delhi',7),(21,'2+2?','1','2','3','4','4',7),(22,'who is prime minister','N modi','Fadnvis','Rane','Pawar','N modi',7),(23,'2-2= ?','0','1','2','3','0',7);
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `results`
--

DROP TABLE IF EXISTS `results`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `results` (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_id` varchar(100) DEFAULT NULL,
  `student_name` varchar(100) DEFAULT NULL,
  `total_questions` int DEFAULT NULL,
  `correct_answers` int DEFAULT NULL,
  `score` int DEFAULT NULL,
  `exam_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `subject_id` int DEFAULT NULL,
  `subject_name` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_attempt` (`student_id`,`subject_id`),
  UNIQUE KEY `unique_student_subject` (`student_id`,`subject_id`),
  KEY `fk_result_subject` (`subject_id`),
  CONSTRAINT `fk_result_subject` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `results`
--

LOCK TABLES `results` WRITE;
/*!40000 ALTER TABLE `results` DISABLE KEYS */;
INSERT INTO `results` VALUES (2,'4','cc',3,2,2,'2026-05-20 06:07:22',4,NULL),(8,'3','ff',4,1,1,'2026-05-20 06:59:23',4,'Java'),(9,'1','cf',0,0,0,'2026-05-20 07:26:46',4,'Java'),(10,'3','s',4,3,3,'2026-05-20 07:32:11',5,'C++'),(11,'1','qq',4,2,2,'2026-05-20 07:34:19',6,'WPT'),(12,'101','supriya',4,0,0,'2026-05-23 05:37:58',7,'DBT'),(13,'102','amit',3,0,0,'2026-05-23 05:39:44',7,'DBT'),(14,'101','supriya',4,0,0,'2026-05-23 05:40:26',6,'WPT'),(15,'103','rajesh',4,4,4,'2026-05-23 06:32:09',7,'DBT'),(17,'101','supriya',0,0,0,'2026-05-25 06:02:23',4,'Java'),(18,'101','supriya',0,0,0,'2026-05-25 06:04:34',5,'C++');
/*!40000 ALTER TABLE `results` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `students` (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_id` varchar(50) DEFAULT NULL,
  `student_name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `gender` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `student_id` (`student_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
INSERT INTO `students` VALUES (1,'101','Supriya','supriya.2410@gmail.com','Pune','9876543210','Female'),(15,'102','Amit','amit@gmail.com','Mumbai','9988908765','Male'),(16,'103','Rajesh','rajesh@gmail.com','Sangli','4829292929','Male'),(17,'104','Barkha','barkha@gmail.com','Delhi','7890234487','Female');
/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subjects`
--

DROP TABLE IF EXISTS `subjects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subjects` (
  `id` int NOT NULL AUTO_INCREMENT,
  `subject_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subjects`
--

LOCK TABLES `subjects` WRITE;
/*!40000 ALTER TABLE `subjects` DISABLE KEYS */;
INSERT INTO `subjects` VALUES (2,'Python'),(4,'Java'),(5,'C++'),(6,'WPT'),(7,'DBT');
/*!40000 ALTER TABLE `subjects` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-06-01 11:43:59
