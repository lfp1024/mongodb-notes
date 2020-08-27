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

async function createIndex() {
  const collection = await getCollection('students')
  const res = await collection.createIndex({ age: 1 })

  console.log(res)
}

// createIndex().finally(() => { client.close() }).catch((e) => { console.log(e) })

async function getIndex() {
  const coll = await getCollection('students')
  const res = await coll.indexes()
  console.log(res)
  const res2 = await coll.indexInformation()
  console.log(res2)
}

getIndex().finally(() => { client.close() }).catch((e) => { console.log(e) })

// [
//   { v: 2, key: { _id: 1 }, name: '_id_', ns: 'mydb.students' },
//   { v: 2, key: { age: 1 }, name: 'age_1', ns: 'mydb.students' }
// ]
// { _id_: [ [ '_id', 1 ] ], age_1: [ [ 'age', 1 ] ] }

async function dropIndex() {
  const coll = await getCollection('students')
  const res = await coll.dropIndex('age_1')
  console.log(res)
}

// dropIndex().finally(() => { client.close() }).catch((e) => { console.log(e) })
// { nIndexesWas: 2, ok: 1 }
