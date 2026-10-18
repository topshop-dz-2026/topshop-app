import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCPRXbyI-8NQqwvI5FEGOd0kyxN4OMzc08",
    authDomain: "topshop-dz-fa00e.firebaseapp.com",
    projectId: "topshop-dz-fa00e",
    storageBucket: "topshop-dz-fa00e.firebasestorage.app",
    messagingSenderId: "1086306037705",
    appId: "1:1086306037705:web:eaf10afb0a456834f40218"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const form = document.getElementById('add-product-form');
const productsList = document.getElementById('admin-products-list');

// دالة لعرض المنتجات في لوحة التحكم
async function loadAdminProducts() {
    productsList.innerHTML = 'جاري التحميل...';
    try {
        const querySnapshot = await getDocs(collection(db, "products"));
        productsList.innerHTML = '';
        
        if (querySnapshot.empty) {
            productsList.innerHTML = '<p>لا توجد منتجات حالياً.</p>';
            return;
        }

        querySnapshot.forEach((docSnap) => {
            const product = docSnap.data();
            const item = document.createElement('div');
            item.className = 'product-item';
            item.innerHTML = `
                <div>
                    <strong>${product.name}</strong> - ${product.price} دج
                </div>
                <button class="btn-delete" data-id="${docSnap.id}">مسح</button>
            `;
            productsList.appendChild(item);
        });

        // إضافة حدث المسح لكل زر
        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const id = e.target.getAttribute('data-id');
                if (confirm('هل أنت متأكد من مسح هذا المنتج؟')) {
                    await deleteDoc(doc(db, "products", id));
                    loadAdminProducts(); // إعادة تحميل القائمة
                }
            });
        });

    } catch (error) {
        console.error("خطأ:", error);
        productsList.innerHTML = 'حدث خطأ في تحميل المنتجات.';
    }
}

// إضافة منتج جديد
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('p-name').value;
    const price = document.getElementById('p-price').value;
    const image = document.getElementById('p-image').value;

    try {
        await addDoc(collection(db, "products"), {
            name: name,
            price: Number(price),
            image: image
        });
        alert('تمت إضافة المنتج بنجاح!');
        form.reset();
        loadAdminProducts();
    } catch (error) {
        console.error("خطأ في الإضافة:", error);
        alert('حدث خطأ أثناء إضافة المنتج.');
    }
});

// تحميل المنتجات عند فتح الصفحة
document.addEventListener('DOMContentLoaded', loadAdminProducts);