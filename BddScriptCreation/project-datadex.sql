-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : ven. 30 avr. 2021 à 19:21
-- Version du serveur :  5.7.31
-- Version de PHP : 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `project-datadex`
--

-- --------------------------------------------------------

--
-- Structure de la table `listetype`
--

DROP TABLE IF EXISTS `listetype`;
CREATE TABLE IF NOT EXISTS `listetype` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `Type` varchar(255) NOT NULL,
  `Immunite` varchar(255) DEFAULT NULL,
  `Forces` varchar(255) DEFAULT NULL,
  `Faible` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `Id` (`ID`),
  UNIQUE KEY `Type` (`Type`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `listetype`
--

INSERT INTO `listetype` (`ID`, `Type`, `Immunite`, `Forces`, `Faible`) VALUES
(1, 'Normal', 'Spectre', 'Roche,Acier', 'Combat'),
(2, 'Plante', '', 'Eau,Electrik,Plante,Sol', 'Feu,Glace,Insecte,Poison,Vol'),
(3, 'Feu', '', 'Feu,Insecte,Plante,Acier,Glace', 'Eau,Roche,Sol'),
(4, 'Eau', '', 'Acier,Eau', 'Electrik,Plante,Glace'),
(5, 'Electrik', '', 'Acier,Electrik,Vol', 'Sol'),
(6, 'Vol', '', 'Comat,Insecte,PLante', 'Electrik,Glace,Roche'),
(7, 'Insecte', '', 'Combat,Plante,Sol', 'Feu,Poison,Roche,Vol'),
(8, 'Roche', '', 'Feu,Noral,Poison,Vol', 'Acier,Combat,Eau,Plante,Sol'),
(9, 'Sol', 'Electrik', 'Poison,Roche', 'Eau,Glace,Plante'),
(10, 'Psy', 'Spectre', 'Combat,Spy', 'Insecte'),
(11, 'Poison', '', 'Combat,Plante,Poison', 'Insecte,Psy,Sol'),
(12, 'Spectre', 'Combat,Normal', 'Insecte,boisson', 'Spectre'),
(13, 'Ténèbres', 'Psy', 'Spectre,Ténèbre', 'Combat,Insecte'),
(14, 'Acier', 'Poison', 'Acier,Normal', 'Colbat,feu'),
(15, 'Combat', 'Dragon', NULL, 'Combat feu sol'),
(16, 'Glace', '', 'Plante,Sol,Vol,Dragon', 'Feu,Eau,Acier'),
(17, 'Dragon', '', 'Dragon', 'Acier'),
(18, 'Fée', 'Dragon', 'Glace,Dragon,ténèbre', 'Feu,Poison,Acier');

-- --------------------------------------------------------

--
-- Structure de la table `pokemon`
--

DROP TABLE IF EXISTS `pokemon`;
CREATE TABLE IF NOT EXISTS `pokemon` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `Nom` varchar(255) NOT NULL,
  `Type` varchar(255) NOT NULL,
  `EvolutionStep` enum('non','1','2','3') DEFAULT NULL,
  `Image` varchar(255) NOT NULL,
  `IDUser` bigint(20) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`),
  KEY `IDBox` (`IDUser`),
  KEY `Type` (`Type`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `Email` varchar(255) NOT NULL,
  `Mdp` varchar(255) NOT NULL,
  `Pseudo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `Email` (`Email`),
  UNIQUE KEY `Pseudo` (`Pseudo`),
  KEY `ID` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=latin1;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `pokemon`
--
ALTER TABLE `pokemon`
  ADD CONSTRAINT `pokemon_ibfk_3` FOREIGN KEY (`IDUser`) REFERENCES `user` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pokemon_ibfk_4` FOREIGN KEY (`Type`) REFERENCES `listetype` (`Type`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
