import { readFileSync } from 'node:fs';
import * as path from 'node:path';
import { pluginSass } from '@rsbuild/plugin-sass';
import { defineConfig } from '@rspress/core';

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8')) as {
  name: string;
  description: string;
  author: {
    name: string;
    email: string;
  };
  license: string;
  version: string;
  homepage: string;
};

export default defineConfig({
  // Base config
  root: path.join(import.meta.dirname, 'src-docs'),
  outDir: 'docs',
  builderConfig: {
    plugins: [
      pluginSass(),
    ],
  },
  // Site config
  title: pkg.name,
  description: pkg.description,
  base: `/biome-plugins/`,
  icon: '/favicon.svg',
  lang: 'en',
  logo: {
    light: '/rspress-light-logo.png',
    dark: '/rspress-dark-logo.png',
  },
  head: [
    [
      'meta',
      {
        name: 'author',
        content: pkg.author.name,
      },
    ],
    [
      'meta',
      {
        name: 'reply-to',
        content: pkg.author.email,
      },
    ],
  ],
  locales: [
    {
      lang: 'en',
      label: 'English',
      title: 'Manual',
      description:
        'Custom Biome lint rules (GritQL plugins) for Rstack-based TypeScript projects.',
    },
    {
      lang: 'ja',
      label: '日本語',
      title: 'マニュアル',
      description: 'カスタムの規約',
    },
  ],
  themeConfig: {
    socialLinks: [
      {
        icon: 'github',
        mode: 'link',
        content: pkg.homepage,
      },
    ],
    sidebar: {
      // English
      '/guide/': [
        {
          text: 'Guide',
          items: [
            {
              text: 'Getting Started',
              link: '/guide/getting-started',
            },
            {
              text: 'Contributing',
              link: '/guide/contributing',
            },
          ],
        },
      ],
      '/rules/': [
        {
          text: 'Rules',
          items: [
            {
              text: 'Overview',
              link: '/rules/',
            },
            {
              text: 'GritQL Rules',
              items: [
                {
                  text: 'enforce-pure-src',
                  link: '/rules/enforce-pure-src',
                },
                {
                  text: 'prefer-union-over-enum',
                  link: '/rules/prefer-union-over-enum',
                },
                {
                  text: 'no-null-type',
                  link: '/rules/no-null-type',
                },
              ],
            },
          ],
        },
      ],
      // Japanese
      '/ja/guide/': [
        {
          text: 'ガイド',
          items: [
            {
              text: 'はじめに',
              link: '/ja/guide/getting-started',
            },
            {
              text: 'コントリビューション',
              link: '/ja/guide/contributing',
            },
          ],
        },
      ],
      '/ja/rules/': [
        {
          text: 'ルール',
          items: [
            {
              text: '概要',
              link: '/ja/rules/',
            },
            {
              text: 'GritQL ルール',
              items: [
                {
                  text: 'enforce-pure-src',
                  link: '/ja/rules/enforce-pure-src',
                },
                {
                  text: 'prefer-union-over-enum',
                  link: '/ja/rules/prefer-union-over-enum',
                },
                {
                  text: 'no-null-type',
                  link: '/ja/rules/no-null-type',
                },
              ],
            },
          ],
        },
      ],
    },
  },
});
