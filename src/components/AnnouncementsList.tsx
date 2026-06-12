/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Announcement, EntraUser } from '../types';
import { mockAnnouncements } from '../data/mockData';
import { Bell, AlertTriangle, Calendar, User, Eye, ArrowUpRight, Search, Filter, BookOpen, Clock, Plus, Send } from 'lucide-react';

interface AnnouncementsListProps {
  user: EntraUser;
}

export default function AnnouncementsList({ user }: AnnouncementsListProps) {
  const [announcements, setAnnouncements] = useState<Announcement[]>(mockAnnouncements);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Form State for publishing Announcements (Only for HR_Admin and IT_Support)
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newBody, setNewBody] = useState('');
  const [newCat, setNewCat] = useState<'IT Update' | 'HR News' | 'General' | 'Security'>('HR News');
  const [isUrgent, setIsUrgent] = useState(false);

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newBody.trim()) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    const item: Announcement = {
      id: `AN-00${announcements.length + 1}`,
      title: newTitle,
      body: newBody,
      category: newCat,
      publishedDate: new Date().toISOString().split('T')[0],
      author: `${user.name} (${user.role === 'IT_Admin' ? 'IT Admin Director' : 'IT Support Specialist'})`,
      urgent: isUrgent
    };

    setAnnouncements([item, ...announcements]);
    setNewTitle('');
    setNewBody('');
    setIsUrgent(false);
    setShowAddForm(false);
  };

  const filtered = announcements.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.body.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ['All', 'IT Update', 'HR News', 'Security', 'General'];

  return (
    <div className="space-y-4" id="announcements-section">
      
      {/* Publisher Action for HR & IT */}
      {(user.role === 'IT_Admin' || user.role === 'IT_Support') && (
        <div className="bg-blue-50/50 border border-blue-200/50 rounded-2xl p-4 md:p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h4 className="text-xs font-bold text-blue-800 uppercase tracking-wider">แผงควบคุมฝ่ายบริหารเพื่อการประชาสัมพันธ์ (Publishing Console)</h4>
            <p className="text-[11.5px] text-slate-600 mt-1">คุณล็อกอินในสิทธิ์ <strong>{user.role === 'IT_Admin' ? 'ผู้ดูแลระบบไอที (IT Admin)' : 'วิศวกรซัพพอร์ตระบบ (IT Support)'}</strong> คุณได้รับสิทธิ์เพิ่มประกาศและแชร์ข้อมูลองค์กรลง SharePoint <code>Announcements</code> List ได้</p>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-2 px-4 rounded-xl flex items-center gap-1.5 transition-all shadow-sm shadow-blue-200 self-start md:self-auto cursor-pointer"
          >
            <Plus size={15} />
            <span>{showAddForm ? 'ปิดฟอร์มร่างประกาศ' : 'เขียนประกาศสวัสดิการ/อัปเดตระบบ'}</span>
          </button>
        </div>
      )}

      {/* Renders News Creation Form */}
      {showAddForm && (
        <div className="bg-white/30 backdrop-blur-md border border-white/50 rounded-2xl p-5 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-200/50 pb-2 mb-4">เขียนคำแถลงและข่าวสารประชาสัมพันธ์ฉบับใหม่</h3>
          <form onSubmit={handlePublish} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">หัวข้อข่าวแนะนำ / ชื่อเรื่องประกาศ *</label>
                <input
                  type="text"
                  required
                  placeholder="เช่น: ประกาศเปิดรับกองเงินสะสมสวัสดิการพนักงานใหม่, พนักงานอัปเกรดอีเมล..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs glass-input rounded-lg focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">วัตถุประสงค์ / หมวดหมู่เผยแพร่</label>
                <select
                  value={newCat}
                  onChange={(e: any) => setNewCat(e.target.value)}
                  className="w-full px-3 py-2 text-xs glass-input rounded-lg focus:outline-none"
                >
                  <option value="HR News">HR News - สวัสดิการพนักงาน ข่าวประเพณีฝ่ายบุคคล</option>
                  <option value="IT Update">IT Update - การบำรุงรักษาคอมพิวเตอร์และระบบหลัก</option>
                  <option value="Security">Security - ด่วนพิเศษความปลอดภัย รหัสผ่าน เครือข่ายบกพร่อง</option>
                  <option value="General">General - ข่าวประชาสัมพันธ์สมาคมทั่วไป</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">เนื้อหารายละเอียดประกาศตัวเต็ม *</label>
              <textarea
                required
                rows={4}
                placeholder="ระบุข้อความแนะแนวทางอธิบาย สิทธิประโยชน์พนักงาน ช่องทางดำเนินการ หรือเบอร์ติดต่อผู้ประสานงานหลัก..."
                value={newBody}
                onChange={(e) => setNewBody(e.target.value)}
                className="w-full px-3 py-2 text-xs glass-input rounded-lg focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center space-x-2 text-xs font-semibold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isUrgent}
                  onChange={(e) => setIsUrgent(e.target.checked)}
                  className="h-4 w-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                />
                <span className="text-rose-600 font-bold flex items-center gap-1">
                  <AlertTriangle size={13} />
                  ทำเครื่องหมายเป็นประกาศสำคัญและด่วนพิเศษสูงสุด (Urgent Flash News)
                </span>
              </label>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Send size={13} />
                  <span>ประกาศลงระบบ (Publish)</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white/20 backdrop-blur-md p-3 rounded-xl border border-white/40">
        <div className="inline-flex items-center space-x-1 bg-white/45 backdrop-blur-sm p-1 rounded-lg border border-white/50">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-700 hover:bg-white/40'
              }`}
            >
              {cat === 'All' ? 'ข่าวสารทั้งหมด' : cat}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="ค้นหาประกาศ ข่าวสารประชาสัมพันธ์..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4 py-1.5 glass-input rounded-lg text-xs w-full md:w-64 focus:outline-none"
          />
        </div>
      </div>

      {/* Announcements Bento-style Grid or Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedAnnouncement(item)}
            className={`cursor-pointer glass-card rounded-xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg relative overflow-hidden flex flex-col justify-between group h-full ${
              item.urgent 
                ? '!border-rose-300/60 shadow-xs shadow-rose-50' 
                : ''
            }`}
          >
            {/* Top alert badge for critical news */}
            {item.urgent && (
              <div className="absolute top-0 right-0 bg-rose-500 text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-bl-lg flex items-center gap-1">
                <AlertTriangle size={11} />
                <span>ประกาศด่วนพิเศษ</span>
              </div>
            )}

            <div>
              <div className="flex items-center space-x-2 text-[11px] font-medium text-slate-500 mb-3">
                <span className={`px-2 py-0.5 rounded-full font-semibold text-[10px] ${
                  item.category === 'Security' ? 'bg-amber-100/60 text-amber-800 border border-amber-200/50' :
                  item.category === 'IT Update' ? 'bg-blue-100/60 text-blue-800 border border-blue-200/50' :
                  item.category === 'HR News' ? 'bg-violet-100/60 text-violet-800 border border-violet-200/50' :
                  'bg-white/50 border border-slate-200/60 text-slate-700'
                }`}>
                  {item.category}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={12} />
                  {item.publishedDate}
                </span>
              </div>

              <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-relaxed">
                {item.title}
              </h4>

              <p className="text-slate-600 text-xs mt-2 line-clamp-3 leading-relaxed">
                {item.body}
              </p>
            </div>

            <div className="mt-4 pt-4 border-t border-white/40 flex items-center justify-between">
              <span className="text-[10px] text-slate-400 flex items-center gap-1 font-medium truncate max-w-[70%]">
                <User size={11} />
                {item.author}
              </span>
              <span className="text-[11px] text-blue-600 font-bold flex items-center gap-0.5 opacity-80 group-hover:opacity-100 transition-opacity">
                <span>อ่านเนื้อหา</span>
                <ArrowUpRight size={13} className="pt-0.5" />
              </span>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full bg-slate-50 border border-slate-100 py-12 rounded-xl text-center">
            <Bell className="mx-auto text-slate-300 stroke-1 mb-2" size={40} />
            <p className="text-xs text-slate-500">ไม่พบประกาศหรือข่าวสารถัดไปตามตัวกรองปัจจุบัน</p>
          </div>
        )}
      </div>

      {/* Details Announcement Modal */}
      {selectedAnnouncement && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all">
          <div className="glass-card rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden !bg-white/70">
            
            <div className={`p-5 text-white flex items-center justify-between ${
              selectedAnnouncement.urgent ? 'bg-rose-600' : 'bg-slate-900'
            }`}>
              <div className="flex items-center space-x-2">
                <Bell size={18} />
                <div>
                  <h3 className="font-bold text-sm">อ่านข่าวประชาสัมพันธ์ภายในองค์กร</h3>
                  <p className="text-[10px] text-white/70">ข้อมูลดึงและซิงโครไนซ์อัตโนมัติจาก SharePoint List <code>Announcements</code></p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedAnnouncement(null)}
                className="text-white/80 hover:text-white transition-colors text-xs font-bold bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg"
              >
                ปิด (Close)
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center space-x-3 text-xs text-slate-400">
                <span className="bg-white/60 border border-slate-200/50 text-slate-700 px-2.5 py-1 rounded-full font-semibold">
                  {selectedAnnouncement.category}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 font-medium">
                  <User size={13} />
                  ผู้เขียน: {selectedAnnouncement.author}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 font-medium">
                  <Calendar size={13} />
                  วันที่โพสต์: {selectedAnnouncement.publishedDate}
                </span>
              </div>

              <h2 className="text-lg font-bold text-slate-900 leading-snug">
                {selectedAnnouncement.title}
              </h2>

              <hr className="border-white/40" />

              <div className="text-slate-700 text-xs leading-relaxed space-y-3 bg-white/40 backdrop-blur-md p-4 rounded-xl border border-white/60">
                {selectedAnnouncement.body.split('\n').map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>

              <div className="bg-blue-50/40 border border-blue-200/30 text-[10.5px] p-3 rounded-lg text-blue-900 flex items-start gap-1.5 font-mono">
                <BookOpen size={14} className="text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">SharePoint Meta Tracker:</span>
                  <div className="text-blue-700 mt-1">
                    List Name: <strong>Announcements</strong> | ID Mapping: <strong>{selectedAnnouncement.id}</strong> | Urgent: <strong>{selectedAnnouncement.urgent ? 'Yes' : 'No'}</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/30 p-4 flex justify-between items-center border-t border-white/40">
              <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                <Clock size={11} />
                <span>ปรับปรุงล่าสุด 2026-06-12</span>
              </div>
              <button
                onClick={() => setSelectedAnnouncement(null)}
                className="bg-slate-900 hover:bg-slate-800 text-white rounded-lg px-4 py-1.5 text-xs font-semibold cursor-pointer transition-colors"
              >
                เสร็จสิ้นการอ่าน
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
