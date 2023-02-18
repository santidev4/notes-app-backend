-- CreateTable
CREATE TABLE "Categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoriesToNotes" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoriesToNotes_AB_unique" ON "_CategoriesToNotes"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoriesToNotes_B_index" ON "_CategoriesToNotes"("B");

-- AddForeignKey
ALTER TABLE "_CategoriesToNotes" ADD CONSTRAINT "_CategoriesToNotes_A_fkey" FOREIGN KEY ("A") REFERENCES "Categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoriesToNotes" ADD CONSTRAINT "_CategoriesToNotes_B_fkey" FOREIGN KEY ("B") REFERENCES "Notes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
