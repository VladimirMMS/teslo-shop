import { Injectable, NotFoundException } from '@nestjs/common';
import { existsSync } from 'fs';
import { join } from 'path';

@Injectable()
export class FilesService {
  GetStaticProductImage(image: string) {
    const path = join(__dirname, '../../static/products', image);
    console.log(path);
    if (!existsSync(path))
      throw new NotFoundException(`No product found with image ${image}`);
    return path;
  }
}
