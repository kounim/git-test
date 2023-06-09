import { api, axios } from "boot/axios";

const userRouter = `/api/member`;

const token = {
  create: null,
  duplicateCheck: null,
};

const create = async (form) => {
  try {
    if (token.create != null) {
      token.create = token.create.cancel("create cancel");
    }
    token.create = axios.CancelToken.source();
    const result = await api.post(`${userRouter}`, form, {
      cancelToken: token.create.token,
    });
    return result;
  } catch (error) {
    console.error({ err: error });
    return false;
  }
};

const duplicateCheck = async (url) => {
  try {
    if (token.duplicateCheck != null) {
      token.duplicateCheck.cancel("duplicateCheck cancel");
    }
    token.duplicateCheck = axios.CancelToken.source();
    const result = await api.get(`${userRouter}${url}`, {
      cancelToken: token.duplicateCheck.token,
    });
    return result.data;
  } catch (error) {
    console.error({ err: error });
    return false;
  }
};

export default { create, duplicateCheck };
