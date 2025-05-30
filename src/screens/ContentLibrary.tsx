import React from 'react';
import { Search, Filter, MoreVertical } from 'lucide-react';

const ContentLibrary = () => {
  const contentItems = [
    {
      id: 1,
      title: "How AI is Transforming Content Creation",
      type: "Blog Post",
      date: "2024-03-15",
      status: "Published",
      posts: 12
    },
    {
      id: 2,
      title: "Social Media Marketing Tips for 2024",
      type: "Video",
      date: "2024-03-14",
      status: "Scheduled",
      posts: 8
    },
    {
      id: 3,
      title: "Digital Marketing Trends Podcast #45",
      type: "Podcast",
      date: "2024-03-13",
      status: "Draft",
      posts: 5
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Content Library</h1>
        <p className="text-gray-600">Manage and organize your content</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search content..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
            
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Filter size={20} />
                <span>Filter</span>
              </button>
              <button className="bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-800">
                Upload Content
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posts</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {contentItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{item.title}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500">{item.type}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500">{item.date}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${item.status === 'Published' ? 'bg-green-100 text-green-800' : 
                        item.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' : 
                        'bg-gray-100 text-gray-800'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500">{item.posts}</div>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-gray-400 hover:text-gray-500">
                      <MoreVertical size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ContentLibrary;