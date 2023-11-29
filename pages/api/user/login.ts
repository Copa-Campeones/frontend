import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../utils/supabase";

export default async function login(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { email, password } = req.body;
        const { data, error } = await supabase
            .from('user').select('*').eq('email', email).eq('password', password);


        if (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }

        const userData:any = data || [];

        res.status(200).json(userData[0]);
    }
}