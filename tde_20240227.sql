-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: test_dev_employe
-- ------------------------------------------------------
-- Server version	8.0.29

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
-- Table structure for table `t_jabatan`
--

DROP TABLE IF EXISTS `t_jabatan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_jabatan` (
  `id_jabatan` int NOT NULL AUTO_INCREMENT,
  `nama_jabatan` varchar(45) DEFAULT NULL,
  `id_salary` int DEFAULT NULL,
  PRIMARY KEY (`id_jabatan`),
  KEY `FK_jabatan_salary_id_salary_idx` (`id_salary`),
  CONSTRAINT `FK_jabatan_salary_id_salary` FOREIGN KEY (`id_salary`) REFERENCES `t_salary` (`id_salary`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_jabatan`
--

LOCK TABLES `t_jabatan` WRITE;
/*!40000 ALTER TABLE `t_jabatan` DISABLE KEYS */;
INSERT INTO `t_jabatan` VALUES (1,'Junior 1',1),(2,'Junior 2',2),(3,'Senior 1',3),(4,'Senior 2',4),(5,'Assistant Manager',5),(6,'Manager',6);
/*!40000 ALTER TABLE `t_jabatan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_karyawan`
--

DROP TABLE IF EXISTS `t_karyawan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_karyawan` (
  `id_karyawan` int NOT NULL AUTO_INCREMENT,
  `nama_karyawan` varchar(45) DEFAULT NULL,
  `id_unit` int DEFAULT NULL,
  `id_jabatan` int DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `alamat` text,
  PRIMARY KEY (`id_karyawan`),
  KEY `FK_karyawan_unit_id_unit_idx` (`id_unit`),
  KEY `FK_karyawan_jabatan_id_jabatan_idx` (`id_jabatan`),
  CONSTRAINT `FK_karyawan_jabatan_id_jabatan` FOREIGN KEY (`id_jabatan`) REFERENCES `t_jabatan` (`id_jabatan`),
  CONSTRAINT `FK_karyawan_unit_id_unit` FOREIGN KEY (`id_unit`) REFERENCES `t_unit` (`id_unit`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_karyawan`
--

LOCK TABLES `t_karyawan` WRITE;
/*!40000 ALTER TABLE `t_karyawan` DISABLE KEYS */;
INSERT INTO `t_karyawan` VALUES (1,'Nunung',2,1,'nunung@mumi.co.id','Tanggerang'),(2,'Parto',2,2,'parto@mumi.co.id','Kebayoran'),(3,'Sule',5,3,'sule@mumi.co.id','Depok'),(4,'Andre',5,3,'andre@mumi.co.id','Bekasi'),(5,'Andi',4,3,'andi@mumi.co.id','Jogja'),(6,'Atma',3,6,'atma@mumi.co.id','Bekasi'),(7,'Indra',1,4,'indra@mumi.co.id','Jakarta'),(9,'Husain',1,1,'husain@gmail.com','Bekasi');
/*!40000 ALTER TABLE `t_karyawan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_salary`
--

DROP TABLE IF EXISTS `t_salary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_salary` (
  `id_salary` int NOT NULL AUTO_INCREMENT,
  `salary` double DEFAULT NULL,
  PRIMARY KEY (`id_salary`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_salary`
--

LOCK TABLES `t_salary` WRITE;
/*!40000 ALTER TABLE `t_salary` DISABLE KEYS */;
INSERT INTO `t_salary` VALUES (1,5000000),(2,6000000),(3,7000000),(4,8000000),(5,9000000),(6,10000000);
/*!40000 ALTER TABLE `t_salary` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_unit`
--

DROP TABLE IF EXISTS `t_unit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_unit` (
  `id_unit` int NOT NULL AUTO_INCREMENT,
  `nama_unit` text,
  `lokasi` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_unit`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_unit`
--

LOCK TABLES `t_unit` WRITE;
/*!40000 ALTER TABLE `t_unit` DISABLE KEYS */;
INSERT INTO `t_unit` VALUES (1,'Quality Assurance Jakarta','Kantor Pusat'),(2,'HR','Kantor Pusat'),(3,'System Development Jakarta','Kantor Pusat'),(4,'System Development Jogja','Kantor Cabang'),(5,'Technical Jakarta','Kantor Pusat');
/*!40000 ALTER TABLE `t_unit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_user`
--

DROP TABLE IF EXISTS `t_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_user` (
  `id_user` int NOT NULL AUTO_INCREMENT,
  `id_karyawan` int DEFAULT NULL,
  `user_name` varchar(45) DEFAULT NULL,
  `password` varchar(200) DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `login` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id_user`),
  KEY `FK_user_karyawan_id_karyawan_idx` (`id_karyawan`),
  CONSTRAINT `FK_user_karyawan_id_karyawan` FOREIGN KEY (`id_karyawan`) REFERENCES `t_karyawan` (`id_karyawan`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_user`
--

LOCK TABLES `t_user` WRITE;
/*!40000 ALTER TABLE `t_user` DISABLE KEYS */;
INSERT INTO `t_user` VALUES (1,1,'nunungs','adaapa','active',1),(2,4,'andres','adapapa','active',0);
/*!40000 ALTER TABLE `t_user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-27  0:16:51
