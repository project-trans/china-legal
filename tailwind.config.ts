import colors from 'tailwindcss/colors'
import typography from '@tailwindcss/typography'

export default {
  plugins: [
    typography(),
    require("daisyui"),
  ],
  daisyui: {
    themes: ['light', 'dark']
  },
  darkMode: ['class', '[data-theme="dark"]'],
  // theme: {
  //   extend: {
  //     colors: {
  //       primary: colors.emerald
  //     }
  //   }
  // }
}
