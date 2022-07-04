import { AxiosError } from 'axios';
import { UX } from '@salesforce/command';

export function logError(logger: UX, message: string, error: unknown): void {
  if (error instanceof AxiosError) {
    const data = error.response?.data ? JSON.stringify(error.response?.data) : '';
    logger.log(`${message}: ${data} code ${error.response?.status}`);
  } else {
    logger.log(`${message}: ${JSON.stringify(error)}`);
  }
}
