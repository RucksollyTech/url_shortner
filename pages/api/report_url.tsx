import { Variables, hasuraQueryUrlReport } from "@/Db/hasuraQuery";
import { NextApiRequest, NextApiResponse } from "next";

interface ExtendedNextApiRequest extends NextApiRequest {
    body: {
      url: string,
      report : string
    };
}


const report_url = async(req:ExtendedNextApiRequest,res:NextApiResponse) => {
    if (req.method === 'POST') {
        const body = req.body;
        const {url,report} = body;
        const user = "rucksolly@gmail.com";
        try {
            const data:Promise<Partial<Variables>> = hasuraQueryUrlReport(url,report,user)
            res.send({data,success:true});
        } catch (err) {}
    }
}

export default report_url