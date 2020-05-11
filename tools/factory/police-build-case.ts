import { PoliceCaseDataBuilder } from '../../tools/helpers/police-case-data-builder';

export const createPoliceCase = async (builder: PoliceCaseDataBuilder) => {
  const result = await builder.build('create police case');
  return result;
};
