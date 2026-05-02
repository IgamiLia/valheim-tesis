import { GraphQLClient } from "graphql-request";

const endpoint = "https://graphql.datocms.com/";

const token = import.meta.env.DATOCMS_API_KEY;

if (!token) {
  throw new Error("DATOCMS_API_KEY no está definido");
}

export const client = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer ${token}`,
  },
});

export async function queryDatoCMS(query: string, variables = {}) {
  return await client.request(query, variables);
}
