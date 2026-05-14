export const siteConfig = {
  name: "Markdown TOC Generator",
  title: "Markdown TOC Generator — Instant Table of Contents from Headings",
  description:
    "Paste any Markdown document and instantly generate a nested table of contents with anchor links. Supports H1–H6, ordered/unordered lists, configurable depth. 100% free, no login.",
  url: "https://markdown-toc-generator.tools.jagodana.com",
  ogImage: "/opengraph-image",

  headerIcon: "List",
  brandAccentColor: "#6366f1",

  keywords: [
    "markdown table of contents generator",
    "markdown toc",
    "toc generator",
    "markdown headings to toc",
    "markdown anchor links",
    "generate table of contents markdown",
    "markdown toc online",
    "readme table of contents",
  ],
  applicationCategory: "DeveloperApplication",

  themeColor: "#3b82f6",

  creator: "Jagodana",
  creatorUrl: "https://jagodana.com",
  twitterHandle: "@jagodana",

  socialProfiles: [
    "https://twitter.com/jagodana",
  ],

  links: {
    github:
      "https://github.com/Jagodana-Studio-Private-Limited/markdown-toc-generator",
    website: "https://jagodana.com",
  },

  footer: {
    about:
      "Free online Markdown TOC Generator. Instantly build a table of contents with GitHub-compatible anchor links from any Markdown document.",
    featuresTitle: "Features",
    features: [
      "H1–H6 heading support",
      "GitHub-style anchor links",
      "Ordered & unordered lists",
      "Configurable heading depth",
    ],
  },

  hero: {
    badge: "Free Markdown Tool",
    titleLine1: "Generate a Table of Contents",
    titleGradient: "from Any Markdown",
    subtitle:
      "Paste your Markdown document and instantly get a nested TOC with GitHub-compatible anchor links. Choose heading depth, list style, and copy in one click.",
  },

  featureCards: [
    {
      icon: "📑",
      title: "Instant TOC",
      description:
        "Automatically extracts all headings (H1–H6) and builds a nested table of contents with anchor links in seconds.",
    },
    {
      icon: "⚙️",
      title: "Fully Configurable",
      description:
        "Set minimum and maximum heading levels, switch between ordered and unordered lists, and preview live.",
    },
    {
      icon: "🔗",
      title: "GitHub-Compatible Anchors",
      description:
        "Anchors are generated using the same algorithm as GitHub — works perfectly in README files and docs.",
    },
  ],

  relatedTools: [
    {
      name: "Markdown Table Generator",
      url: "https://markdown-table-generator.jagodana.com",
      icon: "📊",
      description: "Build markdown tables visually from a spreadsheet-like editor.",
    },
    {
      name: "Markdown to HTML Converter",
      url: "https://markdown-to-html-converter.jagodana.com",
      icon: "🔄",
      description: "Convert Markdown to clean, styled HTML instantly.",
    },
    {
      name: "README Generator",
      url: "https://readme-generator.jagodana.com",
      icon: "📄",
      description: "Generate professional README.md files for your projects.",
    },
    {
      name: "Markdown Badge Generator",
      url: "https://markdown-badge-generator.jagodana.com",
      icon: "🏷️",
      description: "Create shields.io badges for your Markdown files.",
    },
    {
      name: "HTML to Markdown",
      url: "https://html-to-markdown.jagodana.com",
      icon: "⬇️",
      description: "Convert HTML pages or snippets to clean Markdown.",
    },
    {
      name: "Regex Playground",
      url: "https://regex-playground.jagodana.com",
      icon: "🧪",
      description: "Build, test & debug regular expressions in real-time.",
    },
  ],

  howToSteps: [
    {
      name: "Paste your Markdown",
      text: "Copy and paste your full Markdown document into the input area on the left.",
      url: "",
    },
    {
      name: "Configure depth and style",
      text: "Choose the minimum and maximum heading levels you want included, then select ordered or unordered list style.",
      url: "",
    },
    {
      name: "Copy your TOC",
      text: "Click the Copy button to copy the generated table of contents to your clipboard, then paste it into your document.",
      url: "",
    },
  ],
  howToTotalTime: "PT1M",

  faq: [
    {
      question: "What is a Markdown table of contents?",
      answer:
        "A Markdown table of contents (TOC) is a list of links at the top of a document that lets readers quickly jump to any section. Each link uses a GitHub-style anchor (e.g. `#my-heading`) derived from the heading text.",
    },
    {
      question: "Are the anchor links compatible with GitHub?",
      answer:
        "Yes. The anchor generation follows the same algorithm GitHub uses: text is lowercased, spaces become hyphens, and most special characters are removed. The result works in GitHub READMEs, GitLab, and most static-site generators.",
    },
    {
      question: "Can I choose which heading levels to include?",
      answer:
        "Absolutely. Use the Min Level and Max Level sliders to control which headings appear in your TOC. For example, set min=2 and max=3 to include only H2 and H3 headings.",
    },
    {
      question: "Does this tool work for large documents?",
      answer:
        "Yes — all processing happens in your browser. There is no file size limit, no upload, and no server round-trip. Your content never leaves your device.",
    },
    {
      question: "Can I generate an ordered (numbered) TOC?",
      answer:
        "Yes. Toggle the list style switch to switch between an unordered (bulleted) list and an ordered (numbered) list. Both styles produce valid Markdown.",
    },
  ],

  pages: {
    "/": {
      title:
        "Markdown TOC Generator — Instant Table of Contents from Headings",
      description:
        "Paste any Markdown document and instantly generate a nested table of contents with anchor links. Supports H1–H6, ordered/unordered lists, configurable depth.",
      changeFrequency: "weekly" as const,
      priority: 1,
    },
  },
} as const;

export type SiteConfig = typeof siteConfig;
