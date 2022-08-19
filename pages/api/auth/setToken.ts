import { withApiSession } from '@libs/withSession'
import type { NextApiRequest, NextApiResponse } from 'next'
import { IResponse } from 'types'

const handler = async (req: NextApiRequest, res: NextApiResponse<IResponse>) => {
  try {
    if (req.method === 'POST') {
      const { body: { token } } = req
      req.session.token = token;
      await req.session.save();
      return res.json({
        ok: true
      })
    } else {
      return res.json({
        ok: false,
        error: 'Method Error'
      })
    }
  } catch (error) {
    return res.json({
      ok: false,
      error
    })
  }
}

export default withApiSession(handler)