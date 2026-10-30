import { defineHandler } from 'void';

export type Props = Readonly<{
  revision: string;
}>;

export const loader = defineHandler<Props>((c) => ({
  revision: c.req.method === 'POST' ? 'updated' : 'initial',
}));

export const actions = {
  ping: defineHandler(async () => {}),
};
