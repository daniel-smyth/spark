import { cache } from 'react';
import 'server-only';

export const preload = (id: string) => {
  void getUser(id);
};

export const getUser = cache(async (id: string) => {});
