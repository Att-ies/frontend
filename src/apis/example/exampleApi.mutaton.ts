import { useMutation } from '@tanstack/react-query';

import { MutationHookParams } from '@apis/type';

import exampleApi from './exampleApi';
import {
  ExampleDTOType,
  ExampleParamPatchType,
  ExampleParamPutType,
} from './exampleApi.type';

export const EXAMPLE_API_MUTATION_KEY = {
  POST: (param: ExampleDTOType) => ['example-update', param],
  PUT: (req: ExampleParamPutType) => ['example-put', req],
  PATCH: (req: ExampleParamPatchType) => ['example-patch', req],
  DELETE: (id: string) => ['example-delete', id],
};

export const usePostExampleMutation = (
  params?: MutationHookParams<typeof exampleApi.postExample>,
) => {
  return useMutation(exampleApi.postExample, {
    ...params?.options,
  });
};

export const usePutExampleMutation = (
  params?: MutationHookParams<typeof exampleApi.putExample>,
) => {
  return useMutation(exampleApi.putExample, {
    ...params?.options,
  });
};
export const usePatchExampleMutation = (
  params?: MutationHookParams<typeof exampleApi.patchExample>,
) => {
  return useMutation(exampleApi.patchExample, {
    ...params?.options,
  });
};
export const useDeleteExampleMutation = (
  params?: MutationHookParams<typeof exampleApi.deleteExample>,
) => {
  return useMutation(exampleApi.deleteExample, {
    ...params?.options,
  });
};
