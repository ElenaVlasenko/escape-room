import { SerializedError } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

const DEFAULT_ERROR_MESSAGE = 'unknown error';

export const getMessage = (err?: unknown): string => err instanceof Error ? err.message : DEFAULT_ERROR_MESSAGE;

export const NOT_FOUND_STATUS = 404;
export const CONFLICT_STATUS = 409;

export function isNotFoundError(err: SerializedError): boolean {
  return err.message?.includes(NOT_FOUND_STATUS.toString()) ?? false;
}

export function isAxiosNotFoundError(err: unknown): boolean {
  return err instanceof AxiosError && err.response?.status === NOT_FOUND_STATUS;
}
