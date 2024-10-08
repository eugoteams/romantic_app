/** @format */

import { musicDb } from "./db/musicDb";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  console.log("body lang", req.body.lang);
  console.log("body origin", req.body.origin);
  res.status(200).json([...musicDb]);
}
