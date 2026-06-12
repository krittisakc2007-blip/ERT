/**
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { DoorOpen, Plus, Search, CheckCircle2, AlertCircle, Trash2, Edit2 } from 'lucide-react';

interface MeetingRoom {
  id: string;
  name: string;
  floor: string;
  capacity: number;
  equipment: string;
  status: 'Available' | 'Maintenance' | 'Reserved';
}

export default function RoomDataManager() {
  const [rooms, setRooms] = useState<MeetingRoom[]>([
    {
      id: "RM-001",
      name: "ห้องประชุมกัญญาภัทร (ชั้น 4 - อาคารหลัก)",
      floor: "ชั้น 4",
      capacity: 12,
      equipment: "โปรเจกเตอร์ความคมชัดสูง, โทรทัศน์ 4K UHD, บอร์ดไวท์บอร์ดอัจฉริยะ, พอร์ตสาย LAN ความปลอดภัยสูง",
      status: "Available"
    },
    {
      id: "RM-002",
      name: "ห้องปฏิบัติการความคิดสร้างสรรค์ Creative Room (ชั้น 12)",
      floor: "ชั้น 12",
      capacity: 8,
      equipment: "Apple TV, ผนังเขียนกระจกรอบทิศทาง, ขนมสาระสว่างแรเงา, พอร์ทไวไฟเสริมแกร่งทางการตลาด",
      status: "Available"
    },
    {
      id: "RM-003",
      name: "ห้องบอร์ดรูมผู้บริหาร Boardroom (ชั้น 15)",
      floor: "ชั้น 15",
      capacity: 20,
      equipment: "ระบบประชุมวีดีโอทางไกล Polycom, บอร์ดรับเสียงรอบด้าน, บริการชาและกาแฟส่วนกลางตัวเลือกพิเศษ",
      status: "Reserved"
    },
    {
      id: "RM-004",
      name: "ห้องสัมมนาพัชราภา (แคมปัสพญาไท)",
      floor: "ชั้น 3 พญาไท",
      capacity: 50,
      equipment: "เครื่องเสียงสเตอริโอสเปกมโหฬาร, ไมค์ลอยไร้สาย 4 ตัว, เวทีระดับการแสดง, เก้าอี้เลคเชอร์ 50 ตัว",
      status: "Available"
    },
    {
      id: "RM-005",
      name: "ห้องประชุมขนาดเล็ก Talk Space 1 (ชั้น 4)",
      floor: "ชั้น 4",
      capacity: 4,
      equipment: "โต๊ะกลม, เก้าอี้สรีรศาสตร์ 4 ตัว, บอร์ดกระจกร่างข้อเสนอแผนงาน",
      status: "Maintenance"
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Room creation state
  const [roomName, setRoomName] = useState("");
  const [floor, setFloor] = useState("ชั้น 4");
  const [capacity, setCapacity] = useState(10);
  const [equipmentName, setEquipmentName] = useState("");
  const [statusVal, setStatusVal] = useState<'Available' | 'Maintenance' | 'Reserved'>("Available");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomName.trim()) {
      alert("กรุณากรอกชื่อห้องประชุมด้วยนะครับ");
      return;
    }

    const newRoom: MeetingRoom = {
      id: `RM-00${rooms.length + 1}`,
      name: roomName,
      floor: floor,
      capacity: Number(capacity),
      equipment: equipmentName || "ไม่ได้ระบุเครื่องมือพิเศษ",
      status: statusVal
    };

    setRooms([...rooms, newRoom]);
    setRoomName("");
    setEquipmentName("");
    setShowAddForm(false);
  };

  const handleDeleteRoom = (id: string) => {
    if (confirm("ยืนยันระงับใช้งานและลบข้อมูลห้องประชุมนี้ออกจากระบบสารบบส่วนกลาง?")) {
      setRooms(rooms.filter(r => r.id !== id));
    }
  };

  const handleToggleStatus = (id: string, current: 'Available' | 'Maintenance' | 'Reserved') => {
    let nextStatus: 'Available' | 'Maintenance' | 'Reserved' = 'Available';
    if (current === 'Available') nextStatus = 'Reserved';
    else if (current === 'Reserved') nextStatus = 'Maintenance';
    else if (current === 'Maintenance') nextStatus = 'Available';

    setRooms(rooms.map(r => r.id === id ? { ...r, status: nextStatus } : r));
  };

  const filtered = rooms.filter(rm => 
    rm.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    rm.floor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rm.equipment.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6" id="room-data-root">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-md font-bold text-slate-900 flex items-center gap-1.5ClassName bg-blue-50/50">
            <DoorOpen className="text-blue-600" size={18} />
            <span>จัดการทะเบียนและข้อมูลห้องประชุม (Conference Rooms Data Control)</span>
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            แก้ไขและประกาศรายชื่อห้องประชุมกลาง ปรับรุ่นผู้จุงานและอุปกรณ์ประจำห้อง (IT Admin Control Panel) บันทึกสิทธิประเมินผ่าน SharePoint <code>Meeting_Rooms_List</code>
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-2 px-4 rounded-xl flex items-center gap-1.5 transition-all shadow-sm shadow-blue-200 cursor-pointer"
        >
          <Plus size={15} />
          <span>{showAddForm ? 'ปิดฟอร์มทึ่เพิ่ม' : 'เพิ่มห้องประชุมใหม่'}</span>
        </button>
      </div>

      <hr className="border-white/40" />

      {/* Add form */}
      {showAddForm && (
        <div className="bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl p-5 shadow-xs">
          <h4 className="text-xs font-bold text-slate-950 uppercase tracking-wider mb-4 border-b border-white pb-2">กรอกข้อมูลเพื่อเปิดตัวและขึ้นทะเบียนห้องประชุมใหม่</h4>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">ชื่อเรียกห้องประชุม *</label>
                <input
                  type="text"
                  required
                  placeholder="เช่น: ห้องสโมสรโสภณวิริยา"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  className="w-full p-2 text-xs bg-white/70 border border-slate-200 rounded-lg focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">ชั้นสถานที่ตั้ง *</label>
                <select
                  value={floor}
                  onChange={(e) => setFloor(e.target.value)}
                  className="w-full p-2 text-xs bg-white/70 border border-slate-200 rounded-lg focus:outline-none"
                >
                  <option value="ชั้น 4">ชั้น 4 (อาคารหลัก)</option>
                  <option value="ชั้น 12">ชั้น 12 (อาคารวิจัยและไอที)</option>
                  <option value="ชั้น 15">ชั้น 15 (ชั้นบริหารผู้บังคับบัญชา)</option>
                  <option value="ชั้น 3 พญาไท">ชั้น 3 สัมมนาสะแคมปัสพญาไท</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">จำนวนผู้จุคนสูงสุด *</label>
                <input
                  type="number"
                  required
                  min={1}
                  value={capacity}
                  onChange={(e) => setCapacity(Number(e.target.value))}
                  className="w-full p-2 text-xs bg-white/70 border border-slate-200 rounded-lg focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-1">รายละเอียดเครื่องมืออุปกรณ์และระบบเครื่องเสียงประดับในห้อง</label>
              <input
                type="text"
                placeholder="เช่น: จอทีวี 4K แขวนผนัง, ไมค์อัจฉริยะ 2 ตัว, อะลูมิเนียมโครงกระจกรมควัน"
                value={equipmentName}
                onChange={(e) => setEquipmentName(e.target.value)}
                className="w-full p-2 text-xs bg-white/70 border border-slate-200 rounded-lg focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">สถานะห้องประชุมแรกรับ</label>
                <select
                  value={statusVal}
                  onChange={(e: any) => setStatusVal(e.target.value)}
                  className="w-full p-2 text-xs bg-white/70 border border-slate-200 rounded-lg focus:outline-none"
                >
                  <option value="Available">พร้อมให้จองทันที (Available)</option>
                  <option value="Maintenance">อยู่ระหว่างซ่อมแซมฝ้าเพดาน/ระบบบกพร่อง (Maintenance)</option>
                  <option value="Reserved">ถูกปิดบังคับสงวนส่งจองผู้บริหาร (Reserved)</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 bg-white border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50"
              >
                ยกเลิก
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg cursor-pointer hover:bg-blue-700"
              >
                ขึ้นทะเบียนห้องประชุม
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Control panel filter */}
      <div className="relative">
        <span className="absolute left-3 top-3 text-slate-400">🔍</span>
        <input
          type="text"
          placeholder="ค้นหาชื่อห้องประชุม, อุปกรณ์ประจำห้อง หรือทำเลที่ตั้ง..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2 bg-white/60 text-xs border border-white/50 rounded-lg focus:outline-none"
        />
      </div>

      {/* Grid displays */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {filtered.map((room) => {
          const statusBg = 
            room.status === 'Available' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
            room.status === 'Reserved' ? 'bg-indigo-50 text-indigo-800 border-indigo-200' :
            'bg-rose-50 text-rose-800 border-rose-200';

          return (
            <div key={room.id} className="bg-white/30 backdrop-blur-md border border-white/50 rounded-xl p-4 flex flex-col justify-between hover:shadow-sm">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[10.5px] font-bold text-slate-500 bg-slate-100 rounded px-1.5 py-0.5 border border-slate-200">
                      {room.id}
                    </span>
                    <span className="text-[11px] font-bold text-slate-600">
                      [{room.floor}]
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleStatus(room.id, room.status)}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold border cursor-pointer hover:scale-105 transition-all select-none ${statusBg}`}
                      title="คลิกสลับสถานะด่วน"
                    >
                      {room.status === 'Available' && '✓ ว่างพร้อมใช้'}
                      {room.status === 'Reserved' && '🔒 ถูกจองแล้ว'}
                      {room.status === 'Maintenance' && '🛠 ปิดซ่อมบำรุง'}
                    </button>
                    
                    <button
                      onClick={() => handleDeleteRoom(room.id)}
                      className="p-1 px-1.5 bg-rose-50 border border-rose-100 text-rose-600 rounded hover:bg-rose-100 transition-colors cursor-pointer"
                      title="ลบห้องนี้"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-900">{room.name}</h4>
                  <div className="text-[11px] font-medium text-blue-700 mt-1">รองรับจุพนักงานสูงสุด: {room.capacity} ท่าน</div>
                </div>

                <div className="bg-white/50 p-2.5 rounded-lg border border-slate-100/50">
                  <span className="text-[10px] font-bold block text-slate-400 uppercase tracking-widest mb-0.5">เครื่องมือที่ติดตั้งประจำ:</span>
                  <p className="text-[11.5px] text-slate-600 leading-normal italic">"{room.equipment}"</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
