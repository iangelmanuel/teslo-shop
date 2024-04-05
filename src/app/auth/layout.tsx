import { redirect } from 'next/navigation'
import { auth } from '@/auth.config'

export default async function AuthLayout ({
  children
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  if (session?.user) redirect('/')
  return (
    <main className="flex justify-center">
      <article className="w-full sm:w-[350px] px-10">
        {children}
      </article>
    </main>
  )
}
