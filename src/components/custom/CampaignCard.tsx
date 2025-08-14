import { Campaign } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Calendar, DollarSign, Users, TrendingUp, Eye, MousePointer, ShoppingCart } from 'lucide-react';

interface CampaignCardProps {
  campaign: Campaign;
  onEdit?: (campaign: Campaign) => void;
  onView?: (campaign: Campaign) => void;
}

export const CampaignCard = ({ campaign, onEdit, onView }: CampaignCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const calculateProgress = () => {
    const start = new Date(campaign.startDate);
    const end = new Date(campaign.endDate);
    const now = new Date();
    
    if (now < start) return 0;
    if (now > end) return 100;
    
    const total = end.getTime() - start.getTime();
    const elapsed = now.getTime() - start.getTime();
    return Math.round((elapsed / total) * 100);
  };

  const progress = calculateProgress();
  const engagementRate = campaign.performance.impressions > 0 
    ? ((campaign.performance.engagement / campaign.performance.impressions) * 100).toFixed(2)
    : '0.00';
  const conversionRate = campaign.performance.clicks > 0
    ? ((campaign.performance.conversions / campaign.performance.clicks) * 100).toFixed(2)
    : '0.00';

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-gray-900 mb-1">
              {campaign.name}
            </CardTitle>
            <p className="text-sm text-gray-600 font-medium">{campaign.brand}</p>
          </div>
          <Badge className={`${getStatusColor(campaign.status)} capitalize border-0`}>
            {campaign.status}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600 line-clamp-2">{campaign.description}</p>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <DollarSign className="h-4 w-4 text-green-500" />
            <span className="text-sm font-medium">{formatCurrency(campaign.budget)}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-blue-500" />
            <span className="text-sm font-medium">{campaign.selectedInfluencers.length} influencers</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Campaign Progress</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-1">
            <Calendar className="h-3 w-3 text-gray-400" />
            <span className="text-gray-600">
              {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
            </span>
          </div>
        </div>

        {campaign.status !== 'draft' && (
          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-100">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <Eye className="h-3 w-3 text-gray-400" />
                  <span className="text-xs text-gray-500">Reach</span>
                </div>
                <span className="text-xs font-medium">{formatNumber(campaign.performance.reach)}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <TrendingUp className="h-3 w-3 text-gray-400" />
                  <span className="text-xs text-gray-500">Engagement</span>
                </div>
                <span className="text-xs font-medium">{engagementRate}%</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <MousePointer className="h-3 w-3 text-gray-400" />
                  <span className="text-xs text-gray-500">Clicks</span>
                </div>
                <span className="text-xs font-medium">{formatNumber(campaign.performance.clicks)}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <ShoppingCart className="h-3 w-3 text-gray-400" />
                  <span className="text-xs text-gray-500">Conversions</span>
                </div>
                <span className="text-xs font-medium">{conversionRate}%</span>
              </div>
            </div>
          </div>
        )}

        <div className="flex space-x-2 pt-2">
          {onView && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onView(campaign)}
              className="flex-1"
            >
              View Details
            </Button>
          )}
          {onEdit && (
            <Button 
              size="sm" 
              onClick={() => onEdit(campaign)}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0"
            >
              {campaign.status === 'draft' ? 'Edit' : 'Manage'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};