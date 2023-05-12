import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '35295673-91cf9d0fe9d2711435022f311';

export async function getPictures(searchTerm, page, perPage) {
  try {
    const response = await axios.get(
      `?key=${API_KEY}&q=${searchTerm}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
