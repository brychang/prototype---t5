import { useState, useEffect } from 'react';
import { Campaign, Influencer, CampaignFilters } from '@/types';
import { getCampaigns, createCampaign, updateCampaign, getInfluencers } from '@/lib/storage';
import { CampaignCard } from '@/components/custom/CampaignCard';
import { InfluencerDiscovery } from './InfluencerDiscovery';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Calendar, DollarSign, Users, TrendingUp, Target, BarChart3 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const CampaignManagement = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showInfluencerSelection, setShowInfluencerSelection] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const { toast } = useToast();

  const [filters, setFilters] = useState<CampaignFilters>({
    status: 'all',
    dateRange: 'all',
    budget: 'all'
  });

  const [newCampaign, setNewCampaign] = useState({
    name: '',
    description: '',
    brand: '',
    budget: 0,
    startDate: '',
    endDate: '',
    targetAudience: {
      ageRange: '',
      gender: '',
      location: '',
      interests: [] as string[]
    },
    requirements: {
      minFollowers: 50000,
      minEngagement: 3.0,
      niches: [] as string[],
      platforms: [] as string[]
    },
    deliverables: {
      posts: 1,
      stories: 2,
      reels: 1
    }
  });

  useEffect(() => {
    loadCampaigns();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [campaigns, filters]);

  const loadCampaigns = async () => {
    setLoading(true);
    const response = getCampaigns();
    if (response.success && response.data) {
      setCampaigns(response.data);
    }
    setLoading(false);
  };

  const applyFilters = () => {
    let filtered = [...campaigns];

    if (filters.status !== 'all') {
      filtered = filtered.filter(campaign => campaign.status === filters.status);
    }

    if (filters.budget !== 'all') {
      switch (filters.budget) {
        case 'low':
          filtered = filtered.filter(campaign => campaign.budget < 20000);
          break;
        case 'medium':
          filtered = filtered.filter(campaign => campaign.budget >= 20000 && campaign.budget < 50000);
          break;
        case 'high':
          filtered = filtered.filter(campaign => campaign.budget >= 50000);
          break;
      }
    }

    setFilteredCampaigns(filtered);
  };

  const handleCreateCampaign = async () => {
    if (!newCampaign.name || !newCampaign.brand || !newCampaign.startDate || !newCampaign.endDate) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields',
        variant: 'destructive'
      });
      return;
    }

    const campaignData = {
      ...newCampaign,
      status: 'draft' as const,
      selectedInfluencers: [],
      performance: {
        reach: 0,
        impressions: 0,
        engagement: 0,
        clicks: 0,
        conversions: 0
      }
    };

    const response = createCampaign(campaignData);
    if (response.success && response.data) {
      setCampaigns([...campaigns, response.data]);
      setShowCreateDialog(false);
      resetNewCampaign();
      toast({
        title: 'Campaign Created',
        description: 'Your campaign has been created successfully'
      });
    }
  };

  const resetNewCampaign = () => {
    setNewCampaign({
      name: '',
      description: '',
      brand: '',
      budget: 0,
      startDate: '',
      endDate: '',
      targetAudience: {
        ageRange: '',
        gender: '',
        location: '',
        interests: []
      },
      requirements: {
        minFollowers: 50000,
        minEngagement: 3.0,
        niches: [],
        platforms: []
      },
      deliverables: {
        posts: 1,
        stories: 2,
        reels: 1
      }
    });
  };

  const handleSelectInfluencer = (influencer: Influencer) => {
    if (!selectedCampaign) return;

    const updatedInfluencers = [...selectedCampaign.selectedInfluencers];
    if (!updatedInfluencers.includes(influencer.id)) {
      updatedInfluencers.push(influencer.id);
      
      const response = updateCampaign(selectedCampaign.id, {
        selectedInfluencers: updatedInfluencers
      });
      
      if (response.success && response.data) {
        setSelectedCampaign(response.data);
        setCampaigns(campaigns.map(c => c.id === response.data!.id ? response.data! : c));
        toast({
          title: 'Influencer Added',
          description: `${influencer.name} has been added to your campaign`
        });
      }
    }
  };

  const getStatusStats = () => {
    const stats = {
      total: campaigns.length,
      active: campaigns.filter(c => c.status === 'active').length,
      draft: campaigns.filter(c => c.status === 'draft').length,
      completed: campaigns.filter(c => c.status === 'completed').length
    };
    return stats;
  };

  const getTotalBudget = () => {
    return campaigns.reduce((total, campaign) => total + campaign.budget, 0);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const stats = getStatusStats();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (showInfluencerSelection && selectedCampaign) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Select Influencers</h1>
            <p className="text-gray-600">Choose influencers for: {selectedCampaign.name}</p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => setShowInfluencerSelection(false)}
          >
            Back to Campaign
          </Button>
        </div>
        <InfluencerDiscovery 
          onSelectInfluencer={handleSelectInfluencer}
          showSelectButton={true}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Campaign Management</h1>
          <p className="text-gray-600">Create and manage your influencer campaigns</p>
        </div>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Create Campaign
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Campaign</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Campaign Name *</Label>
                  <Input
                    value={newCampaign.name}
                    onChange={(e) => setNewCampaign({...newCampaign, name: e.target.value})}
                    placeholder="Enter campaign name"
                  />
                </div>
                <div>
                  <Label>Brand *</Label>
                  <Input
                    value={newCampaign.brand}
                    onChange={(e) => setNewCampaign({...newCampaign, brand: e.target.value})}
                    placeholder="Enter brand name"
                  />
                </div>
              </div>
              
              <div>
                <Label>Description</Label>
                <Textarea
                  value={newCampaign.description}
                  onChange={(e) => setNewCampaign({...newCampaign, description: e.target.value})}
                  placeholder="Describe your campaign objectives"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Budget *</Label>
                  <Input
                    type="number"
                    value={newCampaign.budget}
                    onChange={(e) => setNewCampaign({...newCampaign, budget: Number(e.target.value)})}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label>Start Date *</Label>
                  <Input
                    type="date"
                    value={newCampaign.startDate}
                    onChange={(e) => setNewCampaign({...newCampaign, startDate: e.target.value})}
                  />
                </div>
                <div>
                  <Label>End Date *</Label>
                  <Input
                    type="date"
                    value={newCampaign.endDate}
                    onChange={(e) => setNewCampaign({...newCampaign, endDate: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Target Age Range</Label>
                  <Select value={newCampaign.targetAudience.ageRange} onValueChange={(value) => 
                    setNewCampaign({...newCampaign, targetAudience: {...newCampaign.targetAudience, ageRange: value}})
                  }>
                    <SelectTrigger>
                      <SelectValue placeholder="Select age range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="18-24">18-24</SelectItem>
                      <SelectItem value="25-34">25-34</SelectItem>
                      <SelectItem value="35-44">35-44</SelectItem>
                      <SelectItem value="45-54">45-54</SelectItem>
                      <SelectItem value="55+">55+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Target Gender</Label>
                  <Select value={newCampaign.targetAudience.gender} onValueChange={(value) => 
                    setNewCampaign({...newCampaign, targetAudience: {...newCampaign.targetAudience, gender: value}})
                  }>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="male">Male</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateCampaign}>
                  Create Campaign
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Total Campaigns</p>
                <p className="text-xl font-semibold">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-xl font-semibold">{stats.active}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-sm text-gray-600">Draft</p>
                <p className="text-xl font-semibold">{stats.draft}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm text-gray-600">Total Budget</p>
                <p className="text-xl font-semibold">{formatCurrency(getTotalBudget())}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4">
            <div>
              <Label className="text-sm font-medium mb-1 block">Status</Label>
              <Select value={filters.status} onValueChange={(value) => setFilters({...filters, status: value})}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm font-medium mb-1 block">Budget</Label>
              <Select value={filters.budget} onValueChange={(value) => setFilters({...filters, budget: value})}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Budgets</SelectItem>
                  <SelectItem value="low">Under $20K</SelectItem>
                  <SelectItem value="medium">$20K - $50K</SelectItem>
                  <SelectItem value="high">Over $50K</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Campaigns Grid */}
      {filteredCampaigns.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No campaigns found</h3>
            <p className="text-gray-600 mb-4">Create your first campaign to get started</p>
            <Button onClick={() => setShowCreateDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Campaign
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCampaigns.map((campaign) => (
            <CampaignCard
              key={campaign.id}
              campaign={campaign}
              onEdit={(campaign) => {
                setSelectedCampaign(campaign);
                setShowInfluencerSelection(true);
              }}
              onView={(campaign) => {
                setSelectedCampaign(campaign);
                setActiveTab('overview');
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};