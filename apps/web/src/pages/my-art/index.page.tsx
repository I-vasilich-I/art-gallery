import { NextPage } from 'next';
import { Gallery, UploadArt } from 'components';
import { useGallery } from 'resources/gallery/gallery.api';

const MyArtPage: NextPage = () => {
  const { data } = useGallery(false);

  return (
    <>
      <UploadArt />
      <Gallery arts={data?.results ?? []} />
    </>
  );
};

export default MyArtPage;
