export interface MenuItem {
  id: number
  name: string
  koreanName: string
  description: string
  price: number
  category: string
  image: string
  tags: string[]
  spicy?: number // 0-3
  popular?: boolean
  vegetarian?: boolean
  prepTime: number
  calories?: number
}

export interface CartItem extends MenuItem {
  quantity: number
  note?: string
}

export const CATEGORIES = ['All', 'Rice & Noodles', 'BBQ & Grills', 'Soups & Stews', 'Small Plates', 'Drinks & Desserts']
