-- CreateTable
CREATE TABLE "Communaute" (
    "id" SERIAL NOT NULL,
    "pays" VARCHAR(50) NOT NULL,
    "localisation" VARCHAR(100) NOT NULL,
    "imageUrl" VARCHAR(2083),

    CONSTRAINT "Communaute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Utilisateur" (
    "id" SERIAL NOT NULL,
    "nomComplet" VARCHAR(100) NOT NULL,
    "pseudo" VARCHAR(70) NOT NULL,
    "mail" VARCHAR(100) NOT NULL,
    "imageUrl" VARCHAR(2083),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "idCommunaute" INTEGER NOT NULL,

    CONSTRAINT "Utilisateur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categorie" (
    "id" SMALLSERIAL NOT NULL,
    "nom" VARCHAR(50) NOT NULL,

    CONSTRAINT "Categorie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SousCommunaute" (
    "id" SERIAL NOT NULL,
    "idCommunaute" INTEGER NOT NULL,
    "idCategorie" SMALLINT NOT NULL,
    "nom" VARCHAR(50) NOT NULL,
    "idUtilisateur" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "SousCommunaute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Publication" (
    "id" SERIAL NOT NULL,
    "titre" VARCHAR(255) NOT NULL,
    "contenu" TEXT NOT NULL,
    "idUtilisateur" INTEGER NOT NULL,
    "idSousCommunaute" INTEGER NOT NULL,
    "mediaUrl" VARCHAR(2083),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Publication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiscussionSousCommunaute" (
    "id" BIGSERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "idUtilisateur" INTEGER NOT NULL,
    "idSousCommunaute" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "DiscussionSousCommunaute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReactionPub" (
    "idPublication" INTEGER NOT NULL,
    "idUtilisateur" INTEGER NOT NULL,

    CONSTRAINT "ReactionPub_pkey" PRIMARY KEY ("idPublication","idUtilisateur")
);

-- CreateTable
CREATE TABLE "CommentairePub" (
    "id" SERIAL NOT NULL,
    "contenu" TEXT NOT NULL,
    "idPublication" INTEGER NOT NULL,
    "idUtilisateur" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "CommentairePub_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RejoindreSousCommunaute" (
    "idSousCommunaute" INTEGER NOT NULL,
    "idUtilisateur" INTEGER NOT NULL,
    "joined_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RejoindreSousCommunaute_pkey" PRIMARY KEY ("idSousCommunaute","idUtilisateur")
);

-- CreateIndex
CREATE UNIQUE INDEX "Communaute_pays_key" ON "Communaute"("pays");

-- CreateIndex
CREATE UNIQUE INDEX "Utilisateur_pseudo_key" ON "Utilisateur"("pseudo");

-- CreateIndex
CREATE UNIQUE INDEX "Utilisateur_mail_key" ON "Utilisateur"("mail");

-- CreateIndex
CREATE UNIQUE INDEX "Categorie_nom_key" ON "Categorie"("nom");

-- AddForeignKey
ALTER TABLE "Utilisateur" ADD CONSTRAINT "Utilisateur_idCommunaute_fkey" FOREIGN KEY ("idCommunaute") REFERENCES "Communaute"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SousCommunaute" ADD CONSTRAINT "SousCommunaute_idCommunaute_fkey" FOREIGN KEY ("idCommunaute") REFERENCES "Communaute"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SousCommunaute" ADD CONSTRAINT "SousCommunaute_idCategorie_fkey" FOREIGN KEY ("idCategorie") REFERENCES "Categorie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SousCommunaute" ADD CONSTRAINT "SousCommunaute_idUtilisateur_fkey" FOREIGN KEY ("idUtilisateur") REFERENCES "Utilisateur"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Publication" ADD CONSTRAINT "Publication_idUtilisateur_fkey" FOREIGN KEY ("idUtilisateur") REFERENCES "Utilisateur"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Publication" ADD CONSTRAINT "Publication_idSousCommunaute_fkey" FOREIGN KEY ("idSousCommunaute") REFERENCES "SousCommunaute"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiscussionSousCommunaute" ADD CONSTRAINT "DiscussionSousCommunaute_idUtilisateur_fkey" FOREIGN KEY ("idUtilisateur") REFERENCES "Utilisateur"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiscussionSousCommunaute" ADD CONSTRAINT "DiscussionSousCommunaute_idSousCommunaute_fkey" FOREIGN KEY ("idSousCommunaute") REFERENCES "SousCommunaute"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReactionPub" ADD CONSTRAINT "ReactionPub_idPublication_fkey" FOREIGN KEY ("idPublication") REFERENCES "Publication"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReactionPub" ADD CONSTRAINT "ReactionPub_idUtilisateur_fkey" FOREIGN KEY ("idUtilisateur") REFERENCES "Utilisateur"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentairePub" ADD CONSTRAINT "CommentairePub_idPublication_fkey" FOREIGN KEY ("idPublication") REFERENCES "Publication"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentairePub" ADD CONSTRAINT "CommentairePub_idUtilisateur_fkey" FOREIGN KEY ("idUtilisateur") REFERENCES "Utilisateur"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RejoindreSousCommunaute" ADD CONSTRAINT "RejoindreSousCommunaute_idSousCommunaute_fkey" FOREIGN KEY ("idSousCommunaute") REFERENCES "SousCommunaute"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RejoindreSousCommunaute" ADD CONSTRAINT "RejoindreSousCommunaute_idUtilisateur_fkey" FOREIGN KEY ("idUtilisateur") REFERENCES "Utilisateur"("id") ON DELETE CASCADE ON UPDATE CASCADE;
