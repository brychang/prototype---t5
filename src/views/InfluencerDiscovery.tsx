import { useState, useEffect } from 'react';
import { Influencer, FilterOptions } from '@/types';
import { getInfluencers, getFavorites, toggleFavorite } from '@/lib/storage';
import { InfluencerCard } from '@/components/custom/InfluencerCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Heart, Users, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface InfluencerDiscoveryProps {
  onSelectInfluencer?: (influencer: Influencer) => void;
  showSelectButton?: boolean;
}

export const InfluencerDiscovery = ({ onSelectInfluencer, showSelectButton = false }: InfluencerDiscoveryProps) => {
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [filteredInfluencers, setFilteredInfluencers] = useState<Influencer[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const [filters, setFilters] = useState<FilterOptions>({
    niche: 'all',
    platform: 'all',
    minFollowers: 0,
    maxFollowers: 1000000,
    minEngagement: 0,
    maxEngagement: 10,
    location: 'all',
    gender: 'all',
    verified: null,
    minRating: 0
  });

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [influencers, searchTerm, filters]);

  const loadData = async () => {
    setLoading(true);
    const influencersResponse = getInfluencers();
    const favoritesResponse = getFavorites();

    if (influencersResponse.success && influencersResponse.data) {
      setInfluencers(influencersResponse.data);
    }

    if (favoritesResponse.success && favoritesResponse.data) {
      setFavorites(favoritesResponse.data);
    }

    setLoading(false);
  };

  const applyFilters = () => {
    let filtered = [...influencers];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(inf => 
        inf.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inf.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inf.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inf.niche.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Niche filter
    if (filters.niche !== 'all') {
      filtered = filtered.filter(inf => inf.niche === filters.niche);
    }

    // Platform filter
    if (filters.platform !== 'all') {
      filtered = filtered.filter(inf => inf.platform === filters.platform);
    }

    // Followers filter
    filtered = filtered.filter(inf => 
      inf.followers >= filters.minFollowers && inf.followers <= filters.maxFollowers
    );

    // Engagement filter
    filtered = filtered.filter(inf => 
      inf.engagementRate >= filters.minEngagement && inf.engagementRate <= filters.maxEngagement
    );

    // Location filter
    if (filters.location !== 'all') {
      filtered = filtered.filter(inf => inf.location.includes(filters.location));
    }

    // Gender filter
    if (filters.gender !== 'all') {
      filtered = filtered.filter(inf => inf.gender === filters.gender);
    }

    // Verified filter
    if (filters.verified !== null) {
      filtered = filtered.filter(inf => inf.verified === filters.verified);
    }

    // Rating filter
    filtered = filtered.filter(inf => inf.rating >= filters.minRating);

    setFilteredInfluencers(filtered);
  };

  const handleToggleFavorite = async (influencerId: string) => {
    const response = toggleFavorite(influencerId);
    if (response.success && response.data) {
      setFavorites(response.data);
      const isNowFavorite = response.data.includes(influencerId);
      toast({
        title: isNowFavorite ? 'Added to favorites' : 'Removed from favorites',
        description: isNowFavorite ? 'Influencer saved to your favorites list' : 'Influencer removed from favorites'
      });
    }
  };

  const resetFilters = () => {
    setFilters({
      niche: 'all',
      platform: 'all',
      minFollowers: 0,
      maxFollowers: 1000000,
      minEngagement: 0,
      maxEngagement: 10,
      location: 'all',
      gender: 'all',
      verified: null,
      minRating: 0
    });
    setSearchTerm('');
  };

  const getUniqueValues = (key: keyof Influencer) => {
    return [...new Set(influencers.map(inf => inf[key] as string))];
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Discover Influencers</h1>
          <p className="text-gray-600">Find the perfect influencers for your campaigns</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="bg-blue-50 text-blue-700">
            <Users className="h-3 w-3 mr-1" />
            {filteredInfluencers.length} found
          </Badge>
          <Badge variant="secondary" className="bg-red-50 text-red-700">
            <Heart className="h-3 w-3 mr-1" />
            {favorites.length} favorites
          </Badge>
        </div>
      </div>

      {/* Search and Filter Controls */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search influencers by name, username, or niche..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2"
            >
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </Button>
          </div>

          {showFilters && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <Label className="text-sm font-medium mb-2 block">Niche</Label>
                  <Select value={filters.niche} onValueChange={(value) => setFilters({...filters, niche: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Niches</SelectItem>
                      {getUniqueValues('niche').map(niche => (
                        <SelectItem key={niche} value={niche}>{niche}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">Platform</Label>
                  <Select value={filters.platform} onValueChange={(value) => setFilters({...filters, platform: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Platforms</SelectItem>
                      {getUniqueValues('platform').map(platform => (
                        <SelectItem key={platform} value={platform} className="capitalize">{platform}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">Gender</Label>
                  <Select value={filters.gender} onValueChange={(value) => setFilters({...filters, gender: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Genders</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">Location</Label>
                  <Select value={filters.location} onValueChange={(value) => setFilters({...filters, location: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="CA">California</SelectItem>
                      <SelectItem value="NY">New York</SelectItem>
                      <SelectItem value="FL">Florida</SelectItem>
                      <SelectItem value="TX">Texas</SelectItem>
                      <SelectItem value="CO">Colorado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-sm font-medium mb-2 block">
                    Followers: {formatNumber(filters.minFollowers)} - {formatNumber(filters.maxFollowers)}
                  </Label>
                  <div className="px-2">
                    <Slider
                      value={[filters.minFollowers, filters.maxFollowers]}
                      onValueChange={([min, max]) => setFilters({...filters, minFollowers: min, maxFollowers: max})}
                      max={1000000}
                      min={0}
                      step={10000}
                      className="w-full"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">
                    Engagement Rate: {filters.minEngagement}% - {filters.maxEngagement}%
                  </Label>
                  <div className="px-2">
                    <Slider
                      value={[filters.minEngagement, filters.maxEngagement]}
                      onValueChange={([min, max]) => setFilters({...filters, minEngagement: min, maxEngagement: max})}
                      max={10}
                      min={0}
                      step={0.1}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={filters.verified === true}
                      onCheckedChange={(checked) => setFilters({...filters, verified: checked ? true : null})}
                    />
                    <Label className="text-sm">Verified only</Label>
                  </div>
                  <div>
                    <Label className="text-sm font-medium mr-2">Min Rating: {filters.minRating}</Label>
                    <Slider
                      value={[filters.minRating]}
                      onValueChange={([value]) => setFilters({...filters, minRating: value})}
                      max={5}
                      min={0}
                      step={0.1}
                      className="w-24 inline-block"
                    />
                  </div>
                </div>
                <Button variant="outline" onClick={resetFilters}>
                  Reset Filters
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results */}
      {filteredInfluencers.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No influencers found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInfluencers.map((influencer) => (
            <InfluencerCard
              key={influencer.id}
              influencer={influencer}
              isFavorite={favorites.includes(influencer.id)}
              onToggleFavorite={handleToggleFavorite}
              onSelect={onSelectInfluencer}
              showSelectButton={showSelectButton}
            />
          ))}
        </div>
      )}
    </div>
  );
};