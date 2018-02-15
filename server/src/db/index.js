import { MongoClient } from 'mongodb'

const url = 'mongodb://xenia:how_you_wanna_do_this@79.129.116.96:27017'
const name = 'IRIS'

const db = async () => {
  try {
    const client = await MongoClient.connect(url)
    const _db = client.db(name)
    console.log('[db]', 'connected to', url)
    return _db
  } catch (err) {
    console.log('[db]', 'failed to init db connection')
  }
}

export default db
