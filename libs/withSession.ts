/* eslint-disable unused-imports/no-unused-vars */
import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";
import { getIronSession } from 'iron-session';
import { GetServerSidePropsContext, NextApiRequest, NextApiResponse, PreviewData } from "next";
import { AppContext } from "next/app";
import { ParsedUrlQuery } from "querystring";


type THandler = (req: NextApiRequest, res: NextApiResponse) => void

declare module "iron-session" {
  interface IronSessionData {
    token?: string
  }
}

const sessionOptions = {
  cookieName: "instacloneSession",
  password: process.env.COOKIE_PASSWORD!,
};

export function withApiSession(handler: THandler) {
  return withIronSessionApiRoute(handler, sessionOptions);
}


export function withSsrSession(handler: (context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>) =>  any) {  
  return withIronSessionSsr(handler, sessionOptions);
}

export async function withAppSession(context: AppContext) {
  return await getIronSession(context.ctx.req!, context.ctx.res!, sessionOptions)
}