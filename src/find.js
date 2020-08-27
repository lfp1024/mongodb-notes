const { MongoClient } = require('mongodb')

const ip = 'localhost'
const port = 27017
const url = `mongodb://${ip}:${port}`
const client = new MongoClient(url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

async function getCollection(collName, dbName = 'mydb',) {
  await client.connect()
  const db = client.db(dbName)
  const collection = db.collection(collName)
  return collection
}

async function find() {
  const collection = await getCollection('students')

  const res = collection.find().sort('age', 1)
  // console.log(res)
  console.log(await res.toArray())
  console.log(await res.count())
}

find().finally(() => { client.close() }).catch((e) => { console.log(e) })

async function findOne() {
  const collection = await getCollection('students')

  const res = await collection.findOne()

  console.log(res)
}

// findOne().finally(() => { client.close() }).catch((e) => { console.log(e) })

async function findOneAndUpdate() {
  const collection = await getCollection('students')
  const res = await collection.findOneAndUpdate(
    { age: { $lt: 18 } },
    { $set: { adult: false } },
    {
      sort: { age: 1 }
    }
  )
  console.log(res.ok)
}

// findOneAndUpdate().finally(() => { client.close() }).catch((e) => { console.log(e) })

async function findOneAndReplace() {
  const collection = await getCollection('students')
  const res = await collection.findOneAndReplace(
    { name: 'jackMa' },
    {
      name: 'mark', age: 22, weight: 123, adult: true
    },
    {
      upsert: true
    }
  )
  console.log(res.ok)
  console.log(res.value)
}

// findOneAndReplace().finally(() => { client.close() }).catch((e) => { console.log(e) })

async function findOneAndDelete() {
  const collection = await getCollection('students')
  const res = await collection.findOneAndDelete(
    { adult: false },
    {
      sort: { age: 1 },
      projection: { _id: 0 }
    }
  )
  console.log(res.ok)
  console.log(res.value)
}

// findOneAndDelete().finally(() => { client.close() }).catch((e) => { console.log(e) })
