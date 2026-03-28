<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes">
    <title>Caffeine Cove | Artisan Coffee & Cozy Vibes</title>
    <!-- Google Fonts & Font Awesome -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', sans-serif;
            background: #FDF8F0;
            color: #2C2418;
            scroll-behavior: smooth;
            overflow-x: hidden;
        }

        h1, h2, h3, .logo-font {
            font-family: 'Playfair Display', serif;
        }

        /* Warm coffee theme colors */
        .bg-coffee-light { background: #F7E9DD; }
        .bg-coffee-dark { background: #5E3A2C; }
        .text-coffee { color: #5E3A2C; }
        .border-coffee { border-color: #D9C2A7; }

        /* Steam animation */
        @keyframes floatSteam {
            0% { transform: translateY(0) scale(0.8); opacity: 0.7; }
            100% { transform: translateY(-40px) scale(1.3); opacity: 0; }
        }
        .steam {
            position: absolute;
            bottom: 5px;
            left: 50%;
            width: 14px;
            height: 14px;
            background: rgba(255,245,225,0.85);
            border-radius: 50%;
            filter: blur(5px);
            pointer-events: none;
            animation: floatSteam 2.2s infinite ease-out;
        }

        /* Card hover effects */
        .card-hover {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .card-hover:hover {
            transform: translateY(-8px) rotate(1deg);
            box-shadow: 0 25px 35px -12px rgba(0,0,0,0.2);
        }

        /* Game card styles */
        .game-card {
            background: #FFF3E8;
            border-radius: 20px;
            cursor: pointer;
            transition: all 0.2s ease;
            box-shadow: 0 8px 16px -8px rgba(0,0,0,0.1);
        }
        .game-card.flipped {
            background: #EADBC6;
            transform: scale(0.97);
        }
        .game-card.matched-card {
            background: #D4E2D4;
            cursor: default;
            opacity: 0.7;
            transform: scale(0.95);
        }

        /* Toast notification */
        .toast-notification {
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: #2C2418;
            color: #FFE6CC;
            padding: 14px 28px;
            border-radius: 60px;
            font-weight: 500;
            z-index: 1000;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            backdrop-filter: blur(4px);
            opacity: 0;
            transform: translateX(60px);
            transition: all 0.35s cubic-bezier(0.2, 0.9, 0.4, 1.1);
            font-size: 0.95rem;
        }
        .toast-notification.show {
            opacity: 1;
            transform: translateX(0);
        }

        /* Modal overlay for win celebration */
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.75);
            backdrop-filter: blur(6px);
            z-index: 2000;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        .modal-overlay.active {
            opacity: 1;
            visibility: visible;
        }
        .celebration-modal {
            background: #FFF8F0;
            border-radius: 32px;
            padding: 2rem 2rem 2rem 2rem;
            max-width: 400px;
            text-align: center;
            transform: scale(0.9);
            transition: transform 0.3s cubic-bezier(0.34, 1.2, 0.64, 1);
            box-shadow: 0 30px 40px rgba(0,0,0,0.3);
        }
        .modal-overlay.active .celebration-modal {
            transform: scale(1);
        }

        /* Scroll reveal animation */
        .reveal-on-scroll {
            opacity: 0;
            transform: translateY(40px);
            transition: opacity 0.8s cubic-bezier(0.2, 0.9, 0.4, 1.1), transform 0.8s ease;
        }
        .reveal-on-scroll.revealed {
            opacity: 1;
            transform: translateY(0);
        }

        /* Menu filter active */
        .menu-filter-btn.active {
            background: #5E3A2C;
            color: white;
            border-color: #5E3A2C;
        }

        /* Bounce icon animation */
        @keyframes bounceIcon {
            0%,100%{ transform: translateY(0); }
            50%{ transform: translateY(-6px); }
        }
        .bounce-icon {
            animation: bounceIcon 0.6s ease;
        }

        /* Responsive */
        @media (max-width: 768px) {
            .game-card { width: 80px; height: 90px; font-size: 2rem; }
        }
    </style>
</head>
<body>

    <!-- Toast Container -->
    <div id="toast" class="toast-notification">✨ Item added to your brew</div>

    <!-- Navigation -->
    <nav class="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-[#EADBC6]">
        <div class="max-w-7xl mx-auto px-5 py-4 flex justify-between items-center">
            <div class="text-2xl md:text-3xl font-bold text-[#5E3A2C] tracking-tight"><i class="fas fa-mug-hot mr-2"></i>Caffeine Cove</div>
            <div class="hidden md:flex gap-8 text-[#3E2C21] font-medium">
                <a href="#home" class="hover:text-[#AA7C5C] transition duration-200">Home</a>
                <a href="#menu" class="hover:text-[#AA7C5C] transition duration-200">Menu</a>
                <a href="#founder" class="hover:text-[#AA7C5C] transition duration-200">Founder's Story</a>
                <a href="#game" class="hover:text-[#AA7C5C] transition duration-200">Match the Beans</a>
                <a href="#testimonials" class="hover:text-[#AA7C5C] transition duration-200">Vibes</a>
            </div>
            <div class="md:hidden">
                <i class="fas fa-bars text-2xl text-[#5E3A2C]" id="mobileMenuBtn"></i>
            </div>
        </div>
        <div id="mobileMenu" class="hidden flex-col bg-white/98 backdrop-blur-md border-t border-[#EADBC6] px-6 pb-5 md:hidden">
            <a href="#home" class="py-2 hover:text-[#AA7C5C]">Home</a>
            <a href="#menu" class="py-2 hover:text-[#AA7C5C]">Menu</a>
            <a href="#founder" class="py-2 hover:text-[#AA7C5C]">Founder's Story</a>
            <a href="#game" class="py-2 hover:text-[#AA7C5C]">Match the Beans</a>
            <a href="#testimonials" class="py-2 hover:text-[#AA7C5C]">Vibes</a>
        </div>
    </nav>

    <!-- Hero Section -->
    <section id="home" class="pt-28 pb-16 px-5 md:px-10 bg-gradient-to-br from-[#FCF5EA] to-[#F2E5D6]">
        <div class="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
            <div class="flex-1 text-center md:text-left reveal-on-scroll">
                <div class="steam-wrapper inline-block relative">
                    <i class="fas fa-mug-hot text-7xl text-[#B97F54] mb-4"></i>
                    <div class="steam" style="left: 35%;"></div>
                    <div class="steam" style="left: 65%; animation-delay: 0.5s;"></div>
                </div>
                <h1 class="text-5xl md:text-6xl font-bold text-[#3E2C21] leading-tight">Artisan Coffee <br><span class="text-[#AA7C5C]">& Cozy Vibes</span></h1>
                <p class="text-gray-700 text-lg mt-4 max-w-lg mx-auto md:mx-0">Where every sip tells a story. Handcrafted brews, soulful space, and warmth in every cup.</p>
                <div class="mt-8 flex gap-4 justify-center md:justify-start">
                    <a href="#menu" class="bg-[#5E3A2C] text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-[#7E4E3A] transition transform hover:scale-105">Explore Menu</a>
                    <a href="#founder" class="border-2 border-[#5E3A2C] text-[#5E3A2C] px-8 py-3 rounded-full font-semibold hover:bg-[#5E3A2C] hover:text-white transition">Our Journey</a>
                </div>
            </div>
            <div class="flex-1 flex justify-center">
                <img src="https://picsum.photos/id/225/500/500" alt="Coffee shop ambiance" class="rounded-3xl shadow-2xl object-cover w-full max-w-md h-auto border-8 border-white/70" style="aspect-ratio: 1/1;">
            </div>
        </div>
    </section>

    <!-- MENU SECTION with interactive filtering & stagger animations + add to cart modal simulation -->
    <section id="menu" class="py-20 px-5 bg-white">
        <div class="max-w-6xl mx-auto text-center">
            <h2 class="text-4xl md:text-5xl font-bold text-[#3E2C21] mb-2">Our <span class="text-[#AA7C5C]">Signature Brews</span></h2>
            <p class="text-gray-600 max-w-xl mx-auto mb-10">Hand-picked recipes, crafted with love & passion</p>
            <div class="flex justify-center gap-4 flex-wrap mb-12">
                <button data-filter="all" class="menu-filter-btn px-6 py-2 rounded-full border border-[#D9C2A7] bg-transparent font-medium transition-all">All</button>
                <button data-filter="coffee" class="menu-filter-btn px-6 py-2 rounded-full border border-[#D9C2A7] bg-transparent font-medium">Coffee</button>
                <button data-filter="pastry" class="menu-filter-btn px-6 py-2 rounded-full border border-[#D9C2A7] bg-transparent font-medium">Pastries</button>
                <button data-filter="special" class="menu-filter-btn px-6 py-2 rounded-full border border-[#D9C2A7] bg-transparent font-medium">Specials</button>
            </div>
            <div id="menuGrid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"></div>
        </div>
    </section>

    <!-- FOUNDER SECTION - Hafsa's inspiring story: struggle, job loss, rejections, hardship, success -->
    <section id="founder" class="py-24 px-5 bg-[#F7E9DD] relative overflow-hidden">
        <div class="max-w-5xl mx-auto relative z-10">
            <div class="grid md:grid-cols-2 gap-12 items-center">
                <div class="reveal-on-scroll order-2 md:order-1">
                    <div class="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl">
                        <span class="text-[#AA7C5C] font-bold text-sm tracking-wider"><i class="fas fa-heart text-red-400"></i> FOUNDER'S JOURNEY</span>
                        <h2 class="text-4xl font-bold text-[#3E2C21] mt-2">Hafsa's <span class="border-b-4 border-[#AA7C5C]">Struggle & Triumph</span></h2>
                        <p class="text-gray-800 mt-5 leading-relaxed">Hafsa faced endless job rejections, sudden job loss during economic downturn, and deep financial hardship. With a dream buried under doubt, she started baking at 3 AM, borrowed a small espresso machine, and sold coffee at local pop-ups. Despite countless closed doors and moments of despair, her unwavering passion gave birth to <strong class="text-[#5E3A2C]">Caffeine Cove</strong> — a sanctuary for dreamers. Today, she stands as a beacon of resilience, employing single mothers and artists. Her story reminds us: the strongest brews emerge from the darkest roasts. ☕✨</p>
                        <div class="mt-6 flex gap-3 text-[#5E3A2C]">
                            <i class="fas fa-quote-left text-3xl opacity-50"></i>
                            <p class="italic font-medium">"Every rejection brewed a stronger version of me. Now we serve hope in a cup." – Hafsa</p>
                        </div>
                    </div>
                </div>
                <div class="reveal-on-scroll order-1 md:order-2 flex justify-center">
                    <img src="https://picsum.photos/id/20/500/600" alt="Hafsa founder portrait" class="rounded-2xl shadow-2xl w-full max-w-sm object-cover border-4 border-white" style="aspect-ratio: 3/4;">
                </div>
            </div>
        </div>
        <div class="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-[#F7E9DD] to-transparent"></div>
    </section>

    <!-- GAME SECTION: "Match the Beans" memory matching game with moves tracker & celebration modal -->
    <section id="game" class="py-20 px-5 bg-[#FFF8F0]">
        <div class="max-w-5xl mx-auto text-center">
            <h2 class="text-4xl font-bold text-[#3E2C21]">☕ Match the Beans</h2>
            <p class="text-gray-600 mb-2">Flip cards & match coffee pairs! Test your memory.</p>
            <div class="flex justify-between items-center max-w-md mx-auto mt-4 gap-6">
                <div class="bg-white rounded-full px-5 py-2 shadow-md"><i class="fas fa-exchange-alt text-[#AA7C5C]"></i> <span id="moveCount">0</span> Moves</div>
                <button id="resetGameBtn" class="bg-[#5E3A2C] text-white px-5 py-2 rounded-full text-sm hover:bg-[#7E4E3A] transition shadow"><i class="fas fa-sync-alt"></i> New Game</button>
            </div>
            <div id="gameBoard" class="grid grid-cols-3 sm:grid-cols-4 gap-4 mt-8 justify-items-center"></div>
        </div>
    </section>

    <!-- Testimonials Section -->
    <section id="testimonials" class="py-20 px-5 bg-[#F2E5D6]">
        <div class="max-w-6xl mx-auto text-center">
            <h2 class="text-4xl font-bold text-[#3E2C21]">Community <span class="text-[#AA7C5C]">Love</span></h2>
            <div class="grid md:grid-cols-3 gap-8 mt-12">
                <div class="bg-white p-6 rounded-2xl shadow-md card-hover reveal-on-scroll">
                    <i class="fas fa-star text-yellow-500"></i><i class="fas fa-star text-yellow-500"></i><i class="fas fa-star text-yellow-500"></i><i class="fas fa-star text-yellow-500"></i><i class="fas fa-star text-yellow-500"></i>
                    <p class="mt-3 italic">"The flat white is heavenly and the atmosphere feels like a warm hug."</p>
                    <h4 class="font-bold mt-4">— Lina M.</h4>
                </div>
                <div class="bg-white p-6 rounded-2xl shadow-md card-hover reveal-on-scroll">
                    <i class="fas fa-star text-yellow-500"></i><i class="fas fa-star text-yellow-500"></i><i class="fas fa-star text-yellow-500"></i><i class="fas fa-star text-yellow-500"></i><i class="fas fa-star text-yellow-500"></i>
                    <p class="mt-3 italic">"Hafsa's story moved me. Best cold brew and vegan banana bread!"</p>
                    <h4 class="font-bold mt-4">— Darius K.</h4>
                </div>
                <div class="bg-white p-6 rounded-2xl shadow-md card-hover reveal-on-scroll">
                    <i class="fas fa-star text-yellow-500"></i><i class="fas fa-star text-yellow-500"></i><i class="fas fa-star text-yellow-500"></i><i class="fas fa-star text-yellow-500"></i><i class="fas fa-star text-yellow-500"></i>
                    <p class="mt-3 italic">"Cozy corner, amazing espresso. The memory game is so fun!"</p>
                    <h4 class="font-bold mt-4">— Sofia R.</h4>
                </div>
            </div>
        </div>
    </section>

    <!-- FOOTER with CREATED BY HAFSA (removed "Last") -->
    <footer class="bg-[#2C2418] text-[#EADBC6] py-8 px-5">
        <div class="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <div class="text-center md:text-left"><i class="fas fa-mug-hot mr-1"></i> Caffeine Cove — Where warmth meets grind.</div>
            <div class="font-semibold tracking-wide text-[#FFDFB3]">CREATED BY HAFSA ✨</div>
            <div class="text-sm">© 2025 | Resilience brewed daily.</div>
        </div>
    </footer>

    <!-- Celebration Modal for Game Win -->
    <div id="celebrationModal" class="modal-overlay">
        <div class="celebration-modal">
            <i class="fas fa-trophy text-6xl text-[#AA7C5C] mb-3"></i>
            <h3 class="text-2xl font-bold text-[#5E3A2C]">You Won! 🎉</h3>
            <p class="text-gray-700 my-3">Perfect match! You've mastered the beans.</p>
            <button id="closeModalBtn" class="mt-3 bg-[#5E3A2C] text-white px-6 py-2 rounded-full hover:bg-[#7E4E3A] transition">Play Again</button>
        </div>
    </div>

    <script>
        // ---------- MENU DATA ----------
        const menuItems = [
            { id: 1, name: "Velvet Latte", category: "coffee", price: "$5.5", desc: "Smooth espresso with oat milk & vanilla", icon: "fa-mug-hot", steam: true },
            { id: 2, name: "Hazelnut Affogato", category: "coffee", price: "$7", desc: "Vanilla gelato + fresh espresso shot", icon: "fa-ice-cream", steam: false },
            { id: 3, name: "Caramel Croissant", category: "pastry", price: "$4.2", desc: "Flaky layers with caramel drizzle", icon: "fa-croissant", steam: false },
            { id: 4, name: "Cinnamon Scroll", category: "pastry", price: "$4.5", desc: "Swirls of brown sugar bliss", icon: "fa-bread-slice", steam: false },
            { id: 5, name: "Spanish Latte", category: "special", price: "$6.2", desc: "Condensed milk magic & espresso", icon: "fa-mug-saucer", steam: true },
            { id: 6, name: "Honey Cardamom Brew", category: "special", price: "$6.8", desc: "Aromatic spiced honey coffee", icon: "fa-mortar-pestle", steam: true }
        ];

        function renderMenu(filter = "all") {
            const grid = document.getElementById("menuGrid");
            const filtered = filter === "all" ? menuItems : menuItems.filter(i => i.category === filter);
            grid.innerHTML = "";
            filtered.forEach((item, idx) => {
                const card = document.createElement("div");
                card.className = "bg-[#FEF9EF] rounded-2xl p-5 shadow-md card-hover transition-all duration-300 opacity-0 translate-y-5";
                card.style.animation = `fadeInUp 0.35s ease forwards ${idx * 0.07}s`;
                card.innerHTML = `
                    <div class="steam-wrapper inline-block text-4xl text-[#AA7C5C] mb-3 relative">
                        <i class="fas ${item.icon}"></i>
                        ${item.steam ? `<div class="steam" style="left: 20%;"></div><div class="steam" style="left: 60%; animation-delay:0.4s"></div>` : ''}
                    </div>
                    <h3 class="text-2xl font-bold text-[#5E3A2C]">${item.name}</h3>
                    <p class="text-gray-500 text-sm mt-1">${item.desc}</p>
                    <div class="flex justify-between items-center mt-4">
                        <span class="text-xl font-bold text-[#AA7C5C]">${item.price}</span>
                        <button data-id="${item.id}" class="add-to-cart-btn bg-[#5E3A2C] text-white px-4 py-1 rounded-full text-sm hover:bg-[#8B5A3E] transition"><i class="fas fa-cart-plus"></i> Add</button>
                    </div>
                `;
                grid.appendChild(card);
            });
            document.querySelectorAll(".add-to-cart-btn").forEach(btn => {
                btn.addEventListener("click", (e) => {
                    e.stopPropagation();
                    const itemName = menuItems.find(i => i.id == btn.dataset.id).name;
                    showToast(`☕ ${itemName} added to your order!`);
                    // Bounce effect on icon
                    const icon = btn.querySelector("i");
                    if(icon) icon.classList.add("bounce-icon");
                    setTimeout(() => icon?.classList.remove("bounce-icon"), 500);
                });
            });
        }

        function showToast(msg) {
            const toast = document.getElementById("toast");
            toast.textContent = msg || "✨ Added to cart";
            toast.classList.add("show");
            setTimeout(() => toast.classList.remove("show"), 2200);
        }

        // Filter buttons
        document.querySelectorAll(".menu-filter-btn").forEach(btn => {
            btn.addEventListener("click", (e) => {
                document.querySelectorAll(".menu-filter-btn").forEach(b => b.classList.remove("active", "bg-[#5E3A2C]", "text-white"));
                btn.classList.add("active", "bg-[#5E3A2C]", "text-white");
                renderMenu(btn.dataset.filter);
            });
        });
        renderMenu("all");
        document.querySelector(".menu-filter-btn[data-filter='all']").classList.add("active", "bg-[#5E3A2C]", "text-white");

        // ---------- MATCH THE BEANS GAME (12 cards, coffee-themed) ----------
        const coffeeGameIcons = ["fa-mug-hot", "fa-mug-saucer", "fa-coffee", "fa-cup-togo", "fa-blender", "fa-mortar-pestle"];
        let gameState = [];
        let flippedIndices = [];
        let lockBoard = false;
        let moves = 0;
        let matchedCount = 0;
        const totalPairs = coffeeGameIcons.length;

        function initGameBoard() {
            let iconsDeck = [...coffeeGameIcons, ...coffeeGameIcons];
            for (let i = iconsDeck.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [iconsDeck[i], iconsDeck[j]] = [iconsDeck[j], iconsDeck[i]];
            }
            gameState = iconsDeck.map((icon, idx) => ({
                id: idx,
                icon: icon,
                matched: false,
                flipped: false
            }));
            flippedIndices = [];
            lockBoard = false;
            moves = 0;
            matchedCount = 0;
            document.getElementById("moveCount").innerText = moves;
            document.getElementById("celebrationModal").classList.remove("active");
            renderGameBoard();
        }

        function renderGameBoard() {
            const board = document.getElementById("gameBoard");
            board.innerHTML = "";
            gameState.forEach((card, idx) => {
                const cardDiv = document.createElement("div");
                let additionalClass = "";
                if (card.matched) additionalClass = "matched-card";
                else if (card.flipped) additionalClass = "flipped";
                cardDiv.className = `game-card w-24 h-28 sm:w-28 sm:h-32 flex items-center justify-center text-3xl shadow-md transition-all duration-200 ${additionalClass}`;
                if (card.matched) {
                    cardDiv.innerHTML = `<i class="fas ${card.icon} text-4xl text-[#5E3A2C] opacity-80"></i><div class="absolute inset-0 rounded-2xl bg-green-200/30"></div>`;
                } else if (card.flipped) {
                    cardDiv.innerHTML = `<i class="fas ${card.icon} text-4xl text-[#AA7C5C]"></i>`;
                } else {
                    cardDiv.innerHTML = `<i class="fas fa-seedling text-3xl text-[#B97F54]"></i>`;
                }
                cardDiv.addEventListener("click", () => onCardClick(idx));
                board.appendChild(cardDiv);
            });
        }

        function onCardClick(idx) {
            if (lockBoard) return;
            const card = gameState[idx];
            if (card.matched || card.flipped) return;
            card.flipped = true;
            flippedIndices.push(idx);
            renderGameBoard();
            if (flippedIndices.length === 2) {
                moves++;
                document.getElementById("moveCount").innerText = moves;
                lockBoard = true;
                const firstCard = gameState[flippedIndices[0]];
                const secondCard = gameState[flippedIndices[1]];
                if (firstCard.icon === secondCard.icon) {
                    firstCard.matched = true;
                    secondCard.matched = true;
                    firstCard.flipped = false;
                    secondCard.flipped = false;
                    matchedCount++;
                    flippedIndices = [];
                    lockBoard = false;
                    renderGameBoard();
                    if (matchedCount === totalPairs) {
                        setTimeout(() => {
                            document.getElementById("celebrationModal").classList.add("active");
                            showToast("🎉 You won! Perfect memory! 🎉");
                        }, 150);
                    }
                } else {
                    setTimeout(() => {
                        gameState[flippedIndices[0]].flipped = false;
                        gameState[flippedIndices[1]].flipped = false;
                        flippedIndices = [];
                        lockBoard = false;
                        renderGameBoard();
                    }, 800);
                }
            }
        }

        document.getElementById("resetGameBtn").addEventListener("click", () => {
            initGameBoard();
            showToast("🔄 Fresh coffee beans! New game started.");
        });
        document.getElementById("closeModalBtn").addEventListener("click", () => {
            document.getElementById("celebrationModal").classList.remove("active");
            initGameBoard();
        });
        initGameBoard();

        // Mobile menu toggle
        const mobileBtn = document.getElementById("mobileMenuBtn");
        const mobileMenuDiv = document.getElementById("mobileMenu");
        if(mobileBtn) {
            mobileBtn.addEventListener("click", () => {
                mobileMenuDiv.classList.toggle("hidden");
            });
        }

        // Scroll reveal observer
        const revealElements = document.querySelectorAll(".reveal-on-scroll");
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    entry.target.classList.add("revealed");
                    scrollObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        revealElements.forEach(el => scrollObserver.observe(el));
        setTimeout(() => {
            revealElements.forEach(el => {
                if(el.getBoundingClientRect().top < window.innerHeight - 80) el.classList.add("revealed");
            });
        }, 150);

        // Smooth navigation for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if(targetId === "#" || targetId === "") return;
                const targetElem = document.querySelector(targetId);
                if(targetElem) {
                    e.preventDefault();
                    targetElem.scrollIntoView({ behavior: 'smooth' });
                    if(mobileMenuDiv && !mobileMenuDiv.classList.contains("hidden")) mobileMenuDiv.classList.add("hidden");
                }
            });
        });

        // Additional micro-interaction: add steam on hover for hero mug
        const heroMug = document.querySelector("#home .steam-wrapper");
        if(heroMug) {
            heroMug.addEventListener("mouseenter", () => {
                const steams = heroMug.querySelectorAll(".steam");
                steams.forEach(s => s.style.animation = "floatSteam 1s ease-out");
                setTimeout(() => {
                    steams.forEach(s => s.style.animation = "");
                }, 1000);
            });
        }
    </script>
    <style>
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .game-card {
            transition: 0.2s linear;
            backface-visibility: visible;
            position: relative;
        }
        .game-card:hover:not(.matched-card) {
            transform: scale(1.02);
            background: #F7E1C1;
        }
        .menu-filter-btn {
            transition: all 0.2s;
        }
    </style>
</body>
</html>
