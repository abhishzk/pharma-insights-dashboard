import React from 'react';
import { Mail, Phone, UserPlus, Edit } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  avatar: string;
  status: 'active' | 'away' | 'offline';
}

const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Dr. Jane Smith',
    role: 'Lead Pharmacologist',
    department: 'PDM',
    email: 'jane.smith@research.pfizer.com',
    phone: '(555) 123-4567',
    avatar: 'https://i.pravatar.cc/150?img=1',
    status: 'active'
  },
  {
    id: '2',
    name: 'Dr. John Davis',
    role: 'Computational Chemist',
    department: 'PDM',
    email: 'john.davis@research.pfizer.com',
    phone: '(555) 123-4568',
    avatar: 'https://i.pravatar.cc/150?img=2',
    status: 'active'
  },
  {
    id: '3',
    name: 'Dr. Sarah Johnson',
    role: 'ADME Specialist',
    department: 'PDM',
    email: 'sarah.johnson@research.pfizer.com',
    phone: '(555) 123-4569',
    avatar: 'https://i.pravatar.cc/150?img=3',
    status: 'away'
  },
  {
    id: '4',
    name: 'Dr. Michael Chen',
    role: 'Clinical Pharmacologist',
    department: 'PDM',
    email: 'michael.chen@research.pfizer.com',
    phone: '(555) 123-4570',
    avatar: 'https://i.pravatar.cc/150?img=4',
    status: 'offline'
  },
  {
    id: '5',
    name: 'Dr. Emily Wilson',
    role: 'Toxicologist',
    department: 'PDM',
    email: 'emily.wilson@research.pfizer.com',
    phone: '(555) 123-4571',
    avatar: 'https://i.pravatar.cc/150?img=5',
    status: 'active'
  },
  {
    id: '6',
    name: 'Dr. Robert Taylor',
    role: 'PK/PD Modeler',
    department: 'PDM',
    email: 'robert.taylor@research.pfizer.com',
    phone: '(555) 123-4572',
    avatar: 'https://i.pravatar.cc/150?img=6',
    status: 'away'
  }
];

const statusIndicators = {
  active: 'bg-success-500',
  away: 'bg-warning-500',
  offline: 'bg-gray-300'
};

const TeamPage: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-semibold text-gray-900">Team</h1>
        <Button 
          icon={<UserPlus className="h-4 w-4" />}
        >
          Add Team Member
        </Button>
      </div>

      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Pharmacokinetics, Dynamics and Metabolism Team
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Team members with access to the Pharma Insights Dashboard
          </p>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <Card key={member.id} className="hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-start space-x-4">
                  <div className="relative flex-shrink-0">
                    <img
                      className="h-16 w-16 rounded-full object-cover"
                      src={member.avatar}
                      alt={member.name}
                    />
                    <span 
                      className={`absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full ring-2 ring-white ${statusIndicators[member.status]}`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-lg font-medium text-gray-900 truncate">{member.name}</h4>
                    <p className="text-sm text-gray-500">{member.role}</p>
                    <p className="text-xs text-gray-400">{member.department} Department</p>

                    <div className="mt-3 flex flex-col space-y-2">
                      <a 
                        href={`mailto:${member.email}`} 
                        className="text-sm text-gray-600 hover:text-primary-600 flex items-center"
                      >
                        <Mail className="h-4 w-4 mr-1" />
                        {member.email}
                      </a>
                      <a 
                        href={`tel:${member.phone}`} 
                        className="text-sm text-gray-600 hover:text-primary-600 flex items-center"
                      >
                        <Phone className="h-4 w-4 mr-1" />
                        {member.phone}
                      </a>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={<Edit className="h-4 w-4" />}
                  >
                    Edit
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamPage;