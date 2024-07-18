export const cacheAction = (type: string, payload: any) => {
  return {
    type: type,
    payload: payload,
  };
};

export const CODE_VALUE = 'CODE_VALUE';
export const TAX_CATEGORY = 'TAX_CATEGORY';