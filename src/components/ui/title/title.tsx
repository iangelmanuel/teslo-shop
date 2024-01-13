import { titleFont } from '@/config/fonts'

interface Props {
  title: string
  subtitle?: string
  className?: string
}

export const Title = ({ title, subtitle, className }: Props) => {
  return (
    <section className={`mt-3 ${className}`}>
      <h1 className={`${titleFont.className} antialiased text-4xl font-semibold my-10`}>{title}</h1>

      {subtitle && (
        <h3 className="text-gray-400 mb-5 text-xl font-normal">{subtitle}</h3>
      )}
    </section>
  )
}
