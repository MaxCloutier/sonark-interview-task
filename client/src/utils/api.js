export const getCostumers = async () => {
  const response = await fetch("/customers");
  const body = await response.json();

  if (response.status !== 200) {
    throw Error(body.message);
  }

  return body;
};
