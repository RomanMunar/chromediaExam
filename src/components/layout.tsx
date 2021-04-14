import { ReactNode } from 'react'
import { Header } from '.'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        {children}
      </div>
    </>
  )
}

export default Layout
