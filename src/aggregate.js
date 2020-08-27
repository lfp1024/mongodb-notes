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

async function aggregate() {
  const collection = await getCollection('orders')

  const docs = [
    {
      _id: 1, cust_id: 'Ant O. Knee', ord_date: new Date('2020-03-01'), price: 25, items: [{ sku: 'oranges', qty: 5, price: 2.5 }, { sku: 'apples', qty: 5, price: 2.5 }], status: 'A'
    },
    {
      _id: 2, cust_id: 'Ant O. Knee', ord_date: new Date('2020-03-08'), price: 70, items: [{ sku: 'oranges', qty: 8, price: 2.5 }, { sku: 'chocolates', qty: 5, price: 10 }], status: 'A'
    },
    {
      _id: 3, cust_id: 'Busby Bee', ord_date: new Date('2020-03-08'), price: 50, items: [{ sku: 'oranges', qty: 10, price: 2.5 }, { sku: 'pears', qty: 10, price: 2.5 }], status: 'A'
    },
    {
      _id: 4, cust_id: 'Busby Bee', ord_date: new Date('2020-03-18'), price: 25, items: [{ sku: 'oranges', qty: 10, price: 2.5 }], status: 'A'
    },
    {
      _id: 5, cust_id: 'Busby Bee', ord_date: new Date('2020-03-19'), price: 50, items: [{ sku: 'chocolates', qty: 5, price: 10 }], status: 'A'
    }
  ]

  // const insertRes = await collection.insertMany(docs)
  // console.log(insertRes.result.ok)

  const pipeline = [
    { $sort: { value: 1 } },
    { $group: { _id: '$cust_id', value: { $sum: '$price' } } },
    { $project: { _id: 0 } },
    { $out: 'agg_orders' }
  ]

  const res = collection.aggregate(
    pipeline,
    {
      allowDiskUse: true
    }
  )

  console.log(await res.toArray())
}

aggregate().finally(() => { client.close() }).catch((e) => { console.log(e) })
