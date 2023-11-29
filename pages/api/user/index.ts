import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../utils/supabase";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { email, password } = req.body;
        const data = { email, password, user_type_id: 2, team_id: 0, name: "" };
        // create a new user en la tabla user no uses supabase auth

        const { data: newUser, error } = await supabase
            .from('user')
            .insert(data);
        
        if (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }

        res.status(201).json({ message: "User created" });
    } else {
        res.status(405).json({ message: "We only support POST" });
    }
}