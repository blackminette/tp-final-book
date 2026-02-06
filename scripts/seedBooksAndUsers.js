const { User, Book, sequelize } = require("../models");
const bcrypt = require("bcryptjs");

async function seed() {
    await sequelize.sync({ force: true }); // Attention : supprime toutes les données existantes


    // Utilisateurs crédibles (nom, prénom, email, username)
    const userInfos = [
        { firstName: "Alice", lastName: "Martin", email: "alice.martin@email.com" },
        { firstName: "Lucas", lastName: "Dubois", email: "lucas.dubois@email.com" },
        { firstName: "Emma", lastName: "Bernard", email: "emma.bernard@email.com" },
        { firstName: "Hugo", lastName: "Lefevre", email: "hugo.lefevre@email.com" },
        { firstName: "Chloé", lastName: "Moreau", email: "chloe.moreau@email.com" },
    ];
    const users = [];
    for (const info of userInfos) {
        const user = await User.create({
            email: info.email,
            password: await bcrypt.hash("password", 10),
            username: `${info.firstName} ${info.lastName}`,
        });
        users.push(user);
    }


    // Liste de livres connus (titre, auteur, année, genre, isbn, description)
    const booksData = [
        { title: "1984", author: "George Orwell", year: 1949, genre: "Dystopie", isbn: "978-0451524935", description: "Un roman d'anticipation sur une société totalitaire." },
        { title: "Le Petit Prince", author: "Antoine de Saint-Exupéry", year: 1943, genre: "Conte", isbn: "978-0156013987", description: "Un conte poétique et philosophique mondialement connu." },
        { title: "Harry Potter à l'école des sorciers", author: "J.K. Rowling", year: 1997, genre: "Fantastique", isbn: "978-2070643028", description: "Le début de la saga du jeune sorcier Harry Potter." },
        { title: "L'Étranger", author: "Albert Camus", year: 1942, genre: "Roman", isbn: "978-2070360024", description: "Un roman majeur de la littérature française du XXe siècle." },
        { title: "Le Seigneur des Anneaux", author: "J.R.R. Tolkien", year: 1954, genre: "Fantasy", isbn: "978-0261102385", description: "La grande épopée de la Terre du Milieu." },
        { title: "Fahrenheit 451", author: "Ray Bradbury", year: 1953, genre: "Science-fiction", isbn: "978-2070368228", description: "Un roman sur une société où les livres sont interdits." },
        { title: "Orgueil et Préjugés", author: "Jane Austen", year: 1813, genre: "Roman", isbn: "978-0141439518", description: "Un classique de la littérature anglaise." },
        { title: "Le Comte de Monte-Cristo", author: "Alexandre Dumas", year: 1844, genre: "Aventure", isbn: "978-2070409181", description: "L'histoire d'une vengeance légendaire." },
        { title: "Les Misérables", author: "Victor Hugo", year: 1862, genre: "Roman", isbn: "978-2070409182", description: "Un chef-d'œuvre sur la misère et la rédemption." },
        { title: "Da Vinci Code", author: "Dan Brown", year: 2003, genre: "Thriller", isbn: "978-0307474278", description: "Un thriller ésotérique à succès mondial." },
        { title: "Le Nom de la rose", author: "Umberto Eco", year: 1980, genre: "Policier", isbn: "978-2070409183", description: "Un polar médiéval érudit et captivant." },
        { title: "La Peste", author: "Albert Camus", year: 1947, genre: "Roman", isbn: "978-2070360420", description: "Un roman sur l'humanité face à l'épidémie." },
        { title: "Le Parfum", author: "Patrick Süskind", year: 1985, genre: "Roman", isbn: "978-2070409184", description: "L'histoire d'un parfumeur meurtrier au XVIIIe siècle." },
        { title: "L'Alchimiste", author: "Paulo Coelho", year: 1988, genre: "Roman initiatique", isbn: "978-0061122415", description: "Un conte philosophique sur la quête de soi." },
        { title: "Shining", author: "Stephen King", year: 1977, genre: "Horreur", isbn: "978-0307743657", description: "Un roman d'horreur dans un hôtel isolé." },
        { title: "Le Vieil Homme et la mer", author: "Ernest Hemingway", year: 1952, genre: "Roman", isbn: "978-2070360536", description: "Un vieux pêcheur face à la mer et à lui-même." },
        { title: "L'Attrape-cœurs", author: "J.D. Salinger", year: 1951, genre: "Roman", isbn: "978-0316769488", description: "Le roman culte de l'adolescence américaine." },
        { title: "Le Hobbit", author: "J.R.R. Tolkien", year: 1937, genre: "Fantasy", isbn: "978-0261102217", description: "L'aventure de Bilbo avant Le Seigneur des Anneaux." },
        { title: "La Nuit des temps", author: "René Barjavel", year: 1968, genre: "Science-fiction", isbn: "978-2266168761", description: "Un roman d'amour et d'anticipation." },
        { title: "Le Rouge et le Noir", author: "Stendhal", year: 1830, genre: "Roman", isbn: "978-2070360024-1", description: "L'ascension et la chute de Julien Sorel." },
        { title: "Moby Dick", author: "Herman Melville", year: 1851, genre: "Aventure", isbn: "978-1503280786", description: "La chasse obsessionnelle d'un cachalot blanc." },
    ];

    // Répartition : certains users ont 2, d'autres 3, d'autres 4 livres
    const repartition = [2, 3, 4, 2, 3, 2, 4, 2, 3, 3];
    let bookIndex = 0;
    for (let i = 0; i < users.length; i++) {
        for (let j = 0; j < repartition[i]; j++) {
            if (bookIndex >= booksData.length) break;
            const book = booksData[bookIndex];
            await Book.create({ ...book, userId: users[i].id });
            bookIndex++;
        }
    }

    console.log("10 utilisateurs et 30 livres créés !");
    process.exit();
}

seed().catch((err) => {
    console.error(err);
    process.exit(1);
});
