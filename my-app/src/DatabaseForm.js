import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const DatabaseForm = () => {
  const [formData, setFormData] = useState({
    statusCode: { id: '', name: '' },
    projectCategory: { id: '', name: '' },
    priorityLevel: { id: '', name: '' },
    phaseOption: { id: '', name: '' },
    client: {
      name: '',
      contactPerson: '',
      phone: '',
      email: '',
      companyName: '',
      industry: '',
      address: ''
    },
    project: {
      name: '',
      clientId: '',
      categoryId: '',
      priorityId: '',
      startDate: '',
      endDate: '',
      budget: '',
      completionPercentage: '',
      description: ''
    }
  });

  const [lookupData, setLookupData] = useState({
    statusCodes: [],
    projectCategories: [],
    priorityLevels: [],
    phaseOptions: [],
    roleOptions: [],
    statusOptions: [],
    riskLevels: [],
    severityOptions: [],
    clients: []
  });

  const [currentTab, setCurrentTab] = useState('lookups');
  const [message, setMessage] = useState({ type: '', content: '' });

  const handleLookupSubmit = (type) => {
    if (!formData[type].name) {
      setMessage({ type: 'error', content: 'Please fill in all required fields' });
      return;
    }

    const newData = [...lookupData[type + 's'], { 
      id: Date.now().toString(), 
      name: formData[type].name 
    }];

    setLookupData(prev => ({
      ...prev,
      [type + 's']: newData
    }));

    setFormData(prev => ({
      ...prev,
      [type]: { id: '', name: '' }
    }));

    setMessage({ type: 'success', content: `${type} added successfully` });
  };

  const handleClientSubmit = () => {
    if (!formData.client.name) {
      setMessage({ type: 'error', content: 'Client name is required' });
      return;
    }

    const newClient = {
      id: Date.now().toString(),
      ...formData.client
    };

    setLookupData(prev => ({
      ...prev,
      clients: [...prev.clients, newClient]
    }));

    setFormData(prev => ({
      ...prev,
      client: {
        name: '',
        contactPerson: '',
        phone: '',
        email: '',
        companyName: '',
        industry: '',
        address: ''
      }
    }));

    setMessage({ type: 'success', content: 'Client added successfully' });
  };

  const handleProjectSubmit = () => {
    if (!formData.project.name || !formData.project.clientId) {
      setMessage({ type: 'error', content: 'Project name and client are required' });
      return;
    }

    // Here you would typically save to your database
    console.log('Project to save:', formData.project);

    setFormData(prev => ({
      ...prev,
      project: {
        name: '',
        clientId: '',
        categoryId: '',
        priorityId: '',
        startDate: '',
        endDate: '',
        budget: '',
        completionPercentage: '',
        description: ''
      }
    }));

    setMessage({ type: 'success', content: 'Project added successfully' });
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Database Management</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={currentTab} onValueChange={setCurrentTab}>
          <TabsList className="w-full">
            <TabsTrigger value="lookups">Reference Data</TabsTrigger>
            <TabsTrigger value="clients">Clients</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
          </TabsList>

          {message.content && (
            <Alert className={`mt-4 ${message.type === 'error' ? 'bg-red-50' : 'bg-green-50'}`}>
              <AlertTitle>{message.type === 'error' ? 'Error' : 'Success'}</AlertTitle>
              <AlertDescription>{message.content}</AlertDescription>
            </Alert>
          )}

          <TabsContent value="lookups" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Status Codes */}
              <div className="space-y-2">
                <h3 className="font-medium">Status Codes</h3>
                <Input 
                  placeholder="Status Name"
                  value={formData.statusCode.name}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    statusCode: { ...prev.statusCode, name: e.target.value }
                  }))}
                />
                <Button 
                  onClick={() => handleLookupSubmit('statusCode')}
                  className="w-full"
                >
                  Add Status Code
                </Button>
                <div className="mt-2 text-sm">
                  {lookupData.statusCodes.map((status, idx) => (
                    <div key={idx} className="p-2 bg-gray-50 rounded mb-1">
                      {status.name}
                    </div>
                  ))}
                </div>
              </div>

              {/* Project Categories */}
              <div className="space-y-2">
                <h3 className="font-medium">Project Categories</h3>
                <Input 
                  placeholder="Category Name"
                  value={formData.projectCategory.name}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    projectCategory: { ...prev.projectCategory, name: e.target.value }
                  }))}
                />
                <Button 
                  onClick={() => handleLookupSubmit('projectCategory')}
                  className="w-full"
                >
                  Add Category
                </Button>
                <div className="mt-2 text-sm">
                  {lookupData.projectCategories.map((category, idx) => (
                    <div key={idx} className="p-2 bg-gray-50 rounded mb-1">
                      {category.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="clients">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input 
                  placeholder="Client Name *"
                  value={formData.client.name}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    client: { ...prev.client, name: e.target.value }
                  }))}
                />
                <Input 
                  placeholder="Contact Person"
                  value={formData.client.contactPerson}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    client: { ...prev.client, contactPerson: e.target.value }
                  }))}
                />
                <Input 
                  placeholder="Phone"
                  value={formData.client.phone}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    client: { ...prev.client, phone: e.target.value }
                  }))}
                />
                <Input 
                  type="email"
                  placeholder="Email"
                  value={formData.client.email}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    client: { ...prev.client, email: e.target.value }
                  }))}
                />
                <Input 
                  placeholder="Company Name"
                  value={formData.client.companyName}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    client: { ...prev.client, companyName: e.target.value }
                  }))}
                />
                <Input 
                  placeholder="Industry"
                  value={formData.client.industry}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    client: { ...prev.client, industry: e.target.value }
                  }))}
                />
              </div>
              <textarea
                className="w-full p-2 border rounded"
                placeholder="Address"
                rows={3}
                value={formData.client.address}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  client: { ...prev.client, address: e.target.value }
                }))}
              />
              <Button 
                onClick={handleClientSubmit}
                className="w-full"
              >
                Add Client
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="projects">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input 
                  placeholder="Project Name *"
                  value={formData.project.name}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    project: { ...prev.project, name: e.target.value }
                  }))}
                />
                <Select
                  value={formData.project.clientId}
                  onValueChange={(value) => setFormData(prev => ({
                    ...prev,
                    project: { ...prev.project, clientId: value }
                  }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Client" />
                  </SelectTrigger>
                  <SelectContent>
                    {lookupData.clients.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={formData.project.categoryId}
                  onValueChange={(value) => setFormData(prev => ({
                    ...prev,
                    project: { ...prev.project, categoryId: value }
                  }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {lookupData.projectCategories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input 
                  type="date"
                  placeholder="Start Date"
                  value={formData.project.startDate}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    project: { ...prev.project, startDate: e.target.value }
                  }))}
                />
                <Input 
                  type="date"
                  placeholder="End Date"
                  value={formData.project.endDate}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    project: { ...prev.project, endDate: e.target.value }
                  }))}
                />
                <Input 
                  type="number"
                  placeholder="Budget"
                  value={formData.project.budget}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    project: { ...prev.project, budget: e.target.value }
                  }))}
                />
                <Input 
                  type="number"
                  placeholder="Completion Percentage"
                  min="0"
                  max="100"
                  value={formData.project.completionPercentage}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    project: { ...prev.project, completionPercentage: e.target.value }
                  }))}
                />
              </div>
              <textarea
                className="w-full p-2 border rounded"
                placeholder="Description"
                rows={3}
                value={formData.project.description}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  project: { ...prev.project, description: e.target.value }
                }))}
              />
              <Button 
                onClick={handleProjectSubmit}
                className="w-full"
              >
                Add Project
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DatabaseForm;