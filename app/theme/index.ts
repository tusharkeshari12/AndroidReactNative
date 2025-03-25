export const theme = {
  colors: {
    background: '#2d2d2d',
    surface: '#383838',
    border: '#444',
    text: {
      primary: '#fff',
      secondary: '#ccc',
      accent: '#2089dc',
    },
  },
  header: {
    style: {
      backgroundColor: '#2d2d2d',
    },
    tintColor: '#fff',
    titleStyle: {
      fontWeight: 'bold',
    },
  },
} as const;

// Type for the theme
export type Theme = typeof theme;
