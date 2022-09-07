export const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  // eslint-disable-next-line @typescript-eslint/ban-types
  callback: Function,
) => {
  if (!file) return callback(new Error('File is empty'), false);
  const fileExptension = file.mimetype.split('/')[1];
  const validExtension = ['jpg', 'jpeg', 'png', 'gif'];
  if (validExtension.includes(fileExptension)) {
    return callback(null, true);
  }
  callback(null, false);
};
