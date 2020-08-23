const { MongoClient } = require('mongodb')

const serverIP = 'localhost'
const serverPort = 27017
const url = `mongodb://${serverIP}:${serverPort}`
console.log('url = ', url)
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true })

async function run() {
  try {
    await client.connect()
    const database = client.db('mydb')
    const collection = database.collection('customers')
    console.log(collection.dbName)
    console.log(collection.namespace)

    const insertObj1 = { name: 'lfp', age: 23 }
    const insertObj2 = [{ name: 'lfp', age: 23 }, { name: 'wst', age: 24 }, { name: 'lx', age: 25 }]

    // const r = await collection.insertMany(insertObj2)
    // console.log(r.result.ok)

    const query = { age: { $gt: 23 } }
    const res = await collection.find(query).toArray()
    console.log(res)
  } finally {
    await client.close()
  }
}

run().catch((err) => { console.log(err) })
