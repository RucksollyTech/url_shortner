import { Variables, hasuraQueryUrlReport } from "@/Db/hasuraQuery";
import { NextApiRequest, NextApiResponse } from "next";

interface ExtendedNextApiRequest extends NextApiRequest {
    body: {
      url: string;
    };
}


const report_url = async(req:ExtendedNextApiRequest,res:NextApiResponse) => {
    if (req.method === 'POST') {
        const body = req.body;
        const url = body.url;
        try {
            const data:Partial<Variables> = await hasuraQueryUrlReport(url)
            res.send(data);
        } catch (err) {}
    }
}

export default report_url