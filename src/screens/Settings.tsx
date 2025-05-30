import React from 'react';
import S3Test from '../components/S3Test';

function Settings() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Settings</h1>
      <div className="space-y-6">
        <S3Test />
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Other Settings</h2>
          <p className="text-gray-600">Additional settings content will go here</p>
        </div>
      </div>
    </div>
  );
}

export default Settings;