import { FC } from 'react';
import { Footer as LayoutFooter } from '@mantine/core';

const Footer: FC = () => {
  const year = new Date().getFullYear();

  return (
    <LayoutFooter
      height="40px"
      sx={(theme) => ({
        marginTop: 'auto',
        padding: '12px 0',
        textAlign: 'center',
        flex: '0 1 auto',
        backgroundColor: theme.colors.gray[0],
        border: 'none',
        fontSize: '12px',
      })}
    >
      {`Oleg Vaskevich ${year} © All rights reserved. Powered by Ship`}
    </LayoutFooter>
  );
};

export default Footer;
