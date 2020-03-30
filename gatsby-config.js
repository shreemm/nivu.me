/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: `Nivu`,
    description: `Nivu' blog on AI, ML and IoT.`,
    siteUrl: `https://delog-w3layouts.netlify.com/`,
    home: {
      title: `Hi! I'm Nivu`,
      description: `I teach Machine Learning, Deep Learning, Data Science and Internet of Things. I believe education is the best way to improve individual lives and society. Find me here https://www.linkedin.com/in/nivu/`,
    },
    /* W3Layouts domain verification key for contact forms https://my.w3layouts.com/Forms/ */
    w3l_dom_key: `5e609f7a2d23fCF_Domain_verify`
  },
  plugins: [{
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `markdown-pages`,
      path: `${__dirname}/_data`,
    },
  },
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [{
        resolve: `gatsby-remark-prismjs`,
        options: {
          classPrefix: "language-",
          inlineCodeMarker: null,
          aliases: {},
          showLineNumbers: false,
          noInlineHighlight: false,
        },
      },
      {
        resolve: `gatsby-remark-katex`,
        options: {
          // Add any KaTeX options from https://github.com/KaTeX/KaTeX/blob/master/docs/options.md here
          strict: `ignore`
        }
      },
      {
        resolve: 'gatsby-remark-emojis',
      }],
    },
  },
  {
    resolve: `gatsby-plugin-google-analytics`,
    options: {
      // nivu.me tracking id
      trackingId: "UA-145419540-1",
      head: true,
    }
  },
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-netlify-cms`,
  ],
}