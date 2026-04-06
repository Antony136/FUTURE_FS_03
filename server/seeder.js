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
    price: 7.99,
    category: 'Starters',
    isVeg: true,
    isFeatured: true,
    rating: 4.8,
    spiceLevel: 'None',
    tags: ['popular', 'crispy'],
  },
  {
    name: 'Tandoori Chicken Wings',
    description: 'Marinated overnight in yogurt and spices, flame-kissed to smoky perfection.',
    price: 12.99,
    category: 'Starters',
    isVeg: false,
    isFeatured: true,
    rating: 4.9,
    spiceLevel: 'Hot',
    tags: ['bestseller', 'spicy'],
  },
  {
    name: 'Vegetable Spring Rolls',
    description: 'Crispy rolls filled with stir-fried cabbage, carrots, mushrooms, and glass noodles.',
    price: 8.49,
    category: 'Starters',
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
    price: 9.99,
    category: 'Soups',
    isVeg: true,
    isFeatured: false,
    rating: 4.7,
    spiceLevel: 'Medium',
    tags: ['thai', 'aromatic'],
  },
  {
    name: 'Roasted Tomato Bisque',
    description: 'Slow-roasted Roma tomatoes blended with cream, basil oil, and croutons.',
    price: 8.99,
    category: 'Soups',
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
    price: 18.99,
    category: 'Main Course',
    isVeg: false,
    isFeatured: true,
    rating: 4.9,
    spiceLevel: 'Medium',
    tags: ['bestseller', 'classic'],
  },
  {
    name: 'Truffle Mushroom Risotto',
    description: 'Creamy Arborio rice with wild mushrooms, Parmesan, and a drizzle of black truffle oil.',
    price: 21.99,
    category: 'Main Course',
    isVeg: true,
    isFeatured: true,
    rating: 4.8,
    spiceLevel: 'None',
    tags: ['premium', 'vegetarian'],
  },
  {
    name: 'Grilled Atlantic Salmon',
    description: 'Pan-seared salmon fillet on a bed of wilted spinach, lemon caper butter sauce.',
    price: 24.99,
    category: 'Main Course',
    isVeg: false,
    isFeatured: true,
    rating: 4.7,
    spiceLevel: 'None',
    tags: ['seafood', 'healthy'],
  },
  {
    name: 'Paneer Makhani',
    description: 'Soft cottage cheese cubes in a velvety tomato-cashew gravy with fenugreek leaves.',
    price: 16.99,
    category: 'Main Course',
    isVeg: true,
    isFeatured: false,
    rating: 4.6,
    spiceLevel: 'Mild',
    tags: ['indian', 'vegetarian'],
  },
  // ── Desserts ──────────────────────────────────────────────────────────────
  {
    name: 'Dark Chocolate Fondant',
    description: 'Warm chocolate cake with a molten centre, served with vanilla bean ice cream.',
    price: 9.99,
    category: 'Desserts',
    isVeg: true,
    isFeatured: true,
    rating: 4.9,
    spiceLevel: 'None',
    tags: ['bestseller', 'warm'],
  },
  {
    name: 'Mango Panna Cotta',
    description: 'Italian set cream with fresh mango coulis and toasted coconut flakes.',
    price: 8.49,
    category: 'Desserts',
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
    price: 4.99,
    category: 'Beverages',
    isVeg: true,
    isFeatured: false,
    rating: 4.8,
    spiceLevel: 'None',
    tags: ['hot', 'signature'],
  },
  {
    name: 'Mango Lassi',
    description: 'Chilled Alphonso mango blended with yogurt, rose water, and a pinch of cardamom.',
    price: 5.99,
    category: 'Beverages',
    isVeg: true,
    isFeatured: true,
    rating: 4.9,
    spiceLevel: 'None',
    tags: ['cold', 'fruity', 'bestseller'],
  },
];

const adminUser = {
  name: 'Admin',
  email: 'admin@savoryskies.com',
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
