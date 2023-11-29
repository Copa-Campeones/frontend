import { getPartys } from "@/store/features/appSlice";
import { useAppDispatch } from "@/store/hook";
import { useEffect, useState } from "react";
import styles from './homebody.module.css'
import { useSelector } from "react-redux";
import Loading from "../Loading/Loading";
import axios from "axios";

function HomeBody() {
    const dispatch = useAppDispatch()

    const partys = useSelector(({app}) => app.partys)

    const [isLoading, setIsLoading] = useState(false)



    const handleCreateParty = () => {
        axios.post('/api/partys', {}).then((res:any) => {
            console.log(res)
            getInitialData()
        })

    }

    const getInitialData = async () => {
        setIsLoading(true)
        dispatch(getPartys()).then((res:any) => {
            setIsLoading(false)
        })
    }

    useEffect(() => {
        getInitialData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <div className={styles.homeBodyContainer}>
            <div className={styles.homeBodyHeader}>
                <button className={styles.buttonHomeBody} onClick={handleCreateParty}>Crear partido</button>
            </div>
            <div className={styles.partysContainer}>
                {isLoading ? (
                    <Loading />
                ) : (
                    <div className={styles.homeBodyContent}>
                        {partys.map((party:any) => (
                            <div className={styles.partyCard} key={party.id}>
                                <p>Partido fut 5</p>
                                <p>{party.date}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default HomeBody;