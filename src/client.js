const { MongoClient } = require('mongodb')

class Client extends MongoClient {
  constructor(url) {
    super(url, { useNewUrlParser: true, useUnifiedTopology: true })
    this.isConnecting = null
  }

  async getDb(dbName, options) {
    if (!this.client.isConnected()) {
      if (this.isConnecting === null) {
        // 建立连接期间执行 connect，等待第一次执行结果
        this.isConnecting = (async () => {
          await this.client.connect()
          this.isConnecting = null
        })()
      }
      await this.isConnecting
    }
    return this.client.db(dbName, options)
  }
}

module.exports = Client
