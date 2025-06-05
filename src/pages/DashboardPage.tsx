import React, { useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Beaker, Users, FileCheck, FileSpreadsheet } from 'lucide-react';
import Card from '../components/ui/Card';
import { useDataStore } from '../store/dataStore';
import { useAuthStore } from '../store/authStore';

const StatCard: React.FC<{
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
}> = ({ title, value, icon, change, changeType = 'neutral' }) => {
  const changeColors = {
    positive: 'text-success-600',
    negative: 'text-error-600',
    neutral: 'text-gray-500'
  };

  return (
    <Card>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-1 text-2xl font-semibold text-gray-900">{value}</p>
          {change && (
            <p className={`mt-1 text-sm ${changeColors[changeType]}`}>
              {change}
            </p>
          )}
        </div>
        <div className="p-3 bg-primary-50 rounded-full">
          {icon}
        </div>
      </div>
    </Card>
  );
};

const COLORS = ['#0093d0', '#4a5bb0', '#00ccc0', '#3c9e58', '#c4940c', '#b43f3f'];

const DashboardPage: React.FC = () => {
  const { compounds, labResults, dataSets, fetchCompounds, fetchLabResults, fetchDataSets } = useDataStore();
  const { user } = useAuthStore();

  useEffect(() => {
    fetchCompounds();
    fetchLabResults();
    fetchDataSets();
  }, [fetchCompounds, fetchLabResults, fetchDataSets]);

  // Prepare data for charts
  const assayTypeData = React.useMemo(() => {
    const counts: Record<string, number> = {};
    labResults.forEach(result => {
      counts[result.assayType] = (counts[result.assayType] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [labResults]);

  const statusData = React.useMemo(() => {
    const counts: Record<string, number> = {};
    labResults.forEach(result => {
      counts[result.status] = (counts[result.status] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [labResults]);

  const compoundResultsData = React.useMemo(() => {
    const counts: Record<string, number> = {};
    labResults.forEach(result => {
      counts[result.compoundName] = (counts[result.compoundName] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [labResults]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Welcome back, {user?.name}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">{new Date().toLocaleDateString()}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Compounds"
          value={compounds.length}
          icon={<Beaker className="h-6 w-6 text-primary-500" />}
          change="+2 new this week"
          changeType="positive"
        />
        <StatCard
          title="Lab Results"
          value={labResults.length}
          icon={<FileCheck className="h-6 w-6 text-secondary-500" />}
          change="+5 since last week"
          changeType="positive"
        />
        <StatCard
          title="Data Sets"
          value={dataSets.length}
          icon={<FileSpreadsheet className="h-6 w-6 text-accent-500" />}
        />
        <StatCard
          title="Team Members"
          value="12"
          icon={<Users className="h-6 w-6 text-success-500" />}
          change="2 pending invitations"
          changeType="neutral"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card title="Results by Assay Type" className="col-span-1">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={assayTypeData}
                margin={{ top: 10, right: 30, left: 0, bottom: 40 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  angle={-45} 
                  textAnchor="end" 
                  tick={{ fontSize: 12 }}
                  height={70}
                />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#0093d0" barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Results by Compound" className="col-span-1">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={compoundResultsData}
                margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#5c72dc" barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Status Charts */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Card title="Results by Status" className="lg:col-span-1">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Recent Activities" className="lg:col-span-2">
          <div className="flow-root">
            <ul className="-mb-8">
              {labResults.slice(0, 5).map((result, idx) => (
                <li key={result.id}>
                  <div className="relative pb-8">
                    {idx !== 4 && (
                      <span
                        className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                      />
                    )}
                    <div className="relative flex items-start space-x-3">
                      <div className="relative">
                        <div className={`
                          h-10 w-10 rounded-full flex items-center justify-center ring-8 ring-white
                          ${result.status === 'approved' ? 'bg-success-100' : 
                            result.status === 'rejected' ? 'bg-error-100' : 'bg-warning-100'}
                        `}>
                          <Beaker className={`
                            h-5 w-5
                            ${result.status === 'approved' ? 'text-success-600' : 
                              result.status === 'rejected' ? 'text-error-600' : 'text-warning-600'}
                          `} />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div>
                          <p className="text-sm text-gray-500">
                            {result.researcher} added {result.assayType} for
                            <span className="font-medium text-gray-900"> {result.compoundName}</span>
                          </p>
                          <p className="mt-0.5 text-sm text-gray-500">
                            {new Date(result.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="mt-2 text-sm text-gray-700">
                          <p>Result: {result.result} {result.unit}</p>
                          {result.notes && <p className="mt-1 italic text-gray-500">{result.notes}</p>}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;