'use client'

import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { paypalCheckPayment, setTransactionId } from '@/actions'
import {
  CreateOrderData,
  CreateOrderActions,
  OnApproveActions,
  OnApproveData
} from '@paypal/paypal-js'

interface Props {
  orderId: string
  amount: number
}

export const PayPalButton = ({ orderId, amount }: Props) => {
  const [{ isPending }] = usePayPalScriptReducer()
  const rountedAmount = Math.round(amount * 100) / 100

  if (isPending) {
    return (
      <div className="animate-pulse mb-16">
        <div className="h-10 bg-gray-300 rounded" />
        <div className="h-10 bg-gray-300 rounded mt-2" />
      </div>
    )
  }

  const createOrder = async (
    data: CreateOrderData,
    actions: CreateOrderActions
  ): Promise<string> => {
    const transactionId = await actions.order.create({
      purchase_units: [
        {
          invoice_id: orderId,
          amount: { value: rountedAmount.toString() }
        }
      ]
    })

    const { ok, message } = await setTransactionId(orderId, (transactionId as string))

    if (!ok) {
      throw new Error(message)
    }

    return transactionId
  }

  const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
    const details = await actions.order?.capture()
    if (!details) return

    await paypalCheckPayment(details.id as string)
  }

  return (
    <div className="relative z-0">
      <PayPalButtons
        createOrder={createOrder}
        onApprove={onApprove}
      />
    </div>
  )
}
