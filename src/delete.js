const { MongoClient } = require('mongodb')

const ip = 'localhost'
const port = 27017
const url = `mongodb://${ip}:${port}`
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true })

async function getCollection(collName, dbName = 'mydb',) {
  await client.connect()
  const db = client.db(dbName)
  const collection = db.collection(collName)
  return collection
}

async function deleteOne() {
  const collection = await getCollection('students')

  // const res = await collection.deleteOne({ age: { $gt: 100 } })
  const res = await collection.deleteOne()

  console.log(res.deletedCount)
  console.log(res.result)
}

deleteOne().finally(() => { client.close() }).catch((e) => { console.log(e) })

// 0
// { n: 0, ok: 1 }

async function deleteMany() {
  const collection = await getCollection('students')

  const res = await collection.deleteMany({ age: { $lt: 14 } })
  // const res = await collection.deleteMany()

  console.log(res.deletedCount)
  console.log(res.result)
}

// deleteMany().finally(() => { client.close() }).catch((e) => { console.log(e) })

// 2
// { n: 2, ok: 1 }
