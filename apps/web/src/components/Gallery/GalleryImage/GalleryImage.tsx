import { Image, Container, Button, Flex, Loader, Group, Badge } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { IconBucketOff } from '@tabler/icons-react';
import { useDeleteArt, useUpdateArt } from 'resources/gallery/gallery.api';
import { Art } from 'resources/gallery/gallery.types';
import { useStyles } from './styles';

type Props = {
  art: Art;
  isMyArtPage?: boolean;
};

const GalleryImage = ({ art, isMyArtPage }: Props) => {
  const { mutate: updateArt, isLoading } = useUpdateArt();
  const { mutate: deleteArt, isLoading: isDelLoading } = useDeleteArt();
  const { classes } = useStyles();
  const { ref, hovered } = useHover();
  const title = art.isPublic ? 'public' : 'private';

  const handleClick = () => {
    const isPublic = !art.isPublic;
    updateArt({ id: art._id, isPublic });
  };

  const handleDelete = () => {
    deleteArt(art._id);
  };

  return (
    <Container className={classes.container} ref={ref}>
      {isMyArtPage && hovered && (
        <Flex className={classes.flex} align="center" justify="space-between" gap={10}>
          <Badge size="lg">{title}</Badge>
          <Group>
            {(isLoading || isDelLoading) && <Loader size="sm" color="white" />}
            <Button size="sm" compact variant="white" onClick={handleClick}>Toggle</Button>
            <Button size="sm" compact variant="white" c="red" onClick={handleDelete}><IconBucketOff /></Button>
          </Group>
        </Flex>
      )}
      <Image
        withPlaceholder
        mx="auto"
        radius="md"
        fit="contain"
        src={art.path}
        alt="Art"
      />
    </Container>
  );
};

export default GalleryImage;
