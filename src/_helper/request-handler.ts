import axios, { AxiosError } from 'axios';

import { singleTodoInfoType, singleUserInfoType } from '@/_reducer';

export const requestUrls = {
  TODOS: '/todos',
  USERS: '/users',
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
  users?: singleUserInfoType[];
  documentDeleted?: boolean;
  documentUpdated?: boolean;
}

export const requestHandler = async (
  url: string,
  type: requestType,
  requestPayload?: any,
): Promise<{
  statusCode: number;
  error: {
    message: string;
    details?: any;
  };
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
        error: {
          message: 'Something went wrong',
        },
        data: null,
      };
    }
  } catch (error) {
    return {
      statusCode: error.status || 500,
      error: {
        message: error.message || 'Something went wrong',
        details: error,
      },
      data: null,
    };
  }
};
