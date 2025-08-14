export interface Influencer {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  niche: string;
  platform: 'instagram' | 'tiktok' | 'youtube' | 'twitter';
  followers: number;
  engagementRate: number;
  avgViews: number;
  location: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  languages: string[];
  rates: {
    post: number;
    story: number;
    reel: number;
  };
  pastBrands: string[];
  verified: boolean;
  rating: number;
  responseTime: string;
  contentStyle: string[];
}

export interface Campaign {
  id: string;
  name: string;
  description: string;
  brand: string;
  budget: number;
  startDate: string;
  endDate: string;
  status: 'draft' | 'active' | 'completed' | 'paused';
  targetAudience: {
    ageRange: string;
    gender: string;
    location: string;
    interests: string[];
  };
  requirements: {
    minFollowers: number;
    minEngagement: number;
    niches: string[];
    platforms: string[];
  };
  selectedInfluencers: string[];
  deliverables: {
    posts: number;
    stories: number;
    reels: number;
  };
  performance: {
    reach: number;
    impressions: number;
    engagement: number;
    clicks: number;
    conversions: number;
  };
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  message?: string;
}

export interface FilterOptions {
  niche: string;
  platform: string;
  minFollowers: number;
  maxFollowers: number;
  minEngagement: number;
  maxEngagement: number;
  location: string;
  gender: string;
  verified: boolean | null;
  minRating: number;
}

export interface CampaignFilters {
  status: string;
  dateRange: string;
  budget: string;
}