const { MongoClient } = require('mongodb')

const ip = 'localhost'
const port = 27017
const url = `mongodb://${ip}:${port}`
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true })

async function insertOne() {
  await client.connect()
  const db = client.db('mydb')
  const collection = db.collection('students')

  const doc = { name: 'bob', age: 122, weight: 90 }

  const res = await collection.insertOne(doc, {
    forceServerObjectId: true
  })

  console.log(res.result)
  console.log(res.insertedCount)
  console.log(res.insertedId)
  console.log(res.ops)
}

// insertOne().finally(() => { client.close() }).catch((e) => { console.log(e) })

// { n: 1, ok: 1 }
// 1
// 5f4259c9672769493f3702f0
// [ { age: 12, weight: 90, _id: 5f4259c9672769493f3702f0 } ]

async function insertMany() {
  await client.connect()
  const db = client.db('mydb')
  const collection = db.collection('students')

  const docs = [
    {
      name: 'kevin', age: 12, weight: 90, score: [1, 2, 3]
    },
    {
      name: 'devin', age: 13, weight: 92, score: [4, 2, 3]
    },
    {
      name: 'peter', age: 14, weight: 93, score: [1, 6, 3]
    }]

  const res = await collection.insertMany(docs)

  console.log(res.result)
  console.log(res.insertedCount)
  console.log(res.insertedIds)
  console.log(res.ops)
}

insertMany().finally(() => { client.close() }).catch((e) => { console.log(e) })

// { ok: 1, n: 2 }
// 2
// { '0': 5f4273a13927c7457cf66820, '1': 5f4273a13927c7457cf66821 }
// [
//   { age: 12, weight: 90, _id: 5f4273a13927c7457cf66820 },
//   { age: 13, weight: 92, _id: 5f4273a13927c7457cf66821 }
// ]
