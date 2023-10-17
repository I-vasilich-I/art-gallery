import { FormEvent, useEffect, useState } from 'react';
import { createStyles, rem, Box, FileInput, Checkbox, Stack, CloseButton, Button, Flex } from '@mantine/core';
import { MIME_TYPES } from '@mantine/dropzone';
import { IconUpload } from '@tabler/icons-react';
import { useToggle } from '@mantine/hooks';
import { useUploadArt } from 'resources/gallery/gallery.api';

const useStyles = createStyles(() => ({
  wrapper: {
    position: 'relative',
    marginBottom: rem(30),
  },
}));

const acceptFiles = [MIME_TYPES.gif, MIME_TYPES.jpeg, MIME_TYPES.png, MIME_TYPES.webp].join(',');

const UploadArt = () => {
  const { mutate: uploadArt, isLoading, isSuccess } = useUploadArt();
  const { classes } = useStyles();
  const [art, setArt] = useState<File | null>(null);
  const [isPublic, togglePublic] = useToggle();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!art) {
      return;
    }

    const data = new FormData();
    data.append('file', art);
    data.append('isPublic', String(isPublic));

    uploadArt(data);
  };

  const resetFile = () => {
    setArt(null);
  };

  useEffect(() => {
    if (isSuccess) {
      setArt(null);
    }
  }, [isSuccess]);

  return (
    <Box maw={320} mx="auto">
      <form className={classes.wrapper} onSubmit={handleSubmit}>
        <Stack>
          <Flex>
            <FileInput w="100%" value={art} onChange={setArt} placeholder="Pick Art" accept={acceptFiles} icon={<IconUpload size={rem(14)} />} />
            {art && <CloseButton title="Clear" size="lg" iconSize={20} onClick={resetFile} />}
          </Flex>
          <Checkbox checked={isPublic} onChange={() => togglePublic()} size="sm" label="Set as public" />
          <Button size="md" disabled={!art} type="submit" loading={isLoading}>
            Upload
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default UploadArt;
