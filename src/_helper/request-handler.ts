import axios from 'axios';

import { singleTodoInfoType } from '@/_reducer';

export const requestUrls = {
  TODOS: '/todos',
};

export enum requestType {
  'GET' = 'get',
  'POST' = 'post',
  'PUT' = 'put',
  'DELETE' = 'delete',
}

const requestUrlPrefix = process.env.NODE_ENV === 'development' ? '/proxy' : '';

export interface TodoAppResponseType {
  todos?: singleTodoInfoType[];
}

export const requestHandler = async (
  url: string,
  type: requestType,
  requestPayload?: Object,
): Promise<{
  statusCode: number;
  error: Object;
  data: TodoAppResponseType | null;
}> => {
  try {
    const response = await axios[type](requestUrlPrefix + url, requestPayload);
    if (response && response.data) {
      return {
        statusCode: 200,
        error: null,
        data: response.data,
      };
    } else {
      return {
        statusCode: 500,
        error: '',
        data: null,
      };
    }
  } catch (error) {
    return {
      statusCode: error.status || 500,
      error,
      data: null,
    };
  }
};
