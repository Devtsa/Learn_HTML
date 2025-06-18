// ====================================================================
// Fichier : script.js
// Description : Fonctions JavaScript pour la bibliothèque numérique
// Auteur : Votre Nom / Votre Organisation
// Date : 26 Octobre 2023
// ====================================================================

// --- 1. Données des Livres (simulation d'une base de données) ---
// Normalement, ces données viendraient d'une API ou d'une base de données backend.
const books = [
    {
        id: 'book-1',
        title: 'L\'Aube des Possibles',
        author: 'Jeanne Dupont',
        description: 'Un roman de science-fiction dystopique qui explore les limites de l\'humanité face au progrès technologique et l\'impact de l\'IA sur nos sociétés futures. Captivant et stimulant.',
        formats: ['EPUB', 'PDF'],
        price: 9.99,
        image: 'https://via.placeholder.com/150x200?text=L\'Aube+des+Possibles',
        category: 'Science-fiction'
    },
    {
        id: 'book-2',
        title: 'Le Murmure des Anciens',
        author: 'Marc Dubois',
        description: 'Une épopée fantastique où un jeune héros découvre un monde oublié et des pouvoirs ancestraux pour combattre une menace imminente. Des créatures mythiques et des quêtes épiques.',
        formats: ['EPUB', 'MOBI'],
        price: 12.50,
        image: 'https://via.placeholder.com/150x200?text=Le+Murmure+des+Anciens',
        category: 'Fantaisie'
    },
    {
        id: 'book-3',
        title: 'L\'Art de la Sérénité Digitale',
        author: 'Sophie Lefevre',
        description: 'Un guide pratique pour trouver l\'équilibre et la paix intérieure dans un monde hyperconnecté. Apprenez à gérer le stress numérique et à vous reconnecter avec l\'essentiel.',
        formats: ['PDF'],
        price: 7.99,
        image: 'https://via.placeholder.com/150x200?text=La+Serenite+Digitale',
        category: 'Développement Personnel'
    },
    {
        id: 'book-4',
        title: 'Chroniques Urbaines',
        author: 'David Martin',
        description: 'Un recueil de nouvelles explorant la vie quotidienne dans une grande ville, ses joies, ses peines et ses rencontres inattendues. Un regard poignant sur l\'humanité.',
        formats: ['EPUB'],
        price: 8.50,
        image: 'https://via.placeholder.com/150x200?text=Chroniques+Urbaines',
        category: 'Fiction'
    },
    {
        id: 'book-5',
        title: 'Voyage au Coeur de la Matière',
        author: 'Dr. Émilie Moreau',
        description: 'Un ouvrage fascinant qui vulgarise les concepts de la physique quantique et de la cosmologie. Idéal pour les curieux de l\'univers et de ses mystères.',
        formats: ['PDF', 'EPUB'],
        price: 15.00,
        image: 'https://via.placeholder.com/150x200?text=La+Matiere',
        category: 'Sciences'
    },
    {
        id: 'book-6',
        title: 'Les Recettes du Bonheur',
        author: 'Chef Louis Petit',
        description: 'Un livre de cuisine rempli de recettes simples et savoureuses pour régaler toute la famille. Des plats traditionnels aux créations modernes, il y en a pour tous les goûts.',
        formats: ['PDF'],
        price: 10.99,
        image: 'https://via.placeholder.com/150x200?text=Recettes+Bonheur',
        category: 'Cuisine & Recettes'
    },
    {
        id: 'book-7',
        title: 'L\'Héritage des Étoiles',
        author: 'Clara Delattre',
        description: 'Un roman de science-fiction post-apocalyptique où les survivants d\'une catastrophe explorent les ruines d\'un monde jadis florissant, à la recherche de leur passé et de leur futur.',
        formats: ['EPUB', 'MOBI'],
        price: 11.25,
        image: 'https://via.placeholder.com/150x200?text=L\'Heritage+des+Etoiles',
        category: 'Science-fiction'
    },
    {
        id: 'book-8',
        title: 'Le Secret de la Forêt Oubliée',
        author: 'Alice Lambert',
        description: 'Une aventure fantastique pour les jeunes lecteurs, pleine de mystères, d\'amitié et de créatures magiques. Un voyage initiatique au cœur d\'une forêt enchantée.',
        formats: ['EPUB', 'PDF'],
        price: 6.99,
        image: 'https://via.placeholder.com/150x200?text=Foret+Oubliee',
        category: 'Jeunesse'
    },
    {
        id: 'book-9',
        title: 'L\'Étoile du Nord',
        author: 'Julien Renard',
        description: 'Un thriller psychologique haletant où un détective doit résoudre un mystère complexe avant qu\'il ne soit trop tard. Suspense garanti jusqu\'à la dernière page.',
        formats: ['EPUB'],
        price: 13.99,
        image: 'https://via.placeholder.com/150x200?text=L\'Etoile+du+Nord',
        category: 'Thriller'
    }
];

let cartItemCount = 0; // Compteur d'articles dans le panier
const cartCountElement = document.querySelector('#panier'); // Élément du panier dans le header

// --- 2. Fonction pour Afficher les Livres ---
function renderBooks(booksToRender) {
    const bookGrid = document.querySelector('.book-grid');
    bookGrid.innerHTML = ''; // Nettoie la grille avant d'ajouter de nouveaux livres

    if (booksToRender.length === 0) {
        bookGrid.innerHTML = '<p class="no-results">Aucun livre trouvé correspondant à votre recherche ou filtre.</p>';
        return;
    }

    booksToRender.forEach(book => {
        const article = document.createElement('article');
        article.classList.add('book-item');
        article.setAttribute('data-category', book.category); // Ajoute la catégorie comme attribut de données

        article.innerHTML = `
            <img src="${book.image}" alt="Couverture du livre '${book.title}'">
            <h3>${book.title}</h3>
            <p class="author">Par ${book.author}</p>
            <p class="description">${book.description}</p>
            <p class="format">Format(s) : ${book.formats.join(', ')}</p>
            <p class="price"><strong>${book.price.toFixed(2)} €</strong></p>
            <a href="#" class="btn-details" data-book-id="${book.id}">Voir Détails</a>
            <button class="btn-add-to-cart" data-book-id="${book.id}">Ajouter au panier</button>
        `;
        bookGrid.appendChild(article);
    });

    // Ajoute les écouteurs d'événements après le rendu des livres
    addBookEventListeners();
}

// --- 3. Gestionnaire d'Événements pour les boutons des livres ---
function addBookEventListeners() {
    // Boutons "Ajouter au panier"
    document.querySelectorAll('.btn-add-to-cart').forEach(button => {
        button.addEventListener('click', (event) => {
            const bookId = event.target.dataset.bookId;
            addToCart(bookId);
            // Optionnel : feedback visuel (ex: "Ajouté au panier!")
            event.target.textContent = 'Ajouté !';
            event.target.disabled = true; // Désactive le bouton pour éviter des ajouts multiples rapides
            setTimeout(() => {
                event.target.textContent = 'Ajouter au panier';
                event.target.disabled = false;
            }, 1500);
        });
    });

    // Boutons "Voir Détails"
    document.querySelectorAll('.btn-details').forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault(); // Empêche le défilement vers l'ancre
            const bookId = event.target.dataset.bookId;
            showBookDetails(bookId);
        });
    });
}

// --- 4. Fonction d'Ajout au Panier ---
function addToCart(bookId) {
    cartItemCount++;
    cartCountElement.textContent = `Panier (${cartItemCount})`;
    console.log(`Livre ID: ${bookId} ajouté au panier. Total: ${cartItemCount}`);
    // Ici, on pourrait stocker les éléments du panier dans localStorage ou une session
    // et envoyer les données à un backend pour une gestion réelle du panier.
}

// --- 5. Fonction de Recherche de Livres ---
function searchBooks() {
    const searchInput = document.getElementById('search-input');
    const searchTerm = searchInput.value.toLowerCase();

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm) ||
        book.description.toLowerCase().includes(searchTerm) ||
        book.category.toLowerCase().includes(searchTerm)
    );
    renderBooks(filteredBooks);
}

// --- 6. Fonction de Filtrage par Catégorie ---
function filterByCategory(category) {
    let filteredBooks;
    if (category === 'all') {
        filteredBooks = books;
    } else {
        filteredBooks = books.filter(book => book.category.toLowerCase() === category.toLowerCase());
    }
    renderBooks(filteredBooks);

    // Mettre en évidence la catégorie active
    document.querySelectorAll('#categories ul li a').forEach(link => {
        link.classList.remove('active-category');
    });
    // Trouver le lien correspondant et lui ajouter la classe
    const activeLink = document.querySelector(`#categories ul li a[data-category="${category.toLowerCase()}"]`);
    if (activeLink) {
        activeLink.classList.add('active-category');
    }
}

// --- 7. Gestion de la Modale de Détails du Livre ---
const modal = document.createElement('div');
modal.classList.add('book-modal');
modal.setAttribute('aria-hidden', 'true'); // Pour l'accessibilité
modal.innerHTML = `
    <div class="modal-content">
        <span class="close-button">×</span>
        <div class="modal-body">
            <!-- Le contenu du livre sera injecté ici -->
        </div>
    </div>
`;
document.body.appendChild(modal); // Ajoute la modale au corps du document

const modalBody = modal.querySelector('.modal-body');
const closeButton = modal.querySelector('.close-button');

function showBookDetails(bookId) {
    const book = books.find(b => b.id === bookId);
    if (!book) return;

    modalBody.innerHTML = `
        <img src="${book.image}" alt="Couverture du livre '${book.title}'">
        <h2>${book.title}</h2>
        <p><strong>Auteur :</strong> ${book.author}</p>
        <p><strong>Description :</strong> ${book.description}</p>
        <p><strong>Format(s) :</strong> ${book.formats.join(', ')}</p>
        <p class="modal-price"><strong>Prix : ${book.price.toFixed(2)} €</strong></p>
        <button class="btn-add-to-cart-modal" data-book-id="${book.id}">Ajouter au panier</button>
    `;

    // Ajoute l'écouteur pour le bouton "Ajouter au panier" de la modale
    modalBody.querySelector('.btn-add-to-cart-modal').addEventListener('click', (event) => {
        addToCart(event.target.dataset.bookId);
        event.target.textContent = 'Ajouté !';
        event.target.disabled = true;
        setTimeout(() => {
            event.target.textContent = 'Ajouter au panier';
            event.target.disabled = false;
        }, 1500);
    });

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll'); // Empêche le défilement du corps
}

function closeBookDetails() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
}

closeButton.addEventListener('click', closeBookDetails);
// Fermer la modale en cliquant en dehors du contenu
modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeBookDetails();
    }
});
// Fermer la modale avec la touche Échap
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('is-open')) {
        closeBookDetails();
    }
});


// --- 8. Événements au Chargement du DOM ---
document.addEventListener('DOMContentLoaded', () => {
    // Rend tous les livres au chargement initial de la page
    renderBooks(books);

    // Écouteur pour la barre de recherche
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', searchBooks); // Recherche en temps réel
    document.querySelector('#recherche form').addEventListener('submit', (event) => {
        event.preventDefault(); // Empêche le rechargement de la page
        searchBooks();
    });

    // Écouteurs pour les liens de catégories
    const categoryLinksContainer = document.querySelector('#categories ul');
    categoryLinksContainer.addEventListener('click', (event) => {
        if (event.target.tagName === 'A') {
            event.preventDefault();
            const category = event.target.getAttribute('href').substring(5); // Retire "#cat-"
            filterByCategory(category);
            // Scroll vers la section des livres après le filtrage
            document.getElementById('livres-numeriques').scrollIntoView({ behavior: 'smooth' });
        }
    });

    // Ajouter une catégorie "Tous les Livres" dans la navigation pour réinitialiser les filtres
    const allBooksLink = document.querySelector('a[href="#livres-numeriques"]');
    if (allBooksLink) {
        allBooksLink.addEventListener('click', (event) => {
            event.preventDefault();
            filterByCategory('all');
            document.getElementById('livres-numeriques').scrollIntoView({ behavior: 'smooth' });
        });
    }
    // Pour que la catégorie "Tous les Livres" fonctionne via le lien direct
    const voirTousLesLivresLink = document.querySelector('#livres-numeriques p a');
    if (voirTousLesLivresLink) {
        voirTousLesLivresLink.addEventListener('click', (event) => {
            event.preventDefault();
            filterByCategory('all');
            document.getElementById('livres-numeriques').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Ajoute un attribut data-category aux liens de catégorie pour un meilleur contrôle JS
    document.querySelectorAll('#categories ul li a').forEach(link => {
        const href = link.getAttribute('href');
        const categoryName = href.substring(5); // Ex: "#cat-fiction" -> "fiction"
        link.setAttribute('data-category', categoryName.toLowerCase());
    });
    
    // Initialise l'état actif pour "Tous les Livres" si présent au chargement
    if (allBooksLink) {
        allBooksLink.classList.add('active-category');
    }
});
