-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 16, 2018 at 03:23 PM
-- Server version: 10.1.28-MariaDB
-- PHP Version: 5.6.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mms`
--

-- --------------------------------------------------------

--
-- Table structure for table `mms_borders`
--

CREATE TABLE `mms_borders` (
  `id` int(11) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `user_name` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `user_type` varchar(45) NOT NULL,
  `join_date` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `last_login` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `is_active` tinyint(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `mms_borders`
--

INSERT INTO `mms_borders` (`id`, `full_name`, `user_name`, `password`, `user_type`, `join_date`, `last_login`, `is_active`) VALUES
(1, 'Robiul Alam Sanny', 'Rahim', 'e10adc3949ba59abbe56e057f20f883e', '1', '2018-01-10 18:00:00.000000', '2018-02-11 16:51:39.903800', 0),
(2, 'Robiul Alam', 'robiul', 'e10adc3949ba59abbe56e057f20f883e', '2', '2018-02-07 18:00:00.000000', '2018-02-11 16:51:36.942149', 1);

-- --------------------------------------------------------

--
-- Table structure for table `mms_fixed_cost`
--

CREATE TABLE `mms_fixed_cost` (
  `id` int(11) NOT NULL,
  `home_rent` int(11) DEFAULT '0',
  `electricity_bill` int(11) DEFAULT '0',
  `internet_bill` int(11) DEFAULT '0',
  `dust_bill` int(11) DEFAULT '0',
  `house_maid_bill` int(11) DEFAULT '0',
  `gas_bill` int(11) DEFAULT '0',
  `cable_line_bill` int(11) DEFAULT '0',
  `service_bill` int(11) DEFAULT '0',
  `extra_bill` int(11) DEFAULT '0',
  `extra_desc` varchar(45) DEFAULT 'N/A',
  `month_of` int(11) DEFAULT '0',
  `year_of` int(11) DEFAULT '0',
  `entry_by` int(11) NOT NULL,
  `approve_by` int(11) NOT NULL,
  `entry_date` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `mms_meal`
--

CREATE TABLE `mms_meal` (
  `meal_id` int(11) NOT NULL,
  `boarder_id` int(11) DEFAULT NULL,
  `total_meal` int(11) DEFAULT NULL,
  `note` varchar(200) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `entry_by` int(11) DEFAULT NULL,
  `update_by` int(11) DEFAULT NULL,
  `approve_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `mms_reguler_cost`
--

CREATE TABLE `mms_reguler_cost` (
  `id` int(11) NOT NULL,
  `title` varchar(45) NOT NULL,
  `descp` text NOT NULL,
  `amount` int(11) NOT NULL DEFAULT '0',
  `entry_date` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `entry_by` int(11) NOT NULL,
  `approved_by` int(11) DEFAULT '0',
  `month_of` int(11) NOT NULL,
  `year_of` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `mms_tbl_admin`
--

CREATE TABLE `mms_tbl_admin` (
  `adminId` int(11) NOT NULL,
  `adminName` varchar(255) NOT NULL,
  `adminUser` varchar(255) NOT NULL,
  `adminEmail` varchar(255) NOT NULL,
  `adminPass` varchar(255) NOT NULL,
  `level` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `mms_tbl_admin`
--

INSERT INTO `mms_tbl_admin` (`adminId`, `adminName`, `adminUser`, `adminEmail`, `adminPass`, `level`) VALUES
(1, 'Robiul Alam', 'admin', 'admin@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `mms_borders`
--
ALTER TABLE `mms_borders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mms_fixed_cost`
--
ALTER TABLE `mms_fixed_cost`
  ADD PRIMARY KEY (`id`),
  ADD KEY `entry_by_fk_idx` (`entry_by`),
  ADD KEY `approve_by_fk_idx` (`approve_by`);

--
-- Indexes for table `mms_meal`
--
ALTER TABLE `mms_meal`
  ADD PRIMARY KEY (`meal_id`),
  ADD KEY `meal_fk_boarder_id_idx` (`boarder_id`);

--
-- Indexes for table `mms_reguler_cost`
--
ALTER TABLE `mms_reguler_cost`
  ADD PRIMARY KEY (`id`),
  ADD KEY `entryFK_idx` (`entry_by`),
  ADD KEY `approvedFK_idx` (`approved_by`);

--
-- Indexes for table `mms_tbl_admin`
--
ALTER TABLE `mms_tbl_admin`
  ADD PRIMARY KEY (`adminId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `mms_borders`
--
ALTER TABLE `mms_borders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `mms_fixed_cost`
--
ALTER TABLE `mms_fixed_cost`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `mms_meal`
--
ALTER TABLE `mms_meal`
  MODIFY `meal_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `mms_reguler_cost`
--
ALTER TABLE `mms_reguler_cost`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `mms_tbl_admin`
--
ALTER TABLE `mms_tbl_admin`
  MODIFY `adminId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `mms_fixed_cost`
--
ALTER TABLE `mms_fixed_cost`
  ADD CONSTRAINT `approve_by_fk` FOREIGN KEY (`approve_by`) REFERENCES `mms_borders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `entry_by_fk` FOREIGN KEY (`entry_by`) REFERENCES `mms_borders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `mms_meal`
--
ALTER TABLE `mms_meal`
  ADD CONSTRAINT `meal_fk_boarder_id` FOREIGN KEY (`boarder_id`) REFERENCES `mms_borders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `mms_reguler_cost`
--
ALTER TABLE `mms_reguler_cost`
  ADD CONSTRAINT `approvedFK` FOREIGN KEY (`approved_by`) REFERENCES `mms_borders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `entryFK` FOREIGN KEY (`entry_by`) REFERENCES `mms_borders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
