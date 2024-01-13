export default function AuthLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex justify-center">
      <article className="w-full sm:w-[350px] px-10">
        {children}
      </article>
    </main>
  )
}
