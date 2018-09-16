export type Package = {
  id: string
  title: string
  description: string
  icon: string
  picon: string[]
  menu: Menu[]
  config?: any
}

export type Menu = {
  lable: string
  icon: any
  path: string
}
