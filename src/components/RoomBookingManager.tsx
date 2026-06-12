/**
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Calendar, Clock, DoorOpen, Users, CheckCircle2, AlertCircle, Plus, Trash2 } from 'lucide-react';
import { EntraUser, Booking } from '../types';

interface RoomBookingManagerProps {
  user: EntraUser;
  bookings: Booking[];
  setBookings: React.Dispatch<React.SetStateAction<Booking[]>>;
}

export default function RoomBookingManager({ user, bookings, setBookings }: RoomBookingManagerProps) {
  // Available Rooms Catalogue list of rooms
  const rooms = [
    { name: "ห้องประชุมกัญญาภัทร (ชั้น 4 - อาคารหลัก)", capacity: 12, floor: "ชั้น 4", facilities: "โปรเจกเตอร์, ทีวี 4K, กระดานไวท์บอร์ด" },
    { name: "ห้องปฏิบัติการความคิด Creative Room (ชั้น 12)", capacity: 8, floor: "ชั้น 12", facilities: "Apple TV, กระดานกระจกรอบด้าน, ขนมขบเคี้ยว" },
    { name: "ห้องบอร์ดรูมผู้บริหาร Boardroom (ชั้น 15)", capacity: 20, floor: "ชั้น 15", facilities: "ระบบประชุมสาระสำคัญทางไกล Video Conference, เครื่องกำเนิดอากาศบริสุทธิ์" },
    { name: "ห้องสัมมนาพัชราภา (แคมปัสพญาไท)", capacity: 50, floor: "ชั้น 3 แคมปัสพญาไท", facilities: "เครื่องเสียงสเตอริโอ, ไมโครโฟนไร้สาย 4 ตัว, โพเดียมบรรยาย" }
  ];

  // Form states
  const [selectedRoom, setSelectedRoom] = useState(rooms[0].name);
  const [bookingDate, setBookingDate] = useState("2026-06-12");
  const [bookingTime, setBookingTime] = useState("13:00 - 15:00 น.");
  const [purpose, setPurpose] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!purpose.trim()) {
      alert("กรุณาระบุวัตถุประสงค์การจองห้องประชุม");
      return;
    }

    const newBooking: Booking = {
      id: `BK-00${bookings.length + 1}`,
      roomName: selectedRoom,
      date: bookingDate,
      timeSlot: bookingTime,
      purpose: purpose,
      bookedBy: user.name,
      department: user.department,
      status: 'Pending' // default status
    };

    setBookings([newBooking, ...bookings]);
    setPurpose("");
    setShowForm(false);
    setSuccessMsg("ยื่นคำร้องจองห้องประชุมสำเร็จ! ระบบจะส่งคำขอไปยัง Outlook Exchange & SharePoint Calendar");
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  const handleCancelBooking = (id: string) => {
    if (confirm("คุณแน่ใจว่าต้องการยกเลิกการจองห้องประชุมนี้ใช่หรือไม่?")) {
      setBookings(bookings.filter(b => b.id !== id));
    }
  };

  return (
    <div className="space-y-6" id="room-booking-root">
      {/* Tab Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-md font-bold text-slate-900 flex items-center gap-1.5">
            <DoorOpen className="text-blue-600" size={18} />
            <span>ระบบจองห้องประชุมองค์กร (Room Booking Portal)</span>
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            จองสิทธิ์ห้องทำงานกลุ่มและนัดวิพากษ์ส่วนกลาง เชื่อมต่อประสาน SharePoint Exchange และปฏิทินกลางของบริษัท
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-2 px-4 rounded-xl flex items-center gap-1.5 transition-all shadow-sm shadow-blue-200 cursor-pointer"
        >
          <Plus size={15} />
          <span>{showForm ? 'ปิดแบบฟอร์ม' : 'จองห้องประชุมเพิ่ม'}</span>
        </button>
      </div>

      <hr className="border-white/40" />

      {successMsg && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs p-3.5 rounded-xl flex items-start gap-2.5 animate-bounce">
          <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Booking Form */}
      {showForm && (
        <div className="bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl p-5 shadow-xs">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4">ระบุรายละเอียดการใช้ห้องประชุม</h4>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">เลือกห้องประชุม *</label>
                <select
                  value={selectedRoom}
                  onChange={(e) => setSelectedRoom(e.target.value)}
                  className="w-full p-2 text-xs bg-white/70 border border-slate-200 rounded-lg focus:outline-none"
                >
                  {rooms.map((r, i) => (
                    <option key={i} value={r.name}>{r.name} (จุได้ {r.capacity} คน)</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">วันที่ต้องการจอง *</label>
                <input
                  type="date"
                  required
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full p-2 text-xs bg-white/70 border border-slate-200 rounded-lg focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">ช่วงเวลา *</label>
                <select
                  value={bookingTime}
                  onChange={(e) => setBookingTime(e.target.value)}
                  className="w-full p-2 text-xs bg-white/70 border border-slate-200 rounded-lg focus:outline-none"
                >
                  <option value="09:00 - 11:30 น.">09:00 - 11:30 น.</option>
                  <option value="10:00 - 12:00 น.">10:00 - 12:00 น.</option>
                  <option value="13:00 - 15:00 น.">13:00 - 15:00 น.</option>
                  <option value="14:00 - 16:30 น.">14:00 - 16:30 น.</option>
                  <option value="16:00 - 18:00 น.">16:00 - 18:00 น.</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-1">วัตถุประสงค์และวาระประชุมหลัก *</label>
              <input
                type="text"
                required
                placeholder="ระบุชื่อเรื่องประชุม หรือหัวข้อการหารือ..."
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="w-full p-2 text-xs bg-white/70 border border-slate-200 rounded-lg focus:outline-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 bg-white border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50"
              >
                ยกเลิก
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg cursor-pointer hover:bg-blue-700"
              >
                ยืนยันส่งจองในระบบ
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Available Rooms Catalogue */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {rooms.map((r, i) => (
          <div key={i} className="bg-white/20 hover:bg-white/40 transition-all border border-white/50 rounded-xl p-4 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[9.5px] uppercase font-mono font-bold bg-blue-50 border border-blue-200 text-blue-700 px-2 py-0.5 rounded-full inline-block">
                {r.floor}
              </span>
              <h5 className="text-xs font-bold text-slate-900 line-clamp-1">{r.name.split(' (')[0]}</h5>
              <div className="text-[11px] text-slate-500 space-y-1">
                <div className="flex items-center gap-1.5">
                  <Users size={12} className="text-slate-400" />
                  <span>รองรับสูงสุด: {r.capacity} ท่าน</span>
                </div>
                <div className="text-[10px] text-slate-400 leading-normal">
                  <span className="font-semibold block text-slate-500">สิ่งอำนวยความสะดวก:</span>
                  {r.facilities}
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                setSelectedRoom(r.name);
                setShowForm(true);
              }}
              className="mt-3 text-center text-[11px] font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 py-1.5 rounded-lg cursor-pointer transition-all border border-blue-100"
            >
              จองห้องนี้
            </button>
          </div>
        ))}
      </div>

      {/* Real-time Status List */}
      <div className="bg-white/30 backdrop-blur-md rounded-xl border border-white/50 overflow-hidden shadow-xs">
        <div className="p-4 bg-white/45 border-b border-white/40">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
            ตารางสถานะการจองปัจจุบัน (SharePoint Calendar Sync)
          </h4>
          <p className="text-[11px] text-slate-500 mt-0.5">รวมประวัติการเข้าใช้งานโดยพนักงาน และการตอบรับจาก Outlook Exchange</p>
        </div>

        <div className="divide-y divide-white/25">
          {bookings.map((bk) => {
            const isMine = bk.bookedBy === user.name;
            return (
              <div key={bk.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-white/30 transition-colors">
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-mono font-bold bg-slate-100 border border-slate-200 text-slate-700 px-2 py-0.5 rounded">
                      {bk.id}
                    </span>
                    <span className="text-xs font-bold text-slate-950">
                      {bk.roomName}
                    </span>
                    {isMine && (
                      <span className="text-[9.5px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded px-1.5 py-0.5">
                        จองโดยคุณ
                      </span>
                    )}
                  </div>

                  <p className="text-xs font-medium text-slate-700 md:line-clamp-1 italic">
                    วัตถุประสงค์: "{bk.purpose}"
                  </p>

                  <div className="flex flex-wrap gap-4 text-[10.5px] text-slate-400 font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} className="text-slate-400" />
                      วันจอง: {bk.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} className="text-slate-400" />
                      ช่วงเวลา: {bk.timeSlot}
                    </span>
                    <span className="text-slate-400">
                      ผู้เบิกจอง: {bk.bookedBy} ({bk.department.split(' (')[0]})
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-start md:self-center">
                  <div className={`px-2 py-1 text-[10.5px] font-bold rounded-lg border flex items-center gap-1 select-none ${
                    bk.status === 'Approved' 
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-100'
                      : 'bg-amber-50 text-amber-800 border-amber-100'
                  }`}>
                    {bk.status === 'Approved' ? <CheckCircle2 size={13} className="text-emerald-600" /> : <AlertCircle size={13} className="text-amber-600" />}
                    <span>{bk.status === 'Approved' ? 'อนุมัติการใช้ห้อง' : 'รอรับรหัสตอบรับ'}</span>
                  </div>

                  {isMine && (
                    <button
                      onClick={() => handleCancelBooking(bk.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer transition-all"
                      title="ยกเลิกการจอง"
                    >
                      <Trash2 size={14} />
                    </button>
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
