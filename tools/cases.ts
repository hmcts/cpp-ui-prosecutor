import { argv } from 'yargs';
import { defaults } from '@cpp/ui.priming';
import { defaultUrl } from './config';
import * as factory from './factory';

const noop = () => {};

const cases = {
  'tfl-case': factory.createBasicTflCase,
  'tvl-case': factory.createBasicTvlCase,
  'tvl-case-mo': factory.createTvlCaseWithMultipleOffences,
  'tvl-case-with-doc': factory.createTvlCaseWithDoc,
  'tfl-case-with-doc': factory.createTflCaseWithDoc
};

const { _, apiUrl = defaultUrl } = argv;

defaults({
  baseUrl: apiUrl,
  proxy: false
});

let cmd = factory.createBasicTflCase;

if (_[0] && cases[_[0]]) {
  cmd = cases[_[0]];
}

cmd().catch(noop);
