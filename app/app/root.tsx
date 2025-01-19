import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import "./tailwind.css";

import { SITE } from "@/constants/site";

type LayoutProps = {
  children: React.ReactNode;
};

const Head = () => (
  <head>
    <meta charSet="utf-8" />
    <meta name="referrer" content="strict-origin" />
    <meta name="google" content="notranslate" />
    <meta name="description" content={SITE.description} />
    <meta property="og:site_name" content={SITE.title} />
    <meta property="og:description" content={SITE.description} />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="author" content={SITE.author} />
    <meta name="twitter:creator" content={`@${SITE.x}`} />
    <meta property="og:title" content={SITE.title} />
    <meta property="og:url" content={SITE.domain} />
    {/* <meta
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
    /> */}
    <meta
      name="viewport"
      content="initial-scale=1, maximum-scale=5, minimum-scale=1, viewport-fit=cover"
    />
    <Meta />
    <Links />
  </head>
);

export function Layout({ children }: LayoutProps) {
  return (
    <html lang="ja">
      <Head />
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
