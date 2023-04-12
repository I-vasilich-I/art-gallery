import { Box } from '@mantine/core';
import { useRouter } from 'next/router';
import { Art } from 'resources/gallery/gallery.types';
import { useStyles } from './styles';
import GalleryImage from './GalleryImage/GalleryImage';

type Props = {
  arts: Art[];
};

const Gallery = ({ arts }: Props) => {
  const { classes } = useStyles();
  const { pathname } = useRouter();
  const isMyArtPage = pathname === '/my-art';

  return (
    <Box className={classes.container}>
      {arts.map((art) => <GalleryImage key={art._id} art={art} isMyArtPage={isMyArtPage} />)}
    </Box>
  );
};

export default Gallery;
