export const getShopCarouselMetafieldQuery = /* GraphQL */ `
  query getShopCarouselMetafield($namespace: String!, $key: String!) {
    shop {
      metafield(namespace: $namespace, key: $key) {
        id
        namespace
        key
        value
        type
      }
    }
  }
`;

export const getMediaNodesQuery = /* GraphQL */ `
  query getMediaNodes($ids: [ID!]!) {
    nodes(ids: $ids) {
      ... on MediaImage {
        id
        alt
        image {
          url
          altText
          width
          height
        }
      }
    }
  }
`;
