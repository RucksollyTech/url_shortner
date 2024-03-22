import { Variables, hasuraQueryUrlReport } from "@/Db/hasuraQuery";
import { NextApiRequest, NextApiResponse } from "next";


interface ExtendedNextApiRequest extends NextApiRequest {
    body: {
        data : {
            url: string,
            report : string | null,
        }
    };
}
const report_url = async(req:ExtendedNextApiRequest,res:NextApiResponse) => {
    if (req.method === 'POST') {
        const body = req.body;
        let {url,report} = body.data;
        const user = "rucksolly@gmail.com";
        report = report || "empty"

        try {
            const data:Promise<Partial<Variables>> = hasuraQueryUrlReport(url,report,user)
            if((await data).errors && (await data).errors?.length){
                res.status(400)
                res.send({data,success:0});
            }else{
                res.send({data,success:true});
            }
        } catch (err) {
            res.send({err,success:0});
        }
    }
}

export default report_url