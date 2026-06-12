/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { EntraUser } from '../types';
import { User, Bell, Wifi, Lock, ExternalLink, Database, AlertCircle, Copy, Check } from 'lucide-react';

interface HeaderProps {
  user: EntraUser;
}

export default function Header({ user }: HeaderProps) {
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [copied, setCopied] = useState(false);

  // Simulated Entra ID claims
  const tokenClaims = {
    aud: "00000003-0000-0000-c000-000000000000", // Microsoft Graph
    iss: "https://sts.windows.net/72f988bf-86f1-41af-91ab-2d7cd011db47/",
    name: user.name,
    unique_name: user.email,
    roles: [user.role, "PowerUser", user.role === "IT_Support" ? "IT-Support-Approver" : "IT-Support-Requestor"],
    tid: "72f988bf-ab41-419b-a010-2178ff00732a",
    scp: "User.Read Directory.Read.All Mail.Send SharePoint.ReadWrite.All"
  };

  const handleCopyToken = () => {
    navigator.clipboard.writeText(JSON.stringify(tokenClaims, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="glass-card sticky top-0 z-30 !rounded-none !border-t-0 !border-x-0" id="portal-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo & Platform Info */}
          <div className="flex items-center space-x-3">
            <div className="flex flex-col items-center justify-center bg-blue-600 text-white rounded-lg p-2 h-10 w-10 shadow-sm shadow-blue-200">
              <span className="font-bold text-xs uppercase tracking-wider leading-none">IT</span>
              <span className="text-[9px] font-medium leading-none mt-0.5">SSO</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-1.5 leading-none">
                ระบบพอร์ทัลบริการไอทีและพนักงาน
              </h1>
              <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>เชื่อมต่อผ่าน Microsoft Entra ID และ SharePoint Online</span>
              </p>
            </div>
          </div>

          {/* Quick Actions & SSO Status Indicator */}
          <div className="flex items-center space-x-4">
            
            {/* System Status */}
            <div className="hidden md:flex items-center space-x-1.5 bg-white/30 backdrop-blur-md border border-white/50 rounded-full py-1 px-3 text-xs text-slate-600">
              <Wifi size={14} className="text-emerald-500" />
              <span>ระบบใช้งานได้ตามปกติ (Online)</span>
            </div>

            {/* SharePoint Cloud Status Info Tab */}
            <button
              onClick={() => setShowTokenModal(true)}
              className="flex items-center space-x-2 bg-blue-50 border border-blue-100 text-blue-700 hover:bg-blue-100 transition-colors py-1.5 px-3 rounded-lg text-xs font-semibold cursor-pointer"
              title="คลิกเพื่อตรวจสอบเอกสารรับรองสิทธิ์ (SSO Tokens)"
            >
              <Lock size={13} className="text-blue-600" />
              <span className="hidden sm:inline">สิทธิ์ความปลอดภัย: MS Entra SSO</span>
              <span className="sm:hidden font-mono text-[10px]">SSO</span>
            </button>

            {/* User Profile dropdown replica */}
            <div className="flex items-center space-x-2 hover:bg-slate-50 p-1.5 rounded-lg transition-colors border border-transparent hover:border-slate-100">
              <img
                src={user.avatar}
                alt={user.name}
                referrerPolicy="no-referrer"
                className="h-8.5 w-8.5 rounded-full object-cover ring-2 ring-blue-500/10"
              />
              <div className="hidden lg:block text-left">
                <div className="text-xs font-semibold text-slate-800 leading-none">{user.name}</div>
                <div className="text-[10px] text-slate-500 mt-0.5 leading-none font-medium text-slate-400">{user.email}</div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* SSO Token Insights Modal */}
      {showTokenModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all animate-fade-in">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-xl overflow-hidden border border-slate-100">
            
            {/* Modal Title */}
            <div className="bg-slate-950 p-4 text-white flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Lock size={18} className="text-blue-400" />
                <div>
                  <h3 className="font-semibold text-sm">Microsoft Entra ID JWT Decoded Token</h3>
                  <p className="text-[10px] text-slate-400">สิทธิ์รับรองความปลอดภัยที่กู้จาก Microsoft Azure SSO Active Directory</p>
                </div>
              </div>
              <button 
                onClick={() => setShowTokenModal(false)}
                className="text-slate-400 hover:text-white transition-colors text-xs font-bold px-2 py-1 rounded hover:bg-slate-800"
              >
                ปิด (Close)
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-4">
              <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg flex items-start gap-2 text-xs text-blue-800">
                <AlertCircle size={16} className="text-blue-600 mt-0.5 shrink-0" />
                <p>
                  ระบบนี้จำลองการเข้าใช้งานแบบ <strong>Single Sign-On (SSO)</strong> แท้จริง หากพัฒนาต่อ สามารถเรียกใช้ไลบรารี <code>@azure/msal-react</code> เพื่อคว้าใบรับรองเหล่านี้และอนุญาตให้แสดงกล่องบริการที่ตรงตามสิทธิ์พนักงานได้ทันที
                </p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">Claims / Scopes ข้อมูลผู้ใช้</span>
                  <button 
                    onClick={handleCopyToken}
                    className="text-blue-600 hover:text-blue-800 transition-colors text-xs flex items-center gap-1 font-medium"
                  >
                    {copied ? (
                      <>
                        <Check size={12} className="text-emerald-600" />
                        <span className="text-emerald-600">คัดลอกแล้ว</span>
                      </>
                    ) : (
                      <>
                        <Copy size={12} />
                        <span>คัดลอก JSON คีย์</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="bg-slate-900 text-slate-300 font-mono text-xs p-4 rounded-lg overflow-y-auto max-h-60 leading-relaxed border border-slate-800">
                  {JSON.stringify(tokenClaims, null, 2)}
                </pre>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-lg border border-slate-100">
                <div>
                  <span className="text-slate-400">ผู้ประสงค์ระบบ / Employee:</span>
                  <div className="font-semibold text-slate-800">{user.name}</div>
                </div>
                <div>
                  <span className="text-slate-400">หน่วยงาน / Department:</span>
                  <div className="font-semibold text-slate-800">{user.department}</div>
                </div>
                <div>
                  <span className="text-slate-400">บทบาทสิทธิ์ (Roles Claim):</span>
                  <div className="font-medium text-emerald-700">✓ Authorized Active User</div>
                </div>
                <div>
                  <span className="text-slate-400">การยืนยันตัวตน MFA:</span>
                  <div className="font-medium text-blue-700">✓ Strong Authenticated</div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 p-3 px-4 flex justify-end border-t border-slate-100">
              <button
                onClick={() => setShowTokenModal(false)}
                className="bg-slate-900 hover:bg-slate-800 text-white rounded-lg px-4 py-1.5 text-xs font-semibold cursor-pointer transition-colors"
              >
                เข้าใจแล้ว
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
