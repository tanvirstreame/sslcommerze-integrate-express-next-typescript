import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const PaymentSuccessFul: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <p className={styles.failure}>
          Payment Failure

        </p>
        <a type='button' className={styles.a} href='http://localhost:3000'>Back</a>
      </main>
    </div>
  )
}

export default PaymentSuccessFul
