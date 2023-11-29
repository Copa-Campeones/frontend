'use client'
import { getUserData } from "@/store/features/appSlice"
import { useAppDispatch } from "@/store/hook"
import { useEffect } from "react"
import { useSelector } from "react-redux"


function Header() {
    const dispatch = useAppDispatch()

    const userData = useSelector(({app}) => app)

    console.log(userData)

    useEffect(() => {
        dispatch(getUserData({}))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <></>
    )
}

export default Header
