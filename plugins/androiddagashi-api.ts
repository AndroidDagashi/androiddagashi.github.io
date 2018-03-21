import axios from 'axios';

export default ({ env }, inject) => {
  inject(
    'dagashiApi',
    axios.create({
      baseURL: `${env.baseURL}/api`,
      timeout: 10000
    })
  );
};
