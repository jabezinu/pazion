require('dotenv').config();
const mongoose = require('mongoose');
const Gemstone = require('./models/Gemstone');
const Course = require('./models/Course');

const gemstonesData = [
  {
    nameKey: "blueSapphire",
    category: "precious",
    quality: "luxury",
    hardness: "9",
    image: "/src/assets/kal_asset/gemstones/blue-sapphire.jpg"
  },
  {
    nameKey: "ruby",
    category: "precious",
    quality: "luxury",
    hardness: "9",
    image: "/src/assets/kal_asset/gemstones/ruby.jpg"
  },
  {
    nameKey: "emerald",
    category: "precious",
    quality: "luxury",
    hardness: "7.5-8",
    image: "/src/assets/kal_asset/gemstones/emerald.jpg"
  },
  {
    nameKey: "pinkTourmaline",
    category: "semi-precious",
    quality: "commercial",
    hardness: "7-7.5",
    image: "/src/assets/kal_asset/gemstones/pink-tourmaline.jpg"
  },
  {
    nameKey: "aquamarine",
    category: "semi-precious",
    quality: "commercial",
    hardness: "7.5-8",
    image: "/src/assets/kal_asset/gemstones/aquamarine.jpg"
  },
  {
    nameKey: "amethyst",
    category: "semi-precious",
    quality: "affordable",
    hardness: "7",
    image: "/src/assets/kal_asset/gemstones/amethyst.jpg"
  },
  {
    nameKey: "yellowSapphire",
    category: "precious",
    quality: "luxury",
    hardness: "9",
    image: "/src/assets/kal_asset/gemstones/yellow-sapphire.jpg"
  },
  {
    nameKey: "tanzanite",
    category: "semi-precious",
    quality: "commercial",
    hardness: "6.5-7",
    image: "/src/assets/kal_asset/gemstones/tanzanite.jpg"
  },
  {
    nameKey: "garnet",
    category: "semi-precious",
    quality: "affordable",
    hardness: "6.5-7.5",
    image: "/src/assets/kal_asset/gemstones/garnet.jpg"
  },
  {
    nameKey: "citrine",
    category: "semi-precious",
    quality: "affordable",
    hardness: "7",
    image: "/src/assets/kal_asset/gemstones/citrine.jpg"
  },
  {
    nameKey: "topaz",
    category: "semi-precious",
    quality: "commercial",
    hardness: "8",
    image: "/src/assets/kal_asset/gemstones/blue-topaz.jpg"
  },
  {
    nameKey: "peridot",
    category: "semi-precious",
    quality: "affordable",
    hardness: "6.5-7",
    image: "/src/assets/kal_asset/gemstones/peridot.jpg"
  }
];

const coursesData = [
  {
    name: "Gemology Fundamentals",
    duration: "4 weeks",
    price: "299 ETB",
    level: "Beginner",
    description: "Introduction to gem identification, basic properties, and industry terminology"
  },
  {
    name: "Advanced Gem Identification",
    duration: "8 weeks",
    price: "699 ETB",
    level: "Intermediate",
    description: "Master advanced testing techniques and equipment operation"
  },
  {
    name: "Professional Gemologist Certification",
    duration: "16 weeks",
    price: "1299 ETB",
    level: "Advanced",
    description: "Comprehensive professional training with industry certification"
  },
  {
    name: "Gem Business & Marketing",
    duration: "6 weeks",
    price: "499 ETB",
    level: "All Levels",
    description: "Learn to start and grow your gemstone business"
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Gemstone.deleteMany({});
    console.log('Cleared existing gemstones');

    await Course.deleteMany({});
    console.log('Cleared existing courses');

    // Insert new data
    await Gemstone.insertMany(gemstonesData);
    console.log('Seeded gemstones successfully');

    await Course.insertMany(coursesData);
    console.log('Seeded courses successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();