// ====================================================================
// Fichier : script.js
// Description : Fonctions JavaScript pour la bibliothèque numérique
// Auteur : Votre Nom / Votre Organisation
// Date : 26 Octobre 2023
// ====================================================================

// --- 1. Données des Livres (simulation d'une base de données) ---
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

// --- Variables Globales pour le Panier et le Paiement ---
let cart = []; // Tableau pour stocker les objets livres dans le panier
let totalAmount = 0;
let customerInfo = {};

// Références aux éléments DOM essentiels
const cartItemCountElement = document.getElementById('cart-item-count');
const cartLinkElement = document.getElementById('panier-link');
const bookGrid = document.querySelector('.book-grid');

// Éléments du panier et du paiement
const checkoutSection = document.getElementById('checkout');
const cartSummaryDiv = document.getElementById('cart-summary');
const emptyCartMessage = document.getElementById('empty-cart-message');
const cartItemsTable = document.getElementById('cart-items-table');
const cartTableBody = cartItemsTable.querySelector('tbody');
const cartTotalPriceElement = document.getElementById('cart-total-price');
const proceedToPaymentBtn = document.getElementById('proceed-to-payment-btn');

const customerInfoFormDiv = document.getElementById('customer-info-form');
const paymentInfoForm = document.getElementById('payment-info-form');
const buyerNameInput = document.getElementById('buyer-name');
const phoneNumberInput = document.getElementById('phone-number');
const backToCartBtn = document.getElementById('back-to-cart-btn');

const mobileMoneyInstructionsDiv = document.getElementById('mobile-money-instructions');
const paymentAmountSpan = document.getElementById('payment-amount');
const transactionCodeForm = document.getElementById('transaction-code-form');
const transactionCodeInput = document.getElementById('transaction-code');
const cancelPaymentBtn = document.getElementById('cancel-payment-btn');

const paymentSuccessMessageDiv = document.getElementById('payment-success-message');
const continueShoppingBtn = document.getElementById('continue-shopping-btn');

const paymentErrorMessageDiv = document.getElementById('payment-error-message');
const errorDetailsSpan = document.getElementById('error-details');
const retryPaymentBtn = document.getElementById('retry-payment-btn');
const returnToCartAfterErrorBtn = document.getElementById('return-to-cart-after-error-btn');

const globalMessageDiv = document.getElementById('global-message');

// --- Fonctions Utilitaires ---

// Montre une étape spécifique du processus de paiement et cache les autres
function showCheckoutStep(stepElement) {
    const steps = [
        cartSummaryDiv,
        customerInfoFormDiv,
        mobileMoneyInstructionsDiv,
        paymentSuccessMessageDiv,
        paymentErrorMessageDiv
    ];
    steps.forEach(step => step.classList.add('hidden'));
    stepElement.classList.remove('hidden');
    checkoutSection.classList.remove('hidden-section'); // S'assurer que la section principale est visible
    // Défilement vers le haut de la section de paiement
    checkoutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    displayMessage(); // Cache tout message global précédent
}

// Affiche un message global (succès/erreur)
function displayMessage(type = '', message = '') {
    globalMessageDiv.textContent = message;
    globalMessageDiv.className = 'global-message'; // Réinitialise les classes
    if (type) {
        globalMessageDiv.classList.add(type);
    }
}

// --- 2. Fonction pour Afficher les Livres ---
function renderBooks(booksToRender) {
    bookGrid.innerHTML = ''; // Nettoie la grille avant d'ajouter de nouveaux livres

    if (booksToRender.length === 0) {
        bookGrid.innerHTML = '<p class="no-results">Aucun livre trouvé correspondant à votre recherche ou filtre.</p>';
        return;
    }

    booksToRender.forEach(book => {
        const article = document.createElement('article');
        article.classList.add('book-item');
        article.setAttribute('data-category', book.category);

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

    addBookEventListeners();
}

// --- 3. Gestionnaire d'Événements pour les boutons des livres ---
function addBookEventListeners() {
    // Boutons "Ajouter au panier"
    document.querySelectorAll('.btn-add-to-cart').forEach(button => {
        button.addEventListener('click', (event) => {
            const bookId = event.target.dataset.bookId;
            addToCart(bookId);
            event.target.textContent = 'Ajouté !';
            event.target.disabled = true;
            setTimeout(() => {
                event.target.textContent = 'Ajouter au panier';
                event.target.disabled = false;
            }, 1500);
        });
    });

    // Boutons "Voir Détails"
    document.querySelectorAll('.btn-details').forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const bookId = event.target.dataset.bookId;
            showBookDetails(bookId);
        });
    });
}

// --- 4. Fonction d'Ajout au Panier ---
function addToCart(bookId) {
    const bookToAdd = books.find(b => b.id === bookId);
    if (bookToAdd) {
        // Vérifie si le livre est déjà dans le panier (pour éviter les doublons dans cette simu simple)
        if (!cart.some(item => item.id === bookId)) {
            cart.push(bookToAdd);
            updateCartDisplay();
            displayMessage('success', `${bookToAdd.title} a été ajouté à votre panier.`);
        } else {
            displayMessage('error', `${bookToAdd.title} est déjà dans votre panier.`);
        }
    }
}

// Fonction pour retirer un livre du panier
function removeFromCart(bookId) {
    const initialCartLength = cart.length;
    cart = cart.filter(book => book.id !== bookId);
    if (cart.length < initialCartLength) {
        updateCartDisplay();
        displayMessage('success', 'Livre retiré du panier.');
    }
}

// Met à jour l'affichage du panier dans le header et la section checkout
function updateCartDisplay() {
    cartItemCountElement.textContent = cart.length;
    totalAmount = cart.reduce((sum, book) => sum + book.price, 0);
    cartTotalPriceElement.textContent = `${totalAmount.toFixed(2)} €`;

    cartTableBody.innerHTML = ''; // Nettoie le tableau du panier

    if (cart.length === 0) {
        emptyCartMessage.classList.remove('hidden');
        cartItemsTable.classList.add('hidden');
        proceedToPaymentBtn.classList.add('hidden');
    } else {
        emptyCartMessage.classList.add('hidden');
        cartItemsTable.classList.remove('hidden');
        proceedToPaymentBtn.classList.remove('hidden');

        cart.forEach(book => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${book.title}</td>
                <td>${book.price.toFixed(2)} €</td>
                <td><button class="btn-remove-from-cart" data-book-id="${book.id}">Supprimer</button></td>
            `;
            cartTableBody.appendChild(row);
        });

        document.querySelectorAll('.btn-remove-from-cart').forEach(button => {
            button.addEventListener('click', (event) => {
                removeFromCart(event.target.dataset.bookId);
            });
        });
    }
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

    document.querySelectorAll('#categories ul li a').forEach(link => {
        link.classList.remove('active-category');
    });
    const activeLink = document.querySelector(`#categories ul li a[data-category="${category.toLowerCase()}"]`);
    if (activeLink) {
        activeLink.classList.add('active-category');
    }
}

// --- 7. Gestion de la Modale de Détails du Livre ---
const modal = document.querySelector('.book-modal'); // Sélectionne la modale existante
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
    document.body.classList.add('no-scroll');
}

function closeBookDetails() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
}

closeButton.addEventListener('click', closeBookDetails);
modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeBookDetails();
    }
});
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('is-open')) {
        closeBookDetails();
    }
});

// --- 8. Fonctions de la Simulation de Paiement ---

function proceedToCheckout() {
    if (cart.length === 0) {
        displayMessage('error', 'Votre panier est vide. Veuillez ajouter des livres avant de procéder au paiement.');
        return;
    }
    showCheckoutStep(customerInfoFormDiv);
}

function submitCustomerInfo(event) {
    event.preventDefault(); // Empêche le rechargement de la page

    const name = buyerNameInput.value.trim();
    const phone = phoneNumberInput.value.trim();

    // Validation simple
    if (!name || !phone) {
        displayMessage('error', 'Veuillez remplir tous les champs.');
        return;
    }
    if (!/^\d{8,15}$/.test(phone)) { // Exemple: 8 à 15 chiffres
        displayMessage('error', 'Numéro de téléphone invalide. Veuillez entrer 8 à 15 chiffres.');
        return;
    }

    customerInfo = { name, phone };
    initiateMobileMoneyPayment();
}

function initiateMobileMoneyPayment() {
    paymentAmountSpan.textContent = `${totalAmount.toFixed(2)} €`;
    showCheckoutStep(mobileMoneyInstructionsDiv);
    displayMessage('success', 'Veuillez suivre les instructions sur votre téléphone pour initier le paiement.');
    transactionCodeInput.value = ''; // Réinitialise le champ du code transaction
}

function confirmMobileMoneyPayment(event) {
    event.preventDefault();

    const transactionCode = transactionCodeInput.value.trim();
    // Simulation: Un code "correct" est hardcodé pour la démo
    const CORRECT_TRANSACTION_CODE = 'TXN12345'; 

    if (!transactionCode) {
        displayMessage('error', 'Veuillez entrer le code de transaction.');
        return;
    }

    // Simule un délai pour la vérification du paiement (comme une API)
    displayMessage('info', 'Vérification du code de transaction en cours...');
    setTimeout(() => {
        if (transactionCode === CORRECT_TRANSACTION_CODE) {
            showCheckoutStep(paymentSuccessMessageDiv);
            displayMessage('success', 'Paiement réussi ! Vos livres sont maintenant disponibles.');
            cart = []; // Vide le panier après un paiement réussi
            updateCartDisplay(); // Met à jour l'affichage du panier vide
        } else {
            errorDetailsSpan.textContent = 'Le code de transaction est incorrect. Veuillez vérifier et réessayer.';
            showCheckoutStep(paymentErrorMessageDiv);
            displayMessage('error', 'Échec du paiement. Code invalide.');
        }
    }, 2000); // Simule 2 secondes de traitement
}

function resetPaymentSimulation() {
    showCheckoutStep(cartSummaryDiv); // Retourne à l'affichage du panier
    // Réinitialise les champs si nécessaire
    buyerNameInput.value = '';
    phoneNumberInput.value = '';
    transactionCodeInput.value = '';
}

// --- 9. Événements au Chargement du DOM ---
document.addEventListener('DOMContentLoaded', () => {
    renderBooks(books); // Rend tous les livres au chargement initial de la page
    updateCartDisplay(); // Initialise l'affichage du panier

    // Écouteur pour la barre de recherche
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', searchBooks);
    document.querySelector('#recherche form').addEventListener('submit', (event) => {
        event.preventDefault();
        searchBooks();
    });

    // Écouteurs pour les liens de catégories
    const categoryLinksContainer = document.querySelector('#categories ul');
    categoryLinksContainer.addEventListener('click', (event) => {
        if (event.target.tagName === 'A') {
            event.preventDefault();
            const category = event.target.getAttribute('data-category');
            filterByCategory(category);
            document.getElementById('livres-numeriques').scrollIntoView({ behavior: 'smooth' });
        }
    });

    // Gère le clic sur le lien "Panier" dans le header
    cartLinkElement.addEventListener('click', (event) => {
        event.preventDefault();
        showCheckoutStep(cartSummaryDiv);
    });

    // Événements des boutons du processus de paiement
    proceedToPaymentBtn.addEventListener('click', proceedToCheckout);
    paymentInfoForm.addEventListener('submit', submitCustomerInfo);
    backToCartBtn.addEventListener('click', () => showCheckoutStep(cartSummaryDiv));
    transactionCodeForm.addEventListener('submit', confirmMobileMoneyPayment);
    cancelPaymentBtn.addEventListener('click', () => {
        displayMessage('error', 'Paiement annulé. Vous pouvez réessayer.');
        resetPaymentSimulation();
    });
    continueShoppingBtn.addEventListener('click', () => {
        checkoutSection.classList.add('hidden-section'); // Cache la section checkout
        document.getElementById('accueil').scrollIntoView({ behavior: 'smooth' });
        displayMessage(); // Cache le message de succès
    });
    retryPaymentBtn.addEventListener('click', () => initiateMobileMoneyPayment()); // Retourne aux instructions
    returnToCartAfterErrorBtn.addEventListener('click', () => resetPaymentSimulation());

    // Ajoute un attribut data-category aux liens de catégorie pour un meilleur contrôle JS
    document.querySelectorAll('#categories ul li a').forEach(link => {
        if (!link.dataset.category) { // S'il n'y en a pas déjà un (pour "Tous les Livres")
            const href = link.getAttribute('href');
            const categoryName = href.substring(5);
            link.setAttribute('data-category', categoryName.toLowerCase());
        }
    });
    
    // Initialise l'état actif pour "Tous les Livres"
    const allBooksCategoryLink = document.querySelector('a[data-category="all"]');
    if (allBooksCategoryLink) {
        allBooksCategoryLink.classList.add('active-category');
    }
});