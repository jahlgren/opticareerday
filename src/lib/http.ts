export async function httpGet(url: string) {
  return fetch(url);
}

export async function httpPost(url: string, data: any) {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
}
