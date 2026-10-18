// ==========================================
// 1. إعدادات Firebase (الربط مع قاعدة البيانات)
// ==========================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCPRXbyI-8NQqwvI5FEGOd0kyxN4OMzc08",
    authDomain: "topshop-dz-fa00e.firebaseapp.com",
    projectId: "topshop-dz-fa00e",
    storageBucket: "topshop-dz-fa00e.firebasestorage.app",
    messagingSenderId: "1086306037705",
    appId: "1:1086306037705:web:eaf10afb0a456834f40218"
};

// تشغيل Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ==========================================
// 2. جلب المنتجات من Firebase وعرضها في الصفحة
// ==========================================
const productsContainer = document.getElementById('products-container');

async function loadProducts() {
    try {
        // جلب المنتجات من المجموعة "products"
        const querySnapshot = await getDocs(collection(db, "products"));
        
        // إذا كانت القاعدة فارغة
        if (querySnapshot.empty) {
            productsContainer.innerHTML = "<p style='text-align:center; grid-column: 1/-1;'>لا توجد منتجات حالياً.</p>";
            return;
        }

        // تفريغ الحاوية قبل إضافة المنتجات
        productsContainer.innerHTML = "";

        querySnapshot.forEach((doc) => {
            const product = doc.data();
            
            // إنشاء كرت المنتج
            const card = document.createElement('div');
            card.className = 'product-card'; 
            
            // التصميم الداخلي للكرت
            card.innerHTML = `
                <img src="${product.image || 'https://via.placeholder.com/300x300?text=No+Image'}" alt="${product.name}" style="width:100%; height:200px; object-fit:cover; border-radius:10px 10px 0 0;">
                <div style="padding: 15px;">
                    <h3 style="font-size: 16px; margin-bottom: 10px; color: #333;">${product.name}</h3>
                    <p style="color: #2563eb; font-weight: bold; font-size: 18px; margin-bottom: 10px;">${product.price} دج</p>
                    <button style="width: 100%; padding: 10px; background-color: #2563eb; color: white; border: none; border-radius: 5px; cursor: pointer;">أضف إلى السلة</button>
                </div>
            `;
            
            productsContainer.appendChild(card);
        });

    } catch (error) {
        console.error("Error loading products: ", error);
        productsContainer.innerHTML = "<p style='text-align:center; grid-column: 1/-1; color:red;'>حدث خطأ أثناء تحميل المنتجات. تأكد من اتصالك بالإنترنت.</p>";
    }
}

// تشغيل الدالة عند فتح الصفحة
document.addEventListener('DOMContentLoaded', loadProducts);