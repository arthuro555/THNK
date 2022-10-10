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
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/arthuro555/THNK/tree/main/docs/",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/arthuro555/THNK/tree/main/docs/",
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
          src: "img/thnk.png",
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
                to: "/docs/category/getting-started/",
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
        background: {
          light: 'rgb(255, 255, 255)',
          dark: 'rgb(50, 50, 50)'
        },
      }
    }),
};

module.exports = config;
