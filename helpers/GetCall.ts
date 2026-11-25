interface Params {
  url: string;
}

export const GetCall = async ({ url }: Params) => {
  const response = await fetch(`/api${url}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
  });

  const result = await response.json();
  return result;
}