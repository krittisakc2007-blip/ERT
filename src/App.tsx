/**
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Header from './components/Header';
import AnnouncementsList from './components/AnnouncementsList';
import TicketManager from './components/TicketManager';
import AppDirectory from './components/AppDirectory';
import KnowledgeBaseList from './components/KnowledgeBaseList';
import SharePointSchemaInfo from './components/SharePointSchemaInfo';
import RoomBookingManager from './components/RoomBookingManager';
import DeviceBorrowingManager from './components/DeviceBorrowingManager';
import AssetRegistryManager from './components/AssetRegistryManager';
import RoomDataManager from './components/RoomDataManager';

import { mockUsers, initialTickets } from './data/mockData';
import { UserRole, ITTicket, Booking, BorrowedItem } from './types';
import { 
  Bell, FileText, BookOpen, LayoutGrid, Database, DoorOpen, 
  ShieldAlert, Menu, X, ArrowLeftRight, CheckCircle, HelpCircle, 
  MapPin, Briefcase, Mail, ShieldCheck, LogOut, Sparkles,
  Laptop, AlertTriangle, ChevronRight, CheckCircle2, ClipboardList, History
} from 'lucide-react';

export default function App() {
  // Simulator State
  const [user, setUser] = useState(mockUsers[0]);
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);

  // Centralized State Management
  const [tickets, setTickets] = useState<ITTicket[]>(initialTickets);
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: "BK-001",
      roomName: "ห้องประชุมกัญญาภัทร (ชั้น 4 - อาคารหลัก)",
      date: "2026-06-12",
      timeSlot: "10:00 - 12:00 น.",
      purpose: "ประชุมรายงานยอดขายประจำสัปดาห์ฝั่ง Sales",
      bookedBy: "กิตติศักดิ์ ชัยชนะ",
      department: "แผนกฝ่ายขายและบริการลูกค้า (Sales & Customer Relations)",
      status: "Approved"
    },
    {
      id: "BK-002",
      roomName: "ห้องปฏิบัติการความคิด Creative Room (ชั้น 12)",
      date: "2026-06-12",
      timeSlot: "14:00 - 16:30 น.",
      purpose: "ระดมสมองแคมเปญการตลาดไตรมาส 3",
      bookedBy: "กิตติศักดิ์ ชัยชนะ",
      department: "แผนกฝ่ายขายและบริการลูกค้า (Sales & Customer Relations)",
      status: "Pending"
    },
    {
      id: "BK-003",
      roomName: "ห้องบอร์ดรูมผู้บริหาร Boardroom (ชั้น 15)",
      date: "2026-06-13",
      timeSlot: "09:00 - 11:30 น.",
      purpose: "ประชุมบอร์ดบริหารระดับนโยบายประจำเดือน",
      bookedBy: "สุชาดา งามกมล",
      department: "ฝ่ายบริหารระบบเครือข่ายและโครงสร้างพื้นฐานไอที",
      status: "Approved"
    }
  ]);
  const [borrowDevices, setBorrowDevices] = useState<BorrowedItem[]>([
    {
      id: "EQ-1001",
      name: "Apple MacBook Pro M3 Pro (14 นิ้ว, 18GB RAM, 512GB SSD)",
      category: "Laptop",
      serialNumber: "SMP-MBP2026-M3",
      status: "Available"
    },
    {
      id: "EQ-1002",
      name: "Lenovo ThinkPad T14 Gen 4 (Ryzen 7, 32GB RAM, 1TB SSD)",
      category: "Laptop",
      serialNumber: "SMP-TPAD2025-44B",
      status: "Borrowed",
      borrowerName: "กิตติศักดิ์ ชัยชนะ",
      borrowerEmail: "krittisak.sales@company.com",
      expectedReturnDate: "2026-06-25"
    },
    {
      id: "EQ-1003",
      name: "iPad Pro 11-inch M2 (WiFi + Cellular, 256GB)",
      category: "Tablet",
      serialNumber: "SMP-IPAD-M2-04",
      status: "Available"
    },
    {
      id: "EQ-1004",
      name: "จอมอนิเตอร์ Dell UltraSharp U2723QE (27 นิ้ว 4K USB-C Hub)",
      category: "Peripherals",
      serialNumber: "SMP-DELL-U27-99",
      status: "Available"
    },
    {
      id: "EQ-1005",
      name: "เมาส์ไร้สายบลูทูธ Logitech MX Master 3S Professional Mouse",
      category: "Peripherals",
      serialNumber: "SMP-LOGI-MX3S",
      status: "Borrowed",
      borrowerName: "พงศกร เริงจิตต์",
      borrowerEmail: "pongsakorn@company.com",
      expectedReturnDate: "2026-06-18"
    },
    {
      id: "EQ-1006",
      name: "อะแดปเตอร์แปลงไฟ Apple Multiport USB-C Adapter",
      category: "Accessories",
      serialNumber: "SMP-APL-ADAP",
      status: "Available"
    }
  ]);

  const [requestTab, setRequestTab] = useState<'ticket' | 'room' | 'device'>('ticket');

  // Helper to determine visible tabs based on Role
  const getVisibleTabs = (role: UserRole) => {
    const tabs = [
      { id: 'home', label: 'หน้าแรก', icon: Bell, desc: 'ข่าวสารและประกาศจากบอร์ดประชาสัมพันธ์' },
      { id: 'ticket-report', label: 'แจ้งปัญหา IT', icon: FileText, desc: 'แบบฟอร์มเปิดใบแจ้งซ่อมแจ้งปัญหาไอที' },
      { id: 'room-booking', label: 'จองห้อง', icon: BookOpen, desc: 'ยื่นคำร้องขอใช้งานห้องประชุมและพื้นที่สำนัก' },
      { id: 'device-borrow', label: 'ยืมอุปกรณ์', icon: LayoutGrid, desc: 'เบิกอุปกรณ์เสริมคอมพิวเตอร์และเครื่องมือสำรอง' },
    ];

    if (role === 'IT_Support' || role === 'IT_Admin') {
      tabs.push({ id: 'helpdesk', label: 'จัดการ Ticket (Helpdesk)', icon: ShieldAlert, desc: 'แผงรับเคส ซ่อมแซมและติดตามตั๋วปัญหาขององค์กร' });
    }

    if (role === 'IT_Admin') {
      tabs.push({ id: 'asset-mgmt', label: 'จัดการทะเบียนทรัพย์สิน', icon: Database, desc: 'ควบคุมฐานข้อมูลทะเบียนทรัพย์สินและรหัสซีเรียลเครื่อง' });
      tabs.push({ id: 'room-mgmt', label: 'จัดการข้อมูลห้อง', icon: DoorOpen, desc: 'ปรับแต่งระบบ ทะเบียนและสถานะอาคารสถานที่กลาง' });
    }

    return tabs;
  };

  const handleRoleChange = (role: UserRole) => {
    const selectedUser = mockUsers.find(mu => mu.role === role);
    if (selectedUser) {
      setUser(selectedUser);
      setIsSidebarOpen(false); // Close sidebar on mobile
      
      // Safety auto-switch if active tab is no longer permitted
      const visibleTabs = getVisibleTabs(role);
      const isTabSupported = visibleTabs.some(t => t.id === activeTab);
      if (!isTabSupported) {
        setActiveTab('home');
      }
    }
  };

  const visibleTabs = getVisibleTabs(user.role);

  const getRoleBadgeStyle = (role: UserRole) => {
    switch (role) {
      case 'IT_Admin':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'IT_Support':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    }
  };

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case 'IT_Admin':
        return 'IT Admin (ผู้ดูแลระบบ)';
      case 'IT_Support':
        return 'IT Support (ทีมแก้ปัญหา)';
      default:
        return 'พนักงานทั่วไป / Sales';
    }
  };

  // Simulate Logout
  const handleLogout = () => {
    setShowLogoutAlert(true);
    setTimeout(() => {
      setShowLogoutAlert(false);
      // Reset back to Employee
      handleRoleChange('Employee');
    }, 2500);
  };

  // Find currently active page title
  const currentTabObj = visibleTabs.find(t => t.id === activeTab) || visibleTabs[0];

  return (
    <div className="min-h-screen glass-bg text-slate-800 font-sans flex flex-col selection:bg-blue-100" id="portal-root">
      
      {/* 
        ========================================================================
        1. MOCK LOGIN & ROLE SWITCHER (แถบเครื่องมือสีเข้มด้านบนสุดสำหรับการทดสอบ)
        ========================================================================
      */}
      <div className="bg-slate-950 text-white py-2 px-4 border-b border-slate-800 relative z-50 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-mono text-[11px] text-slate-300 font-medium">
              ⚙️ <strong className="text-white">แผนจำลองสิทธิ์การเข้าถึง (RBAC Simulation Tool)</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="role-selector" className="text-slate-400 font-medium">เลือกสิทธิ์การเข้าชม:</label>
            <select
              id="role-selector"
              value={user.role}
              onChange={(e) => handleRoleChange(e.target.value as UserRole)}
              className="bg-slate-900 border border-slate-700 rounded-lg py-1 px-3.5 text-white font-bold select-none cursor-pointer text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="Employee">1) พนักงานทั่วไป / Sales</option>
              <option value="IT_Support">2) IT Support (ทีมแก้ปัญหา)</option>
              <option value="IT_Admin">3) IT Admin (ผู้ดูแลระบบ)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Corporate Platform Header */}
      <Header user={user} />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full flex flex-col gap-6">
        
        {/* Dynamic Greeting & Active User Panel */}
        <div className="glass-card rounded-2xl overflow-hidden p-5 md:p-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Col 1 */}
          <div className="md:col-span-2 flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
            <img
              src={user.avatar}
              alt={user.name}
              referrerPolicy="no-referrer"
              className="h-16 w-16 rounded-full object-cover border-2 border-white/60 ring-4 ring-blue-500/5 shadow-inner shrink-0"
            />
            <div className="space-y-1">
              <span className={`inline-block border px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${getRoleBadgeStyle(user.role)}`}>
                {getRoleLabel(user.role)}
              </span>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight leading-none mt-1">
                สวัสดีคุณ {user.name} 👋
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                {user.jobTitle} | {user.department}
              </p>
              <div className="text-[11px] font-mono text-slate-400">
                สิทธิ์เชื่อมต่อ SSO: <strong>{user.email}</strong>
              </div>
            </div>
          </div>

          {/* Col 2: Active Role quick summary info in light card */}
          <div className="bg-white/35 border border-white/50 rounded-xl p-4 flex flex-col justify-between h-full space-y-2">
            <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-widest block">สิทธิ์การเข้าถึงข้อมูล</span>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">สิทธิ์ปัจจุบัน:</span>
                <span className="font-bold text-slate-800">{getRoleLabel(user.role).split(' (')[0]}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">เมนูที่แสดงผล:</span>
                <span className="font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded text-[10px]">{visibleTabs.length} แถบเมนู</span>
              </div>
            </div>
          </div>
        </div>

        {/* 
          ========================================================================
          2. SIDEBAR NAVIGATION & MAIN CONTENT AREA
          ========================================================================
        */}

        {/* Mobile menu toggle bar (Only shows on mobile screens < 1024px) */}
        <div className="lg:hidden flex items-center justify-between p-3.5 bg-white/40 backdrop-blur-md rounded-xl border border-white/50 shadow-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-1 px-2.5 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-800 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
              aria-label="เปิดเมนู"
            >
              <Menu size={15} />
              <span>เมนูบริการ ({visibleTabs.length})</span>
            </button>
            <span className="text-xs font-bold text-slate-700">
              หน้าปัจจุบัน: {currentTabObj.label}
            </span>
          </div>

          <button
            onClick={handleLogout}
            className="p-1.5 text-rose-600 hover:bg-rose-50 border border-rose-100 rounded-lg bg-white/60 text-xs font-semibold cursor-pointer"
          >
            Sign-out
          </button>
        </div>

        {/* Layout Block */}
        <div className="flex flex-col lg:flex-row gap-6 relative items-start">
          
          {/* Backdrop dimming layer on mobile */}
          {isSidebarOpen && (
            <div 
              className="fixed inset-0 bg-slate-900/40 z-40 lg:hidden backdrop-blur-xs transition-opacity" 
              onClick={() => setIsSidebarOpen(false)}
            ></div>
          )}

          {/* Left Side Navigation Menu Panel (Can hide/show on mobile) */}
          <aside 
            className={`
              fixed lg:sticky top-0 lg:top-[80px] left-0 h-full lg:h-auto z-50 lg:z-0 w-72 lg:w-64
              glass-card rounded-none lg:rounded-2xl p-4 flex flex-col justify-between shrink-0
              transform transition-transform duration-300 ease-in-out bg-white/95 lg:bg-white/40
              ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}
          >
            <div className="space-y-4">
              {/* Header on mobile view only */}
              <div className="flex items-center justify-between lg:hidden border-b pb-3 mb-2">
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-blue-600 animate-ping"></div>
                  <span className="font-bold text-xs text-slate-950">แผงเมนูบริการตามสิทธิ์</span>
                </div>
                <button 
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-1 border border-slate-200 bg-slate-50 text-slate-500 rounded-lg hover:bg-slate-100 cursor-pointer"
                >
                  <X size={15} />
                </button>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 block px-2 mb-2">
                  เมนูหลักพอร์ทัล
                </span>
                
                <nav className="space-y-1">
                  {visibleTabs.map((tb) => {
                    const TabIcon = tb.icon;
                    return (
                      <button
                        key={tb.id}
                        onClick={() => {
                          setActiveTab(tb.id);
                          setIsSidebarOpen(false); // Close sidebar on mobile select
                        }}
                        className={`w-full flex items-center space-x-3 px-4 py-3 text-xs font-semibold rounded-xl text-left transition-all cursor-pointer ${
                          activeTab === tb.id
                            ? 'glass-pill-active'
                            : 'text-slate-700 hover:bg-white/40 hover:text-slate-950'
                        }`}
                      >
                        <TabIcon size={15} className={activeTab === tb.id ? 'text-white' : 'text-slate-500'} />
                        <span className="truncate">{tb.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* General support list for self service */}
              <div className="pt-2 border-t border-slate-200/50">
                <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 block px-2 mb-2">
                  คลังคู่มือช่วยเหลือ
                </span>
                <div className="space-y-1">
                  <button
                    onClick={() => { setActiveTab('kb-portal'); setIsSidebarOpen(false); }}
                    className={`w-full flex items-center space-x-3 px-4 py-2 text-[11.5px] font-medium rounded-lg text-left text-slate-600 hover:bg-white/30 hover:text-slate-900 ${activeTab === 'kb-portal' ? 'bg-blue-50 font-bold text-blue-700' : ''}`}
                  >
                    <BookOpen size={13} className="text-slate-400" />
                    <span>คู่มือวิธีการ (Self-Service)</span>
                  </button>
                  <button
                    onClick={() => { setActiveTab('app-dir'); setIsSidebarOpen(false); }}
                    className={`w-full flex items-center space-x-3 px-4 py-2 text-[11.5px] font-medium rounded-lg text-left text-slate-600 hover:bg-white/30 hover:text-slate-900 ${activeTab === 'app-dir' ? 'bg-blue-50 font-bold text-blue-700' : ''}`}
                  >
                    <LayoutGrid size={13} className="text-slate-400" />
                    <span>สารบบระบบงาน (App Directory)</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom section with simulated Sign Out */}
            <div className="pt-6 mt-6 border-t border-slate-200/50 hidden lg:block">
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-2.5 text-xs font-bold text-rose-600 hover:bg-rose-50 hover:text-rose-700 rounded-xl transition-all cursor-pointer border border-transparent hover:border-rose-100"
              >
                <LogOut size={15} />
                <span>ออกจากระบบจำลอง (Sign-out)</span>
              </button>
            </div>
          </aside>

          {/* 
            ========================================================================
            3. MAIN CONTENT VIEWPORT (เนื้อหาตรงกลางสลับไปตามเมนูบริการที่เลือก)
            ========================================================================
          */}
          <section className="flex-1 w-full min-h-[480px]">
            
            {showLogoutAlert && (
              <div className="bg-slate-900 text-white p-4 rounded-xl border border-slate-800 text-xs mb-4 flex items-center gap-2.5 animate-pulse">
                <Sparkles className="text-yellow-400" size={16} />
                <span>กำลังจำลองระบบเคลียร์เซสชั่นและออกจากระบบ Microsoft SSO ของคุณ...</span>
              </div>
            )}

            <div className="glass-card rounded-2xl p-5 md:p-6 shadow-xs min-h-[450px]">
              
              {/* PAGE 1: หน้าแรก (Home) */}
              {activeTab === 'home' && (() => {
                const myTickets = tickets.filter(t => t.requesterEmail === user.email || t.requesterName.includes(user.name));
                const myBookings = bookings.filter(b => b.bookedBy === user.name);
                const myBorrowedDevices = borrowDevices.filter(d => d.borrowerName === user.name || d.borrowerEmail === user.email);

                return (
                  <div className="space-y-6" id="dashboard-home-view">
                    
                    {/* Welcome Header */}
                    <div className="border-b border-slate-150 pb-4">
                      <h3 className="text-md font-bold text-slate-900 tracking-tight flex items-center gap-2">
                        <Sparkles size={18} className="text-blue-600" />
                        <span>แผงควบคุมบริการพนักงานดิจิทัล (Digital Service Dashboard)</span>
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        ยินดีต้อนรับคุณ <strong className="text-slate-800">{user.name}</strong> ({user.jobTitle}) สู่พอร์ทัลบริการส่วนกลาง เชื่อมโยงข้อมูลผ่านระบบ Microsoft 365 และสิทธิ์องค์กรจริง
                      </p>
                    </div>

                    {/* Quick Access Grid (3 Large Buttons) */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4" id="quick-actions-panel">
                      {/* Action 1 */}
                      <button 
                        onClick={() => setActiveTab('ticket-report')}
                        className="p-5 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100/50 border border-blue-200/50 text-left hover:shadow-md hover:border-blue-300 transition-all duration-300 group cursor-pointer relative overflow-hidden"
                      >
                        <div className="flex justify-between items-start">
                          <div className="p-3 bg-blue-600 text-white rounded-xl shadow-md group-hover:scale-110 transition-transform">
                            <FileText size={20} />
                          </div>
                          <ChevronRight size={16} className="text-blue-400 group-hover:translate-x-1 transition-transform" />
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 mt-5 uppercase">แจ้งปัญหาไอที (IT Ticket)</h4>
                        <p className="text-[11px] text-slate-600 mt-1.5 leading-relaxed font-semibold">อุปกรณ์ชำรุด เข้าใช้ระบบไม่ได้ ขอลิขสิทธิ์ซอฟต์แวร์ หรือรายงานปัญหาขัดข้อง</p>
                        <div className="absolute right-0 bottom-0 translate-x-5 translate-y-5 opacity-5 pointer-events-none">
                          <FileText size={80} />
                        </div>
                      </button>

                      {/* Action 2 */}
                      <button 
                        onClick={() => setActiveTab('room-booking')}
                        className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-100/50 border border-emerald-200/50 text-left hover:shadow-md hover:border-emerald-300 transition-all duration-300 group cursor-pointer relative overflow-hidden"
                      >
                        <div className="flex justify-between items-start">
                          <div className="p-3 bg-emerald-600 text-white rounded-xl shadow-md group-hover:scale-110 transition-transform">
                            <DoorOpen size={20} />
                          </div>
                          <ChevronRight size={16} className="text-emerald-400 group-hover:translate-x-1 transition-transform" />
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 mt-5 uppercase">จองห้องประชุม (Room Reservation)</h4>
                        <p className="text-[11px] text-slate-600 mt-1.5 leading-relaxed font-semibold">ดูผังเวลาห้องประชุมพัชราภา / สโมสรโสภณวิริยา และยื่นสิทธิ์เข้าใช้งานล่วงหน้า</p>
                        <div className="absolute right-0 bottom-0 translate-x-5 translate-y-5 opacity-5 pointer-events-none">
                          <DoorOpen size={80} />
                        </div>
                      </button>

                      {/* Action 3 */}
                      <button 
                        onClick={() => setActiveTab('device-borrow')}
                        className="p-5 rounded-2xl bg-gradient-to-br from-fuchsia-50 to-pink-100/50 border border-fuchsia-200/50 text-left hover:shadow-md hover:border-fuchsia-300 transition-all duration-300 group cursor-pointer relative overflow-hidden"
                      >
                        <div className="flex justify-between items-start">
                          <div className="p-3 bg-fuchsia-600 text-white rounded-xl shadow-md group-hover:scale-110 transition-transform">
                            <Laptop size={20} />
                          </div>
                          <ChevronRight size={16} className="text-fuchsia-400 group-hover:translate-x-1 transition-transform" />
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 mt-5 uppercase">ยืมอุปกรณ์ (Borrow Device)</h4>
                        <p className="text-[11px] text-slate-600 mt-1.5 leading-relaxed font-semibold">เบิกเครื่องคอมพิวเตอร์พกพาสำรองทำงานสัญจรชั่วคราว อะแดปเตอร์ หรือจอมอนิเตอร์</p>
                        <div className="absolute right-0 bottom-0 translate-x-5 translate-y-5 opacity-5 pointer-events-none">
                          <Laptop size={80} />
                        </div>
                      </button>
                    </div>

                    {/* Integrated user requests monitor desk ("ประวัติคำขอของฉัน") */}
                    <div className="bg-slate-50/50 border border-slate-200/60 rounded-2xl p-4 md:p-5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 border-b border-slate-200/60 pb-3">
                        <div className="flex items-center gap-2">
                          <History size={16} className="text-slate-600" />
                          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">ประวัติคำขอการใช้บริการของฉัน (My Service Request History)</h4>
                        </div>
                        
                        {/* Sub-tabs switch */}
                        <div className="flex bg-slate-100 p-0.5 rounded-lg border">
                          <button 
                            type="button"
                            onClick={() => setRequestTab('ticket')}
                            className={`px-3 py-1 text-[10.5px] font-bold rounded-md transition-all cursor-pointer ${requestTab === 'ticket' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
                          >
                            ตั๋วไอที ({myTickets.length})
                          </button>
                          <button 
                            type="button"
                            onClick={() => setRequestTab('room')}
                            className={`px-3 py-1 text-[10.5px] font-bold rounded-md transition-all cursor-pointer ${requestTab === 'room' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
                          >
                            การจองห้อง ({myBookings.length})
                          </button>
                          <button 
                            type="button"
                            onClick={() => setRequestTab('device')}
                            className={`px-3 py-1 text-[10.5px] font-bold rounded-md transition-all cursor-pointer ${requestTab === 'device' ? 'bg-white text-fuchsia-700 shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
                          >
                            การยืมอุปกรณ์ ({myBorrowedDevices.length})
                          </button>
                        </div>
                      </div>

                      {/* Display active list */}
                      <div className="overflow-x-auto min-h-[140px]">
                        {requestTab === 'ticket' && (
                          myTickets.length === 0 ? (
                            <div className="text-center py-8 text-slate-400 text-xs flex flex-col items-center justify-center gap-2">
                              <span>📁</span>
                              <span>คุณไม่มีประวัติการส่งใบคำขอใบงานไอทีแจ้งซ่อมระบบ</span>
                            </div>
                          ) : (
                            <table className="w-full text-left min-w-[500px]">
                              <thead>
                                <tr className="border-b border-slate-200 text-[10.5px] font-bold text-slate-400 uppercase tracking-wider pb-2">
                                  <th className="py-2.5">รหัสตั๋ว / ID</th>
                                  <th className="py-2.5">หัวข้อปัญหาการแจ้ง</th>
                                  <th className="py-2.5">หมวดหลัก</th>
                                  <th className="py-2.5">ความเร่งด่วน</th>
                                  <th className="py-2.5">สถานะ</th>
                                  <th className="py-2.5 text-right">ใบงาน</th>
                                </tr>
                              </thead>
                              <tbody className="text-xs divide-y divide-slate-100">
                                {myTickets.map(t => (
                                  <tr key={t.id} className="hover:bg-white/40">
                                    <td className="py-3 font-mono font-bold text-blue-700">{t.id}</td>
                                    <td className="py-3 font-semibold text-slate-900">{t.title}</td>
                                    <td className="py-3 text-slate-500">{t.category}</td>
                                    <td className="py-3">
                                      <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                                        t.priority === 'Critical' || t.priority === 'High' ? 'bg-rose-50 text-rose-700' : 'bg-slate-100 text-slate-600'
                                      }`}>{t.priority}</span>
                                    </td>
                                    <td className="py-3">
                                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                        t.status === 'Resolved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-150' :
                                        t.status === 'In Progress' ? 'bg-amber-50 text-amber-700 border border-amber-150' :
                                        t.status === 'Closed' ? 'bg-slate-100 text-slate-600' :
                                        'bg-indigo-50 text-indigo-700 border border-indigo-150'
                                      }`}>
                                        {t.status}
                                      </span>
                                    </td>
                                    <td className="py-3 text-right">
                                      <button 
                                        onClick={() => setActiveTab('ticket-report')} 
                                        className="text-blue-600 hover:underline font-bold text-[10.5px] cursor-pointer"
                                      >
                                        ดูคืบหน้า →
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          )
                        )}

                        {requestTab === 'room' && (
                          myBookings.length === 0 ? (
                            <div className="text-center py-8 text-slate-400 text-xs flex flex-col items-center justify-center gap-2">
                              <span>📅</span>
                              <span>คุณไม่มีประวัติการส่งจองใช้อาหารและห้องประชุมสัมมนาล่วงหน้า</span>
                            </div>
                          ) : (
                            <table className="w-full text-left min-w-[500px]">
                              <thead>
                                <tr className="border-b border-slate-200 text-[10.5px] font-bold text-slate-400 uppercase tracking-wider pb-2">
                                  <th className="py-2.5">รหัสใบจอง / ID</th>
                                  <th className="py-2.5">ห้องประชุม</th>
                                  <th className="py-2.5">วันที่จองใช้งาน</th>
                                  <th className="py-2.5">ช่วงเวลาเข้า</th>
                                  <th className="py-2.5 font-semibold text-slate-405">วัตถุประสงค์ประชุม</th>
                                  <th className="py-2.5">สถานะ</th>
                                </tr>
                              </thead>
                              <tbody className="text-xs divide-y divide-slate-100">
                                {myBookings.map(b => (
                                  <tr key={b.id} className="hover:bg-white/40">
                                    <td className="py-3 font-mono font-bold text-emerald-700">{b.id}</td>
                                    <td className="py-3 font-semibold text-slate-900">{b.roomName}</td>
                                    <td className="py-3">{b.date}</td>
                                    <td className="py-3 font-medium text-slate-600">{b.timeSlot}</td>
                                    <td className="py-3 text-slate-500 font-medium truncate max-w-[150px]" title={b.purpose}>
                                      {b.purpose}
                                    </td>
                                    <td className="py-3">
                                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                        b.status === 'Approved' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-amber-50 text-amber-800'
                                      }`}>
                                        {b.status === 'Approved' ? '✓ สำเร็จสมบูรณ์' : '🔒 อยู่ระหว่างตรวจสอบ'}
                                      </span>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          )
                        )}

                        {requestTab === 'device' && (
                          myBorrowedDevices.length === 0 ? (
                            <div className="text-center py-8 text-slate-400 text-xs flex flex-col items-center justify-center gap-2">
                              <span>💻</span>
                              <span>คุณไม่มีประวัติรายงานเบิกยื่นยืมทรัพย์สินและอุปกรณ์คอมพิวเตอร์</span>
                            </div>
                          ) : (
                            <table className="w-full text-left min-w-[500px]">
                              <thead>
                                <tr className="border-b border-slate-200 text-[10.5px] font-bold text-slate-400 uppercase tracking-wider pb-2">
                                  <th className="py-2.5">หมายเลขรหัสของ / EQ-ID</th>
                                  <th className="py-2.5">ชื่อเครื่องมือ/อุปกรณ์</th>
                                  <th className="py-2.5">หมวดสินค้า</th>
                                  <th className="py-2.5 font-mono">Serial Number</th>
                                  <th className="py-2.5">วันนัดคืน</th>
                                  <th className="py-2.5">สถานะ</th>
                                </tr>
                              </thead>
                              <tbody className="text-xs divide-y divide-slate-100">
                                {myBorrowedDevices.map(d => (
                                  <tr key={d.id} className="hover:bg-white/40">
                                    <td className="py-3 font-mono font-bold text-fuchsia-700">{d.id}</td>
                                    <td className="py-3 font-semibold text-slate-900">{d.name}</td>
                                    <td className="py-3 text-slate-500">{d.category}</td>
                                    <td className="py-3 font-mono text-[11px] text-slate-500">{d.serialNumber}</td>
                                    <td className="py-3 text-slate-600 font-medium">{d.expectedReturnDate || 'ไม่ได้ระบุ'}</td>
                                    <td className="py-3">
                                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 border border-amber-200 text-amber-700">
                                        กำลังเบิกใช้อยู่
                                      </span>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          )
                        )}
                      </div>
                    </div>

                    {/* Announcement Feed inside Dashboard bottom */}
                    <div className="pt-6 border-t border-slate-200/50">
                      <div className="flex items-center gap-2 mb-3">
                        <Bell size={16} className="text-blue-600" />
                        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">กระดานประชาสัมพันธ์ข่าวสารสารคดี (Corporate News Feed)</h4>
                      </div>
                      <AnnouncementsList user={user} />
                    </div>

                  </div>
                );
              })()}

              {/* PAGE 2: แจ้งปัญหา IT (IT Ticket Report) */}
              {activeTab === 'ticket-report' && (
                <div className="space-y-4">
                  <div className="border-b border-white pb-3">
                    <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-1.5 uppercase">
                      <FileText size={16} className="text-blue-600" />
                      แบบฟอร์มเปิดใบแจ้งซ่อมแจ้งปัญหาไอที (Report IT Problem)
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      ระบุปัญหาทางเทคนิคของคุณลงระบบบันทึกตั๋วกลางเพื่อรับรหัสติดตามอาการและความช่วยเหลือโดยด่วน
                    </p>
                  </div>
                  <TicketManager user={user} tickets={tickets} setTickets={setTickets} />
                </div>
              )}

              {/* PAGE 3: จองห้อง (Room Booking) */}
              {activeTab === 'room-booking' && (
                <RoomBookingManager user={user} bookings={bookings} setBookings={setBookings} />
              )}

              {/* PAGE 4: ยืมอุปกรณ์ (Device Borrowing) */}
              {activeTab === 'device-borrow' && (
                <DeviceBorrowingManager user={user} items={borrowDevices} setItems={setBorrowDevices} />
              )}

              {/* PAGE 5: จัดการ Ticket (Helpdesk) - สำหรับ IT Support/Admin */}
              {activeTab === 'helpdesk' && (user.role === 'IT_Support' || user.role === 'IT_Admin') && (
                <div className="space-y-4">
                  <div className="border-b border-white/50 pb-3">
                    <div className="flex items-center gap-1.5">
                      <span className="p-1 bg-rose-50 text-rose-700 rounded text-[10px] font-bold font-mono">STAFF ONLY</span>
                      <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
                        <ShieldAlert size={16} className="text-rose-600 animate-pulse" />
                        คอนโซลสนับสนุนและแก้ไขปัญหาไอทีองค์กร (Helpdesk Tickets Console)
                      </h3>
                    </div>
                    <p className="text-xs text-slate-500 mt-1.5">
                      เข้าถึงช่องทางควบคุมความช่วยเหลือ สลับดึงเคสเข้าสาย ระบุพิกัดบันทึกไอที และอัปเดตสถานะปัญหาในนามเจ้าหน้าที่สเปเชียลลิสต์
                    </p>
                  </div>
                  {/* Reuse TicketManager - which automatically reveals administrator power when user is staff */}
                  <TicketManager user={user} tickets={tickets} setTickets={setTickets} />
                </div>
              )}

              {/* PAGE 6: จัดการทะเบียนทรัพย์สิน (Asset Management) - สำหรับ IT Admin เท่านั้น */}
              {activeTab === 'asset-mgmt' && user.role === 'IT_Admin' && (
                <AssetRegistryManager />
              )}

              {/* PAGE 7: จัดการข้อมูลห้อง (Room Data Management) - สำหรับ IT Admin เท่านั้น */}
              {activeTab === 'room-mgmt' && user.role === 'IT_Admin' && (
                <RoomDataManager />
              )}

              {/* SUB-PAGES: Self-Service Resource Guides */}
              {activeTab === 'kb-portal' && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-md font-bold text-slate-900">คลังพจนานุกรมและคู่มือช่วยเหลือพนักงาน (Knowledge Base)</h3>
                    <p className="text-xs text-slate-500 mt-1">
                      แก้ไขปัญหาไอทีเบสิกด้วยตัวเองก่อนเปิดเคส เพื่อความรวดเร็วและเป็นสุขในการดำเนินกิจวัตรประจำวันคอมพิวเตอร์
                    </p>
                  </div>
                  <hr className="border-slate-200/40" />
                  <KnowledgeBaseList />
                </div>
              )}

              {activeTab === 'app-dir' && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-md font-bold text-slate-900">สารบบแอปพลิเคชันและเครื่องมือพนักงาน (App Directory)</h3>
                    <p className="text-xs text-slate-500 mt-1">
                      รวบรวมลิงก์เข้าใช้งานระบบงานสวัสดิการ เอกสาร ซอฟต์แวร์วิเคราะห์ข้อมูล และเครื่องมือหลักทั้งหมดแบบ Single Sign-On
                    </p>
                  </div>
                  <hr className="border-slate-200/40" />
                  <AppDirectory />
                </div>
              )}

            </div>
          </section>

        </div>

      </main>

      {/* Footer disclaimer */}
      <footer className="bg-slate-900 text-slate-405 text-slate-400 py-6 mt-12 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-center sm:text-left space-y-1">
            <p className="font-bold text-slate-300">© 2026 ระบบพอร์ทัลบริการไอทีและงานสนับสนุนส่วนกลาง (IT Employee Service Desk Online)</p>
            <p className="text-[11px] text-slate-500">สแกนยืนยันสิทธิ์สำเร็จด้วยสถาปัตยกรรม Microsoft Entra ID - AD Sync Client</p>
          </div>
          <div className="text-[10.5px] font-mono text-slate-500">
            <span>Powered by SharePoint Online Rest Services v1.0</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
