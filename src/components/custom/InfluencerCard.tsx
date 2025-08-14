import { Influencer } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Heart, MapPin, Users, TrendingUp, Star, Clock, CheckCircle } from 'lucide-react';

interface InfluencerCardProps {
  influencer: Influencer;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
  onSelect?: (influencer: Influencer) => void;
  showSelectButton?: boolean;
}

export const InfluencerCard = ({ 
  influencer, 
  isFavorite = false, 
  onToggleFavorite, 
  onSelect,
  showSelectButton = false 
}: InfluencerCardProps) => {
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'instagram': return 'bg-gradient-to-r from-purple-500 to-pink-500';
      case 'tiktok': return 'bg-gradient-to-r from-black to-red-500';
      case 'youtube': return 'bg-gradient-to-r from-red-500 to-red-600';
      case 'twitter': return 'bg-gradient-to-r from-blue-400 to-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12 ring-2 ring-white shadow-md">
              <AvatarImage src={influencer.avatar} alt={influencer.name} />
              <AvatarFallback>{influencer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-gray-900">{influencer.name}</h3>
                {influencer.verified && (
                  <CheckCircle className="h-4 w-4 text-blue-500" />
                )}
              </div>
              <p className="text-sm text-gray-600">{influencer.username}</p>
            </div>
          </div>
          
          {onToggleFavorite && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onToggleFavorite(influencer.id)}
              className="p-2 hover:bg-red-50"
            >
              <Heart 
                className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
              />
            </Button>
          )}
        </div>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{influencer.bio}</p>

        <div className="flex items-center justify-between mb-4">
          <Badge 
            className={`${getPlatformColor(influencer.platform)} text-white border-0 capitalize`}
          >
            {influencer.platform}
          </Badge>
          <Badge variant="secondary" className="bg-blue-50 text-blue-700">
            {influencer.niche}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium">{formatNumber(influencer.followers)}</span>
          </div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <span className="text-sm font-medium">{influencer.engagementRate}%</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600 truncate">{influencer.location}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Star className="h-4 w-4 text-yellow-500" />
            <span className="text-sm font-medium">{influencer.rating}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1">
            <Clock className="h-3 w-3 text-gray-400" />
            <span className="text-xs text-gray-500">{influencer.responseTime}</span>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-900">${influencer.rates.post}</p>
            <p className="text-xs text-gray-500">per post</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {influencer.contentStyle.slice(0, 3).map((style, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {style}
            </Badge>
          ))}
        </div>

        {showSelectButton && onSelect && (
          <Button 
            onClick={() => onSelect(influencer)}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0"
          >
            Select Influencer
          </Button>
        )}
      </CardContent>
    </Card>
  );
};