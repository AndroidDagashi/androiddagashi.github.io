import axios from 'axios';

export default ({ env }, inject) => {
  inject(
    'dagashiApi',
    axios.create({
      baseURL: `${env.baseUrl}/api`,
      timeout: 10000
    })
  );
};
