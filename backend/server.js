const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const path = require('path')

dotenv.config()

const app = express()

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Static files for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/outfits', require('./routes/outfits'))
app.use('/api/bookings', require('./routes/bookings'))
app.use('/api/wishlist', require('./routes/wishlist'))
app.use('/api/wardrobe', require('./routes/wardrobe'))
app.use('/api/admin', require('./routes/admin'))

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'ReDrape API is running', timestamp: new Date().toISOString() })
})

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.statusCode || 500).json({
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  })
})

const PORT = process.env.PORT || 5000

async function startServer() {
  let mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/redrape'

  // Use in-memory MongoDB if connecting to localhost (no local MongoDB installed)
  if (mongoUri.includes('localhost') || mongoUri.includes('127.0.0.1')) {
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server')
      const mongod = await MongoMemoryServer.create()
      mongoUri = mongod.getUri()
      console.log('🧪 Using MongoDB Memory Server (no local MongoDB needed)')
    } catch (e) {
      console.warn('⚠️  Could not start Memory Server:', e.message)
    }
  }

  try {
    await mongoose.connect(mongoUri)
    console.log('✅ MongoDB connected')

    // Auto-seed demo data on first run
    await autoSeed()

    app.listen(PORT, () => {
      console.log(`🚀 ReDrape API running on http://localhost:${PORT}`)
      console.log(`   Health: http://localhost:${PORT}/api/health`)
    })
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message)
    process.exit(1)
  }
}

async function autoSeed() {
  try {
    const User = require('./models/User')
    const Outfit = require('./models/Outfit')

    const userCount = await User.countDocuments()
    if (userCount > 0) return // Already seeded

    console.log('🌱 Auto-seeding demo data...')

    await User.create({
      name: 'Admin',
      email: 'admin@redrape.in',
      password: 'admin123',
      role: 'admin',
      isVerified: true,
    })

    const demoUser = await User.create({
      name: 'Ananya Sharma',
      email: 'user@redrape.in',
      password: 'password123',
      role: 'lender',
      phone: '+91 98765 43210',
      city: 'Mumbai',
      bio: 'Fashion enthusiast and sustainable lifestyle advocate.',
      isVerified: true,
      totalRentals: 14,
      totalListings: 8,
      rating: 4.8,
    })

    const sampleOutfits = [
      { title: 'Emerald Festive Silk Set (Size M)', brand: 'Raw Silk by Raw Mango', description: 'Archival hand-embroidered chanderi kurta with flared brocade trousers and sheer organza dupatta.', occasions: ['Festive', 'Diwali', 'Engagement', 'Wedding Guest'], size: 'M', condition: 'Pristine (unworn)', rentalPrice: 699, buyPrice: 18000, deposit: 1800, images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuBza4R7PX_MJeHd2pC5atxfLB8KqZITdI_od1IewiE_QUgth-HsH3crdlU2DfbHKaaXzI5POCzAx7hfxs6l-xv6aH3_uVdQVbp6UF2BaRgxGWCCvv0DR9-vh1fECofleBlidv5AZoLFT0KNunk18N3ExhPUoGcFq0_46BY0G7wvjFS5T-GpWkQmqm5Wlgc-SFglXh-123Jz7Spe-4l24fZ679EnMRZf6OeJkDsI-Vyc8uOJEH9eo_Rs'], status: 'active', isVerified: true, isAvailable: true, rating: 4.8, reviewCount: 34, totalRentals: 8 },
      { title: 'Midnight Satin Slip Dress', brand: 'House of CB', description: 'Bias-cut midnight satin slip dress with delicate lace trim. Perfect for cocktail evenings.', occasions: ['Cocktail', 'Party', 'Black Tie'], size: 'S', condition: 'Like New (worn once)', rentalPrice: 599, buyPrice: 8000, deposit: 1500, images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuAPZLEWZIk5W6EOAFo_DAK2j1IpBTB468cG4CMKB6MQgqHQeptw1wI24hVS7q9SmfxT8Ybv5ydki26a9mot6DPYSFvoZu6u9K_8t4Pxz3KrrFLoH_bH1WDmxz1dR8lYajjJhPcJegVD9Rh3JlXN2UzsSNKtfxBTBhrXJLurAF7xiOp_57m-Hds1Ff9k4U7ZK5rM4z8hixCJ-MM8wrWomVtslsIrDABaNNR2ygowvKURQ2-Bk9SU-6rV'], status: 'active', isVerified: true, isAvailable: true, rating: 4.9, reviewCount: 48, totalRentals: 12 },
      { title: 'Ivory Anarkali Set', brand: 'Anita Dongre Grassroot', description: 'Graceful ivory hand-block printed anarkali with delicate floral motifs.', occasions: ['Wedding', 'Sangeet', 'Festive'], size: 'L', condition: 'Pristine (unworn)', rentalPrice: 799, buyPrice: 12000, deposit: 2000, images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuCxIZnY8Z8OqYzMZAb1hr0-GXyDIpC8_K7lnleFMtPg-Wu-lYoAwHUD88XVCbJtqPfhsWI2ETRWvyGB9WSE8uhhgBsK76fd7Ydh3BQfKaOOJMTLc06HNPk5PV4SXioTpLwuxtapQhPIr1E7QuqJ-93aCsrMRt8TnKRV7prMEeAKXGgtsgulMvRoBxytv4YAw4Rw6H0v9EIU4GRfBsR0VYnw-s9pkoJdkWw8JUdoLaPM26Ff5qkGTOzW'], status: 'active', isVerified: true, isAvailable: true, rating: 5.0, reviewCount: 22, totalRentals: 5 },
      { title: 'Wine Velvet Tuxedo', brand: 'SS HOMME Bespoke', description: 'Italian wine velvet tuxedo with peak lapels and satin trim. Dry-cleaned and tailored.', occasions: ['Black Tie', 'Wedding', 'Party'], size: '40', condition: 'Dry Clean Certified', rentalPrice: 899, buyPrice: 22000, deposit: 2500, images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuCqW8lxOocjJjHuEeAIirtUO-CKcp6tQMCBkxZftyxkqgWdO0rPvsxQEkAkRh-9UN_TpUL02v2115ElyoHlOT-TP0U01wtMdbZolVbEH10lF7g8IgofVDLqcWji6gx4THvxLtva7q_s300nCR3eYbRjh_4Nw_yMg8d4-XlgqwuH2X_-vEairvdnDFtMe_NTiAYK2ZV2SLM90CeD0oBU62w8qKq5diSsMbXkMYtUFN0_HdJULA-CAsXA'], status: 'active', isVerified: true, isAvailable: true, rating: 4.9, reviewCount: 19, totalRentals: 7 },
      { title: 'Rose Gold Lehenga Set', brand: 'Manish Malhotra', description: 'Opulent rose gold sequined lehenga choli with heavy embroidery and a voluminous skirt.', occasions: ['Wedding', 'Sangeet', 'Engagement'], size: 'M', condition: 'Pristine (unworn)', rentalPrice: 1499, buyPrice: 45000, deposit: 5000, images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuBZ4Z9XUePMDY1Z8p29ZhA3uYNrPbKLdwXbTHycBHO4fSqlLvliGUWUf4g25Q2sB30kdCuqFXBgOM1sb_no-twTqYqwQYAP7YxSkMNXn7xTdP-5kKPT7JM6JGjMXz4QWWu1aLLFjzTlo59Qz6rqpHOO-vCLM6_CnE0wbNEX11cq4YBLUobSupDpODMbNqyQoBnA1eySxLzu0eVUq7TdTsno2zwUhJGJdoTP6Yzo54n_cefVUZG4kn2z'], status: 'active', isVerified: true, isAvailable: true, rating: 4.7, reviewCount: 61, totalRentals: 15 },
      { title: 'Pastel Organza Saree', brand: 'Sabyasachi Mukherjee', description: 'Breezy pastel organza saree with hand-painted florals and delicate gold border. Blouse included.', occasions: ['Farewell', 'Wedding', 'Party'], size: 'Free', condition: 'Like New (worn once)', rentalPrice: 899, buyPrice: 28000, deposit: 3000, images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuA4DxcRnYOAqyEMx7u6i2h5-RD6UDLdNZqRRPgM70KJgoIl4E3PA_id12QxFwtFfWhA9lI-6SX667FQLUZy-yBA-LToJGxjCSfTs37QKnuV08YdIHHaPuVpP3dgXzsypOwlNIw1ymE0O6V6hZve-S64t3k77yoiqNMbiPPfgQ1YckTtFmd_Ud9fX0Uv-6JOxSdFHtY5q7REKUvs9nKip-TY2q0n1HWlm0jU1GfM5TkcckGjzvTigfrx'], status: 'active', isVerified: true, isAvailable: true, rating: 4.8, reviewCount: 33, totalRentals: 9 },
      { title: 'Power Blazer Set', brand: 'Tarun Tahiliani', description: 'Structured power blazer in dusty rose with wide-leg matching trousers. Perfect for interviews.', occasions: ['Interview', 'Party', 'Farewell'], size: 'S', condition: 'Pristine (unworn)', rentalPrice: 599, buyPrice: 14000, deposit: 1800, images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuBivvWUio3XAWqXjGVyw65zTGGKWJh2u6AsIJpt54tuqNMAwj6slDWYPK2InUUMmmYVS-3h5cMiQydnGYWVvJ-nsMzTvX3WBE7dUlNiw54PSjNxMfdKb8ZQrgi83lGcFfhiodWTLHBpY8Mhh11TPSJBtHlfjWyiAuOwXq3FXoJKRJj44GVY-fVfrZ1skE_c9mYEMORSdb8l4_WUbsBu94b7_PFuYrTHSaSW1ht3jaX14tuJGvesW1v1'], status: 'active', isVerified: true, isAvailable: true, rating: 4.6, reviewCount: 15, totalRentals: 4 },
      { title: 'Champagne Metallic Gown', brand: 'Bibhu Mohapatra', description: 'Floor-length champagne metallic gown with structured bodice and cascading skirt. Built-in corset.', occasions: ['Party', 'Black Tie', 'Photoshoot'], size: 'XS', condition: 'Like New (worn once)', rentalPrice: 999, buyPrice: 32000, deposit: 3500, images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuADv0KeKlQoHmJIxx2Qu5st6q7zbx6I4VpkRsvqsGfaBrGlplpVwRm43I44CMbnQGTsN_EKiqMzsDlEj_VL1BumKQv_6B_MUOnnXCvBxJW7c6ydn3-3uoD2z2ScsONjiprclNIPxpgsTflgZaKwtAF_KKUB3IUDaSasXwoe3CiFrziUurHx4xbiG7_vbYC2K21l4U2EdO-Fwxg3tErySFEADeCMlioulde04T4AcP8adBEpTzcSVLLX'], status: 'active', isVerified: true, isAvailable: true, rating: 4.9, reviewCount: 27, totalRentals: 11 },
    ]

    await Outfit.insertMany(sampleOutfits.map(o => ({ ...o, lender: demoUser._id })))

    console.log('✅ Demo data seeded:')
    console.log('   admin@redrape.in / admin123')
    console.log('   user@redrape.in / password123')
    console.log(`   ${sampleOutfits.length} outfit listings created`)
  } catch (err) {
    console.error('Seed error (non-fatal):', err.message)
  }
}

startServer()
