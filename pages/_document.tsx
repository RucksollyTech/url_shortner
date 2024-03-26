import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta
          name="description"
          content="A free, simple, and fast URL shortener and QR code generator that allows shortening of any link from various platforms including WhatsApp, LinkedIn, Instagram, Facebook, YouTube, TikTok, blogs,X, and more, while enabling anonymous user access."
        />
        <meta name="theme-color" content="#000000" />

        <title>Z1N : Free URL Shortener</title>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
