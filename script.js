let cart = [];

window.onload = function() {
    renderProducts();
    initWilayas();
    
    let form = document.getElementById('orderForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            sendToWhatsApp();
        });
    }
}; 

function renderProducts() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    
    grid.innerHTML = PRODUCTS.map(product => {
        let colorOptions = `<option value="" disabled selected>-- اختر اللون --</option>` + product.colors.map(c => `<option value="${c}">${c}</option>`).join('');
        let sizeOptions = `<option value="" disabled selected>-- اختر المقاس --</option>` + product.sizes.map(s => `<option value="${s}">${s}</option>`).join('');
        
        return `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <h3>${product.name}</h3>
                <span class="price">${product.price} دج</span>
                <select id="color-${product.id}" style="color: #666;">${colorOptions}</select>
                <select id="size-${product.id}" style="color: #666;">${sizeOptions}</select>
                <button onclick="addToCart(${product.id})"><i class="fa-solid fa-cart-plus"></i> أضف للسلة</button>
            </div>
        `;
    }).join('');
}

function addToCart(id) {
    const product = PRODUCTS.find(p => p.id === id);
    if (!product) return;

    const colorEl = document.getElementById(`color-${id}`);
    const sizeEl = document.getElementById(`size-${id}`);
    
    const color = colorEl ? colorEl.value : "";
    const size = sizeEl ? sizeEl.value : "";

    if (!color || !size) {
        return alert("⚠️ الرجاء اختيار اللون والمقاس أولاً!");
    }
    
    const existingItem = cart.find(item => item.id === id && item.color === color && item.size === size);
    
    if (existingItem) {
        existingItem.qty += 1;
    } else {
        cart.push({ ...product, color: color, size: size, qty: 1 });
    }
    
    updateCartUI();
    openModal('cartModal');
}

function updateCartUI() {
    const cartItemsDiv = document.getElementById('cartItems');
    if (!cartItemsDiv) return;

    let total = 0;
    let count = 0;

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p style="text-align:center; color:#888; padding: 20px;">السلة فارغة</p>';
    } else {
        cartItemsDiv.innerHTML = cart.map((item, index) => {
            total += (item.price * item.qty);
            count += item.qty;
            return `
                <div class="cart-item-row">
                    <div class="cart-item-info">
                        <b>${item.name}</b> (x${item.qty})
                        <small>اللون: ${item.color} | المقاس: ${item.size}</small>
                    </div>
                    <div style="text-align:left;">
                        <div style="color:#ff4757; font-weight:bold;">${item.price * item.qty} دج</div>
                        <span style="color:red; cursor:pointer; font-size:12px;" onclick="removeFromCart(${index})">حذف</span>
                    </div>
                </div>
            `;
        }).join('');
    }

    let cartTotalEl = document.getElementById('cartTotal');
    let cartCountEl = document.getElementById('cartCount');
    
    if (cartTotalEl) cartTotalEl.innerText = total;
    if (cartCountEl) cartCountEl.innerText = count;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function initWilayas() {
    const sel = document.getElementById('cWilaya');
    if (!sel) return;
    
    sel.innerHTML = '<option value="">-- اختر الولاية --</option>';
    for (let w in WILAYAS_DATA) {
        sel.innerHTML += `<option value="${w}">${w}</option>`;
    }
}

function updateBaladiyas() {
    const wEl = document.getElementById('cWilaya');
    if (!wEl) return;
    const w = wEl.value;

    const b = document.getElementById('cBaladiya');
    if (!b) return;
    
    b.innerHTML = '<option value="">-- اختر البلدية --</option>';
    
    if (w) {
        WILAYAS_DATA[w].baladiyas.forEach(bal => {
            b.innerHTML += `<option value="${bal}">${bal}</option>`;
        });
        
        let deliveryFee = WILAYAS_DATA[w].fee;
        let productsTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
        
        let elProducts = document.getElementById('checkoutProductsTotal');
        let elDelivery = document.getElementById('checkoutDeliveryFee');
        let elGrand = document.getElementById('checkoutGrandTotal');
        
        if (elProducts) elProducts.innerText = productsTotal;
        if (elDelivery) elDelivery.innerText = deliveryFee;
        if (elGrand) elGrand.innerText = productsTotal + deliveryFee;
    }
}

function sendToWhatsApp() {
    const name = document.getElementById('cName').value;
    const phone = document.getElementById('cPhone').value;
    const w = document.getElementById('cWilaya').value;
    const b = document.getElementById('cBaladiya').value;
    const addr = document.getElementById('cAddress').value;

    if (!w) return alert("الرجاء اختيار الولاية!");

    let totalProducts = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    let deliveryFee = WILAYAS_DATA[w].fee;
    
    let msg = `*طلب جديد من Top Shop DZ* 🛒\n\n`;
    cart.forEach(item => {
        msg += `▪️ ${item.name} (${item.color} | ${item.size}) x${item.qty} = ${item.price * item.qty} دج\n`;
    });
    
    msg += `\n*المجموع:* ${totalProducts} دج`;
    msg += `\n*التوصيل (${w}):* ${deliveryFee} دج`;
    msg += `\n*المجموع الكلي:* ${totalProducts + deliveryFee} دج\n\n`;
    msg += `*معلومات الزبون:*\n`;
    msg += `👤 الاسم: ${name}\n📞 الهاتف: ${phone}\n📍 الولاية: ${w}\n🏙️ البلدية: ${b}\n🏠 العنوان: ${addr}`;

    const myPhoneNumber = "213540773315"; 
    window.open(`https://wa.me/${myPhoneNumber}?text=${encodeURIComponent(msg)}`, '_blank');
}

function openModal(id) { 
    let el = document.getElementById(id);
    if (el) el.style.display = 'flex'; 
}

function closeModal(id) { 
    let el = document.getElementById(id);
    if (el) el.style.display = 'none'; 
}

function openCheckout() {
    if (cart.length === 0) return alert("السلة فارغة!");
    
    closeModal('cartModal');
    openModal('checkoutModal');
    
    let productsTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    
    let elProducts = document.getElementById('checkoutProductsTotal');
    let elDelivery = document.getElementById('checkoutDeliveryFee');
    let elGrand = document.getElementById('checkoutGrandTotal');
    
    if (elProducts) elProducts.innerText = productsTotal;
    if (elDelivery) elDelivery.innerText = 0;
    if (elGrand) elGrand.innerText = productsTotal;
}
