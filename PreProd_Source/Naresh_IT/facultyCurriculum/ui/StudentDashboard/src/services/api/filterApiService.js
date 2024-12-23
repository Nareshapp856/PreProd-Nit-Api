export function FilterApiResponseServiceDataVersion(response) {
  return { data: response.data.data, status: response.status };
}
