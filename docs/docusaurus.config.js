// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import("@docusaurus/theme-common").FooterLinkItem[]} */
const moreLinks = [
  {
    label: "👨‍💻 GitHub",
    href: "https://github.com/arthuro555/THNK",
  },
  {
    label: "📅 Roadmap",
    href: "https://github.com/users/arthuro555/projects/2/views/1",
  },
  {
    label: "☕ Gift a coffee",
    href: "https://ko-fi.com/arthuro555",
  },
  {
    label: "🐦 Twitter",
    href: "https://twitter.com/arthuro555",
  },
];

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "THNK",
  tagline: "The GDevelop Multiplayer Framework for everyone!",
  url: "https://thnk.arthuro555.com",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  trailingSlash: true,
  headTags: [
    {
      tagName: "link",
      attributes: {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
    },
    {
      tagName: "link",
      attributes: {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
    },
    {
      tagName: "link",
      attributes: {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png",
      },
    },
    {
      tagName: "link",
      attributes: {
        rel: "manifest",
        href: "/site.webmanifest",
      },
    },
    {
      tagName: "meta",
      attributes: { name: "apple-mobile-web-app-capable", content: "yes" },
    },
    {
      tagName: "meta",
      attributes: {
        name: "apple-mobile-web-app-title",
        content: "THNK",
      },
    },
    {
      tagName: "meta",
      attributes: {
        name: "application-name",
        content: "THNK",
      },
    },
    {
      tagName: "meta",
      attributes: {
        name: "msapplication-TileColor",
        content: "#ffc40d",
      },
    },
    {
      tagName: "meta",
      attributes: {
        name: "msapplication-TileImage",
        content: "/mstile-144x144.png",
      },
    },
    {
      tagName: "meta",
      attributes: {
        name: "theme-color",
        content: "#ffc40d",
      },
    },
  ],

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "arthuro555", // Usually your GitHub org/user name.
  projectName: "THNK", // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  plugins: [require.resolve("docusaurus-plugin-image-zoom")],

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/arthuro555/THNK/tree/master/docs/",
        },
        blog: {
          showReadingTime: true,
          editUrl: "https://github.com/arthuro555/THNK/tree/master/docs/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: "dark",
      },
      image: "img/THNK-thumbnail.png",
      metadata: [
        {
          name: "keywords",
          content:
            "gdevelop, p2p, multiplayer, thnk, network, docs, documentation, manual, gd, framework, online, players, game, gamer",
        },
      ],
      announcementBar: {
        id: "preview",
        content:
          "THNK & this site are still in early stages! There may still be bugs or typos, we welcome you to report them if you find some!",
        textColor: "#091E42",
        backgroundColor: "#ffec99",
      },
      navbar: {
        title: "THNK",
        logo: {
          alt: "THNK Logo",
          src: "img/thnk.svg",
          width: 32,
          height: 32,
        },
        items: [
          {
            type: "doc",
            docId: "why-thnk",
            position: "left",
            label: "Docs",
          },
          { to: "/blog", label: "Blog", position: "left" },
          {
            type: "localeDropdown",
            position: "right",
          },
          {
            label: "More",
            position: "right",
            items: moreLinks,
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Why THNK?",
                to: "/docs/why-thnk",
              },
              {
                label: "Getting started",
                to: "/docs/getting-started/",
              },

              {
                label: "Migrating to THNK",
                to: "/docs/migrating",
              },
            ],
          },
          {
            title: "More",
            items: moreLinks,
          },
        ],
        copyright: `THNK. Copyright © ${new Date().getFullYear()} Arthur "arthuro555" Pacaud.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      zoom: {
        selector: "img:not(.nozoom)",
        background: {
          light: "rgb(255, 255, 255)",
          dark: "rgb(50, 50, 50)",
        },
      },
    }),
};

module.exports = config;
