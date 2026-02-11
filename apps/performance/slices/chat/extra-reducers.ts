import type { AppThunk } from "@store";
import { slice } from "./reducer";

const getContacts =
  (): AppThunk =>
  async (dispatch): Promise<void> => {
    const response = [
      {
        id: "string",
        avatar: "string",
        isActive: false,
        lastActivity: 12,
        name: "string",
      },
    ];

    await new Promise<void>((res, rej) => {
      res();
      if (response.length > 1) rej();
    });

    dispatch(slice.actions.getContacts(response));
  };

export const thunks = {
  getContacts,
};
