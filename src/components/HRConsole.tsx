/**
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line 
} from 'recharts';
import { 
  Users, Award, Gift, Calendar, DollarSign, CheckCircle2, 
  XCircle, AlertCircle, Sparkles, TrendingUp, HeartHandshake, Eye 
} from 'lucide-react';

interface WelfareApproval {
  id: string;
  name: string;
  department: string;
  type: string;
  amount: string;
  details: string;
  date: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export default function HRConsole() {
  // Mock Welfare Claims with React State
  const [approvals, setApprovals] = useState<WelfareApproval[]>([
    {
      id: "WF-2026-101",
      name: "นัสริน สุขสวัสดิ์",
      department: "แผนกบริการลูกค้า (Customer Service Desk)",
      type: "สวัสดิการเล่าเรียนบุตร",
      amount: "15,000 ฿",
      details: "ค่าเทอมระดับอนุบาล 3 ภาคการศึกษา 1/2026 (แนบใบเสร็จโรงเรียนรัฐบาล)",
      date: "2026-06-11",
      status: "Pending"
    },
    {
      id: "WF-2026-102",
      name: "สมคิด มั่นคง",
      department: "ฝั่งคลังสินค้าลอจิสติกส์ (Logistics Hub B1)",
      type: "ค่ารักษาพยาบาลฉุกเฉิน",
      amount: "3,200 ฿",
      details: "โรคกรดไหลย้อนและกระเพาะอาหารอักเสบกะทันหัน โรงพยาบาลวิภาวดี",
      date: "2026-06-11",
      status: "Pending"
    },
    {
      id: "WF-2026-103",
      name: "กิตติศักดิ์ ชัยชนะ",
      department: "ลอจิสติกส์ & จัดซื้อ (Logistics Support Dept.)",
      type: "ตัดแว่นถนอมสายตากรองแสงสีฟ้า",
      amount: "4,500 ฿",
      details: "เลนส์มัลติโค้ทกรองคลื่นแสงคอมพิวเตอร์ อาการเหนื่อยล้าสายตารายงานแพทย์",
      date: "2026-06-12",
      status: "Pending"
    },
    {
      id: "WF-2026-104",
      name: "พิมพ์มาดา สุวรรณฉัตร",
      department: "ฝ่ายบัญชีและการเงิน (Accounting & Finance)",
      type: "วันหยุดพักร้อนพิเศษประจำปี (4 วัน)",
      amount: "-",
      details: "พักผ่อนเดินทางต่างจังหวัดกับครอบครัวและอัปเดตภูมิลำเนาเดิม",
      date: "2026-06-10",
      status: "Approved"
    }
  ]);

  const stats = [
    { label: "พนักงานลงทะเบียน", value: "348 คน", desc: "ซิงโครไนซ์กับ Entra ID", icon: Users, color: "text-blue-600" },
    { label: "งบสวัสดิการคงเหลือปี 2026", value: "1.42 ล้านบาท", desc: "โควต้าสะสม 71%", icon: DollarSign, color: "text-emerald-600" },
    { label: "ดัชนีความพึงพอใจบริการ", value: "94.8 %", desc: "เป้าหมายองค์กรคือ 90%", icon: Award, color: "text-violet-600" },
    { label: "คำร้องรออนุมัติ", value: `${approvals.filter(a => a.status === 'Pending').length} รายการ`, desc: "รอตรวจสอบความสอดคล้องนโยบาย", icon: Gift, color: "text-amber-500" },
  ];

  // Recharts Mock Series
  const chartData = [
    { name: 'สวัสดิการเล่าเรียนบุตร', budgetUsed: 420000, value: '420k' },
    { name: 'ค่ารักษาพยาบาล', budgetUsed: 310000, value: '310k' },
    { name: 'อุปกรณ์ช่วยทำงาน / แว่นสายตา', budgetUsed: 185000, value: '185k' },
    { name: 'อบรมพัฒนาตนเอง / สอบวิชาชีพ', budgetUsed: 220000, value: '220k' },
    { name: 'ตรวจสุขภาพ & กีฬา', budgetUsed: 95000, value: '95k' },
  ];

  const trendData = [
    { week: 'สัปดาห์ 1', claims: 12, approved: 10 },
    { week: 'สัปดาห์ 2', claims: 19, approved: 16 },
    { week: 'สัปดาห์ 3', claims: 24, approved: 21 },
    { week: 'สัปดาห์ 4', claims: 15, approved: 15 },
    { week: 'สัปดาห์ 5', claims: 30, approved: 26 },
  ];

  const handleAction = (id: string, action: 'Approved' | 'Rejected') => {
    setApprovals(approvals.map(apr => {
      if (apr.id === id) {
        return { ...apr, status: action };
      }
      return apr;
    }));
  };

  return (
    <div className="space-y-6" id="hr-console-root">
      {/* Title */}
      <div>
        <h3 className="text-md font-bold text-slate-900 flex items-center gap-2">
          <HeartHandshake className="text-blue-600" size={18} />
          <span>แดชบอร์ดความสุขพนักงานและระบบอนุมัติสวัสดิการ (HR Welfare Portal Console)</span>
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          ฟอร์มควบคุมและสถิติดึงข้อมูลจากกลุ่มแอปพลิเคชัน <code>Employee_Welfare_List</code> บน SharePoint ถอดสิทธิ์จัดตั้งนโยบายความมั่นคงความสุขโดยทีมงาน HR
        </p>
      </div>

      <hr className="border-white/40" />

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((st, idx) => {
          const Icon = st.icon;
          return (
            <div key={idx} className="bg-white/40 backdrop-blur-md p-4 rounded-xl border border-white/50 flex items-center justify-between shadow-xs">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">{st.label}</span>
                <span className="text-lg font-bold text-slate-900 block">{st.value}</span>
                <span className="text-[10px] text-slate-500 font-medium block">{st.desc}</span>
              </div>
              <div className="p-2.5 bg-white/60 border border-white rounded-lg">
                <Icon size={18} className={st.color} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Recharts Analytics Displays */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Graph 1: Welfare Budget Spent */}
        <div className="lg:col-span-2 bg-white/30 backdrop-blur-md p-5 rounded-2xl border border-white/45 flex flex-col justify-between">
          <div className="mb-4">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1">
              <TrendingUp size={14} className="text-blue-600" />
              สรุปงบประมาณที่พนักงานพึ่งเบิกตามรายจ่ายสวัสดิการ (SharePoint List Database Syncing)
            </h4>
            <p className="text-[11px] text-slate-500 mt-0.5">แบ่งตามชนิดกลุ่มใบเบิก อัปเดตรายชั่วโมงหน่วยเงิน (บาท)</p>
          </div>
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
                <Tooltip 
                  contentStyle={{ background: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px', fontSize: '11px', border: '1px solid #e2e8f0' }}
                  formatter={(value) => [`${(value as number).toLocaleString()} บาท`, 'งบประมาณที่ใช้']}
                />
                <Bar dataKey="budgetUsed" fill="#3b82f6" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#2563eb' : '#4f46e5'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Graph 2: Claims Approval Rate Trend */}
        <div className="bg-white/30 backdrop-blur-md p-5 rounded-2xl border border-white/45 flex flex-col justify-between">
          <div className="mb-4">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1">
              แนวโน้มคำเสนอเบิกและสัดส่วนผ่านสิทธิภาพปี 2026
            </h4>
            <p className="text-[11px] text-slate-400 mt-0.5">จำแนกตามจำนวนเคสที่ได้รับอนุมัติในรอบปีงบประมาณ</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="week" stroke="#64748b" fontSize={10} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
                <Tooltip contentStyle={{ background: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px', fontSize: '11.5px', border: '1px solid #e2e8f0' }} />
                <Line type="monotone" dataKey="claims" stroke="#3b82f6" strokeWidth={2} name="จำนวนที่ยื่น" />
                <Line type="monotone" dataKey="approved" stroke="#10b981" strokeWidth={2} name="อนุมัติสำเร็จ" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Welfare list approvals section */}
      <div className="bg-white/30 backdrop-blur-md border border-white/50 rounded-xl overflow-hidden shadow-xs">
        <div className="p-4 border-b border-white/40 bg-white/45 flex items-center justify-between">
          <div>
            <h4 className="text-xs font-bold text-slate-900">กระดานคิวอนุมัติจัดสิทธิพิเศษและวันหยุด (Pending Claims Inbox)</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">ดำเนินการในนามฝ่ายบุคคล หากกดอนุมัติ ระบบจะลงตรา SSO Microsoft Stamp ทันที</p>
          </div>
          <span className="bg-blue-105 bg-blue-100 text-blue-800 text-[10px] font-bold px-3 py-1 rounded-full border border-blue-200">
            {approvals.filter(a => a.status === 'Pending').length} เคนคำร้องรอวินิจฉัย
          </span>
        </div>

        <div className="divide-y divide-white/20">
          {approvals.map((apr) => {
            const statusStyles = 
              apr.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
              apr.status === 'Rejected' ? 'bg-rose-50 text-rose-700 border-rose-200' :
              'bg-amber-50 text-amber-700 border-amber-200 animate-pulse';

            return (
              <div key={apr.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-white/40 transition-colors">
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="font-mono text-[10.5px] text-blue-800 font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                      {apr.id}
                    </span>
                    <span className="text-xs font-bold text-slate-900">
                      {apr.name}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      ({apr.department})
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-slate-800 flex items-center gap-1">
                    <span>ประเภทเบิก:</span>
                    <span className="text-blue-700">{apr.type}</span>
                    {apr.amount !== '-' && (
                      <span className="bg-indigo-50 border border-indigo-100 text-indigo-700 py-0.5 px-1.5 rounded text-[10px] select-none">
                        ยอดสวัสดิการ: {apr.amount}
                      </span>
                    )}
                  </div>
                  <p className="text-slate-600 text-xs italic ml-1">
                    "{apr.details}"
                  </p>
                  <div className="text-[10px] text-slate-400 font-mono">
                    วันที่ส่งคำร้อง: {apr.date}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 md:self-center">
                  <div className={`px-2 py-1 text-[10px] font-bold rounded-lg border ${statusStyles} text-center min-w-[70px]`}>
                    {apr.status === 'Approved' && '✓ อนุมัติแล้ว'}
                    {apr.status === 'Rejected' && '✕ ปฏิเสธสิทธิ์'}
                    {apr.status === 'Pending' && '● รอพิจารณา'}
                  </div>

                  {apr.status === 'Pending' && (
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => handleAction(apr.id, 'Approved')}
                        className="p-1 px-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-bold cursor-pointer transition-colors flex items-center gap-0.5"
                      >
                        <CheckCircle2 size={13} />
                        <span>อนุมัติ</span>
                      </button>
                      <button
                        onClick={() => handleAction(apr.id, 'Rejected')}
                        className="p-1 px-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-[11px] font-bold cursor-pointer transition-colors flex items-center gap-0.5"
                      >
                        <XCircle size={13} />
                        <span>ปฏิเสธ</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
