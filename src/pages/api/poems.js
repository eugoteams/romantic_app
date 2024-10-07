/** @format */

import { jaun_elia } from "../../../public/Poetry/jaun_elia";

export default function handler(req, res) {
  res.status(200).json([...jaun_elia]);
}
