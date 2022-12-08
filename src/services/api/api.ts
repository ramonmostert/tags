import { Tag } from '../../types/Tag';

const endpoint = process.env.REACT_APP_API_URL as string;

const api = {
  list: async (): Promise<Tag[] | undefined> => {
    const response = await fetch(`${endpoint}/tags`);
    const data = await response.json();
    return data;
  }
};

export default api;
