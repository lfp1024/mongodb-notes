const mongoose = require('mongoose')

const ip = 'localhost'
const port = 27017
// url 中包含要连接的数据库，没有则创建
const url = `mongodb://${ip}:${port}/db1`

async function run() {
  // 连接数据库
  await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

  // 定义文档结构
  const studentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    date: Date
  })

  // 获取集合，没有则创建，集合名为：第一个参数转小写，末尾加s
  const StudentModel = mongoose.model('studentModel', studentSchema)

  // 实例化文档
  const doc = { name: 'lfp', age: 23, date: new Date('1995-01-01') }
  const studentDoc1 = new StudentModel(doc)

  // 插入文档
  // await studentDoc1.save()

  const res = await StudentModel.find({ age: 23 }).exec()
  console.log(res)
}

run().finally(() => { mongoose.disconnect() }).catch((e) => { console.log(e) })
