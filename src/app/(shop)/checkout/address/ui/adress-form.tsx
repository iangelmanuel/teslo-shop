'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import clsx from 'clsx'
import { deleteUserAddress, setUserAddress } from '@/actions'
import { useAddressStore } from '@/store'
import type { Address, Country } from '@/interfaces'

interface Props {
  countries: Country[]
  userStoredAddress?: Partial<Address>
}

interface FormInputs {
  firstName: string
  lastName: string
  address: string
  address2?: string
  postalCode: string
  city: string
  country: string
  phone: string
  rememberAddress: boolean
}

export const AddressForm = ({ countries, userStoredAddress = {} }: Props) => {
  const { data: session } = useSession({ required: true })
  const router = useRouter()

  const { register, handleSubmit, reset, formState: { isValid } } = useForm<FormInputs>({
    defaultValues: {
      ...(userStoredAddress as any),
      rememberAddress: false
    }
  })

  const address = useAddressStore(state => state.address)
  const setAddress = useAddressStore(state => state.setAddress)

  useEffect(() => {
    if (address.firstName) {
      reset(address)
    }
  }, [])

  const onSubmit = async (data: FormInputs) => {
    const { rememberAddress, ...restAddress } = data
    setAddress(restAddress)

    if (data.rememberAddress) {
      await setUserAddress(restAddress, session!.user.id)
    } else {
      await deleteUserAddress(session!.user.id)
    }

    router.push('/checkout')
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className={clsx(
        'grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2'
      )}
    >
      <div className="flex flex-col mb-2">
        <label>Nombres</label>
        <input
          type="text"
          {...register('firstName', { required: true })}
          className="p-2 border rounded-md bg-gray-200"
        />
      </div>

      <div className="flex flex-col mb-2">
        <label>Apellidos</label>
        <input
          type="text"
          {...register('lastName', { required: true })}
          className="p-2 border rounded-md bg-gray-200"
        />
      </div>

      <div className="flex flex-col mb-2">
        <label>Dirección</label>
        <input
          type="text"
          {...register('address', { required: true })}
          className="p-2 border rounded-md bg-gray-200"
        />
      </div>

      <div className="flex flex-col mb-2">
        <label>Dirección 2 (opcional)</label>
        <input
          type="text"
          {...register('address2')}
          className="p-2 border rounded-md bg-gray-200"
        />
      </div>

      <div className="flex flex-col mb-2">
        <label>Código postal</label>
        <input
          type="text"
          {...register('postalCode', { required: true })}
          className="p-2 border rounded-md bg-gray-200"
        />
      </div>

      <div className="flex flex-col mb-2">
        <label>Ciudad</label>
        <input
          type="text"
          {...register('city', { required: true })}
          className="p-2 border rounded-md bg-gray-200"
        />
      </div>

      <div className="flex flex-col mb-2">
        <label>País</label>
        <select
          {...register('country', { required: true })}
          className="p-2 border rounded-md bg-gray-200"
        >
          <option value="">[ Seleccione ]</option>
          {countries.map(country => (
            <option key={country.id} value={country.id}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col mb-2">
        <label>Teléfono</label>
        <input
          type="phone"
          {...register('phone', { required: true })}
          className="p-2 border rounded-md bg-gray-200"
        />
      </div>

      <div className="inline-flex items-center mb-10">
        <label
          className="relative flex cursor-pointer items-center rounded-full p-3"
          htmlFor="checkbox"
        >
          <input
            type="checkbox"
            id="checkbox"
            {...register('rememberAddress')}
            className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:bg-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
          />
          <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
              viewBox="0 0 20 20"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
        </label>
        <span>¿Recordar Dirección?</span>
      </div>

      <div className="flex flex-col mb-2 sm:mt-10">
        <button
          type="submit"
          disabled={!isValid}
          className={clsx({
            'btn-primary': isValid,
            'btn-disabled': !isValid
          })}>
          Siguiente
        </button>
      </div>
    </form>
  )
}
