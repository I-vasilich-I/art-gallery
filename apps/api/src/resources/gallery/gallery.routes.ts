import { routeUtil } from 'utils';
import { deleteArt, getPublicArt, getUserArt, updateArt, uploadArt } from './actions';

const publicRoutes = routeUtil.getRoutes([
  getPublicArt,
]);

const privateRoutes = routeUtil.getRoutes([
  uploadArt,
  getUserArt,
  updateArt,
  deleteArt,
]);

const adminRoutes = routeUtil.getRoutes([
]);

export default {
  publicRoutes,
  privateRoutes,
  adminRoutes,
};