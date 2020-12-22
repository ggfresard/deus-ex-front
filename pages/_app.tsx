import { Layout } from "components"
import { AppProvider } from "providers"
import React from "react"
import "../styles/globals.css"
import "node_modules/@fortawesome/fontawesome-free/css/all.css"

function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppProvider>
  )
}

export default MyApp
