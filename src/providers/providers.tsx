'use client'

import { SessionProvider } from 'next-auth/react'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'

interface Props {
  children: React.ReactNode
}

export const Providers = ({ children }: Props) => {
  return (
    <SessionProvider>
      <PayPalScriptProvider options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? '',
        intent: 'capture',
        currency: 'USD'
      }}>
        {children}
      </PayPalScriptProvider>
    </SessionProvider>
  )
}
