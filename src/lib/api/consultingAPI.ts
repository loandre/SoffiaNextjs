import { callApi } from './index';

export const createConsulting = async (consultingData: any, token: string) => { // Substitua 'any' pelo tipo apropriado para consultingData
  return callApi({
    url: '/service',
    method: 'post',
    data: consultingData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
