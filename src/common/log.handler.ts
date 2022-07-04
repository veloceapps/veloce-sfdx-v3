import { AxiosError } from 'axios';

export function logError(message: string, error: unknown): void {
  if (error instanceof AxiosError) {
    const data = error.response?.data ? JSON.stringify(error.response?.data) : '';
    console.log(`${message}: ${data} code ${error.response?.status}`);
  } else {
    console.log(`${message}: ${JSON.stringify(error)}`);
  }
}
