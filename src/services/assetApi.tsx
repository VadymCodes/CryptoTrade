const endpoint = "https://data.messari.io/api/v1";

export const getAssets = (limit: number = 10) => {
  return fetch(`${endpoint}/assets?limit=${limit}`)
};
