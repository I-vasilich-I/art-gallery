import { NextPage } from 'next';
import { useGallery } from 'resources/gallery/gallery.api';
import { Gallery } from 'components';

const GalleryPage: NextPage = () => {
  const { data } = useGallery();

  return <Gallery arts={data?.results ?? []} />;
};

export default GalleryPage;
