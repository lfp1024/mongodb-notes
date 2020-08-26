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

async function updateOne() {
  const collection = await getCollection('students')

  const res = await collection.updateOne({ age: { $lt: 15 } }, { $set: { age: 13 } })

  console.log(res.result)
  console.log(res.matchedCount) // 总是1 ？
  console.log(res.modifiedCount)
}

// updateOne().finally(() => { client.close() }).catch((e) => { console.log(e) })

// { n: 1, nModified: 1, ok: 1 }
// 1
// 1

async function updateMany() {
  const collection = await getCollection('students')
  // const res = await collection.updateMany({ age: { $lt: 20 } }, { $inc: { weight: 10 } })

  // const res = await collection.updateMany(
  //   { age: { $lt: 20 } },
  //   { $inc: { 'score.$[element]': 10 } },
  //   {
  //     // eslint-disable-next-line quote-props
  //     arrayFilters: [{ 'element': { $gt: 5 } }]
  //   }
  // )

  const res = await collection.updateMany(
    { name: { $regex: /vin$/i } },
    { $set: { name: 'haha' } }
  )

  console.log(res.result)
  console.log(res.matchedCount)
  console.log(res.modifiedCount)
}

// updateMany().finally(() => { client.close() }).catch((e) => { console.log(e) })

// { n: 3, nModified: 3, ok: 1 }
// 3
// 3

async function replaceOne() {
  const collection = await getCollection('students')

  const doc = {
    name: 'jack', age: 33, weight: 100, score: [14, 12, 13]
  }
  const res = await collection.replaceOne(
    { name: 'peter' },
    doc
  )

  console.log(res.ops)
  console.log(res.result)
}

replaceOne().finally(() => { client.close() }).catch((e) => { console.log(e) })

// [ { name: 'jack', age: 33, weight: 100, score: [ 14, 12, 13 ] } ]
// { n: 1, nModified: 1, ok: 1 }
