const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('✅ Connected to MongoDB')
  })
  .catch((e) => {
    console.error('❌ Failed to connect to MongoDB:', e)
  })

mongoose.connection.once('open', () => {
  console.log('Connected to DB:', mongoose.connection.name)
})



