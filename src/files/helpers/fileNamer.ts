import { v4 as uuid } from 'uuid';

export const fileNamer = (
  req: any,
  file: Express.Multer.File,
  // eslint-disable-next-line @typescript-eslint/ban-types
  callback: Function,
) => {
  if (!file) return callback(new Error('File is empty'), false);
  const fileExptension = file.mimetype.split('/')[1];
  const fileName = `${uuid()}.${fileExptension}`;
  callback(null, fileName);
};
