import prisma from '../lib/prisma'
import { initialData } from './seed'
import { countries } from './seed-contries'

async function main () {
  await prisma.orderAddress.deleteMany()
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.user.deleteMany()
  await prisma.productImage.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()
  await prisma.country.deleteMany()

  const { categories, products, users } = initialData

  await prisma.user.createMany({ data: users })

  const categoriesData = categories.map(name => ({ name }))

  await prisma.category.createMany({ data: categoriesData })

  const categoriesDB = await prisma.category.findMany()

  const categoriesMap = categoriesDB.reduce<Record<string, string>>((map, category) => {
    map[category.name.toLocaleLowerCase()] = category.id
    return map
  }, {})

  products.forEach(async product => {
    const { images, type, ...rest } = product

    const dbProduct = await prisma.product.create({
      data: { ...rest, categoryId: categoriesMap[type] }
    })

    const imagesData = images.map(image => ({
      url: image,
      productId: dbProduct.id
    }))

    await prisma.productImage.createMany({ data: imagesData })
  })

  await prisma.country.createMany({ data: countries })

  console.log('Seed executed successfully')
}

main().catch(e => { console.error(e) })
