import * as glob from 'glob';
import * as path from 'path';

export default async (app: Express.Application) => {
  const filePaths = glob.sync(path.resolve(process.cwd(), 'routes/**/*.routes.ts'))
  for (const filePath of filePaths) {
    const router = (await import(filePath)).default
    router(app)
  }
}
