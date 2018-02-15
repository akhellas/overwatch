import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import eaa from 'express-async-await'

import metrics from './api/metrics'

const router = db => {
  const api = eaa(Router())

  api.get('/metrics', metrics(db).get)
  api.get('/metrics/:year/:month/:day', metrics(db).getByDate)

  return api
}

export default router
