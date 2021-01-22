const NextI18Next = require("next-i18next").default;
const { localeSubpaths } = require("next/config").default().publicRuntimeConfig;
const path = require("path");

module.exports = new NextI18Next({
  defaultNS: [],
  defaultLanguage: "ro",
  otherLanguages: ["ru"],
  localeSubpaths: {
    ru: "ru",
    ro: "ro",
  },
  localePath: path.resolve("./public/static/locales"),
});
