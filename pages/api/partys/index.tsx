import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../utils/supabase";
import moment from "moment";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        console.log('creating party')
        // las tablas son party, user, team, notification, necesito crear un partido 5 vs 5, asignarle un usuario, un equipo, y una notificacion de creación de partido

        let nextThursday = moment().day(4).hour(22).minute(0).second(0);

        if (nextThursday.isBefore(moment())) {
            nextThursday = nextThursday.add(1, 'week');
        }

        const { data:party, error } : any = await supabase
            .from('party')
            .insert([
                // que la fecha sea el sigiuente jueves a las 10 pm
                { date: nextThursday.format('YYYY-MM-DDTHH:mm:ssZ'), admin_user_id: 2, team_id_a: 1, team_id_b: 2},
            ])
            .select();

        if (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }

        const { data: users, error: errorNotification } = await supabase
        // diferente del id 2
            .from('user')
            .select('*')
            .filter('id', 'neq', 2)
            .limit(10);

        // actualizalos

        const teamAUser = []
        const teamBUser = []

        const { data: updatedUser, error: errorUpdatedUser } = await supabase
                .from('user')
                .update({ team_id: 3 })


        users?.forEach(async (user:any) => {
            // los ids son aleatorios
            const random = Math.floor(Math.random() * 2) + 1;
            if (random === 1 && teamAUser.length < 6) {
                teamAUser.push(user.id)

                const { data: updatedUser, error: errorUpdatedUser } = await supabase
                    .from('user')
                    .update({ team_id: 1 })
                    .eq('id', user.id);
            } else {
                teamBUser.push(user.id)

                const { data: updatedUser, error: errorUpdatedUser } = await supabase
                    .from('user')
                    .update({ team_id: 2 })
                    .eq('id', user.id);
            }

            // crear notificacion

            if (party?.length > 0) {
                const { id } = party[0]
                const { data: notification, error: errorNotification } = await supabase
                    .from('notification')
                    .insert([
                        { user_id: user.id, text: 'Te han invitado a un partido' },
                    ]);
            }
        })






        res.status(201).json({ message: "Party created" });
    } 

    if (req.method === "GET") {

        const { data: users, error } = await supabase
            .from('party')
            .select('*');

        if (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }

        res.status(200).json(users);
    }   
}