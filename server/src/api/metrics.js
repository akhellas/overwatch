import transform from './transform'

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
      //const timestamp = new Date(year, month - 1, day, 0, 0, 0)
      const timestamp = `${year}-${month.length === 2 ? month : '0' + month}-${
        day.length === 2 ? day : '0' + day
      } 00:00:00.000Z`
      const docs = await db
        .collection(collection)
        .find({ Timestamp: { $gt: new Date(timestamp) } })
        .project({ _id: 0, SiteId: 0, Tag: 0, Remarks: 0, Timestamp: 0 })
        .toArray()

      const nameFromUri = uri => {
        return uri
          .split('/')
          .slice(0, 4)
          .pop()
      }

      const data = transform(docs, x => nameFromUri(x.Uri), x => x.User)
      res.json(data)
    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  }

  return api
}

export default metrics
