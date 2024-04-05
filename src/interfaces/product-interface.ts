export interface SeedProduct {
  id: string
  description: string
  images: string[]
  inStock: number
  price: number
  sizes: Size[]
  slug: string
  tags: string[]
  title: string
  // type: Type
  gender: Categories
}

export interface CartProduct {
  id: string
  slug: string
  title: string
  price: number
  quantity: number
  size: Size
  image: string
}

export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL'
export type Type = 'shirts' | 'pants' | 'hoodies' | 'hats'
export type Categories = 'men' | 'women' | 'kid' | 'unisex'
