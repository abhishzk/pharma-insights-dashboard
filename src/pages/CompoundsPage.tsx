import React, { useEffect, useState } from 'react';
import { Search, Upload, Plus, Info, ExternalLink } from 'lucide-react';
import Card from '../components/ui/Card';
import DataTable from '../components/ui/DataTable';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useDataStore } from '../store/dataStore';
import { Compound } from '../types';

const CompoundsPage: React.FC = () => {
  const { compounds, isLoading, fetchCompounds } = useDataStore();
  const [selectedCompound, setSelectedCompound] = useState<Compound | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCompounds();
  }, [fetchCompounds]);

  const filteredCompounds = compounds.filter(compound => 
    compound.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    compound.formula.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCompoundSelect = (compound: Compound) => {
    setSelectedCompound(compound);
  };

  const columns = [
    {
      header: 'Name',
      accessor: 'name',
    },
    {
      header: 'Formula',
      accessor: 'formula',
    },
    {
      header: 'Molecular Weight',
      accessor: (row: Compound) => `${row.molecularWeight} g/mol`,
    },
    {
      header: 'LogP',
      accessor: 'logP',
    },
    {
      header: 'Actions',
      accessor: (row: Compound) => (
        <Button
          variant="ghost"
          size="sm"
          icon={<Info className="h-4 w-4" />}
          onClick={(e) => {
            e.stopPropagation();
            handleCompoundSelect(row);
          }}
        >
          Details
        </Button>
      ),
      width: '100px',
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-semibold text-gray-900">Compounds</h1>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            variant="outline" 
            icon={<Upload className="h-4 w-4" />}
          >
            Import Compounds
          </Button>
          <Button 
            icon={<Plus className="h-4 w-4" />}
          >
            Add Compound
          </Button>
        </div>
      </div>

      <div className="max-w-lg">
        <Input
          type="text"
          placeholder="Search compounds by name or formula..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          leftIcon={<Search className="h-5 w-5" />}
          fullWidth
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DataTable<Compound>
            data={filteredCompounds}
            columns={columns}
            isLoading={isLoading}
            keyField="id"
            onRowClick={handleCompoundSelect}
            emptyMessage="No compounds found. Try a different search term or add a new compound."
          />
        </div>

        <div className="lg:col-span-1">
          {selectedCompound ? (
            <Card 
              title="Compound Details" 
              subtitle={`${selectedCompound.name} (${selectedCompound.formula})`}
              footer={
                <div className="flex justify-end">
                  <Button
                    variant="link"
                    size="sm"
                    icon={<ExternalLink className="h-4 w-4" />}
                    iconPosition="right"
                  >
                    View on PubChem
                  </Button>
                </div>
              }
            >
              <div className="space-y-6">
                <div className="flex justify-center">
                  <img 
                    src={selectedCompound.structure} 
                    alt={`Structure of ${selectedCompound.name}`}
                    className="h-48 object-contain"
                  />
                </div>
                
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-gray-500">Molecular Weight:</div>
                    <div className="font-medium">{selectedCompound.molecularWeight} g/mol</div>
                    
                    <div className="text-gray-500">LogP:</div>
                    <div className="font-medium">{selectedCompound.logP}</div>
                  </div>
                  
                  <div className="pt-2">
                    <div className="text-gray-500 text-sm">Description:</div>
                    <p className="mt-1 text-sm text-gray-700">{selectedCompound.description}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Related Assays</h4>
                  <ul className="space-y-2">
                    <li className="text-sm py-1 px-2 bg-gray-50 rounded">Solubility Assay</li>
                    <li className="text-sm py-1 px-2 bg-gray-50 rounded">Plasma Protein Binding</li>
                    <li className="text-sm py-1 px-2 bg-gray-50 rounded">CYP Inhibition</li>
                  </ul>
                </div>
              </div>
            </Card>
          ) : (
            <Card>
              <div className="text-center py-6">
                <div className="mx-auto h-12 w-12 text-gray-400">
                  <Info className="h-12 w-12" />
                </div>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No compound selected</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Select a compound from the table to view details
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompoundsPage;