import { useMutation, useQuery } from 'react-query';

import { apiService } from 'services';

import queryClient from 'query-client';
import { Art } from './gallery.types';

interface GalleryResponse {
  pagesCount: number;
  results: Art[];
  count: number;
}

interface UpdateData {
  id: string;
  isPublic: boolean
}

export function useGallery(isPublic = true) {
  const subRoute = isPublic ? 'public' : 'user';
  const url = `/gallery/${subRoute}`;

  const galleryArt = () => apiService.get(url);

  return useQuery<GalleryResponse>(['gallery', subRoute], galleryArt);
}

export function useUploadArt() {
  const uploadArt = (data: FormData) => apiService.post('/gallery/art', data);

  return useMutation<Art, unknown, FormData>(uploadArt, {
    onSuccess: () => queryClient.invalidateQueries(['gallery', 'user']),
  });
}

export function useUpdateArt() {
  const updateArt = ({ id, isPublic }: UpdateData) => apiService.put(`/gallery/${id}`, { isPublic });

  return useMutation<Art, unknown, UpdateData>(updateArt, {
    onSuccess: () => {
      queryClient.invalidateQueries('gallery');
    },
  });
}

export function useDeleteArt() {
  const deleteArt = (id: string) => apiService.delete(`/gallery/${id}`);

  return useMutation(deleteArt, {
    onSuccess: () => {
      queryClient.invalidateQueries('gallery');
    },
  });
}
