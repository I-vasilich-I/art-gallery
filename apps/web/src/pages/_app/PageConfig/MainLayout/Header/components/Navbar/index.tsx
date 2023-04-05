import { Group } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useStyles } from './styles';

const links = [
  {
    link: '/gallery',
    label: 'Gallery',
  },
  {
    link: '/my-art',
    label: 'My Art',
  },
];

const Navbar = () => {
  const { pathname } = useRouter();
  const { classes, cx } = useStyles();

  const items = links.map((link) => (
    <Link
      key={link.label}
      href={link.link}
      className={cx(classes.link, { [classes.linkActive]: pathname === link.link })}
    >
      {link.label}
    </Link>
  ));

  return (
    <Group spacing={15}>
      {items}
    </Group>
  );
};

export default Navbar;
