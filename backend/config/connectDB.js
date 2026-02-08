import mongoose from "mongoose"

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

export default async function connectDB(url) {
  if (cached.conn) return cached.conn

  if (!cached.promise) {
    cached.promise = mongoose.connect(url, {
      bufferCommands: false,
    }).then(m => m)
  }

  cached.conn = await cached.promise
  return cached.conn
}
