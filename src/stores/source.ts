import { BoundStateCreator } from '@/hooks/useBoundStore';

export type SourceSlice = {
  sid: number;
  url: string;
  iconurl?: string;
  name: string;
  unreadCount: number;
  lastFetched: Date;
  serviceRef?: string;
  fetchFrequency: number; // in minutes
  hidden: boolean;
};

export const createAppSlice: BoundStateCreator<SourceSlice> = (set) => ({
  sid: 0,
  url: '',
  name: '',
  unreadCount: 0,
  lastFetched: new Date(),
  fetchFrequency: 0,
  hidden: false,
});
