/** @format */

import { musicDb } from "./db/musicDb";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  const { lang, origin } = req.query;

  let responseData = musicDb.filter((music, _) =>
    music.origin == origin && lang === "all"
      ? music.language !== lang
      : music.language === lang
  );

  console.log(responseData);
  res.status(200).json([...responseData]);
}
