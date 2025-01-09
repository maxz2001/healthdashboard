import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';

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
        <h3 className="text-lg font-medium">Blood Pressure History</h3>
        <select className="bg-white border border-gray-200 rounded p-1 text-sm">
          <option>Last 6 months</option>
        </select>
      </div>
      
      <div className="flex flex-row">
        <div className="flex-1">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="month"
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[60, 180]}
              ticks={[60, 80, 100, 120, 140, 160, 180]}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
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
        
        <div className="w-48 pt-8 pl-4">
          <div className="mb-6">
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-pink-500 mr-2"></div>
              <span className="text-gray-600">Systolic</span>
            </div>
            <div className="text-2xl font-bold my-1">160</div>
            <div className="text-gray-600 text-sm">
              ▲ Higher than Average
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
              <span className="text-gray-600">Diastolic</span>
            </div>
            <div className="text-2xl font-bold my-1">78</div>
            <div className="text-gray-600 text-sm">
              ▼ Lower than Average
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagnosisHistory;
