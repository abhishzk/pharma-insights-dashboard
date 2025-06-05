import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { UploadCloud, FileSpreadsheet, BarChart as BarChartIcon, RefreshCw } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useDataStore } from '../store/dataStore';
import { DataSet } from '../types';

const AnalysisPage: React.FC = () => {
  const { dataSets, fetchDataSets, uploadDataset, isLoading } = useDataStore();
  const [selectedDataSet, setSelectedDataSet] = useState<DataSet | null>(null);
  const [fileInput, setFileInput] = useState<HTMLInputElement | null>(null);

  useEffect(() => {
    fetchDataSets();
  }, [fetchDataSets]);

  useEffect(() => {
    if (dataSets.length > 0 && !selectedDataSet) {
      setSelectedDataSet(dataSets[0]);
    }
  }, [dataSets, selectedDataSet]);

  const handleUpload = () => {
    fileInput?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      await uploadDataset(e.target.files[0]);
      e.target.value = '';
    }
  };

  const lineColors = ['#0093d0', '#5c72dc', '#00ccc0', '#4bc66e', '#f5b90f', '#e14f4f'];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-semibold text-gray-900">Data Analysis</h1>
        <input 
          type="file" 
          ref={ref => setFileInput(ref)} 
          style={{ display: 'none' }} 
          accept=".csv,.json,.xlsx"
          onChange={handleFileChange}
        />
        <Button 
          icon={<UploadCloud className="h-4 w-4" />}
          onClick={handleUpload}
        >
          Upload Data
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <Card title="Data Sets">
            <div className="space-y-2">
              {isLoading ? (
                <div className="animate-pulse space-y-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-10 bg-gray-100 rounded"></div>
                  ))}
                </div>
              ) : (
                dataSets.map(dataSet => (
                  <button
                    key={dataSet.id}
                    className={`
                      w-full text-left px-3 py-2 rounded-md text-sm transition-colors
                      flex items-center
                      ${selectedDataSet?.id === dataSet.id 
                        ? 'bg-primary-50 text-primary-700 font-medium' 
                        : 'text-gray-700 hover:bg-gray-50'}
                    `}
                    onClick={() => setSelectedDataSet(dataSet)}
                  >
                    <FileSpreadsheet className="h-4 w-4 mr-2 text-gray-400" />
                    {dataSet.name}
                  </button>
                ))
              )}
            </div>
          </Card>

          {selectedDataSet && (
            <Card title="Dataset Info" className="mt-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs uppercase font-semibold text-gray-500">Description</h4>
                  <p className="mt-1 text-sm">{selectedDataSet.description}</p>
                </div>
                
                <div>
                  <h4 className="text-xs uppercase font-semibold text-gray-500">Created By</h4>
                  <p className="mt-1 text-sm">{selectedDataSet.createdBy}</p>
                </div>
                
                <div>
                  <h4 className="text-xs uppercase font-semibold text-gray-500">Last Updated</h4>
                  <p className="mt-1 text-sm">{new Date(selectedDataSet.updatedAt).toLocaleDateString()}</p>
                </div>
                
                <div>
                  <h4 className="text-xs uppercase font-semibold text-gray-500">Type</h4>
                  <p className="mt-1 text-sm capitalize">{selectedDataSet.type}</p>
                </div>
              </div>
            </Card>
          )}
        </div>

        <div className="lg:col-span-3 space-y-6">
          {selectedDataSet ? (
            <>
              <Card 
                title="Visualization"
                subtitle={selectedDataSet.name}
                footer={
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      {selectedDataSet.data.length} data points
                    </span>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<RefreshCw className="h-4 w-4" />}
                      >
                        Refresh
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<BarChartIcon className="h-4 w-4" />}
                      >
                        Change Chart Type
                      </Button>
                    </div>
                  </div>
                }
              >
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={selectedDataSet.data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="label" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        name={selectedDataSet.type === 'clinical' ? 'Concentration (ng/mL)' : 'Value'} 
                        stroke={lineColors[0]} 
                        activeDot={{ r: 8 }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card title="Data Table">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          ID
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Label
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Value
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Timestamp
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {selectedDataSet.data.map(point => (
                        <tr key={point.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {point.id.slice(0, 8)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {point.label}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {point.value}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(point.timestamp).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </>
          ) : (
            <Card>
              <div className="flex flex-col items-center justify-center h-64">
                <FileSpreadsheet className="h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No data set selected</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Select a data set from the sidebar or upload a new one
                </p>
                <div className="mt-6">
                  <Button 
                    icon={<UploadCloud className="h-4 w-4" />}
                    onClick={handleUpload}
                  >
                    Upload Data
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalysisPage;