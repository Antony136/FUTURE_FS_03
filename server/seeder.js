const mongoose = require('mongoose');
const dotenv = require('dotenv');
const MenuItem = require('./models/MenuItem');
const User = require('./models/User');
const Order = require('./models/Order');
const Reservation = require('./models/Reservation');
const Contact = require('./models/Contact');

dotenv.config();

const menuItemsData = [
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

const customerUser = {
  name: 'John Doe',
  email: 'john@example.com',
  password: 'User@123',
  role: 'customer',
};

const reservationsData = [
  {
    name: 'Alice Cooper',
    email: 'alice@example.com',
    phone: '+1 234 567 8900',
    date: new Date(Date.now() + 86400000 * 2), // 2 days from now
    time: '19:00',
    guests: 4,
    occasion: 'Birthday',
    message: 'We would like a window seat if possible.',
    status: 'confirmed',
  },
  {
    name: 'Bob Marley',
    email: 'bob@example.com',
    phone: '+1 987 654 3210',
    date: new Date(Date.now() + 86400000 * 5), // 5 days from now
    time: '20:30',
    guests: 2,
    occasion: 'Date Night',
    status: 'pending',
  },
  {
    name: 'Charlie Brown',
    email: 'charlie@example.com',
    phone: '+1 555 0199',
    date: new Date(Date.now() - 86400000 * 1), // Yesterday
    time: '18:00',
    guests: 6,
    occasion: 'Family Gathering',
    status: 'completed',
  }
];

const contactsData = [
  {
    name: 'Sarah Connor',
    email: 'sarah@resistance.com',
    subject: 'Event Inquiry',
    message: 'Do you host private events for up to 50 people?',
    isRead: false,
  },
  {
    name: 'James Bond',
    email: '007@mi6.gov.uk',
    subject: 'Special Request',
    message: 'I need a table for two, quiet corner. Martini, shaken not stirred.',
    isRead: true,
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { dbName: process.env.DB_NAME || 'savory-skies' });
    console.log('✅ Connected to MongoDB for seeding...');

    // Clear existing data
    await MenuItem.deleteMany({});
    await User.deleteMany({});
    await Order.deleteMany({});
    await Reservation.deleteMany({});
    await Contact.deleteMany({});
    console.log('🗑️  Cleared existing collections.');

    // Seed menu items
    const createdMenuItems = await MenuItem.insertMany(menuItemsData);
    console.log(`🍽️  Seeded ${createdMenuItems.length} menu items.`);

    // Seed users
    const admin = await User.create(adminUser);
    const customer = await User.create(customerUser);
    console.log(`👤 Admin user created: ${admin.email}`);
    console.log(`👤 Customer user created: ${customer.email}`);

    // Seed Reservations
    for (const r of reservationsData) {
      await Reservation.create(r);
    }
    console.log(`📅 Seeded ${reservationsData.length} reservations.`);

    // Seed Contacts
    await Contact.insertMany(contactsData);
    console.log(`✉️  Seeded ${contactsData.length} contact messages.`);

    // Seed Orders
    const ordersData = [
      {
        user: customer._id,
        items: [
          {
            menuItem: createdMenuItems[0]._id,
            name: createdMenuItems[0].name,
            price: createdMenuItems[0].price,
            quantity: 2
          },
          {
            menuItem: createdMenuItems[5]._id,
            name: createdMenuItems[5].name,
            price: createdMenuItems[5].price,
            quantity: 1
          }
        ],
        totalAmount: (createdMenuItems[0].price * 2) + createdMenuItems[5].price,
        status: 'pending',
        paymentStatus: 'unpaid',
        deliveryAddress: '123 Baker Street, London'
      },
      {
        user: customer._id,
        items: [
          {
            menuItem: createdMenuItems[8]._id,
            name: createdMenuItems[8].name,
            price: createdMenuItems[8].price,
            quantity: 1
          }
        ],
        totalAmount: createdMenuItems[8].price,
        status: 'delivered',
        paymentStatus: 'paid',
        deliveryAddress: '123 Baker Street, London'
      }
    ];

    await Order.insertMany(ordersData);
    console.log(`🛍️  Seeded ${ordersData.length} orders.`);

    console.log('\n✅ Database seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error.message);
    process.exit(1);
  }
};

seedDB();
