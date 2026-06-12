/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { sharepointSchemaInfo } from '../data/mockData';
import { Database, HelpCircle, Columns, HardDrive, Key, ArrowRight, Settings } from 'lucide-react';

export default function SharePointSchemaInfo() {
  const [activeSchema, setActiveSchema] = useState<string>('IT_Tickets');

  const selectedSchema = sharepointSchemaInfo.find(s => s.listName === activeSchema) || sharepointSchemaInfo[0];

  return (
    <div className="space-y-6" id="sharepoint-schema-section">
      
      {/* Title */}
      <div className="border-b border-white/40 pb-4 mb-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Database size={16} className="text-blue-600" />
          <span>โครงสร้างฐานข้อมูล SharePoint Lists และ Flow การทำงาน (Backend Map)</span>
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          แผนผังระบุคีย์ คอลัมน์ และชนิดข้อมูล (Column Types) บนระบบ Microsoft 365 ที่ตรงกับข้อมูลจำลองบนหน้าจอพอร์ทัลนี้
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Navigation / List Picker */}
        <div className="space-y-2 lg:col-span-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">ตาราง SharePoint Lists</span>
          {sharepointSchemaInfo.map(item => (
            <button
              key={item.listName}
              onClick={() => setActiveSchema(item.listName)}
              className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                activeSchema === item.listName
                  ? 'border-blue-400 bg-blue-50/40 backdrop-blur-md shadow-xs'
                  : 'border-white/30 bg-white/20 hover:border-white/60 hover:bg-white/40'
              }`}
            >
              <div className="space-y-0.5">
                <span className="font-mono text-xs font-bold text-slate-900">{item.listName}</span>
                <span className="text-[10.5px] text-slate-500 block truncate max-w-xs">{item.description}</span>
              </div>
              <ArrowRight size={14} className={activeSchema === item.listName ? 'text-blue-600' : 'text-slate-300'} />
            </button>
          ))}

          {/* Technical Connection Info box */}
          <div className="bg-white/30 backdrop-blur-md p-3 rounded-xl border border-white/50 mt-4 text-[11px] text-slate-600 space-y-2">
            <span className="font-bold text-slate-800 flex items-center gap-1">
              <Settings size={12} className="text-slate-500" />
              ข้อกำหนด Microsoft SDK Integration:
            </span>
            <p className="leading-relaxed">
              การเชื่อมต่อจริงสามารถเรียกผ่าน <strong>Microsoft Graph REST API v1.0</strong> หรือใช้ <strong>Microsoft Power Automate</strong> สกัดข้อมูล JSON และต่อท่อไปยังรายการ SharePoint ทันที
            </p>
          </div>
        </div>

        {/* Column detail schema panel */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-950 p-4 rounded-xl text-white">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-slate-400">SharePoint List Schema</span>
              <span className="bg-blue-600 text-[10px] px-2 py-0.5 rounded font-bold uppercase font-mono">List Identifier: {selectedSchema.listName}</span>
            </div>
            <h4 className="font-mono text-xs font-bold text-white">{selectedSchema.listName} Schema Definition</h4>
            <p className="text-[10.5px] text-slate-400 mt-1">{selectedSchema.description}</p>
          </div>

          <div className="border border-white/40 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-white/45 border-b border-white/50 font-bold text-slate-500">
                    <th className="py-2.5 px-3">ชื่อคอลัมน์ (Column Name)</th>
                    <th className="py-2.5 px-3">ชนิดข้อมูล (Type)</th>
                    <th className="py-2.5 px-3">รายละเอียด (Description)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/20">
                  {selectedSchema.columns.map(col => (
                    <tr key={col.name} className="hover:bg-white/40 border-b border-white/10">
                      <td className="py-2.5 px-3 font-mono font-bold text-blue-800">{col.name}</td>
                      <td className="py-2.5 px-3 whitespace-nowrap">
                        <span className="bg-white/60 border border-slate-200/50 text-slate-700 px-1.5 py-0.5 rounded text-[10px] font-mono">
                          {col.type}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-slate-600 font-sans">{col.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
