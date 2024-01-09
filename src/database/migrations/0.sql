-- ------------------------------
-- Create tables
-- ------------------------------

CREATE TABLE `app_user` (
  `id`        INT NOT NULL AUTO_INCREMENT,
  `createdAt` DATETIME NOT NULL,
  `lastSignedInAt` DATETIME,
  `name` VARCHAR(255) NOT NULL,
  `username`  VARCHAR(32) NOT NULL,
  `password`  VARCHAR(255) NOT NULL,
  `role`      ENUM('admin','viewer') NOT NULL,
  `enabled`   BOOLEAN NOT NULL DEFAULT true,
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 ENGINE=InnoDB;

-- ------------------------------
-- Seed with data
-- ------------------------------

-- Users
-- No users to seed ... insert them manually instead ...
