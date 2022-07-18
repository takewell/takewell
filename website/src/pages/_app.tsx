import Head from 'next/head'
import React, { useMemo } from 'react'

import { SITE } from '@/data/site'
import { useDomClean } from '@/lib/useDomClean'
import { getDNSPrefetchValue } from '@/lib/data-transform'

import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

// import '../styles/globals.css'

type Props = AppProps & {
  Component: NextPage
}

const App = ({ Component, pageProps }: Props) => {
  const domain = useMemo(() => getDNSPrefetchValue(SITE.domain), [])
  useDomClean()

  return (
    <>
      <Head>
        <title>{SITE.title}</title>
        {domain && <link rel="dns-prefetch" href={domain} />}
        <meta name="referrer" content="strict-origin" />
        <meta name="description" content={SITE.description} />
        <meta property="og:site_name" content={SITE.title} />
        <meta property="og:description" content={SITE.description} />
        <meta property="og:type" content="website" />
        <meta name="generator" content="takewell.dev" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="author" content={SITE.author} />
        <meta name="twitter:creator" content={`@${SITE.twitterUserName}`} />
        <meta property="og:title" content={SITE.title} />
        <meta property="og:url" content={SITE.domain} />
        <meta
          property="og:image"
          content={`https:${domain}/assets/og-main.png`}
        />
        <meta
          property="twitter:image"
          content={`https:${domain}/assets/og-main.png`}
        />
        <meta
          itemProp="image"
          property="og:image"
          content={`https:${domain}/assets/og-main.png`}
        />
        <meta
          name="viewport"
          content="initial-scale=1, maximum-scale=5, minimum-scale=1, viewport-fit=cover"
        />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default App
