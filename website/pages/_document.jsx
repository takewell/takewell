import Document, { Html, Head, Main, NextScript } from "next/document";
import { SITE } from "data/site";

export default class extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      styles: <>{initialProps.styles}</>,
    };
  }

  render() {
    return (
      <Html lang={SITE.language}>
        <Head />
        <body>
          <script
            dangerouslySetInnerHTML={{
              __html: `
            (function(){
              if (!window.localStorage) return;
              if (window.localStorage.getItem('theme') === 'dark') {
                document.documentElement.style.background = '#000';
                document.body.style.background = '#000';
              };
            })()
          `,
            }}
          />
          <Main />
          <NextScript />
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${SITE.googleAnalytics}`}
          />
          <script
            async
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${SITE.googleAnalytics}');
              `,
            }}
          />
        </body>
      </Html>
    );
  }
}
