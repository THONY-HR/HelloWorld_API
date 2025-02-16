-- CreateTable
CREATE TABLE `Communaute` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pays` VARCHAR(50) NOT NULL,
    `localisation` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Utilisateur` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nomComplet` VARCHAR(100) NOT NULL,
    `mail` VARCHAR(100) NOT NULL,
    `motDePasse` CHAR(60) NOT NULL,
    `imageUrl` VARCHAR(2083) NULL,
    `videoUrl` VARCHAR(2083) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `idCommunaute` INTEGER NOT NULL,

    UNIQUE INDEX `Utilisateur_mail_key`(`mail`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categorie` (
    `id` TINYINT NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `Categorie_nom_key`(`nom`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SousCommunaute` (
    `id` MEDIUMINT NOT NULL AUTO_INCREMENT,
    `idCommunaute` INTEGER NOT NULL,
    `idCategorie` TINYINT NOT NULL,
    `nom` VARCHAR(50) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Publication` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titre` VARCHAR(100) NOT NULL,
    `contenu` TEXT NOT NULL,
    `idUtilisateur` INTEGER NOT NULL,
    `idSousCommunaute` MEDIUMINT NOT NULL,
    `mediaUrl` VARCHAR(2083) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DiscussionSousCommunaute` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `message` TEXT NOT NULL,
    `idUtilisateur` INTEGER NOT NULL,
    `idSousCommunaute` MEDIUMINT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ReactionPub` (
    `idPublication` INTEGER NOT NULL,
    `idUtilisateur` INTEGER NOT NULL,

    PRIMARY KEY (`idPublication`, `idUtilisateur`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CommentairePub` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `contenu` TEXT NOT NULL,
    `idPublication` INTEGER NOT NULL,
    `idUtilisateur` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RejoindreSousCommunaute` (
    `idSousCommunaute` MEDIUMINT NOT NULL,
    `idUtilisateur` INTEGER NOT NULL,
    `joined_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`idSousCommunaute`, `idUtilisateur`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Utilisateur` ADD CONSTRAINT `Utilisateur_idCommunaute_fkey` FOREIGN KEY (`idCommunaute`) REFERENCES `Communaute`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SousCommunaute` ADD CONSTRAINT `SousCommunaute_idCommunaute_fkey` FOREIGN KEY (`idCommunaute`) REFERENCES `Communaute`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SousCommunaute` ADD CONSTRAINT `SousCommunaute_idCategorie_fkey` FOREIGN KEY (`idCategorie`) REFERENCES `Categorie`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Publication` ADD CONSTRAINT `Publication_idUtilisateur_fkey` FOREIGN KEY (`idUtilisateur`) REFERENCES `Utilisateur`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Publication` ADD CONSTRAINT `Publication_idSousCommunaute_fkey` FOREIGN KEY (`idSousCommunaute`) REFERENCES `SousCommunaute`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DiscussionSousCommunaute` ADD CONSTRAINT `DiscussionSousCommunaute_idUtilisateur_fkey` FOREIGN KEY (`idUtilisateur`) REFERENCES `Utilisateur`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DiscussionSousCommunaute` ADD CONSTRAINT `DiscussionSousCommunaute_idSousCommunaute_fkey` FOREIGN KEY (`idSousCommunaute`) REFERENCES `SousCommunaute`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReactionPub` ADD CONSTRAINT `ReactionPub_idPublication_fkey` FOREIGN KEY (`idPublication`) REFERENCES `Publication`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReactionPub` ADD CONSTRAINT `ReactionPub_idUtilisateur_fkey` FOREIGN KEY (`idUtilisateur`) REFERENCES `Utilisateur`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommentairePub` ADD CONSTRAINT `CommentairePub_idPublication_fkey` FOREIGN KEY (`idPublication`) REFERENCES `Publication`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommentairePub` ADD CONSTRAINT `CommentairePub_idUtilisateur_fkey` FOREIGN KEY (`idUtilisateur`) REFERENCES `Utilisateur`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RejoindreSousCommunaute` ADD CONSTRAINT `RejoindreSousCommunaute_idSousCommunaute_fkey` FOREIGN KEY (`idSousCommunaute`) REFERENCES `SousCommunaute`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RejoindreSousCommunaute` ADD CONSTRAINT `RejoindreSousCommunaute_idUtilisateur_fkey` FOREIGN KEY (`idUtilisateur`) REFERENCES `Utilisateur`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
