import { Influencer, Campaign } from '@/types';

export const mockInfluencers: Influencer[] = [
  {
    id: '1',
    name: 'Emma Rodriguez',
    username: '@emmalifestyle',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    bio: 'Lifestyle & wellness content creator sharing authentic moments and sustainable living tips.',
    niche: 'Lifestyle',
    platform: 'instagram',
    followers: 125000,
    engagementRate: 4.2,
    avgViews: 15000,
    location: 'Los Angeles, CA',
    age: 28,
    gender: 'female',
    languages: ['English', 'Spanish'],
    rates: { post: 1200, story: 400, reel: 800 },
    pastBrands: ['Nike', 'Sephora', 'Whole Foods'],
    verified: true,
    rating: 4.8,
    responseTime: '2-4 hours',
    contentStyle: ['Minimalist', 'Authentic', 'Educational']
  },
  {
    id: '2',
    name: 'Marcus Chen',
    username: '@techmarco',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    bio: 'Tech reviewer and gadget enthusiast. Unboxing the latest innovations in consumer technology.',
    niche: 'Technology',
    platform: 'youtube',
    followers: 89000,
    engagementRate: 6.1,
    avgViews: 25000,
    location: 'San Francisco, CA',
    age: 32,
    gender: 'male',
    languages: ['English', 'Mandarin'],
    rates: { post: 1500, story: 500, reel: 1000 },
    pastBrands: ['Apple', 'Samsung', 'Sony'],
    verified: true,
    rating: 4.9,
    responseTime: '1-2 hours',
    contentStyle: ['Detailed', 'Professional', 'Informative']
  },
  {
    id: '3',
    name: 'Sophia Williams',
    username: '@sophiafits',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    bio: 'Certified fitness trainer helping women build strength and confidence through movement.',
    niche: 'Fitness',
    platform: 'instagram',
    followers: 156000,
    engagementRate: 5.3,
    avgViews: 18000,
    location: 'Miami, FL',
    age: 26,
    gender: 'female',
    languages: ['English'],
    rates: { post: 1400, story: 450, reel: 900 },
    pastBrands: ['Lululemon', 'Protein World', 'Fitbit'],
    verified: true,
    rating: 4.7,
    responseTime: '3-6 hours',
    contentStyle: ['Motivational', 'Educational', 'High-energy']
  },
  {
    id: '4',
    name: 'David Kim',
    username: '@foodiedave',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    bio: 'Food enthusiast exploring culinary adventures from street food to fine dining.',
    niche: 'Food',
    platform: 'tiktok',
    followers: 203000,
    engagementRate: 7.8,
    avgViews: 45000,
    location: 'New York, NY',
    age: 29,
    gender: 'male',
    languages: ['English', 'Korean'],
    rates: { post: 1800, story: 600, reel: 1200 },
    pastBrands: ['HelloFresh', 'Blue Apron', 'Uber Eats'],
    verified: true,
    rating: 4.6,
    responseTime: '4-8 hours',
    contentStyle: ['Fun', 'Trendy', 'Appetizing']
  },
  {
    id: '5',
    name: 'Isabella Martinez',
    username: '@bellabeauty',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    bio: 'Beauty guru sharing makeup tutorials, skincare routines, and self-care tips.',
    niche: 'Beauty',
    platform: 'instagram',
    followers: 178000,
    engagementRate: 4.9,
    avgViews: 22000,
    location: 'Austin, TX',
    age: 24,
    gender: 'female',
    languages: ['English', 'Spanish'],
    rates: { post: 1600, story: 550, reel: 1100 },
    pastBrands: ['Fenty Beauty', 'Glossier', 'The Ordinary'],
    verified: true,
    rating: 4.8,
    responseTime: '2-4 hours',
    contentStyle: ['Glamorous', 'Tutorial', 'Inclusive']
  },
  {
    id: '6',
    name: 'Alex Thompson',
    username: '@alexadventures',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    bio: 'Adventure seeker documenting travels and outdoor experiences around the globe.',
    niche: 'Travel',
    platform: 'youtube',
    followers: 94000,
    engagementRate: 5.7,
    avgViews: 28000,
    location: 'Denver, CO',
    age: 31,
    gender: 'male',
    languages: ['English', 'French'],
    rates: { post: 1300, story: 450, reel: 850 },
    pastBrands: ['GoPro', 'Patagonia', 'Airbnb'],
    verified: false,
    rating: 4.5,
    responseTime: '6-12 hours',
    contentStyle: ['Adventurous', 'Cinematic', 'Inspiring']
  }
];

export const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Summer Wellness Collection',
    description: 'Promote our new line of organic wellness products for the summer season.',
    brand: 'Pure Wellness Co.',
    budget: 25000,
    startDate: '2024-06-01',
    endDate: '2024-07-31',
    status: 'active',
    targetAudience: {
      ageRange: '25-40',
      gender: 'female',
      location: 'United States',
      interests: ['wellness', 'organic products', 'healthy living']
    },
    requirements: {
      minFollowers: 50000,
      minEngagement: 3.0,
      niches: ['Lifestyle', 'Fitness', 'Beauty'],
      platforms: ['instagram', 'tiktok']
    },
    selectedInfluencers: ['1', '3', '5'],
    deliverables: {
      posts: 3,
      stories: 5,
      reels: 2
    },
    performance: {
      reach: 450000,
      impressions: 1200000,
      engagement: 58000,
      clicks: 12500,
      conversions: 890
    },
    createdAt: '2024-05-15'
  },
  {
    id: '2',
    name: 'Tech Innovation Showcase',
    description: 'Launch campaign for our latest smart home devices targeting tech enthusiasts.',
    brand: 'SmartHome Tech',
    budget: 40000,
    startDate: '2024-07-15',
    endDate: '2024-09-15',
    status: 'active',
    targetAudience: {
      ageRange: '28-45',
      gender: 'all',
      location: 'North America',
      interests: ['technology', 'smart home', 'gadgets']
    },
    requirements: {
      minFollowers: 75000,
      minEngagement: 4.0,
      niches: ['Technology'],
      platforms: ['youtube', 'instagram']
    },
    selectedInfluencers: ['2'],
    deliverables: {
      posts: 4,
      stories: 8,
      reels: 3
    },
    performance: {
      reach: 320000,
      impressions: 890000,
      engagement: 42000,
      clicks: 8900,
      conversions: 650
    },
    createdAt: '2024-06-20'
  },
  {
    id: '3',
    name: 'Foodie Festival Promotion',
    description: 'Generate buzz for our annual food festival with engaging content.',
    brand: 'City Food Festival',
    budget: 15000,
    startDate: '2024-08-01',
    endDate: '2024-08-31',
    status: 'draft',
    targetAudience: {
      ageRange: '22-35',
      gender: 'all',
      location: 'New York Metro',
      interests: ['food', 'dining', 'events']
    },
    requirements: {
      minFollowers: 100000,
      minEngagement: 5.0,
      niches: ['Food'],
      platforms: ['tiktok', 'instagram']
    },
    selectedInfluencers: ['4'],
    deliverables: {
      posts: 2,
      stories: 6,
      reels: 4
    },
    performance: {
      reach: 0,
      impressions: 0,
      engagement: 0,
      clicks: 0,
      conversions: 0
    },
    createdAt: '2024-07-10'
  }
];