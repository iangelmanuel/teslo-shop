import Link from 'next/link'
import { IoCartOutline } from 'react-icons/io5'

export default function EmptyPage () {
  return (
    <article className="flex justify-center items-center h-[800px]">
      <IoCartOutline size={80} className="mx-5" />
      <section className="flex flex-col items-center">
        <h1 className="text-xl font-semibold">Tu carrito está vacío</h1>
        <Link
          href="/"
          className="text-blue-500 mt-2 text-4xl"
        >Regresar</Link>
      </section>
    </article>
  )
}
