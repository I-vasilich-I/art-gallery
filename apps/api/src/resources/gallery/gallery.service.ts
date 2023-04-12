import db from 'db';
import { DATABASE_DOCUMENTS } from 'app.constants';

import schema from './gallery.schema';
import { Gallery } from './gallery.types';

const service = db.createService<Gallery>(DATABASE_DOCUMENTS.GALLERY, {
  schemaValidator: (obj) => schema.parseAsync(obj),
});

export default Object.assign(service, {});

