module.exports = {
  purge: [
    './src/**/*.svelte',
    './src/**/*.html',
    './public/**/*.html',
  ],
  theme: {
    extend: {
      screens: {
        light: { raw: "(prefers-color-scheme: light)" },
        dark: { raw: "(prefers-color-scheme: dark)" }
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
        svelte: '#ff3e00',
      }
    }
  },
  variants: {},
  plugins: [function({ addBase, config }) {
    addBase({
      body: {
        color: config("theme.colors.neutral.800"),
        backgroundColor: config("theme.colors.white")
      },
      "@screen dark": {
        body: {
          color: config("theme.colors.white"),
          backgroundColor: config("theme.colors.neutral.800")
        }
      }
    });
  }]
}
