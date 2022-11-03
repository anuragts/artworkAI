import type { NextApiRequest,NextApiResponse } from "next";
import { openAi } from "../../config/openAi.config";

export default async (req: NextApiRequest, res: NextApiResponse) => {
const prompt:string = req.body.prompt;
const type:string = req.body.type;
const response = await openAi.createImage({
    prompt: `Create an ${type} artwork of ${prompt}`,
    n: 1,
    size: "512x512",
  });
  if (response) {
    res.status(200).json(response.data);
  } else {
    res.status(500).json({ message: "Something went wrong , try again later" });
  }
}