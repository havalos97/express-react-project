import type { Request, Response } from 'express';

export const healthcheck = (_: Request, res: Response) => {
  res.status(200).json({ healthy: true });
}
