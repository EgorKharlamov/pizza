import axios from 'axios';

axios.defaults.withCredentials = true;
const requester = async (method: string, body?:any) => {
  const url = process.env.NODE_ENV === 'development' ? 'http://localhost:2310/' : 'http://localhost/api/';

  const response = await axios({ url, method: 'put', data: body });
  console.log(response.data);
  return response.data;
};
export default requester;
