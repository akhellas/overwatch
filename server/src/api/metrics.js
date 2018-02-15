import { ISODate } from 'mongodb'

const metrics = db => {
  const api = {}
  const collection = 'metrics'

  api.get = async (req, res) => {
    try {
      const docs = await db
        .collection(collection)
        .find({})
        .sort({ Timestamp: -1 })
        .limit(500)
        .toArray()
      res.json(docs)
    } catch (err) {
      res.status(500).json(err)
    }
  }

  api.getByDate = async (req, res) => {
    try {
      const { year, month, day } = req.params
      const timestamp = new Date(year, month, day)
      const docs = await db
        .collection(collection)
        .find({ Timestamp: { $gt: timestamp } })
        .toArray()
      res.json(docs)
    } catch (err) {
      res.status(500).json(err)
    }
  }

  return api
}

export default metrics
