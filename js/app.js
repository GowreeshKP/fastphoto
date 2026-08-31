// Fast Photo Color Lab (fastphotogifts) Kallakurichi - Web App Engine

document.addEventListener('DOMContentLoaded', () => {
  // APP STATE
  let state = {
    currentCategory: 'Home',
    products: [...PRODUCTS_DATA],
    filteredProducts: [],
    cart: JSON.parse(localStorage.getItem('fpg_cart') || '[]'),
    wishlist: JSON.parse(localStorage.getItem('fpg_wishlist') || '[]'),
    user: JSON.parse(localStorage.getItem('fpg_user') || 'null'),
    activeStore: JSON.parse(localStorage.getItem('fpg_store') || '{"name":"Fast Photo Color Lab (Kallakurichi)","id":"kallakurichi_lab"}'),
    currentView: 'grid',
    sortOption: 'position',
    priceMin: 0,
    priceMax: 3500,
    selectedSubcategories: [],
    searchQuery: '',
    checkoutStep: 1
  };

  // CATEGORY HERO BANNERS & DESCRIPTIONS MAPPING
  const CATEGORY_META = {
    'Home': {
      title: "Fast Photo Color Lab",
      heroImg: "images/fast_photo_gifts_hero_1788178805563.jpg",
      desc: "Fast Photo Color Lab, Kallakurichi (Tamil Nadu). Photo printing, wholesale frames, synthetic album printing, wooden & stainless steel laser engraving, and sublimation gifts. Delivery in 2-3 working days all over India!"
    },
    'Sublimation Gifts': {
      title: "Custom Sublimation Gifts",
      heroImg: "images/sublimation_printed_mug_1788178857934.jpg",
      desc: "Personalized thermos water bottles (with name preview), printed ceramic mugs, magic mugs & custom gifts."
    },
    'Wooden & Metal Engraving': {
      title: "Laser Wooden & Metal Engraving",
      heroImg: "images/engraved_wood_plaque_1788178833528.jpg",
      desc: "Custom laser engraved stainless steel ceremonial plates (Tamil/English), marriage wooden plaques & engraved metal pens."
    },
    'Wholesale Frames': {
      title: "Wholesale Synthetic Photo Frames",
      heroImg: "images/fast_photo_gifts_hero_1788178805563.jpg",
      desc: "Ready stock deity & god photo frames, wholesale batch collage frames & custom picture framing."
    },
    'Synthetic Album Printing': {
      title: "Synthetic Photobook Album Printing",
      heroImg: "images/fast_photo_gifts_hero_1788178805563.jpg",
      desc: "100% waterproof non-tearable synthetic sheet lay-flat wedding albums with confirmation preview."
    },
    'Sale': {
      title: "Special Offers & Bulk Deals",
      heroImg: "images/fast_photo_gifts_hero_1788178805563.jpg",
      desc: "Best prices on photo printing, wholesale frame orders & personalized gift items."
    }
  };

  // DOM ELEMENTS
  const siteHeader = document.getElementById('site-header');
  const mainWrapper = document.getElementById('main-wrapper');
  const homeSections = document.getElementById('home-sections');
  const heroTitle = document.getElementById('hero-title');
  const heroDescText = document.getElementById('hero-desc-text');
  const heroBreadcrumbActive = document.getElementById('hero-breadcrumb-active');
  const backToTopBtn = document.getElementById('back-to-top-btn');

  // Search
  const searchInput = document.getElementById('search-input');
  const searchAutocomplete = document.getElementById('search-autocomplete');

  // Navigation Links
  const navItems = document.querySelectorAll('.nav-link-item');

  // Catalog DOM Elements
  const productGrid = document.getElementById('product-grid');
  const itemsCountText = document.getElementById('items-count-text');
  const sortSelect = document.getElementById('sort-select');
  const gridViewBtn = document.getElementById('grid-view-btn');
  const listViewBtn = document.getElementById('list-view-btn');

  // Price Slider
  const priceMinInput = document.getElementById('price-min-input');
  const priceMaxInput = document.getElementById('price-max-input');
  const rangeMin = document.getElementById('range-min');
  const rangeMax = document.getElementById('range-max');
  const rangeProgress = document.getElementById('range-progress');
  const clearFiltersBtn = document.getElementById('clear-filters-btn');
  const subcategoryListContainer = document.getElementById('subcategory-list-container');

  // Cart
  const cartBtn = document.getElementById('cart-btn');
  const cartBadge = document.getElementById('cart-badge');
  const cartDrawer = document.getElementById('cart-drawer');
  const closeCartBtn = document.getElementById('close-cart-btn');
  const cartBody = document.getElementById('cart-body');
  const cartSubtotalEl = document.getElementById('cart-subtotal');
  const freeShippingFill = document.getElementById('free-shipping-fill');
  const freeShippingText = document.getElementById('free-shipping-text');
  const checkoutTriggerBtn = document.getElementById('checkout-trigger-btn');

  // Modals
  const storeSelectorBtn = document.getElementById('store-selector-btn');
  const activeStoreName = document.getElementById('active-store-name');
  const storeModal = document.getElementById('store-modal');
  const closeStoreModalBtn = document.getElementById('close-store-modal-btn');
  const storeListContainer = document.getElementById('store-list-container');

  const accountModal = document.getElementById('account-modal');
  const accountBtn = document.getElementById('account-btn');
  const closeAccountModalBtn = document.getElementById('close-account-modal-btn');

  const checkoutModal = document.getElementById('checkout-modal');
  const closeCheckoutModalBtn = document.getElementById('close-checkout-modal-btn');

  const trackingModal = document.getElementById('tracking-modal');
  const trackingBtn = document.getElementById('tracking-btn');
  const closeTrackingModalBtn = document.getElementById('close-tracking-modal-btn');

  const quickviewModal = document.getElementById('quickview-modal');
  const closeQuickviewBtn = document.getElementById('close-quickview-btn');
  const quickviewContainer = document.getElementById('quickview-container');

  const promoSticker = document.getElementById('promo-sticker');
  const promoModal = document.getElementById('promo-modal');
  const closePromoBtn = document.getElementById('close-promo-btn');

  let scrollObserver = null;

  // INITIALIZE APP
  function init() {
    renderActiveStore();
    renderCart();
    setupEventListeners();
    setupScrollEffects();
    switchCategory('Home');
  }

  // SCROLL OBSERVER & ANIMATIONS
  function setupScrollEffects() {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        if (siteHeader) siteHeader.classList.add('scrolled');
      } else {
        if (siteHeader) siteHeader.classList.remove('scrolled');
      }

      if (window.scrollY > 300) {
        if (backToTopBtn) backToTopBtn.classList.add('visible');
      } else {
        if (backToTopBtn) backToTopBtn.classList.remove('visible');
      }
    });

    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    const observerOptions = {
      root: null,
      threshold: 0.1,
      rootMargin: "0px 0px -20px 0px"
    };

    scrollObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          const counters = entry.target.querySelectorAll('.counter-num');
          counters.forEach(counter => animateCounter(counter));
          obs.unobserve(entry.target);
        }
      });
    }, observerOptions);

    observeElements();
  }

  function observeElements() {
    if (!scrollObserver) return;
    document.querySelectorAll('.reveal-on-scroll:not(.visible)').forEach(el => scrollObserver.observe(el));
  }

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target') || '0', 10);
    if (!target) return;
    let count = 0;
    const speed = Math.ceil(target / 25);
    const timer = setInterval(() => {
      count += speed;
      if (count >= target) {
        el.textContent = target;
        clearInterval(timer);
      } else {
        el.textContent = count;
      }
    }, 40);
  }

  // EVENT LISTENERS
  function setupEventListeners() {
    // Nav Links
    navItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const cat = item.getAttribute('data-cat');
        navItems.forEach(i => i.parentElement.classList.remove('active'));
        item.parentElement.classList.add('active');
        switchCategory(cat);
      });
    });

    // Category Grid Card Clicks on Home Page
    document.querySelectorAll('.cat-card-click').forEach(card => {
      card.addEventListener('click', () => {
        const cat = card.getAttribute('data-cat');
        navItems.forEach(i => {
          if (i.getAttribute('data-cat') === cat) {
            i.parentElement.classList.add('active');
          } else {
            i.parentElement.classList.remove('active');
          }
        });
        switchCategory(cat);
      });
    });

    // Sort Select
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        state.sortOption = e.target.value;
        applySort();
        renderProducts();
      });
    }

    // View Mode Toggle
    if (gridViewBtn && listViewBtn) {
      gridViewBtn.addEventListener('click', () => {
        state.currentView = 'grid';
        gridViewBtn.classList.add('active');
        listViewBtn.classList.remove('active');
        productGrid.classList.remove('list-view');
      });

      listViewBtn.addEventListener('click', () => {
        state.currentView = 'list';
        listViewBtn.classList.add('active');
        gridViewBtn.classList.remove('active');
        productGrid.classList.add('list-view');
      });
    }

    // Search Autocomplete
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim().toLowerCase();
        state.searchQuery = query;
        renderAutocomplete(query);
        if (query.length > 0 && state.currentCategory === 'Home') {
          switchCategory('Sublimation Gifts');
        }
        applyFilters();
      });

      document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchAutocomplete.contains(e.target)) {
          searchAutocomplete.classList.remove('active');
        }
      });
    }

    // Price Slider Logic
    if (rangeMin && rangeMax) {
      rangeMin.addEventListener('input', handlePriceRange);
      rangeMax.addEventListener('input', handlePriceRange);
    }
    if (priceMinInput) {
      priceMinInput.addEventListener('change', (e) => {
        state.priceMin = parseFloat(e.target.value) || 0;
        rangeMin.value = state.priceMin;
        updateSliderProgress();
        applyFilters();
      });
    }
    if (priceMaxInput) {
      priceMaxInput.addEventListener('change', (e) => {
        state.priceMax = parseFloat(e.target.value) || 3500;
        rangeMax.value = state.priceMax;
        updateSliderProgress();
        applyFilters();
      });
    }

    // Clear Filters
    if (clearFiltersBtn) {
      clearFiltersBtn.addEventListener('click', () => {
        state.priceMin = 0;
        state.priceMax = 3500;
        state.selectedSubcategories = [];
        state.searchQuery = '';
        if (searchInput) searchInput.value = '';
        if (priceMinInput) priceMinInput.value = 0;
        if (priceMaxInput) priceMaxInput.value = 3500;
        if (rangeMin) rangeMin.value = 0;
        if (rangeMax) rangeMax.value = 3500;
        document.querySelectorAll('.subcategory-cb').forEach(cb => cb.checked = false);
        updateSliderProgress();
        applyFilters();
      });
    }

    // Cart Drawer Toggle
    if (cartBtn && closeCartBtn) {
      cartBtn.addEventListener('click', () => cartDrawer.classList.add('active'));
      closeCartBtn.addEventListener('click', () => cartDrawer.classList.remove('active'));
    }

    // Checkout Modal Trigger
    if (checkoutTriggerBtn) {
      checkoutTriggerBtn.addEventListener('click', () => {
        if (state.cart.length === 0) {
          showToast('Your bag is empty! Add items to checkout.');
          return;
        }
        cartDrawer.classList.remove('active');
        openCheckoutModal();
      });
    }

    // Account Modal Toggle
    if (accountBtn && closeAccountModalBtn) {
      accountBtn.addEventListener('click', openAccountModal);
      closeAccountModalBtn.addEventListener('click', () => accountModal.classList.remove('active'));
    }

    // Tracking Modal Toggle
    if (trackingBtn && closeTrackingModalBtn) {
      trackingBtn.addEventListener('click', () => trackingModal.classList.add('active'));
      closeTrackingModalBtn.addEventListener('click', () => trackingModal.classList.remove('active'));
    }

    // Store Picker Modal Toggle
    if (storeSelectorBtn && closeStoreModalBtn) {
      storeSelectorBtn.addEventListener('click', openStoreModal);
      closeStoreModalBtn.addEventListener('click', () => storeModal.classList.remove('active'));
    }

    // Quickview Modal Close
    if (closeQuickviewBtn) {
      closeQuickviewBtn.addEventListener('click', () => quickviewModal.classList.remove('active'));
    }

    // Close Checkout Modal
    if (closeCheckoutModalBtn) {
      closeCheckoutModalBtn.addEventListener('click', () => checkoutModal.classList.remove('active'));
    }

    // Promo Modal Toggle
    if (promoSticker && closePromoBtn) {
      promoSticker.addEventListener('click', () => promoModal.classList.add('active'));
      closePromoBtn.addEventListener('click', () => promoModal.classList.remove('active'));
    }

    // Close Modals on Overlay Click
    [storeModal, accountModal, checkoutModal, trackingModal, quickviewModal, promoModal].forEach(modal => {
      if (modal) {
        modal.addEventListener('click', (e) => {
          if (e.target === modal) modal.classList.remove('active');
        });
      }
    });
  }

  // CATEGORY SWITCHER ROUTER WITH SMOOTH SCROLL
  function switchCategory(categoryName) {
    state.currentCategory = categoryName;
    const meta = CATEGORY_META[categoryName] || CATEGORY_META['Home'];

    if (heroTitle) heroTitle.textContent = meta.title;
    if (heroDescText) heroDescText.textContent = meta.desc;
    if (heroBreadcrumbActive) heroBreadcrumbActive.textContent = meta.title;

    if (categoryName === 'Home') {
      if (homeSections) homeSections.style.display = 'block';
      if (mainWrapper) mainWrapper.style.display = 'none';
      renderHomeTrendingProducts();
    } else {
      if (homeSections) homeSections.style.display = 'none';
      if (mainWrapper) mainWrapper.style.display = 'grid';
      renderSubcategoryFilters();
      applyFilters();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(observeElements, 100);
  }

  // RENDER SUBCATEGORY CHECKBOXES IN SIDEBAR
  function renderSubcategoryFilters() {
    if (!subcategoryListContainer) return;

    let availableSubcats = [];
    if (state.currentCategory === 'Sale') {
      availableSubcats = Array.from(new Set(state.products.filter(p => p.badgeType === 'sale').map(p => p.category)));
    } else {
      availableSubcats = Array.from(new Set(state.products.filter(p => p.category === state.currentCategory).map(p => p.subcategory)));
    }

    subcategoryListContainer.innerHTML = availableSubcats.map(sub => `
      <li>
        <label class="filter-checkbox-label">
          <input type="checkbox" class="subcategory-cb" value="${sub}" />
          <span>${sub}</span>
        </label>
      </li>
    `).join('');

    document.querySelectorAll('.subcategory-cb').forEach(cb => {
      cb.addEventListener('change', () => {
        state.selectedSubcategories = Array.from(document.querySelectorAll('.subcategory-cb'))
          .filter(c => c.checked)
          .map(c => c.value);
        applyFilters();
      });
    });
  }

  // RENDER HOME TRENDING PRODUCTS
  function renderHomeTrendingProducts() {
    const trendingGrid = document.getElementById('home-trending-grid');
    if (!trendingGrid) return;

    const trending = state.products.slice(0, 8);
    trendingGrid.innerHTML = '';

    trending.forEach((product, idx) => {
      const isWishlisted = state.wishlist.includes(product.id);
      const card = document.createElement('div');
      card.className = `product-card reveal-on-scroll delay-${(idx % 4) + 1}`;
      card.innerHTML = `
        <span class="product-badge badge-${product.badgeType}">${product.badge}</span>
        <button class="wishlist-toggle ${isWishlisted ? 'active' : ''}" data-id="${product.id}">
          <span class="material-symbols-outlined">${isWishlisted ? 'favorite' : 'favorite_border'}</span>
        </button>
        <div class="product-image-wrap">
          <img src="${product.image}" alt="${product.title}" class="product-image" loading="lazy" />
          <button class="quick-view-overlay-btn" data-id="${product.id}">Customize & Buy</button>
        </div>
        <div class="product-body">
          <span class="product-category-name">${product.category}</span>
          <h3 class="product-title">${product.title}</h3>
          <div class="product-rating">${getStarRatingHTML(product.rating)} <span class="rating-count">(${product.reviewsCount})</span></div>
          <div class="product-pricing">
            <span class="special-price">₹${product.price.toFixed(0)}</span>
            <span class="rrp-price">₹${product.rrp.toFixed(0)}</span>
          </div>
          <button class="add-to-bag-btn" data-id="${product.id}">
            <span class="material-symbols-outlined" style="font-size: 1.1rem;">shopping_bag</span> Add to Bag
          </button>
        </div>
      `;

      card.querySelector('.add-to-bag-btn').addEventListener('click', () => addToCart(product.id));
      card.querySelector('.wishlist-toggle').addEventListener('click', () => toggleWishlist(product.id));
      card.querySelector('.quick-view-overlay-btn').addEventListener('click', () => openQuickview(product));

      trendingGrid.appendChild(card);
    });

    observeElements();
  }

  // PRICE SLIDER HANDLER
  function handlePriceRange() {
    let minVal = parseFloat(rangeMin.value);
    let maxVal = parseFloat(rangeMax.value);
    if (minVal > maxVal - 50) {
      minVal = maxVal - 50;
      rangeMin.value = minVal;
    }
    state.priceMin = minVal;
    state.priceMax = maxVal;
    if (priceMinInput) priceMinInput.value = minVal;
    if (priceMaxInput) priceMaxInput.value = maxVal;
    updateSliderProgress();
    applyFilters();
  }

  function updateSliderProgress() {
    const minPercent = (state.priceMin / 3500) * 100;
    const maxPercent = (state.priceMax / 3500) * 100;
    if (rangeProgress) {
      rangeProgress.style.left = `${minPercent}%`;
      rangeProgress.style.width = `${maxPercent - minPercent}%`;
    }
  }

  // FILTERING LOGIC
  function applyFilters() {
    state.filteredProducts = state.products.filter(product => {
      // Category Route Filter
      if (state.currentCategory === 'Sale') {
        if (product.badgeType !== 'sale') return false;
      } else if (state.currentCategory !== 'Home') {
        if (product.category !== state.currentCategory) return false;
      }

      // Subcategory Filter
      if (state.selectedSubcategories.length > 0) {
        if (state.currentCategory === 'Sale') {
          if (!state.selectedSubcategories.includes(product.category)) return false;
        } else {
          if (!state.selectedSubcategories.includes(product.subcategory)) return false;
        }
      }

      // Price Filter
      if (product.price < state.priceMin || product.price > state.priceMax) return false;

      // Search Filter
      if (state.searchQuery) {
        const titleMatch = product.title.toLowerCase().includes(state.searchQuery);
        const catMatch = product.category.toLowerCase().includes(state.searchQuery);
        const descMatch = product.description.toLowerCase().includes(state.searchQuery);
        if (!titleMatch && !catMatch && !descMatch) return false;
      }

      return true;
    });

    applySort();
    renderProducts();
  }

  // SORTING LOGIC
  function applySort() {
    switch (state.sortOption) {
      case 'price-low':
        state.filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        state.filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        state.filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'bestseller':
        state.filteredProducts.sort((a, b) => b.reviewsCount - a.reviewsCount);
        break;
      default:
        state.filteredProducts.sort((a, b) => a.id - b.id);
        break;
    }
  }

  // RENDER PRODUCTS CATALOG
  function renderProducts() {
    if (!productGrid) return;
    productGrid.innerHTML = '';
    if (itemsCountText) itemsCountText.textContent = `Showing 1-${state.filteredProducts.length} of ${state.filteredProducts.length} items`;

    if (state.filteredProducts.length === 0) {
      productGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: #ffffff; border-radius: 8px;">
          <span class="material-symbols-outlined" style="font-size: 3rem; color: #cbd5e1;">search_off</span>
          <h3 style="margin-top: 10px; color: var(--gc-dark);">No products match your criteria</h3>
          <p style="color: var(--gc-text-muted); font-size: 0.9rem; margin-top: 5px;">Try adjusting your price range or clearing selected filters.</p>
        </div>
      `;
      return;
    }

    state.filteredProducts.forEach((product, idx) => {
      const isWishlisted = state.wishlist.includes(product.id);
      const card = document.createElement('div');
      card.className = `product-card reveal-on-scroll visible`;
      card.innerHTML = `
        <span class="product-badge badge-${product.badgeType}">${product.badge}</span>
        <button class="wishlist-toggle ${isWishlisted ? 'active' : ''}" data-id="${product.id}" title="Add to Wishlist">
          <span class="material-symbols-outlined">${isWishlisted ? 'favorite' : 'favorite_border'}</span>
        </button>
        <div class="product-image-wrap">
          <img src="${product.image}" alt="${product.title}" class="product-image" loading="lazy" />
          <button class="quick-view-overlay-btn" data-id="${product.id}">Customize & View</button>
        </div>
        <div class="product-body">
          <span class="product-category-name">${product.category}</span>
          <h3 class="product-title">${product.title}</h3>
          <div class="product-rating">${getStarRatingHTML(product.rating)} <span class="rating-count">(${product.reviewsCount})</span></div>
          <div class="product-pricing">
            <span class="special-price">₹${product.price.toFixed(0)}</span>
            <span class="rrp-price">₹${product.rrp.toFixed(0)}</span>
          </div>
          <button class="add-to-bag-btn" data-id="${product.id}">
            <span class="material-symbols-outlined" style="font-size: 1.1rem;">shopping_bag</span> Add to Bag
          </button>
        </div>
      `;

      card.querySelector('.add-to-bag-btn').addEventListener('click', () => addToCart(product.id));
      card.querySelector('.wishlist-toggle').addEventListener('click', () => toggleWishlist(product.id));
      card.querySelector('.quick-view-overlay-btn').addEventListener('click', () => openQuickview(product));

      productGrid.appendChild(card);
    });
  }

  // STAR RATING HELPER
  function getStarRatingHTML(rating) {
    const fullStars = Math.floor(rating);
    let html = '';
    for (let i = 0; i < 5; i++) {
      html += `<span class="material-symbols-outlined" style="font-size: 1rem; color: ${i < fullStars ? '#f39c12' : '#cbd5e1'};">star</span>`;
    }
    return html;
  }

  // AUTOCOMPLETE RENDER
  function renderAutocomplete(query) {
    if (!query) {
      searchAutocomplete.classList.remove('active');
      return;
    }

    const matches = state.products.filter(p => 
      p.title.toLowerCase().includes(query) || 
      p.category.toLowerCase().includes(query)
    ).slice(0, 5);

    if (matches.length === 0) {
      searchAutocomplete.innerHTML = `<div style="padding: 12px 15px; font-size: 0.9rem; color: #64748b;">No matching items found</div>`;
    } else {
      searchAutocomplete.innerHTML = matches.map(item => `
        <div class="autocomplete-item" data-id="${item.id}">
          <img src="${item.image}" class="autocomplete-img" alt="${item.title}" />
          <div class="autocomplete-info">
            <div class="autocomplete-title">${item.title}</div>
            <div class="autocomplete-price">Offer: ₹${item.price.toFixed(0)}</div>
          </div>
        </div>
      `).join('');

      searchAutocomplete.querySelectorAll('.autocomplete-item').forEach(itemEl => {
        itemEl.addEventListener('click', () => {
          const id = itemEl.getAttribute('data-id');
          const product = state.products.find(p => p.id === id);
          if (product) openQuickview(product);
          searchAutocomplete.classList.remove('active');
        });
      });
    }

    searchAutocomplete.classList.add('active');
  }

  // CART FUNCTIONS WITH BUMP ANIMATION
  function addToCart(productId, qty = 1, customText = '') {
    const product = state.products.find(p => p.id === productId);
    if (!product) return;

    const existingIndex = state.cart.findIndex(item => item.id === productId && item.customText === customText);
    if (existingIndex > -1) {
      state.cart[existingIndex].qty += qty;
    } else {
      state.cart.push({ ...product, qty, customText });
    }

    saveCart();
    renderCart();

    if (cartBadge) {
      cartBadge.classList.add('bump');
      setTimeout(() => cartBadge.classList.remove('bump'), 300);
    }

    cartDrawer.classList.add('active');
    showToast(`Added "${product.title}" to your bag!`);
  }

  function updateCartQty(productId, delta) {
    const item = state.cart.find(i => i.id === productId);
    if (!item) return;

    item.qty += delta;
    if (item.qty <= 0) {
      state.cart = state.cart.filter(i => i.id !== productId);
    }
    saveCart();
    renderCart();
  }

  function removeFromCart(productId) {
    state.cart = state.cart.filter(i => i.id !== productId);
    saveCart();
    renderCart();
  }

  function saveCart() {
    localStorage.setItem('fpg_cart', JSON.stringify(state.cart));
  }

  function renderCart() {
    const totalItems = state.cart.reduce((sum, i) => sum + i.qty, 0);
    const subtotal = state.cart.reduce((sum, i) => sum + (i.price * i.qty), 0);

    if (cartBadge) cartBadge.textContent = totalItems;
    if (cartSubtotalEl) cartSubtotalEl.textContent = `₹${subtotal.toFixed(0)}`;

    const freeShippingThreshold = 999.00;
    const progress = Math.min((subtotal / freeShippingThreshold) * 100, 100);
    if (freeShippingFill) freeShippingFill.style.width = `${progress}%`;
    if (freeShippingText) {
      if (subtotal >= freeShippingThreshold) {
        freeShippingText.textContent = '🎉 Qualified for FREE 2-3 Day Delivery in India!';
      } else {
        const remaining = freeShippingThreshold - subtotal;
        freeShippingText.textContent = `Add ₹${remaining.toFixed(0)} more for FREE 2-3 Day Delivery`;
      }
    }

    if (!cartBody) return;

    if (state.cart.length === 0) {
      cartBody.innerHTML = `
        <div style="text-align: center; margin: 60px 0; color: #64748b;">
          <span class="material-symbols-outlined" style="font-size: 3.5rem;">shopping_bag</span>
          <p style="font-weight: 600; font-size: 1.1rem; margin-top: 10px;">Your shopping bag is empty</p>
          <p style="font-size: 0.85rem; margin-top: 5px;">Explore custom photo frames & engraved gifts!</p>
        </div>
      `;
    } else {
      cartBody.innerHTML = state.cart.map(item => `
        <div class="cart-item">
          <img src="${item.image}" class="cart-item-img" alt="${item.title}" />
          <div class="cart-item-info">
            <div class="cart-item-title">${item.title}</div>
            <div class="cart-item-price">₹${item.price.toFixed(0)}</div>
            ${item.customText ? `<div style="font-size: 0.75rem; color: var(--gc-red); font-weight: 600;">Custom Note: "${item.customText}"</div>` : ''}
            <div style="display: flex; align-items: center; gap: 8px; margin-top: 6px;">
              <button class="qty-btn dec-qty" data-id="${item.id}" style="border: 1px solid #cbd5e1; width: 24px; height: 24px; border-radius: 3px;">-</button>
              <span style="font-weight: 700; font-size: 0.9rem;">${item.qty}</span>
              <button class="qty-btn inc-qty" data-id="${item.id}" style="border: 1px solid #cbd5e1; width: 24px; height: 24px; border-radius: 3px;">+</button>
              <button class="remove-cart-item" data-id="${item.id}" style="margin-left: auto; color: var(--gc-red); font-size: 0.8rem; text-decoration: underline;">Remove</button>
            </div>
          </div>
        </div>
      `).join('');

      cartBody.querySelectorAll('.dec-qty').forEach(btn => {
        btn.addEventListener('click', () => updateCartQty(btn.getAttribute('data-id'), -1));
      });
      cartBody.querySelectorAll('.inc-qty').forEach(btn => {
        btn.addEventListener('click', () => updateCartQty(btn.getAttribute('data-id'), 1));
      });
      cartBody.querySelectorAll('.remove-cart-item').forEach(btn => {
        btn.addEventListener('click', () => removeFromCart(btn.getAttribute('data-id')));
      });
    }
  }

  // CHECKOUT MODAL FLOW
  function openCheckoutModal() {
    if (!checkoutModal) return;
    state.checkoutStep = 1;
    renderCheckoutStep();
    checkoutModal.classList.add('active');
  }

  function renderCheckoutStep() {
    const container = document.getElementById('checkout-step-container');
    if (!container) return;

    const subtotal = state.cart.reduce((sum, i) => sum + (i.price * i.qty), 0);
    const shipping = subtotal >= 999 ? 0 : 99;
    const grandTotal = subtotal + shipping;

    if (state.checkoutStep === 1) {
      container.innerHTML = `
        <h3 style="font-size: 1.2rem; font-weight: 700; color: var(--gc-dark); margin-bottom: 15px;">Step 1 of 3: Delivery Address (India)</h3>
        <form id="checkout-step1-form" style="display: flex; flex-direction: column; gap: 12px;">
          <input type="text" placeholder="Full Name" required class="checkout-input" value="${state.user ? state.user.name : 'Rahul Kumar'}" />
          <input type="email" placeholder="Email Address" required class="checkout-input" value="${state.user ? state.user.email : 'rahul.kumar@example.com'}" />
          <input type="tel" placeholder="Mobile / WhatsApp Number (For Preview Approval)" required class="checkout-input" value="+91 98765 43210" />
          <input type="text" placeholder="Door No / Street / Landmark" required class="checkout-input" value="15 Main Market Road" />
          <div style="display: flex; gap: 10px;">
            <input type="text" placeholder="City / Town" required class="checkout-input" value="Kallakurichi" style="flex: 1;" />
            <input type="text" placeholder="Pincode" required class="checkout-input" value="606202" style="width: 120px;" />
          </div>
          <button type="submit" class="checkout-btn" style="margin-top: 15px;">Continue to Delivery Option →</button>
        </form>
      `;

      document.getElementById('checkout-step1-form').addEventListener('submit', (e) => {
        e.preventDefault();
        state.checkoutStep = 2;
        renderCheckoutStep();
      });
    } else if (state.checkoutStep === 2) {
      container.innerHTML = `
        <h3 style="font-size: 1.2rem; font-weight: 700; color: var(--gc-dark); margin-bottom: 15px;">Step 2 of 3: Shipping & Design Preview</h3>
        <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px;">
          <label class="store-card-option selected">
            <input type="radio" name="shipping_method" checked />
            <div>
              <div style="font-weight: 700;">Express Courier (2 to 3 Working Days) - ${subtotal >= 999 ? 'FREE' : '₹99'}</div>
              <div style="font-size: 0.85rem; color: #64748b;">Custom design preview sent via WhatsApp before printing 🖌</div>
            </div>
          </label>
          <label class="store-card-option">
            <input type="radio" name="shipping_method" />
            <div>
              <div style="font-weight: 700;">Studio Pickup - ${state.activeStore.name} (FREE)</div>
              <div style="font-size: 0.85rem; color: #64748b;">Direct pickup at Kallakurichi Lab studio</div>
            </div>
          </label>
        </div>
        <div style="display: flex; gap: 10px;">
          <button type="button" id="step2-back-btn" class="action-btn">← Back</button>
          <button type="button" id="step2-next-btn" class="checkout-btn" style="flex: 1;">Proceed to Payment →</button>
        </div>
      `;

      document.getElementById('step2-back-btn').addEventListener('click', () => {
        state.checkoutStep = 1;
        renderCheckoutStep();
      });

      document.getElementById('step2-next-btn').addEventListener('click', () => {
        state.checkoutStep = 3;
        renderCheckoutStep();
      });
    } else if (state.checkoutStep === 3) {
      container.innerHTML = `
        <h3 style="font-size: 1.2rem; font-weight: 700; color: var(--gc-dark); margin-bottom: 15px;">Step 3 of 3: Payment Confirmation</h3>
        <div style="background: #f8fafc; border: 1px solid var(--gc-border); padding: 15px; border-radius: 6px; margin-bottom: 15px;">
          <div style="display: flex; justify-content: space-between; font-size: 0.9rem;"><span>Items Subtotal:</span> <strong>₹${subtotal.toFixed(0)}</strong></div>
          <div style="display: flex; justify-content: space-between; font-size: 0.9rem; margin-top: 4px;"><span>Delivery Fee:</span> <strong>${shipping === 0 ? 'FREE' : '₹' + shipping}</strong></div>
          <div style="display: flex; justify-content: space-between; font-size: 1.1rem; font-weight: 700; color: var(--gc-red); margin-top: 8px; border-top: 1px solid #cbd5e1; padding-top: 6px;">
            <span>Total Payable:</span> <span>₹${grandTotal.toFixed(0)}</span>
          </div>
        </div>

        <form id="checkout-payment-form" style="display: flex; flex-direction: column; gap: 10px;">
          <div style="display: flex; gap: 10px; margin-bottom: 10px;">
            <label style="flex: 1; border: 1px solid #cbd5e1; padding: 10px; border-radius: 4px; font-size: 0.9rem; font-weight: 600;">
              <input type="radio" name="pay_type" checked /> UPI / GPay / PhonePe
            </label>
            <label style="flex: 1; border: 1px solid #cbd5e1; padding: 10px; border-radius: 4px; font-size: 0.9rem; font-weight: 600;">
              <input type="radio" name="pay_type" /> Cash On Delivery (COD)
            </label>
          </div>
          <input type="text" placeholder="UPI ID (e.g. fastphotogifts@upi)" class="checkout-input" value="rahul@okaxis" />
          <button type="submit" class="checkout-btn" style="margin-top: 15px; background: #27ae60;">🔒 Confirm Order (₹${grandTotal.toFixed(0)})</button>
        </form>
      `;

      document.getElementById('checkout-payment-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const orderNum = 'FPG-2026-' + Math.floor(10000 + Math.random() * 90000);
        container.innerHTML = `
          <div style="text-align: center; padding: 30px 10px;">
            <span class="material-symbols-outlined" style="font-size: 4rem; color: #27ae60;">check_circle</span>
            <h2 style="font-size: 1.8rem; font-weight: 700; color: var(--gc-dark); margin-top: 10px;">Order Placed Successfully!</h2>
            <p style="font-size: 1.1rem; font-weight: 700; color: var(--gc-red); margin-top: 6px;">Order ID: ${orderNum}</p>
            <p style="font-size: 0.9rem; color: #64748b; margin-top: 10px;">
              Thank you for ordering with Fast Photo Color Lab! We will send a design confirmation preview before printing. Delivery in 2-3 working days!
            </p>
            <button class="checkout-btn" style="margin-top: 20px;" onclick="document.getElementById('checkout-modal').classList.remove('active');">Return to Store</button>
          </div>
        `;
        state.cart = [];
        saveCart();
        renderCart();
        showToast(`Order ${orderNum} confirmed successfully!`);
      });
    }
  }

  // ACCOUNT MODAL LOGIC
  function openAccountModal() {
    if (!accountModal) return;
    const body = document.getElementById('account-modal-body');
    if (!body) return;

    if (state.user) {
      body.innerHTML = `
        <div style="text-align: center; padding: 20px;">
          <span class="material-symbols-outlined" style="font-size: 3rem; color: var(--gc-dark);">account_circle</span>
          <h2 style="font-size: 1.4rem; font-weight: 700;">Welcome, ${state.user.name}!</h2>
          <p style="font-size: 0.85rem; color: var(--gc-text-muted);">${state.user.email}</p>
          <div style="background: #f8fafc; border: 1px solid var(--gc-border); padding: 12px; border-radius: 6px; margin: 15px 0;">
            <div style="font-size: 0.9rem; font-weight: 700; color: var(--gc-red);">📸 Fast Photo Color Lab Member</div>
            <div style="font-size: 0.85rem; color: #475569; margin-top: 4px;"><strong>@fastphotogifts</strong> | Kallakurichi, Tamil Nadu</div>
          </div>
          <button class="action-btn" style="width: 100%; justify-content: center; background: #fee2e2; color: var(--gc-red);" id="logout-btn">Sign Out</button>
        </div>
      `;
      document.getElementById('logout-btn').addEventListener('click', () => {
        state.user = null;
        localStorage.removeItem('fpg_user');
        openAccountModal();
        showToast('You have signed out.');
      });
    } else {
      body.innerHTML = `
        <h2 style="font-size: 1.3rem; font-weight: 700; color: var(--gc-dark); margin-bottom: 15px;">Sign In to Fast Photo Color Lab</h2>
        <form id="account-login-form" style="display: flex; flex-direction: column; gap: 12px;">
          <input type="email" placeholder="Email Address" required class="checkout-input" value="rahul.kumar@example.com" />
          <input type="password" placeholder="Password" required class="checkout-input" value="password123" />
          <button type="submit" class="checkout-btn">Sign In</button>
        </form>
      `;

      document.getElementById('account-login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        state.user = { name: 'Rahul Kumar', email: 'rahul.kumar@example.com' };
        localStorage.setItem('fpg_user', JSON.stringify(state.user));
        openAccountModal();
        showToast('Signed in successfully!');
      });
    }

    accountModal.classList.add('active');
  }

  // WISHLIST TOGGLE
  function toggleWishlist(productId) {
    const index = state.wishlist.indexOf(productId);
    if (index > -1) {
      state.wishlist.splice(index, 1);
      showToast('Removed item from Wishlist');
    } else {
      state.wishlist.push(productId);
      showToast('Added item to Wishlist ❤');
    }
    localStorage.setItem('fpg_wishlist', JSON.stringify(state.wishlist));
    renderProducts();
    if (state.currentCategory === 'Home') renderHomeTrendingProducts();
  }

  // STORE LOCATION MODAL
  function renderActiveStore() {
    if (activeStoreName) {
      activeStoreName.textContent = state.activeStore.name;
    }
  }

  function openStoreModal() {
    if (!storeListContainer) return;
    storeListContainer.innerHTML = STORE_LOCATIONS.map(store => `
      <div class="store-card-option ${store.id === state.activeStore.id ? 'selected' : ''}" data-id="${store.id}">
        <span class="material-symbols-outlined" style="color: var(--gc-red); font-size: 1.5rem;">storefront</span>
        <div>
          <div class="store-info-title">${store.name}</div>
          <div class="store-info-desc">📍 ${store.address}</div>
          <div class="store-info-desc">📞 ${store.phone} | 🕒 ${store.hours}</div>
        </div>
      </div>
    `).join('');

    storeListContainer.querySelectorAll('.store-card-option').forEach(option => {
      option.addEventListener('click', () => {
        const id = option.getAttribute('data-id');
        const selectedStore = STORE_LOCATIONS.find(s => s.id === id);
        if (selectedStore) {
          state.activeStore = selectedStore;
          localStorage.setItem('fpg_store', JSON.stringify(selectedStore));
          renderActiveStore();
          storeModal.classList.remove('active');
          showToast(`Selected studio: ${selectedStore.name}`);
        }
      });
    });

    storeModal.classList.add('active');
  }

  // QUICKVIEW MODAL WITH PHOTO UPLOAD & CUSTOM TEXT INPUT
  function openQuickview(product) {
    if (!quickviewContainer) return;
    quickviewContainer.innerHTML = `
      <div class="quickview-grid">
        <img src="${product.image}" class="quickview-img" id="quickview-display-img" alt="${product.title}" />
        <div class="quickview-details">
          <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--gc-red);">${product.category}</span>
          <h2 style="font-size: 1.5rem; font-weight: 700; color: var(--gc-dark);">${product.title}</h2>
          <div class="product-rating">${getStarRatingHTML(product.rating)} <span style="font-size: 0.8rem; color: #64748b;">(${product.reviewsCount} customer reviews)</span></div>
          <div class="product-pricing">
            <span class="special-price" style="font-size: 1.5rem;">₹${product.price.toFixed(0)}</span>
            <span class="rrp-price" style="font-size: 1rem;">MSRP ₹${product.rrp.toFixed(0)}</span>
          </div>
          <p style="font-size: 0.9rem; color: #475569; line-height: 1.5;">${product.description}</p>
          
          <!-- Photo Upload & Custom Note Box -->
          <div style="background: #f8fafc; border: 1px dashed var(--gc-red); padding: 12px; border-radius: 6px; margin: 10px 0;">
            <label style="font-size: 0.85rem; font-weight: 700; color: var(--gc-dark); display: block; margin-bottom: 4px;">📸 Upload Photo for Custom Printing / Engraving:</label>
            <input type="file" id="modal-photo-file" accept="image/*" style="font-size: 0.8rem; width: 100%; margin-bottom: 8px;" />
            <label style="font-size: 0.85rem; font-weight: 700; color: var(--gc-dark); display: block; margin-bottom: 4px;">✍ Custom Text / Engraving Name (Tamil or English):</label>
            <input type="text" id="modal-custom-text-input" placeholder="e.g. B. Havishraj ❤️ or Custom Tamil Text" class="checkout-input" style="padding: 6px 10px; font-size: 0.85rem;" />
          </div>

          <div style="display: flex; gap: 10px; margin-top: 10px;">
            <button class="add-to-bag-btn modal-add-btn" style="flex: 1;">
              <span class="material-symbols-outlined">shopping_bag</span> Add Customized Item
            </button>
          </div>
        </div>
      </div>
    `;

    const fileInput = quickviewContainer.querySelector('#modal-photo-file');
    const displayImg = quickviewContainer.querySelector('#quickview-display-img');
    if (fileInput && displayImg) {
      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (evt) => {
            displayImg.src = evt.target.result;
          };
          reader.readAsDataURL(file);
        }
      });
    }

    quickviewContainer.querySelector('.modal-add-btn').addEventListener('click', () => {
      const customTxt = quickviewContainer.querySelector('#modal-custom-text-input').value.trim();
      addToCart(product.id, 1, customTxt);
      quickviewModal.classList.remove('active');
    });

    quickviewModal.classList.add('active');
  }

  // TOAST NOTIFICATIONS
  function showToast(message) {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span class="material-symbols-outlined" style="color: var(--gc-red);">check_circle</span> ${message}`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // RUN APP
  init();
});
