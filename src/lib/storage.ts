import { Influencer, Campaign, ApiResponse } from '@/types';
import { mockInfluencers, mockCampaigns } from './mock-data';

const STORAGE_KEYS = {
  INFLUENCERS: 'influencers',
  CAMPAIGNS: 'campaigns',
  FAVORITES: 'favorites'
} as const;

// Initialize storage with mock data if empty
const initializeStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.INFLUENCERS)) {
    localStorage.setItem(STORAGE_KEYS.INFLUENCERS, JSON.stringify(mockInfluencers));
  }
  if (!localStorage.getItem(STORAGE_KEYS.CAMPAIGNS)) {
    localStorage.setItem(STORAGE_KEYS.CAMPAIGNS, JSON.stringify(mockCampaigns));
  }
  if (!localStorage.getItem(STORAGE_KEYS.FAVORITES)) {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify([]));
  }
};

// Influencer operations
export const getInfluencers = (): ApiResponse<Influencer[]> => {
  try {
    initializeStorage();
    const data = JSON.parse(localStorage.getItem(STORAGE_KEYS.INFLUENCERS) || '[]');
    return { success: true, data };
  } catch (error) {
    return { success: false, data: null, message: 'Failed to load influencers' };
  }
};

export const getInfluencerById = (id: string): ApiResponse<Influencer> => {
  try {
    const response = getInfluencers();
    if (!response.success || !response.data) {
      return { success: false, data: null, message: 'Failed to load influencers' };
    }
    
    const influencer = response.data.find(inf => inf.id === id);
    if (!influencer) {
      return { success: false, data: null, message: 'Influencer not found' };
    }
    
    return { success: true, data: influencer };
  } catch (error) {
    return { success: false, data: null, message: 'Failed to find influencer' };
  }
};

// Campaign operations
export const getCampaigns = (): ApiResponse<Campaign[]> => {
  try {
    initializeStorage();
    const data = JSON.parse(localStorage.getItem(STORAGE_KEYS.CAMPAIGNS) || '[]');
    return { success: true, data };
  } catch (error) {
    return { success: false, data: null, message: 'Failed to load campaigns' };
  }
};

export const createCampaign = (campaign: Omit<Campaign, 'id' | 'createdAt'>): ApiResponse<Campaign> => {
  try {
    const response = getCampaigns();
    if (!response.success || !response.data) {
      return { success: false, data: null, message: 'Failed to load existing campaigns' };
    }
    
    const newCampaign: Campaign = {
      ...campaign,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    const updatedCampaigns = [...response.data, newCampaign];
    localStorage.setItem(STORAGE_KEYS.CAMPAIGNS, JSON.stringify(updatedCampaigns));
    
    return { success: true, data: newCampaign };
  } catch (error) {
    return { success: false, data: null, message: 'Failed to create campaign' };
  }
};

export const updateCampaign = (id: string, updates: Partial<Campaign>): ApiResponse<Campaign> => {
  try {
    const response = getCampaigns();
    if (!response.success || !response.data) {
      return { success: false, data: null, message: 'Failed to load campaigns' };
    }
    
    const campaignIndex = response.data.findIndex(c => c.id === id);
    if (campaignIndex === -1) {
      return { success: false, data: null, message: 'Campaign not found' };
    }
    
    const updatedCampaign = { ...response.data[campaignIndex], ...updates };
    const updatedCampaigns = [...response.data];
    updatedCampaigns[campaignIndex] = updatedCampaign;
    
    localStorage.setItem(STORAGE_KEYS.CAMPAIGNS, JSON.stringify(updatedCampaigns));
    
    return { success: true, data: updatedCampaign };
  } catch (error) {
    return { success: false, data: null, message: 'Failed to update campaign' };
  }
};

// Favorites operations
export const getFavorites = (): ApiResponse<string[]> => {
  try {
    initializeStorage();
    const data = JSON.parse(localStorage.getItem(STORAGE_KEYS.FAVORITES) || '[]');
    return { success: true, data };
  } catch (error) {
    return { success: false, data: null, message: 'Failed to load favorites' };
  }
};

export const toggleFavorite = (influencerId: string): ApiResponse<string[]> => {
  try {
    const response = getFavorites();
    if (!response.success || !response.data) {
      return { success: false, data: null, message: 'Failed to load favorites' };
    }
    
    const favorites = response.data;
    const index = favorites.indexOf(influencerId);
    
    if (index > -1) {
      favorites.splice(index, 1);
    } else {
      favorites.push(influencerId);
    }
    
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
    
    return { success: true, data: favorites };
  } catch (error) {
    return { success: false, data: null, message: 'Failed to update favorites' };
  }
};