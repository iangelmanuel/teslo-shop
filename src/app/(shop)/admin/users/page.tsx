import { redirect } from 'next/navigation'
import { getPaginatedUsers } from '@/actions'
import { Title } from '@/components'
import { UserTable } from './ui/user-table'

export default async function OrdersPage () {
  const { ok, users = [] } = await getPaginatedUsers()

  if (!ok) {
    redirect('/auth/login')
  }

  return (
    <>
      <Title title="Mantenimiento de Usuarios" />

      <div className="mb-10">
        <UserTable
          users={users}
        />
      </div>
    </>
  )
}
