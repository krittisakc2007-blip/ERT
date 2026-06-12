/**
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Laptop, ClipboardList, CheckCircle2, AlertTriangle, RefreshCw, Smartphone, Key } from 'lucide-react';
import { EntraUser, BorrowedItem } from '../types';

interface DeviceBorrowingManagerProps {
  user: EntraUser;
  items: BorrowedItem[];
  setItems: React.Dispatch<React.SetStateAction<BorrowedItem[]>>;
}

export default function DeviceBorrowingManager({ user, items, setItems }: DeviceBorrowingManagerProps) {
  const [returnDate, setReturnDate] = useState("2026-06-19");
  const [activeItemToBorrow, setActiveItemToBorrow] = useState<BorrowedItem | null>(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleBorrow = (item: BorrowedItem) => {
    setActiveItemToBorrow(item);
  };

  const confirmBorrow = () => {
    if (!activeItemToBorrow) return;

    setItems(items.map(it => {
      if (it.id === activeItemToBorrow.id) {
        return {
          ...it,
          status: 'Borrowed',
          borrowerName: user.name,
          borrowerEmail: user.email,
          expectedReturnDate: returnDate
        };
      }
      return it;
    }));

    setSuccessMessage(`ส่งคำร้องขอยืมอุปกรณ์ ${activeItemToBorrow.name} สำเร็จ! กรุณาติดต่อรับเครื่องที่ห้อง IT Support ชั้น 12`);
    setActiveItemToBorrow(null);
    setTimeout(() => setSuccessMessage(""), 5000);
  };

  const handleReturn = (item: BorrowedItem) => {
    if (confirm(`ยืนยันการตั้งเรื่องส่งคืนอุปกรณ์ ${item.name} กลับคืนทางฝ่ายคลังข้อมูลทะเบียนทรัพย์สินไอที?`)) {
      setItems(items.map(it => {
        if (it.id === item.id) {
          return {
            ...it,
            status: 'Available',
            borrowerName: undefined,
            borrowerEmail: undefined,
            expectedReturnDate: undefined
          };
        }
        return it;
      }));
      setSuccessMessage(`ตั้งเรื่องส่งคืนอุปกรณ์ ${item.name} เรียบร้อยแล้ว กรุณานำส่งพนักงานดูแลฝ่าย IT Service Desk`);
      setTimeout(() => setSuccessMessage(""), 5000);
    }
  };

  return (
    <div className="space-y-6" id="device-borrowing-root">
      {/* Title */}
      <div>
        <h3 className="text-md font-bold text-slate-900 flex items-center gap-1.5">
          <Laptop className="text-blue-600" size={18} />
          <span>ระบบเบิกยืมอุปกรณ์ไอทีสำรอง (Device Borrowing Desk)</span>
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          ยืมอุปกรณ์คอมพิวเตอร์พกพา หน้าจอเชื่อมต่อ หรืออุปกรณ์เสริมสเปกพิเศษเพื่อทำงานยามเร่งด่วน โดยเชื่อมโยงสิทธิ์ผ่าน SharePoint Asset List
        </p>
      </div>

      <hr className="border-white/40" />

      {successMessage && (
        <div className="bg-blue-50 border border-blue-200 text-blue-800 text-xs p-4 rounded-xl flex items-center gap-2 animate-pulse">
          <CheckCircle2 size={16} className="text-blue-600 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Interactive Modal to Confirm Borrowing Date */}
      {activeItemToBorrow && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden border border-slate-100 p-5">
            <h4 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 mb-4">กำหนดวันส่งคืนอุปกรณ์ไอที</h4>
            <div className="space-y-3.5 text-xs text-slate-600">
              <div>
                <span className="text-[10px] text-slate-400 font-bold block mb-0.5">อุปกรณ์ที่คุณกำลังเลือกยืม:</span>
                <span className="font-bold text-blue-700 block">{activeItemToBorrow.name}</span>
                <span className="text-[10px] font-mono text-slate-400 block mt-0.5">เลขซีเรียล: {activeItemToBorrow.serialNumber}</span>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">กำหนดวันกำหนดคืนโดยประมาณ *</label>
                <input
                  type="date"
                  required
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none"
                />
              </div>

              <div className="bg-blue-50 border border-blue-100 p-2.5 rounded text-[11px] text-blue-800">
                <span>* อ้างอิงเงื่อนไขสวัสดิการพนักงาน: พนักงานสามารถยืมทำงานฉุกเฉินได้สูงสุดไม่เกิน 15 วันทำการต่อหนึ่งประเภทตั๋วบริการ</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-5">
              <button
                onClick={() => setActiveItemToBorrow(null)}
                className="px-4 py-1.5 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50"
              >
                ยกเลิก
              </button>
              <button
                onClick={confirmBorrow}
                className="px-4 py-1.5 text-xs font-medium text-white bg-blue-600 rounded-lg cursor-pointer hover:bg-blue-700"
              >
                ยืนยันยืมคำรับรอง
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Grid of Store Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => {
          const isBorrowedByMe = item.status === 'Borrowed' && item.borrowerEmail === user.email;
          const isBorrowedByOthers = item.status === 'Borrowed' && item.borrowerEmail !== user.email;

          return (
            <div key={item.id} className="bg-white/30 backdrop-blur-md border border-white/50 rounded-2xl p-5 flex flex-col justify-between hover:shadow-md transition-all">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono bg-white/60 border border-slate-200 text-slate-700 font-bold px-2 py-0.5 rounded-md">
                    {item.id}
                  </span>
                  
                  {item.status === 'Available' ? (
                    <span className="text-[10.5px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1 inline-block">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                      ว่างให้ยืม
                    </span>
                  ) : (
                    <span className="text-[10.5px] font-bold text-amber-700 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full flex items-center gap-1 inline-block">
                      <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                      ถูกยืมอยู่
                    </span>
                  )}
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-900 leading-normal line-clamp-2 min-h-[36px]">{item.name}</h4>
                  <p className="text-[10px] font-mono font-medium text-slate-400 mt-1">S/N: {item.serialNumber}</p>
                </div>

                <div className="border-t border-slate-200/40 pt-2.5 text-xs">
                  {item.status === 'Borrowed' ? (
                    <div className="bg-slate-50/50 p-2.5 rounded-lg border border-slate-100 text-[11px] text-slate-500 space-y-1">
                      <span className="font-semibold text-slate-700 block">รายละเอียดการเบิกยืม:</span>
                      <div>ผู้ยืม: {item.borrowerName} {isBorrowedByMe && <span className="font-bold text-emerald-600">(คุณ)</span>}</div>
                      <div>กำหนดส่งคืน: {item.expectedReturnDate}</div>
                    </div>
                  ) : (
                    <div className="text-[11px] text-slate-400 italic">
                      มีของสำรอง ณ IT Stock - สามารถติดต่อรับประทานได้ทันทีหลังจากเจ้าหน้าที่เคสยืนยันตั๋ว
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-2">
                {item.status === 'Available' ? (
                  <button
                    onClick={() => handleBorrow(item)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2 rounded-xl cursor-pointer transition-all flex items-center justify-center gap-1"
                  >
                    <span>ยื่นขอยืมเครื่องนี้</span>
                  </button>
                ) : isBorrowedByMe ? (
                  <button
                    onClick={() => handleReturn(item)}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs py-2 rounded-xl cursor-pointer transition-all flex items-center justify-center gap-1"
                  >
                    <span>ยื่นคืนอุปกรณ์</span>
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full bg-slate-200 text-slate-400 font-semibold text-xs py-2 rounded-xl cursor-not-allowed select-none"
                  >
                    ไม่ว่างให้เบิกยืม
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
