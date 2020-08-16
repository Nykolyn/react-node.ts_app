const breakpoints = ['768px', '1200px', '1500px'];

export const colors = {
  transparentBg: 'rgba(255,255,255, 0.7)',
  white: '#fff',
  link: '#0000EE',
};

const fonts = {};

const space = [
  '0',
  '0.25rem',
  '0.5rem',
  '0.75rem',
  '1rem',
  '1.25rem',
  '1.5rem',
  '2rem',
  '2.5rem',
  '3rem',
  '4rem',
  '5rem',
];

const fontSizes = {
  xs: '.75rem',
  sm: '.875rem',
  base: '1rem',
  md: '1.125rem',
  lg: '1.25rem',
  xl: '1.5rem',
  xl2: '1.875rem',
  xl3: '2.25rem',
  xl4: '3rem',
  xl5: '4rem',
};

const shadows = {
  xs: '0 0 0 1px rgba(0, 0, 0, 0.05)',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  xxl: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  outline: '0 0 0 3px rgba(66, 153, 225, 0.5)',
};

const radii = {
  sm: '4px',
};

const theme = {
  breakpoints,
  fonts,
  radii,
  colors,
  ...colors,
  shadows,
  fontSizes,
  space,
};

export default theme;
