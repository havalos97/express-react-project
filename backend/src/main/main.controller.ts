import type { Request, Response } from 'express';
import { HTTPStatusCode } from '../utils/http.status.codes';

export const healthcheck = (_: Request, res: Response) => {
  res.status(HTTPStatusCode.OK).json({ healthy: true });
}
