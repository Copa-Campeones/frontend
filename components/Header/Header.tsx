'use client'
import { getUserData, logout } from "@/store/features/appSlice"
import { useAppDispatch } from "@/store/hook"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import styles from './header.module.css'
import { userType } from "@/utils/constants"
import { useRouter } from "next/router"


function Header() {
    const dispatch = useAppDispatch()
    const route = useRouter()

    const userData = useSelector(({app}) => app.user)

    const handleLogout = () => {
        dispatch(logout())
        route.push('/')
    }

    const handleNotifications = () => {
        route.push('/notifications')
    }

    useEffect(() => {
        dispatch(getUserData())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <header className={styles.header}>
            <h1>Copa campeones</h1>
            <div className={styles.user}>
                <div className={styles.userInfo}>
                    <p>{userData?.name}</p>
                    <p>{userType[userData?.user_type_id]}</p>
                </div>
                <p className={styles.notifications} onClick={handleNotifications}>🔔</p>
                <button onClick={handleLogout} className={styles.logoutButton}>Salir</button>
            </div>
        </header>
    )
}

export default Header
