import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const DiagnosisHistory = () => {
  const data = [
    { month: 'Oct, 2023', systolic: 120, diastolic: 100 },
    { month: 'Nov, 2023', systolic: 118, diastolic: 70 },
    { month: 'Dec, 2023', systolic: 160, diastolic: 110 },
    { month: 'Jan, 2024', systolic: 115, diastolic: 95 },
    { month: 'Feb, 2024', systolic: 148, diastolic: 75 },
    { month: 'Mar, 2024', systolic: 160, diastolic: 78 }
  ];

  return (
    <div className="w-full bg-purple-50 p-6 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Blood Pressure</h3>
        <select className="bg-transparent border-none text-gray-600 text-sm focus:outline-none cursor-pointer">
          <option>Last 6 months</option>
        </select>
      </div>
      <div className="flex">
        <div className="flex-1">
          <LineChart
            width={500}
            height={250}
            data={data}
            margin={{ top: 5, right: 30, bottom: 20, left: -20 }}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              horizontal={true}
              vertical={false}
            />
            <XAxis 
              dataKey="month" 
              interval={0}
              tick={{ fontSize: 12, fill: '#666' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              domain={[60, 180]} 
              ticks={[60, 80, 100, 120, 140, 160, 180]}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#666' }}
            />
            <Line 
              type="monotone" 
              dataKey="systolic" 
              stroke="#E91E63"
              strokeWidth={2}
              dot={{ r: 4, fill: '#E91E63' }}
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="diastolic" 
              stroke="#9C27B0"
              strokeWidth={2}
              dot={{ r: 4, fill: '#9C27B0' }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </div>
        <div className="ml-8 flex-none w-48 pt-8">
          <div className="mb-8">
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-pink-500 mr-2"></div>
              <div className="text-gray-600">Systolic</div>
            </div>
            <div className="text-3xl font-bold my-1">160</div>
            <div className="text-gray-600 text-sm flex items-center">
              <span className="mr-1">▲</span> Higher than Average
            </div>
          </div>
          <div className="mb-8">
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
              <div className="text-gray-600">Diastolic</div>
            </div>
            <div className="text-3xl font-bold my-1">78</div>
            <div className="text-gray-600 text-sm flex items-center">
              <span className="mr-1">▼</span> Lower than Average
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagnosisHistory;