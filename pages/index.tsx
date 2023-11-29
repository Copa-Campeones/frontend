'use client'
import Image from 'next/image'
import styles from './page.module.css'
import { useEffect } from 'react'
import Login from '@/components/Login/Login'

export default function Home() {
  const session = true;

  return (
    <>
      <Login />
    </>
  )
}
