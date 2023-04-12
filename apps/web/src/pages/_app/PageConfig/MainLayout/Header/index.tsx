import { memo, FC } from 'react';
import { RoutePath } from 'routes';
import {
  Header as LayoutHeader,
  Container,
} from '@mantine/core';
import { Link } from 'components';
import { LogoImage } from 'public/images';

import { accountApi } from 'resources/account';

import UserMenu from './components/UserMenu';
import ShadowLoginBanner from './components/ShadowLoginBanner';
import LoginButtons from './components/LoginButtons';
import Navbar from './components/Navbar';

const Header: FC = () => {
  const { data: account } = accountApi.useGet();

  return (
    <LayoutHeader height={72}>
      {account?.isShadow && <ShadowLoginBanner email={account.email} />}
      <Container
        sx={(theme) => ({
          minHeight: '72px',
          padding: '0 32px',
          display: 'flex',
          flex: '1 1 auto',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: theme.white,
          borderBottom: `1px solid ${theme.colors.gray[4]}`,
        })}
        fluid
      >
        <Link type="router" href={RoutePath.Gallery}>
          <LogoImage />
        </Link>
        {account && <Navbar />}
        {!account && (
          <LoginButtons />
        )}
        <UserMenu />
      </Container>
    </LayoutHeader>
  );
};

export default memo(Header);
