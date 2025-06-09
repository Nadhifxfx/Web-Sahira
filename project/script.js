// Products data
const products = [
    {
        id: 1,
        name: "Rendang Daging",
        category: "makanan-utama",
        price: "Rp 45.000",
        image: "/project/img/Menu 1.jpg",
        description: "Rendang daging sapi yang dimasak dengan bumbu rempah tradisional hingga empuk dan kaya rasa. Disajikan dengan nasi putih hangat."
    },
    {
        id: 2,
        name: "Gudeg Jogja",
        category: "makanan-utama",
        price: "Rp 35.000",
        image: "/project/img/Menu 1.jpg",
        description: "Gudeg khas Yogyakarta dengan nangka muda yang dimasak dengan santan dan gula jawa. Dilengkapi dengan ayam, telur, dan sambal krecek."
    },
    {
        id: 3,
        name: "Sate Ayam",
        category: "makanan-utama",
        price: "Rp 25.000",
        image: "/project/img/Menu 1.jpg",
        description: "Sate ayam bakar dengan bumbu kacang yang gurih dan manis. Disajikan dengan lontong, bawang merah, dan kerupuk."
    },

];

// DOM elements
const productsGrid = document.getElementById('products-grid');
const categoryButtons = document.querySelectorAll('.category-btn');
const productModal = document.getElementById('product-modal');
const closeModal = document.getElementById('close-modal');
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const themeToggle = document.getElementById('theme-toggle');
const themeToggleMobile = document.getElementById('theme-toggle-mobile');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Load products
    displayProducts(products);
    
    // Initialize theme
    initializeTheme();
    
    // Add event listeners
    addEventListeners();
    
    // Initialize smooth scrolling for navigation links
    initializeSmoothScrolling();
});

// Display products
function displayProducts(productsToShow) {
    productsGrid.innerHTML = '';
    
    productsToShow.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
    
    // Reinitialize Lucide icons for new elements
    lucide.createIcons();
}

// Create product card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover-lift';
    card.setAttribute('data-category', product.category);
    
    card.innerHTML = `
        <div class="relative overflow-hidden">
            <img src="${product.image}" alt="${product.name}" class="product-image w-full h-48 object-cover">
            <div class="absolute top-4 right-4">
                <span class="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    ${getCategoryName(product.category)}
                </span>
            </div>
        </div>
        <div class="p-6">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">${product.name}</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">${product.description}</p>
            <div class="flex items-center justify-between">
                <span class="text-2xl font-bold text-orange-500">${product.price}</span>
                <button class="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105">
                    <i data-lucide="shopping-cart" class="w-4 h-4 mr-2 inline"></i>
                    Pesan
                </button>
            </div>
        </div>
    `;
    
    // Add click event to open modal
    card.addEventListener('click', () => openProductModal(product));
    
    return card;
}

// Get category name in Indonesian
function getCategoryName(category) {
    const categoryNames = {
        'makanan-utama': 'Makanan Utama',
        'cemilan': 'Cemilan',
        'minuman': 'Minuman'
    };
    return categoryNames[category] || category;
}

// Filter products by category
function filterProducts(category) {
    const filteredProducts = category === 'semua' ? products : products.filter(product => product.category === category);
    displayProducts(filteredProducts);
    
    // Update active category button
    categoryButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.classList.add('bg-gray-100', 'dark:bg-gray-800', 'text-gray-700', 'dark:text-gray-300');
        btn.classList.remove('bg-gradient-to-r', 'from-orange-500', 'to-red-500', 'text-white');
    });
    
    const activeBtn = document.querySelector(`[data-category="${category}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
        activeBtn.classList.remove('bg-gray-100', 'dark:bg-gray-800', 'text-gray-700', 'dark:text-gray-300');
        activeBtn.classList.add('bg-gradient-to-r', 'from-orange-500', 'to-red-500', 'text-white');
    }
}

// Open product modal
function openProductModal(product) {
    document.getElementById('modal-title').textContent = product.name;
    document.getElementById('modal-image').src = product.image;
    document.getElementById('modal-image').alt = product.name;
    document.getElementById('modal-description').textContent = product.description;
    document.getElementById('modal-price').textContent = product.price;
    
    // Set up order button
    const orderBtn = document.getElementById('order-btn');
    orderBtn.onclick = () => orderProduct(product);
    
    // Show modal
    productModal.classList.remove('hidden');
    productModal.classList.add('flex');
    productModal.querySelector('.bg-white').classList.add('modal-enter');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

// Close product modal
function closeProductModal() {
    const modalContent = productModal.querySelector('.bg-white');
    modalContent.classList.add('modal-exit');
    
    setTimeout(() => {
        productModal.classList.add('hidden');
        productModal.classList.remove('flex');
        modalContent.classList.remove('modal-enter', 'modal-exit');
        document.body.style.overflow = 'auto';
    }, 200);
}

// Order product via WhatsApp
function orderProduct(product) {
    const message = `Halo! Saya ingin memesan:\n\n*${product.name}*\n${product.price}\n\n${product.description}\n\nTerima kasih!`;
    const whatsappUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Initialize theme
function initializeTheme() {
    // Check for saved theme preference or default to 'light'
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
}

// Toggle theme
function toggleTheme() {
    const isDark = document.documentElement.classList.contains('dark');
    
    if (isDark) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
}

// Initialize smooth scrolling
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (!mobileMenu.classList.contains('hidden')) {
                    toggleMobileMenu();
                }
                
                // Update active nav link
                updateActiveNavLink(targetId);
            }
        });
    });
}

// Update active navigation link
function updateActiveNavLink(targetId) {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === targetId) {
            link.classList.add('active');
        }
    });
}

// Toggle mobile menu
function toggleMobileMenu() {
    mobileMenu.classList.toggle('hidden');
    
    // Update menu icon
    const menuIcon = mobileMenuToggle.querySelector('[data-lucide="menu"]');
    const closeIcon = mobileMenuToggle.querySelector('[data-lucide="x"]');
    
    if (mobileMenu.classList.contains('hidden')) {
        if (closeIcon) closeIcon.style.display = 'none';
        if (menuIcon) menuIcon.style.display = 'block';
    } else {
        if (menuIcon) menuIcon.style.display = 'none';
        if (closeIcon) closeIcon.style.display = 'block';
    }
    
    lucide.createIcons();
}

// Add all event listeners
function addEventListeners() {
    // Category filter buttons
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            filterProducts(category);
        });
    });
    
    // Modal close events
    closeModal.addEventListener('click', closeProductModal);
    productModal.addEventListener('click', (e) => {
        if (e.target === productModal) {
            closeProductModal();
        }
    });
    
    // Escape key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !productModal.classList.contains('hidden')) {
            closeProductModal();
        }
    });
    
    // Mobile menu toggle
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    
    // Theme toggle buttons
    themeToggle.addEventListener('click', toggleTheme);
    themeToggleMobile.addEventListener('click', toggleTheme);
    
    // Mobile nav links
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggleMobileMenu();
        });
    });
    
    // Scroll event for navbar background
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('nav');
        if (window.scrollY > 50) {
            navbar.classList.add('bg-white/95', 'dark:bg-gray-900/95');
            navbar.classList.remove('bg-white/90', 'dark:bg-gray-900/90');
        } else {
            navbar.classList.remove('bg-white/95', 'dark:bg-gray-900/95');
            navbar.classList.add('bg-white/90', 'dark:bg-gray-900/90');
        }
    });
    
    // Intersection Observer for active nav links
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
        rootMargin: '-100px 0px -50% 0px',
        threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                updateActiveNavLink(`#${entry.target.id}`);
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Animation on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(element => {
        element.style.animationPlayState = 'paused';
        observer.observe(element);
    });
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', animateOnScroll);

// Utility function to debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization for scroll events
const debouncedScrollHandler = debounce(() => {
    // Handle scroll-based animations or effects here
}, 100);

window.addEventListener('scroll', debouncedScrollHandler);