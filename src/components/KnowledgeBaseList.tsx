/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { KBArticle } from '../types';
import { mockKBArticles } from '../data/mockData';
import { BookOpen, Search, Eye, ThumbsUp, ChevronDown, ChevronUp, CheckCircle, HelpCircle } from 'lucide-react';

export default function KnowledgeBaseList() {
  const [articles, setArticles] = useState<KBArticle[]>(mockKBArticles);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedTitle, setExpandedTitle] = useState<string | null>(null);
  const [likedArticles, setLikedArticles] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    if (expandedTitle === id) {
      setExpandedTitle(null);
    } else {
      setExpandedTitle(id);
    }
  };

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering accordion close/expand
    if (likedArticles[id]) return; // Already liked

    setLikedArticles({ ...likedArticles, [id]: true });
    setArticles(articles.map(art => {
      if (art.id === id) {
        return { ...art, likes: art.likes + 1 };
      }
      return art;
    }));
  };

  const filtered = articles.filter(art => {
    return art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           art.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
           art.content.some(line => line.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  return (
    <div className="space-y-4" id="kb-list-section">
      
      {/* KB Search input */}
      <div className="bg-white/20 backdrop-blur-md p-4 rounded-xl border border-white/40 flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="flex items-center space-x-2">
          <BookOpen className="text-blue-600" size={18} />
          <div>
            <h3 className="text-xs font-bold text-slate-800">ค้นหาคู่มือการบรรเทาปัญหาไอทีเบื้องต้นด้วยตนเอง</h3>
            <p className="text-[10px] text-slate-400">เนื้อหาดึงจาก SharePoint List <code>KnowledgeBase</code> เพื่อลดความแออัดของหน้าเคอร์เซอร์บริการ</p>
          </div>
        </div>
        <div className="relative w-full md:w-80">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="เช่น: ค้นหาคำว่า VPN, Workday, รหัสผ่าน..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 glass-input rounded-lg text-xs focus:outline-none"
          />
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-2">
        {filtered.map(art => {
          const isExpanded = expandedTitle === art.id;
          const isLiked = likedArticles[art.id];

          return (
            <div
              key={art.id}
              className={`glass-card rounded-xl transition-all ${
                isExpanded ? '!border-blue-300 shadow-sm' : 'hover:border-white/90'
              }`}
            >
              {/* Accordion header */}
              <div
                onClick={() => toggleExpand(art.id)}
                className="p-4 flex justify-between items-center cursor-pointer select-none"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center space-x-2 text-[10px] font-mono text-slate-400">
                    <span className="bg-white/60 border border-slate-200/50 text-slate-700 px-2 py-0.5 rounded-full font-semibold">
                      {art.category}
                    </span>
                    <span>Document: {art.id}</span>
                  </div>
                  <h4 className="text-xs md:text-sm font-bold text-slate-900 pr-4 leading-relaxed">
                    {art.title}
                  </h4>
                </div>

                <div className="flex items-center space-x-4">
                  {/* Stats */}
                  <div className="hidden sm:flex items-center space-x-3 text-xs text-slate-400 font-medium">
                    <span className="flex items-center gap-1">
                      <Eye size={12} />
                      {art.views} ครั้ง
                    </span>
                    <button
                      onClick={(e) => handleLike(art.id, e)}
                      disabled={isLiked}
                      className={`flex items-center gap-1 hover:text-blue-600 transition-colors ${
                        isLiked ? 'text-emerald-600 font-semibold cursor-default' : 'text-slate-400'
                      }`}
                    >
                      <ThumbsUp size={11} className={isLiked ? 'fill-emerald-50 text-emerald-600' : ''} />
                      <span>{art.likes} {isLiked ? 'โหวตแล้ว' : 'มีประโยชน์'}</span>
                    </button>
                  </div>
                  
                  {isExpanded ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
                </div>
              </div>

              {/* Accordion body */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-1 border-t border-white/40 text-xs">
                  <div className="bg-white/40 backdrop-blur-md p-4 rounded-xl border border-white/50 text-slate-700 space-y-2.5">
                    {art.content.map((step, idx) => (
                      <p key={idx} className="leading-relaxed font-sans">{step}</p>
                    ))}
                  </div>

                  <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
                    <p>พนักงานพึงพอใจต่อคู่มือนี้หรือไม่? สามารถกดโหวตเพิ่มคะแนนประเมินได้</p>
                    <button
                      onClick={(e) => handleLike(art.id, e)}
                      disabled={isLiked}
                      className={`sm:hidden flex items-center gap-1 hover:text-blue-600 transition-colors ${
                        isLiked ? 'text-emerald-600 font-semibold cursor-default' : 'text-slate-400'
                      }`}
                    >
                      <ThumbsUp size={11} className={isLiked ? 'fill-emerald-50 text-emerald-600' : ''} />
                      <span>{art.likes} โหวต</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="bg-slate-50 border border-slate-100 py-12 rounded-xl text-center">
            <HelpCircle className="mx-auto text-slate-300 stroke-1 mb-2" size={40} />
            <p className="text-xs text-slate-500">ไม่พบหัวข้อหรือเนื้อหาตามที่ค้นหา ลองเปลี่ยนคีย์เวิร์ดดู</p>
          </div>
        )}
      </div>

    </div>
  );
}
