import { Navbar } from "components"
import { useAuth } from "providers/AuthProvider"
import React, { Fragment, useEffect } from "react"

const Layout: React.FC = ({ children }) => {
  const { loadUser, isLoading, isInit } = useAuth()
  useEffect(() => loadUser(), [])

  return (
    <Fragment>
      <Navbar />
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 mt-2">
        {isLoading || isInit ? (
          <i className="fas fa-circle-notch fa-spin" aria-hidden="true"></i>
        ) : (
          children
        )}
      </div>
    </Fragment>
  )
}
export default Layout
