import { createContext } from 'react'

export const CostContext = createContext({
  total: 0,
  setTotal: (c: any) => {},
})
