const mongoose = require('mongoose');
const dotenv = require('dotenv');
const MenuItem = require('./models/MenuItem');
const User = require('./models/User');

dotenv.config();

const menuItems = [
  // ── Starters ──────────────────────────────────────────────────────────────
  {
    name: 'Crispy Bruschetta',
    description: 'Toasted sourdough topped with vine-ripened tomatoes, fresh basil, and aged balsamic glaze.',
    price: 14.99,
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1506280754576-f6fa8a873550?w=800',
    isVeg: true,
    isFeatured: true,
    rating: 4.8,
    spiceLevel: 'None',
    tags: ['popular', 'crispy'],
  },
  {
    name: 'Tandoori Chicken Wings',
    description: 'Marinated overnight in yogurt and spices, flame-kissed to smoky perfection.',
    price: 18.99,
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1626082896492-766af4eb6501?w=800',
    isVeg: false,
    isFeatured: true,
    rating: 4.9,
    spiceLevel: 'Hot',
    tags: ['bestseller', 'spicy'],
  },
  {
    name: 'Vegetable Spring Rolls',
    description: 'Crispy rolls filled with stir-fried cabbage, carrots, mushrooms, and glass noodles.',
    price: 12.49,
    category: 'Starters',
    image: '/images/vegetable_spring_rolls.png',
    isVeg: true,
    isFeatured: false,
    rating: 4.5,
    spiceLevel: 'Mild',
    tags: ['vegan-friendly'],
  },
  // ── Soups ─────────────────────────────────────────────────────────────────
  {
    name: 'Tom Yum Soup',
    description: 'Aromatic Thai broth with lemongrass, kaffir lime, mushrooms, and a spicy kick.',
    price: 15.99,
    category: 'Soups',
    image: '/images/tom_yum_soup.png',
    isVeg: true,
    isFeatured: false,
    rating: 4.7,
    spiceLevel: 'Medium',
    tags: ['thai', 'aromatic'],
  },
  {
    name: 'Roasted Tomato Bisque',
    description: 'Slow-roasted Roma tomatoes blended with cream, basil oil, and croutons.',
    price: 13.99,
    category: 'Soups',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800',
    isVeg: true,
    isFeatured: true,
    rating: 4.6,
    spiceLevel: 'None',
    tags: ['comfort food'],
  },
  // ── Main Course ───────────────────────────────────────────────────────────
  {
    name: 'Butter Chicken',
    description: 'Tender chicken in a rich, tomato-cream sauce with aromatic spices. Served with basmati rice.',
    price: 28.99,
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1603894584713-f48bfeb550f3?w=800',
    isVeg: false,
    isFeatured: true,
    rating: 4.9,
    spiceLevel: 'Medium',
    tags: ['bestseller', 'classic'],
  },
  {
    name: 'Truffle Mushroom Risotto',
    description: 'Creamy Arborio rice with wild mushrooms, Parmesan, and a drizzle of black truffle oil.',
    price: 32.99,
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800',
    isVeg: true,
    isFeatured: true,
    rating: 4.8,
    spiceLevel: 'None',
    tags: ['premium', 'vegetarian'],
  },
  {
    name: 'Grilled Atlantic Salmon',
    description: 'Pan-seared salmon fillet on a bed of wilted spinach, lemon caper butter sauce.',
    price: 36.99,
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800',
    isVeg: false,
    isFeatured: true,
    rating: 4.7,
    spiceLevel: 'None',
    tags: ['seafood', 'healthy'],
  },
  {
    name: 'Paneer Makhani',
    description: 'Soft cottage cheese cubes in a velvety tomato-cashew gravy with fenugreek leaves.',
    price: 24.99,
    category: 'Main Course',
    image: '/images/paneer_makhani.png',
    isVeg: true,
    isFeatured: false,
    rating: 4.6,
    spiceLevel: 'Mild',
    tags: ['indian', 'vegetarian'],
  },
  {
    name: 'Signature Wagyu Steak',
    description: 'A5 Japanese Wagyu, perfectly seared and served with truffle-infused potato puree.',
    price: 120.00,
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?w=800',
    isVeg: false,
    isFeatured: true,
    rating: 5.0,
    spiceLevel: 'None',
    tags: ['signature', 'limited'],
  },
  // ── Desserts ──────────────────────────────────────────────────────────────
  {
    name: 'Dark Chocolate Fondant',
    description: 'Warm chocolate cake with a molten centre, served with vanilla bean ice cream.',
    price: 15.99,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=800',
    isVeg: true,
    isFeatured: true,
    rating: 4.9,
    spiceLevel: 'None',
    tags: ['bestseller', 'warm'],
  },
  {
    name: 'Mango Panna Cotta',
    description: 'Italian set cream with fresh mango coulis and toasted coconut flakes.',
    price: 12.49,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800',
    isVeg: true,
    isFeatured: false,
    rating: 4.6,
    spiceLevel: 'None',
    tags: ['tropical', 'light'],
  },
  // ── Beverages ─────────────────────────────────────────────────────────────
  {
    name: 'Masala Chai Latte',
    description: 'House-spiced black tea with steamed oat milk, cardamom, and ginger.',
    price: 8.99,
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1544681280-d25a782adc9b?w=800',
    isVeg: true,
    isFeatured: false,
    rating: 4.8,
    spiceLevel: 'None',
    tags: ['hot', 'signature'],
  },
  {
    name: 'Mango Lassi',
    description: 'Chilled Alphonso mango blended with yogurt, rose water, and a pink of cardamom.',
    price: 9.99,
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=800',
    isVeg: true,
    isFeatured: true,
    rating: 4.9,
    spiceLevel: 'None',
    tags: ['cold', 'fruity', 'bestseller'],
  },
];

const adminUser = {
  name: 'Admin',
  email: 'admin@simplerestaurant.com',
  password: 'Admin@123',
  role: 'admin',
};

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { dbName: process.env.DB_NAME || 'savory-skies' });
    console.log('✅ Connected to MongoDB for seeding...');

    // Clear existing data
    await MenuItem.deleteMany({});
    await User.deleteMany({});
    console.log('🗑️  Cleared existing data.');

    // Seed menu items
    await MenuItem.insertMany(menuItems);
    console.log(`🍽️  Seeded ${menuItems.length} menu items.`);

    // Seed admin user
    await User.create(adminUser);
    console.log(`👤 Admin user created: ${adminUser.email} / ${adminUser.password}`);

    console.log('\n✅ Database seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error.message);
    process.exit(1);
  }
};

seedDB();
