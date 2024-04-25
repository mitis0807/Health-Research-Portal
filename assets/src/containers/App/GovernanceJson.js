const columns = [
    { title: 'Policy Name', dataIndex: 'policyName', key: 'policyName' },
    { title: 'Uploaded By', dataIndex: 'uploadedBy', key: 'uploadedBy' },
    { title: 'Uploaded On', dataIndex: 'uploadedOn', key: 'uploadedOn' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    {
      title: 'Action', dataIndex: 'action', key: 'action', render: () => { return <span className="gx-link">View</span>; },
    },
  ];