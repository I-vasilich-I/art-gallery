import { createStyles } from '@mantine/core';

export const useStyles = createStyles(() => ({
  container: {
    columns: 3,
    columnGap: '1rem',
    maxWidth: '1980px',
    margin: 'auto',

    '@media (max-width: 62rem)': {
      columns: 2,
    },

    '@media (max-width: 48em)': {
      columns: 1,
    },
  },
  img: {
    margin: '0 1rem 1rem 0',
    padding: 0,
    boxShadow: '1px 0px 15px #339af040',
    borderRadius: '10px',
  },
}));
