module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: theme => ({
        'maria': "url('/img/maria.jpg')",
       })
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
