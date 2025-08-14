import { useState } from 'react';
import { InfluencerDiscovery } from '@/views/InfluencerDiscovery';
import { CampaignManagement } from '@/views/CampaignManagement';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Target, BarChart3, Users, TrendingUp, Menu, X, Zap } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

type View = 'dashboard' | 'discovery' | 'campaigns';

const Index = () => {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'discovery', label: 'Discover Influencers', icon: Search },
    { id: 'campaigns', label: 'Campaigns', icon: Target }
  ];

  const handleNavigation = (view: View) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
  };

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-12 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full">
              <Zap className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Influencer Marketing Platform
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Connect with the perfect influencers for your brand and manage campaigns that drive real results
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => handleNavigation('discovery')}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 text-lg"
            >
              <Search className="h-5 w-5 mr-2" />
              Discover Influencers
            </Button>
            <Button 
              variant="outline" 
              onClick={() => handleNavigation('campaigns')}
              className="px-8 py-3 text-lg border-2 hover:bg-gray-50"
            >
              <Target className="h-5 w-5 mr-2" />
              Manage Campaigns
            </Button>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-white to-blue-50">
          <CardContent className="p-6 text-center">
            <div className="bg-blue-100 p-3 rounded-full w-fit mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
              <Search className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Discovery</h3>
            <p className="text-gray-600 mb-4">
              Find influencers that perfectly match your brand using advanced filtering by niche, engagement, and demographics.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Badge variant="secondary" className="bg-blue-50 text-blue-700">Demographics</Badge>
              <Badge variant="secondary" className="bg-blue-50 text-blue-700">Engagement</Badge>
              <Badge variant="secondary" className="bg-blue-50 text-blue-700">Niche Matching</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-white to-purple-50">
          <CardContent className="p-6 text-center">
            <div className="bg-purple-100 p-3 rounded-full w-fit mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
              <Target className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Campaign Management</h3>
            <p className="text-gray-600 mb-4">
              Create, track, and optimize campaigns with integrated analytics and performance monitoring.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Badge variant="secondary" className="bg-purple-50 text-purple-700">Budget Tracking</Badge>
              <Badge variant="secondary" className="bg-purple-50 text-purple-700">Analytics</Badge>
              <Badge variant="secondary" className="bg-purple-50 text-purple-700">Scheduling</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-white to-green-50">
          <CardContent className="p-6 text-center">
            <div className="bg-green-100 p-3 rounded-full w-fit mx-auto mb-4 group-hover:bg-green-200 transition-colors">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Performance Analytics</h3>
            <p className="text-gray-600 mb-4">
              Track reach, engagement, conversions, and ROI with comprehensive campaign performance metrics.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Badge variant="secondary" className="bg-green-50 text-green-700">ROI Tracking</Badge>
              <Badge variant="secondary" className="bg-green-50 text-green-700">Conversions</Badge>
              <Badge variant="secondary" className="bg-green-50 text-green-700">Reach Analysis</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Platform Statistics</h2>
          <p className="text-gray-300">Connecting brands with top-performing influencers</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 mb-1">500+</div>
            <div className="text-sm text-gray-300">Verified Influencers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400 mb-1">150+</div>
            <div className="text-sm text-gray-300">Active Campaigns</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-1">4.8</div>
            <div className="text-sm text-gray-300">Avg. Engagement Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-1">95%</div>
            <div className="text-sm text-gray-300">Client Satisfaction</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (currentView) {
      case 'discovery':
        return <InfluencerDiscovery />;
      case 'campaigns':
        return <CampaignManagement />;
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Mobile Header */}
      {isMobile && (
        <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between lg:hidden">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="font-semibold text-gray-900">InfluenceHub</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobile && mobileMenuOpen && (
        <div className="bg-white border-b border-gray-200 px-4 py-2 lg:hidden">
          <div className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={currentView === item.id ? 'default' : 'ghost'}
                  className={`w-full justify-start ${
                    currentView === item.id 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => handleNavigation(item.id as View)}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {item.label}
                </Button>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex">
        {/* Desktop Sidebar */}
        {!isMobile && (
          <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
            <div className="p-6">
              <div className="flex items-center space-x-2 mb-8">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">InfluenceHub</span>
              </div>
              
              <nav className="space-y-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Button
                      key={item.id}
                      variant={currentView === item.id ? 'default' : 'ghost'}
                      className={`w-full justify-start ${
                        currentView === item.id 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={() => handleNavigation(item.id as View)}
                    >
                      <Icon className="h-4 w-4 mr-3" />
                      {item.label}
                    </Button>
                  );
                })}
              </nav>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1">
          <div className="p-6 lg:p-8">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;