export interface SeedProduct {
  // TODO: id: string
  description: string
  images: string[]
  inStock: number
  price: number
  sizes: Size[]
  slug: string
  tags: string[]
  title: string
  type: Type
  gender: Categories
}

export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL'
export type Type = 'shirts' | 'pants' | 'hoodies' | 'hats'
export type Categories = 'men' | 'women' | 'kid' | 'unisex'
