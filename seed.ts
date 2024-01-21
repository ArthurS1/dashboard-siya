import Typesense from 'typesense';
import { CollectionCreateSchema } from 'typesense/lib/Typesense/Collections';
import {
  useMobileApi
} from './src/common/MobileApi';
import
Environment
  from './src/common/Environment';
import User from './src/interfaces/User';

console.warn(`For the love of god all mighty, remove the js files after
              compiling. I wont fix the compilation because it's the end
              of this project.`);

console.log('Connecting to the mobile API');

const mobileApi = useMobileApi(new Environment());
mobileApi
  .getAllUsers()
  .then((res) => seed(res.data));


function buildTypesenseClient() {
  console.log('Connecting to typesense server');
  return new Typesense.Client({
    nodes: [{
      host: 'typesense.siya-eip.com',
      port: 443,
      protocol: 'https',
    }],
    apiKey: 'xyz',
    connectionTimeoutSeconds: 2,
  });
}

function seed(users: User[]) {
  const client = buildTypesenseClient();
  const userSchema: CollectionCreateSchema = {
    name: 'users',
    fields: [
      { name: '_id', type: 'string' },
      { name: 'username', type: 'string' },
      { name: 'email', type: 'string' },
      { name: 'phoneNumber', type: 'string' },
    ],
  };

  client
    .collections('users')
    .delete();
  client
    .collections()
    .create(userSchema)
    .then(function(data) {
      console.log(data);
    });
  client
    .collections('users')
    .documents()
    .import(users);
  client
    .collections('users')
    .documents()
    .search({ q: '*', query_by: 'username' }) //eslint-disable-line
    .then(res => {
      console.log(res);
      console.log('Seed ended');
    });
}
