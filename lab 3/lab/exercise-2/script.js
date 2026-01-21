// 1. Data Model: Product Array
const products = [
    { id: 1, name: "Wireless Headphones Pro", category: "Electronics", price: 299.99, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400" },
    { id: 2, name: "Smart Watch Ultra", category: "Electronics", price: 449.99, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400" },
    { id: 3, name: "Leather Messenger Bag", category: "Accessories", price: 189.99, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400" },
    { id: 4, name: "Minimalist Desk Lamp", category: "Home & Living", price: 129.99, image: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?w=400" },
    { id: 5, name: "Premium Cotton T-Shirt", category: "Clothing", price: 49.99, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400" },
    { id: 6, name: "Mechanical Keyboard", category: "Electronics", price: 179.99, image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=400" }
];

let cart = [];
let appliedCoupon = { code: "", value: 0 };

// 2. Initialize: Display Products
function displayProducts(filter = 'All') {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = "";
    
    const list = filter === 'All' ? products : products.filter(p => p.category === filter);
    
    list.forEach(p => {
        grid.innerHTML += `
            <div class="card">
                <img src="${p.image}">
                <div class="card-content">
                    <small style="color:var(--text-light)">${p.category}</small>
                    <h4>${p.name}</h4>
                    <div class="price-line">
                        <strong>$${p.price.toFixed(2)}</strong>
                        <button class="add-btn" onclick="addToCart(${p.id})">+ Add</button>
                    </div>
                </div>
            </div>`;
    });
}

// 3. Filter Logic (Engineering Approach)
function filterCategory(cat, event) {
    document.querySelectorAll('.filter-bar button').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    displayProducts(cat);
}

// 4. Cart Operations
function addToCart(pid) {
    const product = products.find(p => p.id === pid);
    const inCart = cart.find(item => item.id === pid);
    
    if (inCart) inCart.qty++;
    else cart.push({ ...product, qty: 1 });
    
    updateUI();
}

function changeQty(pid, delta) {
    const item = cart.find(i => i.id === pid);
    item.qty += delta;
    if (item.qty <= 0) cart = cart.filter(i => i.id !== pid);
    updateUI();
}

function clearCart() {
    cart = [];
    appliedCoupon = { code: "", value: 0 };
    document.getElementById('couponInput').value = "";
    updateUI();
}

// 5. Intelligent Discount Engine (Conditional Logic)
function calculateTotal() {
    let subtotal = 0;
    let discount = 0;
    let discountReasons = [];

    cart.forEach(item => {
        let lineTotal = item.price * item.qty;
        subtotal += lineTotal;

        // Rule: Bulk Discount (10% off for 5+ items, 15% for 10+)
        if (item.qty >= 10) {
            discount += lineTotal * 0.15;
            discountReasons.push(`Bulk 15%`);
        } else if (item.qty >= 5) {
            discount += lineTotal * 0.10;
            discountReasons.push(`Bulk 10%`);
        }

        // Rule: Category Discount (Electronics 5% off)
        if (item.category === "Electronics") {
            discount += lineTotal * 0.05;
            discountReasons.push(`Electronics 5%`);
        }
    });

    // Rule: Time of Day (Happy Hour 20% off between 12-2 PM)
    const now = new Date();
    if (now.getHours() >= 12 && now.getHours() <= 14) {
        discount += subtotal * 0.20;
        discountReasons.push(`Happy Hour 20%`);
    }

    // Apply Coupon
    discount += subtotal * appliedCoupon.value;

    return { subtotal, discount, final: subtotal - discount, reason: discountReasons[0] || "Discount" };
}

// 6. String Methods for Coupons
function applyCoupon() {
    const code = document.getElementById('couponInput').value.trim().toUpperCase();
    
    // Validation using string methods
    if (code.startsWith("SAVE") && code.length > 4) {
        const percent = parseInt(code.substring(4)); // Extracts number after 'SAVE'
        if (!isNaN(percent)) {
            appliedCoupon = { code: code, value: percent / 100 };
            alert(`Success: ${percent}% coupon applied!`);
        }
    } else {
        alert("Invalid coupon format. Try SAVE10");
    }
    updateUI();
}

// 7. Dynamic DOM Manipulation
function updateUI() {
    const cartList = document.getElementById('cartItemsList');
    const badge = document.getElementById('cartBadge');
    
    badge.innerText = cart.reduce((total, i) => total + i.qty, 0);
    cartList.innerHTML = "";

    cart.forEach(item => {
        cartList.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}">
                <div class="item-details">
                    <h5>${item.name}</h5>
                    <small>$${item.price.toFixed(2)}</small>
                    <div class="qty-controls">
                        <button class="qty-btn" onclick="changeQty(${item.id}, -1)">-</button>
                        <span>${item.qty}</span>
                        <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
                    </div>
                </div>
                <strong>$${(item.price * item.qty).toFixed(2)}</strong>
            </div>`;
    });

    const prices = calculateTotal();
    document.getElementById('subTotal').innerText = `$${prices.subtotal.toFixed(2)}`;
    
    if (prices.discount > 0) {
        document.getElementById('discountDisplay').style.display = 'flex';
        document.getElementById('discountLabel').innerText = prices.reason;
        document.getElementById('discountValue').innerText = `-$${prices.discount.toFixed(2)}`;
        document.getElementById('oldTotal').innerText = `$${prices.subtotal.toFixed(2)}`;
        document.getElementById('savingsAlert').innerHTML = `You save $${prices.discount.toFixed(2)}! 🎉`;
    } else {
        document.getElementById('discountDisplay').style.display = 'none';
        document.getElementById('oldTotal').innerText = "";
        document.getElementById('savingsAlert').innerText = "";
    }

    document.getElementById('grandTotal').innerText = `$${prices.final.toFixed(2)}`;
}

// Start
displayProducts();