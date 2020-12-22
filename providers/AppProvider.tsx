import React, { Fragment } from "react"
import { ErrorProvider, AuthProvider } from "./"

const AppProviders: React.FC = ({ children }) => {
  return (
    <Fragment>
      <ErrorProvider>
        <AuthProvider>{children}</AuthProvider>
      </ErrorProvider>
    </Fragment>
  )
}

export default AppProviders
