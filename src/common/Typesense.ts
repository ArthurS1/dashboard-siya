import TypesenseInstantSearchAdapter from 'typesense-instantsearch-adapter';

import Configuration from '../interfaces/Configuration';

function buildSearchClient(conf: Configuration) {
  const typesensAdapter = new TypesenseInstantSearchAdapter({
    server: {
      nodes: [
        {
          host: 'typesense.siya-eip.com',
          port: 443,
          protocol: 'https',
        }
      ],
      apiKey: 'xyz', // TODO : replace with env variable
    },
    additionalSearchParameters: {
      query_by: 'username,email,_id,phoneNumber', // eslint-disable-line
    }
  });
  return typesensAdapter.searchClient;
}

export { buildSearchClient };
