import React from 'react'
import { Provider } from 'react-redux'
import App, { Container } from 'next/app'
import tidy from 'tidy'

interface Props {
    store: object
} 

@tidy()
export default class extends App<Props> {
  static async getInitialProps ({ Component, ctx }) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {}

    return { pageProps }
  }

  render () {
    const { Component, pageProps, store } = this.props
    return (
      <Container>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    )
  }
}

