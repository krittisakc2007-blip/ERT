/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ITTicket, EntraUser } from '../types';
import { initialTickets } from '../data/mockData';
import { 
  Plus, Search, HelpCircle, FileText, CheckCircle2, 
  AlertCircle, ShieldAlert, Clock, RefreshCw, Send, Check
} from 'lucide-react';

interface TicketManagerProps {
  user: EntraUser;
  tickets: ITTicket[];
  setTickets: React.Dispatch<React.SetStateAction<ITTicket[]>>;
}

export default function TicketManager({ user, tickets, setTickets }: TicketManagerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  
  // Form State
  const [showAddForm, setShowAddForm] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState('Hardware Desk');
  const [formPriority, setFormPriority] = useState<'Low' | 'Medium' | 'High' | 'Critical'>('Medium');
  const [formDescription, setFormDescription] = useState('');
  const [validationError, setValidationError] = useState('');
  
  // State for showing full details of a specific ticket
  const [viewTicket, setViewTicket] = useState<ITTicket | null>(null);
  const [newComment, setNewComment] = useState('');

  const categories = [
    'Hardware Desk', 
    'Software & License', 
    'Network & VPN', 
    'Access & Account', 
    'Workday / ERP Support', 
    'Others'
  ];

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      setValidationError('กรุณาระบุหัวข้อคำร้องเรียนหรืออุปกรณ์ชำรุด');
      return;
    }
    if (!formDescription.trim()) {
      setValidationError('กรุณาอธิบายอาการชำรุดเพื่อให้เจ้าหน้าที่วิเคราะห์ล่วงหน้า');
      return;
    }

    const uniqueId = `IT-2026-${String(tickets.length + 1).padStart(3, '0')}`;
    const newTicket: ITTicket = {
      id: uniqueId,
      title: formTitle,
      category: formCategory,
      priority: formPriority,
      description: formDescription,
      status: 'New',
      requesterEmail: user.email,
      requesterName: user.name,
      createdDate: new Date().toISOString().replace('T', ' ').slice(0, 16)
    };

    setTickets([newTicket, ...tickets]);
    
    // Clear state
    setFormTitle('');
    setFormCategory('Hardware Desk');
    setFormPriority('Medium');
    setFormDescription('');
    setValidationError('');
    setShowAddForm(false);
  };

  const handleUpdateStatus = (ticketId: string, newStatus: ITTicket['status']) => {
    setTickets(tickets.map(t => {
      if (t.id === ticketId) {
        return { ...t, status: newStatus };
      }
      return t;
    }));
    if (viewTicket && viewTicket.id === ticketId) {
      setViewTicket({ ...viewTicket, status: newStatus });
    }
  };

  const handleAssignToMe = (ticketId: string) => {
    const defaultAssignment = `${user.name} (IT Specialist)`;
    setTickets(tickets.map(t => {
      if (t.id === ticketId) {
        return { ...t, assignedTo: defaultAssignment };
      }
      return t;
    }));
    if (viewTicket && viewTicket.id === ticketId) {
      setViewTicket({ ...viewTicket, assignedTo: defaultAssignment });
    }
  };

  const handleAddComment = (ticketId: string) => {
    if (!newComment.trim()) return;
    setTickets(tickets.map(t => {
      if (t.id === ticketId) {
        return { ...t, comment: newComment };
      }
      return t;
    }));
    if (viewTicket) {
      setViewTicket({ ...viewTicket, comment: newComment });
    }
    setNewComment('');
  };

  const filteredTickets = tickets.filter(t => {
    // RBAC: Roles can filter the tickets visible
    // General employees can ONLY see their own tickets
    if (user.role === 'Employee' && t.requesterEmail !== user.email) {
      return false;
    }

    // HR Admin can see all but let's highlight or show everything.
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6" id="ticket-manager-container">
      
      {/* Header and Add Button */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">รายการแจ้งปัญหาไอที (IT Service Desk Center)</h2>
          <p className="text-xs text-slate-500 mt-1">
            พนักงานสามารถติดตามสถานะใบแจ้งความประสงค์ไอที และส่งข้อมูลที่ซิงค์กับฐานข้อมูล SharePoint List <code>IT_Tickets</code>
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-2 px-4 rounded-xl shadow-md shadow-blue-200 hover:shadow-lg transition-all flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>เขียนคำร้องแจ้งซ่อม / บริการไอที</span>
        </button>
      </div>

      {/* Ticket Create Form Modal / Dropdown Accordion */}
      {showAddForm && (
        <div className="bg-white/30 backdrop-blur-md border border-white/50 rounded-xl p-5 md:p-6 transition-all duration-300">
          <div className="flex justify-between items-start mb-4 border-b border-white/45 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">กรอกข้อมูลคำร้อง (บันทึกลง SharePoint โดยตรง)</h3>
              <p className="text-[10.5px] text-slate-500 mt-0.5">กรุณาให้ข้อมูลตามความเป็นจริงเพื่อความรวดเร็วในการจัดสรรคิวรับเรื่อง</p>
            </div>
            <button
              onClick={() => setShowAddForm(false)}
              className="text-slate-400 hover:text-slate-600 font-semibold text-xs py-1 px-2.5 rounded bg-white border border-slate-200"
            >
              ปิดฟอร์ม
            </button>
          </div>

          <form onSubmit={handleCreateTicket} className="space-y-4">
            {validationError && (
              <div className="bg-rose-50 border border-rose-200 text-rose-800 text-xs p-3 rounded-lg flex items-center gap-2">
                <AlertCircle size={15} />
                <span>{validationError}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                  หัวข้อแจ้งปัญหา / อุปกรณ์ขำรุด <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="เช่น: หน้าจอโน้ตบุ๊กกระพริบ, รีเซ็ตรหัสผ่าน Workday, ขอเพิ่มเครื่องปริ้นแผนก"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full px-3 py-2 glass-input rounded-lg text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                  ระดับความเร่งด่วน (Priority)
                </label>
                <select
                  value={formPriority}
                  onChange={(e: any) => setFormPriority(e.target.value)}
                  className="w-full px-3 py-2 glass-input rounded-lg text-xs focus:outline-none"
                >
                  <option value="Low">Low - ทั่วไป / ไม่กระทบงาน</option>
                  <option value="Medium">Medium - ปานกลาง</option>
                  <option value="High">High - สูง / กระทบการทำงาน</option>
                  <option value="Critical">Critical - วิกฤต / ระบบหลักล่ม</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                  หมวดหมู่ปัญหา (Category)
                </label>
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                  className="w-full px-3 py-2 glass-input rounded-lg text-xs focus:outline-none"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-1.5">
                  ผู้รับรองสิทธิ์ (สืบค้นจาก Entra ID อัตโนมัติ)
                </label>
                <div className="bg-white/40 backdrop-blur-md text-slate-700 px-3 py-2 rounded-lg text-xs font-medium border border-white/50 truncate">
                  {user.name} ({user.email})
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                รายละเอียดขั้นตอนหรืออาการผิดปกติ <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={3}
                placeholder="ระบุอาการชำรุด รหัสอุปกรณ์ (Asset Tag), บัญชีโปรแกรมที่มีปัญหา หรือข้อมูลภาพประกอบรวมถึงเบอร์ติดต่อกลับอย่างละเอียด..."
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
                className="w-full px-3 py-2 glass-input rounded-lg text-xs focus:outline-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 font-semibold text-xs py-2 px-4 rounded-lg cursor-pointer"
              >
                ยกเลิก
              </button>
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs py-2 px-5 rounded-lg shadow-sm shadow-emerald-100 flex items-center gap-1 cursor-pointer"
              >
                <Send size={13} />
                <span>บันทึกลง SharePoint List</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Searching & Filter Headers */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 bg-white/20 backdrop-blur-md p-3 rounded-xl border border-white/40">
        
        {/* Status Filters */}
        <div className="flex flex-wrap gap-1">
          {['All', 'New', 'In Progress', 'Resolved'].map((stat) => (
            <button
              key={stat}
              onClick={() => setStatusFilter(stat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                statusFilter === stat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-700 hover:bg-white/60 bg-white/40 border border-white/50'
              }`}
            >
              {stat === 'All' ? 'ตั๋วไอทีทั้งหมด' : 
               stat === 'New' ? 'ตั๋วเข้าใหม่ (New)' :
               stat === 'In Progress' ? 'กำลังดำเนินการ (In Progress)' :
               'ซ่อมเสร็จแล้ว (Resolved)'}
            </button>
          ))}
        </div>

        {/* Input Search */}
        <div className="relative w-full md:w-72">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="ค้นหาตามชื่อโจทย์ตั๋ว, รายละเอียด..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 glass-input rounded-lg text-xs focus:outline-none"
          />
        </div>
      </div>

      {/* Dynamic Interactive List */}
      <div className="bg-white/30 backdrop-blur-md border border-white/50 rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/45 border-b border-white/50 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">เลขตั๋ว (SharePoint ID)</th>
                <th className="py-3.5 px-4">ประเด็นปัญหา / หัวข้อ</th>
                <th className="py-3.5 px-4">หมวดหมู่</th>
                <th className="py-3.5 px-3 whitespace-nowrap">ความสำคัญ</th>
                <th className="py-3.5 px-4 text-center">สถานะ</th>
                <th className="py-3.5 px-4 text-right">วันแจ้ง</th>
                <th className="py-3.5 px-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredTickets.map((tc) => {
                // Priority badges colors
                const priorityStyles = 
                  tc.priority === 'Critical' ? 'bg-red-50 text-red-700 border-red-200 font-bold' :
                  tc.priority === 'High' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                  tc.priority === 'Medium' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                  'bg-slate-100 text-slate-600 border-slate-200';

                // Status badges
                const statusStyles = 
                  tc.status === 'New' ? 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-700/10' :
                  tc.status === 'In Progress' ? 'bg-amber-50 text-amber-700 ring-1 ring-amber-700/10' :
                  tc.status === 'Resolved' ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-700/10' :
                  'bg-slate-100 text-slate-500';

                return (
                  <tr key={tc.id} className="hover:bg-white/40 transition-colors">
                    <td className="py-4 px-4 font-mono text-slate-700 font-bold whitespace-nowrap">
                      {tc.id}
                    </td>
                    <td className="py-4 px-4 font-semibold text-slate-900 max-w-xs sm:max-w-medium truncate">
                      {tc.title}
                    </td>
                    <td className="py-4 px-4 text-slate-500 font-medium">
                      {tc.category}
                    </td>
                    <td className="py-4 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] border ${priorityStyles}`}>
                        {tc.priority}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${statusStyles}`}>
                        {tc.status === 'New' && 'ตั๋วใหม่'}
                        {tc.status === 'In Progress' && 'กำลังแก้ปัญหา'}
                        {tc.status === 'Resolved' && 'ซ่อมเรียบร้อย'}
                        {tc.status === 'Pending Info' && 'รอพนักงานชี้แจง'}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-slate-400 text-right whitespace-nowrap font-mono text-[11px]">
                      {tc.createdDate}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => setViewTicket(tc)}
                        className="bg-slate-905 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-[11px] py-1.5 px-3 rounded-lg transition-colors cursor-pointer"
                      >
                        รายละเอียด
                      </button>
                    </td>
                  </tr>
                );
              })}

              {filteredTickets.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-slate-400 bg-slate-50/50">
                    <FileText className="mx-auto mb-2 text-slate-200 stroke-1" size={32} />
                    ไม่พบรายการตั๋วปัญหาบริการทางเทคนิคตามเงื่อนไขค้นหา
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ticket Details Sidebar / Modal Dialog */}
      {viewTicket && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all">
          <div className="glass-card rounded-xl shadow-xl w-full max-w-xl overflow-hidden !bg-white/70">
            
            {/* Modal Top */}
            <div className="bg-slate-950 text-white p-5 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FileText size={18} className="text-blue-400" />
                <div>
                  <h3 className="font-bold text-sm">ข้อมูลใบงานทางเทคนิค {viewTicket.id}</h3>
                  <p className="text-[10px] text-slate-400">โครงสร้างรายการตรงตาม SharePoint List เที่ยงตรง</p>
                </div>
              </div>
              <button 
                onClick={() => setViewTicket(null)}
                className="text-slate-400 hover:text-white transition-colors text-xs font-bold font-mono px-2 py-1 rounded bg-slate-900"
              >
                [X] ปิด
              </button>
            </div>

            {/* Modal Info Content */}
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block mb-0.5">หมวดหมู่รายการ</span>
                  <span className="font-semibold text-slate-950">{viewTicket.category}</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">ระดับความสำคัญ</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                    viewTicket.priority === 'Critical' ? 'bg-red-50 text-red-700 border-red-200' :
                    viewTicket.priority === 'High' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                    'bg-slate-100 text-slate-600 border-slate-200'
                  }`}>
                    {viewTicket.priority}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">ผู้ยื่นคำร้อง</span>
                  <span className="font-medium text-slate-800">{viewTicket.requesterName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">วันที่ถูกสร้าง</span>
                  <span className="font-mono text-slate-600">{viewTicket.createdDate}</span>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-3">
                <span className="text-slate-400 text-xs block mb-1">หัวข้อเรื่อง</span>
                <h4 className="text-sm font-bold text-slate-900 leading-snug">{viewTicket.title}</h4>
              </div>

              <div className="bg-white/40 backdrop-blur-md rounded-lg p-3 border border-white/50 text-xs text-slate-700 leading-relaxed">
                <span className="text-slate-400 text-[10px] font-bold block uppercase mb-1">รายละเอียดชำรุดชี้แจง:</span>
                {viewTicket.description}
              </div>

              {/* Assignments field representation */}
              <div className="border-t border-slate-100 pt-3 flex flex-col sm:flex-row gap-3 justify-between text-xs">
                <div>
                  <span className="text-slate-400 block mb-0.5">เจ้าหน้าที่ดูแลเคส (Assigned Specialist)</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-blue-700">{viewTicket.assignedTo || "รอดึงเรื่องเข้าสายซ่อมบำรุงกลาง..."}</span>
                    {user.role === 'IT_Support' && (!viewTicket.assignedTo || !viewTicket.assignedTo.includes(user.name)) && (
                      <button
                        onClick={() => handleAssignToMe(viewTicket.id)}
                        className="px-2 py-0.5 bg-blue-100 hover:bg-blue-200 text-blue-800 text-[10px] font-bold rounded cursor-pointer transition-colors"
                      >
                        รับเคสนี้
                      </button>
                    )}
                  </div>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">สถานะพอร์ทัล</span>
                  {user.role === 'IT_Support' ? (
                    <select
                      value={viewTicket.status}
                      onChange={(e) => handleUpdateStatus(viewTicket.id, e.target.value as any)}
                      className="px-2 py-1 bg-white border border-slate-300 rounded font-mono text-[10px] font-bold focus:outline-none"
                    >
                      <option value="New">NEW (ตั๋วใหม่)</option>
                      <option value="In Progress">IN PROGRESS (กำลังตรวจสอบ)</option>
                      <option value="Pending Info">PENDING INFO (รอข้อมูล)</option>
                      <option value="Resolved">RESOLVED (แก้ไขเสร็จสิ้น)</option>
                      <option value="Closed">CLOSED (ปิดตั๋วบริการ)</option>
                    </select>
                  ) : (
                    <span className="px-2 py-0.5 bg-slate-900 text-white rounded text-[10px] font-bold font-mono uppercase">{viewTicket.status}</span>
                  )}
                </div>
              </div>

              {/* Notes / Comment section representing SharePoint lookup */}
              <div className="border-t border-slate-100 pt-3 space-y-2">
                <label className="text-[11px] font-bold text-slate-400 block uppercase">ความเห็นและบันทึกจากช่างไอที (SharePoint Comments Log)</label>
                {viewTicket.comment ? (
                  <div className="bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs p-3 rounded-lg flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">เจ้าหน้าที่บันทึก:</span> {viewTicket.comment}
                    </div>
                  </div>
                ) : (
                  <p className="text-[11.5px] text-slate-400 italic">ยังไม่มีข้อสังเกตเพิ่มเติมจากช่างไอที พนักงานสามารถฝากแชทโน้ตด้านล่างได้</p>
                )}

                {/* Simulated direct client additions */}
                <div className="flex gap-2 mt-2">
                  <input
                    type="text"
                    placeholder={user.role === 'IT_Support' ? "พิมพเหตุผลทางเทคนิค / ระบุแนวทางแก้ไข..." : "พิมพ์ส่งเหตุการณ์คืบหน้า หรือรหัสปัญหาเพิ่มเติม..."}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="flex-1 px-3 py-1.5 glass-input rounded-lg text-xs focus:outline-none"
                  />
                  <button
                    onClick={() => handleAddComment(viewTicket.id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer"
                  >
                    {user.role === 'IT_Support' ? 'บันทึกหมายเหตุไอที' : 'ฝากข้อความ'}
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Bottom actions */}
            <div className="bg-slate-50 p-4 border-t border-slate-100 flex justify-end gap-2">
              <button
                onClick={() => setViewTicket(null)}
                className="bg-slate-900 hover:bg-slate-800 text-white rounded-lg px-4 py-1.5 text-xs font-semibold cursor-pointer"
              >
                ปิดหน้าจอ
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
