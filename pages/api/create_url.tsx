import { Variables, hasuraQueryUrlShortner } from "@/Db/hasuraQuery";
import { NextApiRequest,NextApiResponse } from "next";


interface ExtendedNextApiRequest extends NextApiRequest {
    body: {
      url: string;
    };
}

const create_url = async(req:ExtendedNextApiRequest,res:NextApiResponse)=> {
    if (req.method === 'POST') {
        const body = req.body;
        const url = body.url;
        try {
            const data:Partial<Variables> = await hasuraQueryUrlShortner(url)
            res.send(data);
        } catch (err) {}
    }
}

export default create_url