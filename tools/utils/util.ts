import { error, info } from '@cpp/ui.priming';
import { compose } from 'ramda';

export const randomIntFromRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
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
