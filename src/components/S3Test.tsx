import React, { useState } from 'react';
import { getPresignedUrl } from '../lib/s3';

const S3Test: React.FC = () => {
  const [testResult, setTestResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const testS3Connection = async () => {
    setIsLoading(true);
    setError(null);
    setTestResult('');

    try {
      // Create a small test file
      const testFile = new File(['test content'], 'test.txt', { type: 'text/plain' });

      // Try to get a presigned URL
      const { url, key } = await getPresignedUrl(testFile.name, testFile.type);

      // Try to upload the file
      const response = await fetch(url, {
        method: 'PUT',
        body: testFile,
        headers: {
          'Content-Type': testFile.type,
        },
      });

      if (response.ok) {
        setTestResult(`✅ S3 bucket is properly configured and accessible!
          - Successfully generated presigned URL
          - Successfully uploaded test file
          - File key: ${key}`);
      } else {
        throw new Error(`Upload failed with status: ${response.status}`);
      }
    } catch (err) {
      setError(`❌ S3 bucket test failed: ${err.message}`);
      console.error('S3 test error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">AWS S3 Connection Test</h2>
      
      <button
        onClick={testS3Connection}
        disabled={isLoading}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
      >
        {isLoading ? 'Testing...' : 'Test S3 Connection'}
      </button>

      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {testResult && (
        <div className="mt-4 p-4 bg-green-50 text-green-700 rounded-lg whitespace-pre-line">
          {testResult}
        </div>
      )}

      <div className="mt-6 text-sm text-gray-600">
        <p>This test will:</p>
        <ul className="list-disc ml-5 mt-2">
          <li>Generate a presigned URL for upload</li>
          <li>Upload a small test file to your S3 bucket</li>
          <li>Verify the upload was successful</li>
        </ul>
      </div>
    </div>
  );
};

export default S3Test;