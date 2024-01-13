import { Footer, Sidebar, TopMenu } from '@/components'

export default function ShopLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <main className="min-h-screen">
      <TopMenu />
      <Sidebar />
      <article className="px-0 sm:px-10">
        {children}
      </article>
      <Footer />
    </main>
  )
}
