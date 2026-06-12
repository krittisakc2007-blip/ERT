/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppFolder } from '../types';
import { mockApps } from '../data/mockData';
import { ExternalLink, Grid, LayoutGrid, Search, Filter, Cpu, CreditCard, Users, HelpCircle } from 'lucide-react';

export default function AppDirectory() {
  const [apps] = useState<AppFolder[]>(mockApps);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filtered = apps.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ['All', 'Workspace', 'HR', 'Finance', 'IT Portal'];

  return (
    <div className="space-y-4" id="app-directory-container">
      
      {/* Category selector and Search input */}
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
              {cat === 'All' ? 'แอปพลิเคชันทั้งหมด' : 
               cat === 'Workspace' ? 'พื้นที่สวัสดิการ (Web)' : cat}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="ค้นหาแอปพลิเคชันทางสวัสดิการ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4 py-1.5 glass-input rounded-lg text-xs w-full md:w-64 focus:outline-none"
          />
        </div>
      </div>

      {/* Grid of Apps */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item) => {
          // Icon mapping
          return (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card rounded-xl p-5 hover:shadow-lg hover:-translate-y-1 hover:border-blue-300 transition-all group relative flex flex-col justify-between h-40"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className={`p-2.5 rounded-lg text-white font-bold text-xs uppercase leading-none ${
                    item.category === 'Workspace' ? 'bg-blue-600 shadow-sm shadow-blue-100' :
                    item.category === 'HR' ? 'bg-violet-600 shadow-sm shadow-violet-100' :
                    item.category === 'Finance' ? 'bg-emerald-600 shadow-sm shadow-emerald-100' :
                    'bg-slate-800 shadow-sm shadow-slate-100'
                  }`}>
                    {item.category.slice(0, 3)}
                  </div>
                  <div className="text-slate-300 group-hover:text-blue-600 transition-colors">
                    <ExternalLink size={15} />
                  </div>
                </div>

                <h4 className="text-sm font-bold text-slate-900 mt-4 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h4>

                <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-2 text-[10.5px] font-mono font-medium text-slate-400 flex items-center justify-between border-t border-slate-50 pt-2 text-slate-400">
                <span>{item.url.replace('https://', '')}</span>
                <span className="text-blue-600 font-bold opacity-0 group-hover:opacity-100 transition-opacity">เข้าสู่แอป →</span>
              </div>
            </a>
          );
        })}

        {filtered.length === 0 && (
          <div className="col-span-full bg-slate-50 border border-slate-100 py-12 rounded-xl text-center">
            <LayoutGrid className="mx-auto text-slate-300 stroke-1 mb-2" size={40} />
            <p className="text-xs text-slate-500">ไม่พบลิงก์แอปพลิเคชันตามตัวพิมพ์ปัจจุบัน</p>
          </div>
        )}
      </div>

    </div>
  );
}
