import { error, info } from '@cpp/ui.priming';
import { createReadStream, createWriteStream, ReadStream, unlink } from 'fs';
import { join } from 'path';
import * as archiver from 'archiver';

export const getFixture = (filename: string): ReadStream => {
  return createReadStream(join(__dirname, '../fixtures', filename));
};

export const randomIntFromRange = (min, max): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const zipDocFile = (fileName): Promise<ReadStream> => {
  const baseFilePath = join(__dirname, '../fixtures/data', fileName);

  return new Promise<ReadStream>(async (resolve, reject) => {
    const zipFile = baseFilePath + '.zipFile';
    const pdfPath = baseFilePath + '.pdf';
    const output = createWriteStream(zipFile);

    const archive = archiver('zip', {
      forceZip64: true
    });

    archive.on('error', reject);
    archive.on('finish', async () => {
      await deleteFile(pdfPath);
      resolve(createReadStream(zipFile));
    });

    archive.pipe(output);

    const source = join(__dirname, '../fixtures/docs', 'sjp_session_URN_SJPN.PDF');
    const fileStream = await copyFileAndGetStream(source, pdfPath);
    archive.append(fileStream, { name: fileName + '.pdf' });
    archive.finalize();
  });
};

export const copyFileAndGetStream = (source, destination): Promise<ReadStream> => {
  return new Promise<ReadStream>((resolve, reject) => {
    const readStream = createReadStream(source);
    const writeStream = createWriteStream(destination);

    readStream.on('error', reject);
    writeStream.on('error', reject);

    writeStream.on('finish', () => {
      readStream.destroy();
      writeStream.end();
      writeStream.destroy();
      resolve(createReadStream(destination));
    });

    readStream.pipe(writeStream);
  });
};

export const deleteFile = (filePath): Promise<boolean> => {
  return new Promise<boolean>((resolve, reject) => {
    try {
      unlink(filePath, err => {
        if (err) {
          reject(err);
        }
        resolve(true);
      });
    } catch (e) {
      reject(e);
    }
  });
};

export const build = <T>(name: string, fn: (...args: any[]) => Promise<T & { urn: string }>) => {
  return async (...args: any[]): Promise<T & { urn: string }> => {
    info(`'${name}' building...`);

    try {
      const result = await fn(...args);

      info(`'${name}' completed with URN of '${result.urn}'.`);

      return result;
    } catch (err) {
      error(`'${name}' failed to build: ${JSON.stringify(err)}`);

      throw err;
    }
  };
};

export const stringFormat = (stringToFormat: string, ...values: any) =>
  stringToFormat.replace(/{(\d+)}/g, (match, index) => (values[index] ? values[index] : match));
