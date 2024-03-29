const PurgeSvelte = require('purgecss-from-svelte');

module.exports = {
  darkMode: 'class',
  mode: 'jit',
  purge: {
    content: [
      './src/**/*.svelte',
      './src/**/*.html',
      './public/index.html',
    ],
    // options: {
    //   extractors: [
    //     { extractor: PurgeSvelte.extract, extensions: ['svelte'] }
    //   ]
    // }
  },
  theme: {
    extend: {
      screens: {
        landscape: { raw: "(orientation: landscape)" },
        portrait: { raw: "(orientation: portrait)" },
      },
      colors: {
        neutral: {
          '100': '#f5f5f5',
          '200': '#eeeeee',
          '300': '#d2d2d2',
          '400': '#aaaaaa',
          '500': '#888888',
          '600': '#707070',
          '700': '#555555',
          '800': '#333333',
          '900': '#202020',
        },
        darken: {
          '100': 'rgba(255, 62, 0, 0.1)',
          '200': 'rgba(255, 62, 0, 0.2)',
          '300': 'rgba(255, 62, 0, 0.3)',
          '400': 'rgba(255, 62, 0, 0.4)',
          '500': 'rgba(255, 62, 0, 0.5)',
          '600': 'rgba(255, 62, 0, 0.6)',
          '700': 'rgba(255, 62, 0, 0.7)',
          '800': 'rgba(255, 62, 0, 0.8)',
          '900': 'rgba(255, 62, 0, 0.9)',
        },
        svelte: {
          DEFAULT: '#ff3e00',
          dark: '#d63600',
          light: '#ff5e29',
        },
      }
    }
  },
  variants: {},
}
