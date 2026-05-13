import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { 
  ArrowLeft, 
  Download, 
  Users, 
  Vote, 
  MessageSquare, 
  Search,
  Filter
} from 'lucide-react';
import { motion } from 'motion/react';

interface AdminDashboardProps {
  onBack: () => void;
}

// Mock Data for UI Preview
const mockStats = [
  { name: '세일즈윈', votes: 45, color: '#ea580c' },
  { name: 'Solution+', votes: 32, color: '#f97316' },
  { name: 'AI링크', votes: 28, color: '#fb923c' },
  { name: '에이슈어', votes: 15, color: '#fdba74' },
  { name: '아이온', votes: 12, color: '#fed7aa' },
];

const mockResponses = [
  { id: 1, empId: 'H2024001', choice: '세일즈윈', opinion: '직관적이고 기억하기 쉽습니다.', date: '2024-05-13' },
  { id: 2, empId: 'H2023152', choice: 'Solution+', opinion: '종합적인 느낌이 들어서 좋습니다.', date: '2024-05-13' },
  { id: 3, empId: 'H2024042', choice: 'AI링크', opinion: '연결이라는 키워드가 브랜드와 잘 맞네요.', date: '2024-05-12' },
  { id: 4, empId: 'H2022098', choice: '세일즈윈', opinion: '', date: '2024-05-12' },
  { id: 5, empId: 'H2021005', choice: '아이온', opinion: '스마트한 이미지가 강조되네요.', date: '2024-05-12' },
];

export default function AdminDashboard({ onBack }: AdminDashboardProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Admin Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-black text-gray-900 leading-none mb-1">관리자 대시보드</h1>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Naming Survey Admin</p>
            </div>
          </div>
          
          <button className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-orange-100 hover:bg-orange-700 transition-colors">
            <Download className="w-4 h-4" />
            결과 다운로드 (CSV)
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto p-6 space-y-6">
        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5">
            <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center">
              <Vote className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase mb-1">총 투표 수</p>
              <h3 className="text-2xl font-black text-gray-900">132 <span className="text-sm font-medium text-gray-400">표</span></h3>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase mb-1">참여 인원</p>
              <h3 className="text-2xl font-black text-gray-900">128 <span className="text-sm font-medium text-gray-400">명</span></h3>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5">
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase mb-1">추가 의견 수</p>
              <h3 className="text-2xl font-black text-gray-900">42 <span className="text-sm font-medium text-gray-400">건</span></h3>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-black text-gray-900 mb-6 flex items-center gap-2">
              <div className="w-2 h-6 bg-orange-600 rounded-full" />
              네이밍 선호도 현황
            </h3>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockStats} layout="vertical" margin={{ left: 20, right: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f3f4f6" />
                  <XAxis type="number" hide />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 13, fontWeight: 700, fill: '#111827' }}
                    width={100}
                  />
                  <Tooltip 
                    cursor={{ fill: '#f9731610' }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Bar dataKey="votes" radius={[0, 10, 10, 0]} barSize={24}>
                    {mockStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-black text-gray-900 mb-6 flex items-center gap-2">
              <div className="w-2 h-6 bg-blue-600 rounded-full" />
              투표 비율
            </h3>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockStats}
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="votes"
                  >
                    {mockStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap justify-center gap-4 mt-2">
                {mockStats.map((s) => (
                  <div key={s.name} className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                    <span className="text-xs font-bold text-gray-500">{s.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Responses Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
            <h3 className="text-lg font-black text-gray-900">상세 응답 데이터</h3>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                <input 
                  type="text" 
                  placeholder="사번 또는 내용 검색"
                  className="pl-9 pr-4 h-10 bg-white border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none w-48 lg:w-64"
                />
              </div>
              <button className="p-2 border border-gray-200 rounded-xl bg-white text-gray-400 hover:text-gray-600 transition-colors">
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">참여일시</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">사번</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">네이밍 선택</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">추가 의견</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {mockResponses.map((res) => (
                  <tr key={res.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 text-xs font-bold text-gray-500">{res.date}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-[10px] font-black uppercase">{res.empId}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-black text-orange-600">{res.choice}</span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-xs text-gray-600 font-medium max-w-md truncate">
                        {res.opinion || <span className="text-gray-300 italic font-normal">없음</span>}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-gray-50 bg-gray-50/30 text-center">
            <button className="text-xs font-bold text-orange-600 hover:underline">더 보기 (현재 5개 행 표시)</button>
          </div>
        </div>
      </main>

      <footer className="py-8 text-center text-[10px] font-bold text-gray-300 uppercase tracking-widest border-t border-gray-100 bg-white">
        &copy; 2024 Hanwha Life. All Rights Reserved.
      </footer>
    </div>
  );
}
