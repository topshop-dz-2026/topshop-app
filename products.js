const PRODUCTS = [
    { 
        id: 1, name: "تي شيرت رجالي عصري", price: 2500, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400", 
        colors: ["أحمر", "أزرق", "أسود", "أبيض", "رمادي", "أخضر", "أصفر", "وردي", "بيج", "كحلي"], 
        sizes: ["S", "M", "L", "XL", "XXL", "3XL"] 
    },
    { 
        id: 2, name: "ساعة ذكية Smart Watch", price: 7500, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400", 
        colors: ["أسود", "فضي", "ذهبي", "أزرق", "أحمر", "أبيض"], 
        sizes: ["عادي", "صغير", "كبير"] 
    },
    { 
        id: 3, name: "حذاء رياضي خفيف", price: 5500, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400", 
        colors: ["أبيض", "أسود", "أحمر", "أزرق", "رمادي", "أخضر", "برتقالي"], 
        sizes: ["39", "40", "41", "42", "43", "44", "45"] 
    },
    { 
        id: 4, name: "قميص صيفي كلاسيك", price: 3200, image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400", 
        colors: ["أبيض", "أزرق فاتح", "بيج", "وردي", "كحلي", "رمادي", "أخضر فاتح"], 
        sizes: ["S", "M", "L", "XL", "XXL"] 
    },
    { 
        id: 5, name: "سماعات بلوتوث Pro", price: 4800, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400", 
        colors: ["أسود", "أبيض", "أزرق", "وردي", "ذهبي"], 
        sizes: ["عادي"] 
    },
    { 
        id: 6, name: "جاكيت شتوي مبطن", price: 8000, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400", 
        colors: ["أسود", "بني", "أخضر", "كحلي", "رمادي", "بيج"], 
        sizes: ["M", "L", "XL", "XXL", "3XL"] 
    },
    { 
        id: 7, name: "نظارات شمسية UV400", price: 1800, image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400", 
        colors: ["أسود", "بني", "أزرق", "فضي", "ذهبي"], 
        sizes: ["عادي"] 
    },
    { 
        id: 8, name: "عطر رجالي فاخر", price: 6500, image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400", 
        colors: ["أسود", "أزرق", "أحمر", "ذهبي"], 
        sizes: ["50ml", "100ml", "200ml"] 
    },
    { 
        id: 9, name: "حقيبة ظهر عملية", price: 3500, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400", 
        colors: ["أسود", "رمادي", "أزرق", "أحمر", "أخضر"], 
        sizes: ["عادي", "كبير"] 
    },
    { 
        id: 10, name: "هاتف ذكي", price: 25000, image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400", 
        colors: ["أسود", "أزرق", "أبيض", "ذهبي", "أخضر"], 
        sizes: ["64GB", "128GB", "256GB", "512GB"] 
    },
    { 
        id: 11, name: "سروال جينز ضيق", price: 4200, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400", 
        colors: ["أزرق غامق", "أسود", "رمادي", "أزرق فاتح", "بيج"], 
        sizes: ["38", "40", "42", "44", "46", "48"] 
    },
    { 
        id: 12, name: "ساعة يد كلاسيكية", price: 5500, image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400", 
        colors: ["فضي", "ذهبي", "أسود", "بني"], 
        sizes: ["عادي"] 
    }
];