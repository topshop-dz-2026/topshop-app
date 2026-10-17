let cart = [];

window.onload = function() {
    renderProducts();
    initWilayas();
    
    document.getElementById('orderForm').addEventListener('submit', function(e) {
        e.preventDefault();
        sendToWhatsApp();
    });
};

function renderProducts() {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = PRODUCTS.map(product => {
        let colorOptions = product.colors.map(c => `<option value="${c}">${c}</option>`).join('');
        let sizeOptions = product.sizes.map(s => `<option value="${s}">${s}</option>`).join('');
        
        return `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <h3>${product.name}</h3>
                <span class="price">${product.price} دج</span>
                <select id="color-${product.id}">${colorOptions}</select>
                <select id="size-${product.id}">${sizeOptions}</select>
                <button onclick="addToCart(${product.id})"><i class="fa-solid fa-cart-plus"></i> أضف للسلة</button>
            </div>
        `;
    }).join('');
}

function addToCart(id) {
    const product = PRODUCTS.find(p => p.id === id);
    const color = document.getElementById(`color-${id}`).value;
    const size = document.getElementById(`size-${id}`).value;
    
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

    document.getElementById('cartTotal').innerText = total;
    document.getElementById('cartCount').innerText = count;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function initWilayas() {
    const sel = document.getElementById('cWilaya');
    for (let w in WILAYAS_DATA) {
        sel.innerHTML += `<option value="${w}">${w}</option>`;
    }
}

function updateBaladiyas() {
    const w = document.getElementById('cWilaya').value;
    const b = document.getElementById('cBaladiya');
    b.innerHTML = '<option value="">-- اختر البلدية --</option>';
    
    if (w) {
        WILAYAS_DATA[w].baladiyas.forEach(bal => {
            b.innerHTML += `<option value="${bal}">${bal}</option>`;
        });
        
        let deliveryFee = WILAYAS_DATA[w].fee;
        let productsTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
        
        document.getElementById('checkoutProductsTotal').innerText = productsTotal;
        document.getElementById('checkoutDeliveryFee').innerText = deliveryFee;
        document.getElementById('checkoutGrandTotal').innerText = productsTotal + deliveryFee;
    } else {
        document.getElementById('checkoutProductsTotal').innerText = 0;
        document.getElementById('checkoutDeliveryFee').innerText = 0;
        document.getElementById('checkoutGrandTotal').innerText = 0;
    }
}

function sendToWhatsApp() {
    const name = document.getElementById('cName').value;
    const phone = document.getElementById('cPhone').value;
    const w = document.getElementById('cWilaya').value;
    const b = document.getElementById('cBaladiya').value;
    const addr = document.getElementById('cAddress').value;

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

function openModal(id) { document.getElementById(id).style.display = 'flex'; }
function closeModal(id) { document.getElementById(id).style.display = 'none'; }

function openCheckout() {
    if (cart.length === 0) return alert("السلة فارغة!");
    
    let productsTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    document.getElementById('checkoutProductsTotal').innerText = productsTotal;
    document.getElementById('checkoutDeliveryFee').innerText = 0;
    document.getElementById('checkoutGrandTotal').innerText = productsTotal;
    
    closeModal('cartModal');
    openModal('checkoutModal');
}