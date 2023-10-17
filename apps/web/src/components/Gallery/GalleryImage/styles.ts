import { createStyles } from '@mantine/core';

export const useStyles = createStyles(() => ({
  container: {
    marginBottom: '1rem',
    padding: 0,
    boxShadow: '1px 0px 15px #339af040',
    borderRadius: '10px',
    position: 'relative',
  },
  flex: {
    position: 'absolute',
    height: 40,
    background: 'rgba(0, 138, 252, .8)',
    padding: '0 20px',
    zIndex: 3,
    width: '100%',
    borderRadius: '10px 10px 0 0',
  },
  button: {

  },
}));
