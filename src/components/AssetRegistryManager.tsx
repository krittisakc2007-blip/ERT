/**
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Database, Plus, Search, Filter, ShieldCheck, CheckCircle2, Sliders, Settings } from 'lucide-react';

interface Asset {
  id: string;
  assetName: string;
  category: 'Hardware' | 'License' | 'Network' | 'Peripheral';
  serialNo: string;
  purchasedDate: string;
  assignedUser: string;
  condition: 'Excellent' | 'Good' | 'Under Repair' | 'Disposed';
}

export default function AssetRegistryManager() {
  const [assets, setAssets] = useState<Asset[]>([
    {
      id: "AST-2026-001",
      assetName: "Dell Latitude 5440 Workstation Laptop",
      category: "Hardware",
      serialNo: "CN-0DFKFF-G92-114S",
      purchasedDate: "2025-01-15",
      assignedUser: "นัสริน สุขสวัสดิ์",
      condition: "Excellent"
    },
    {
      id: "AST-2026-002",
      assetName: "FortiGate 100F Firewall Core Router",
      category: "Network",
      serialNo: "FGT100FT20011429",
      purchasedDate: "2024-06-10",
      assignedUser: "ส่วนกลาง (IT Server Room)",
      condition: "Good"
    },
    {
      id: "AST-2026-003",
      assetName: "Microsoft 365 E5 Enterprise License (500 Seat)",
      category: "License",
      serialNo: "LIC-MS365-E5-ENTER",
      purchasedDate: "2026-01-01",
      assignedUser: "ใช้งานตาม Entra ID Syncing",
      condition: "Excellent"
    },
    {
      id: "AST-2026-004",
      assetName: "Sony Headset WH-CH720N Noise Cancel",
      category: "Peripheral",
      serialNo: "SNY-720N-6641A5",
      purchasedDate: "2025-11-20",
      assignedUser: "กิตติศักดิ์ ชัยชนะ",
      condition: "Good"
    },
    {
      id: "AST-2026-005",
      assetName: "Apple iPad Air 5 (64GB, Cellular)",
      category: "Hardware",
      serialNo: "GGNY5187HFD9",
      purchasedDate: "2024-04-12",
      assignedUser: "ฝ่ายความมั่นคงการผลิต",
      condition: "Under Repair"
    }
  ]);

  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);

  // Form states
  const [assetName, setAssetName] = useState("");
  const [category, setCategory] = useState<'Hardware' | 'License' | 'Network' | 'Peripheral'>("Hardware");
  const [serialNo, setSerialNo] = useState("");
  const [assignedUser, setAssignedUser] = useState("");
  const [condition, setCondition] = useState<'Excellent' | 'Good' | 'Under Repair' | 'Disposed'>("Excellent");

  const handleAddAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assetName.trim() || !serialNo.trim()) {
      alert("กรุณากรอกชื่อทรัพย์สินและรหัสซีเรียลให้ครบถ้วน");
      return;
    }

    const newItem: Asset = {
      id: `AST-2026-00${assets.length + 1}`,
      assetName,
      category,
      serialNo,
      purchasedDate: new Date().toISOString().split('T')[0],
      assignedUser: assignedUser.trim() || 'คลังส่วนกลาง (Stock)',
      condition
    };

    setAssets([newItem, ...assets]);
    setAssetName("");
    setSerialNo("");
    setAssignedUser("");
    setCondition("Excellent");
    setShowAddModal(false);
  };

  const filteredAssets = assets.filter(ast => {
    const matchesSearch = ast.assetName.toLowerCase().includes(search.toLowerCase()) || 
                          ast.serialNo.toLowerCase().includes(search.toLowerCase()) || 
                          ast.assignedUser.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCat === "All" || ast.category === selectedCat;
    return matchesSearch && matchesCat;
  });

  // Calculate statistics
  const totalCount = assets.length;
  const underRepair = assets.filter(a => a.condition === 'Under Repair').length;
  const centralStock = assets.filter(a => a.assignedUser.includes('ส่วนกลาง') || a.assignedUser.includes('คลัง')).length;

  return (
    <div className="space-y-6" id="asset-registry-root">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-md font-bold text-slate-900 flex items-center gap-1.5ClassName bg-blue-50/50">
            <Database className="text-blue-600" size={18} />
            <span>จัดการทะเบียนทรัพย์สินไอที (IT Asset Registry & Controls)</span>
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            สิทธิ์จัดตั้งควบคุมข้อมูลอุปกรณ์คอมพิวเตอร์และสัญญาไลเซนส์ระบบงาน (IT Admin Control Panel) ซิงค์ข้อมูลกับ SharePoint <code>Asset_Registry_List</code>
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(!showAddModal)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-2 px-4 rounded-xl flex items-center gap-1.5 transition-all shadow-sm shadow-blue-200 cursor-pointer"
        >
          <Plus size={15} />
          <span>เพิ่มรหัสสินทรัพย์</span>
        </button>
      </div>

      <hr className="border-white/40" />

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white/40 backdrop-blur-md p-4 rounded-xl border border-white/50 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">สินทรัพย์ที่ลงทะเบียนทั้งหมด</span>
            <span className="text-lg font-bold text-slate-900 leading-tight block mt-1">{totalCount} รายการ</span>
            <span className="text-[10px] text-slate-500 font-medium block mt-0.5">รวมรหัสลิขสิทธิ์และอุปกรณ์โครงข่าย</span>
          </div>
          <div className="p-2.5 bg-blue-50 border border-blue-105 rounded-lg text-blue-600">
            <Database size={18} />
          </div>
        </div>

        <div className="bg-white/40 backdrop-blur-md p-4 rounded-xl border border-white/50 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">สถิติอุบัติเหตุ / ซ่อมบำรุงในสาย</span>
            <span className="text-lg font-bold text-amber-600 leading-tight block mt-1">{underRepair} อุปกรณ์</span>
            <span className="text-[10px] text-slate-500 font-medium block mt-0.5">ส่งมอบซ่อมแซมกับพันธมิตรผู้จัดหา</span>
          </div>
          <div className="p-2.5 bg-amber-50 border border-amber-100 rounded-lg text-amber-600">
            <Settings size={18} className="animate-spin" />
          </div>
        </div>

        <div className="bg-white/40 backdrop-blur-md p-4 rounded-xl border border-white/50 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">อยู่ในคลังสำรอง / ส่วนกลาง</span>
            <span className="text-lg font-bold text-emerald-600 leading-tight block mt-1">{centralStock} ชิ้นงาน</span>
            <span className="text-[10px] text-slate-500 font-medium block mt-0.5">พร้อมจัดสรรเมื่อมีการส่งเรื่องแจ้งร้องเรียน</span>
          </div>
          <div className="p-2.5 bg-emerald-50 border border-emerald-100 rounded-lg text-emerald-600">
            <CheckCircle2 size={18} />
          </div>
        </div>
      </div>

      {/* Add Asset Dynamic Dialog */}
      {showAddModal && (
        <div className="bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl p-5 shadow-xs">
          <h4 className="text-xs font-bold text-slate-950 uppercase tracking-wider mb-4 border-b border-white pb-2 flex items-center gap-1.5">
            <Sliders size={14} className="text-blue-600" />
            ลงทะเบียนเพิ่มอุปกรณ์ / สินทรัพย์ใหม่เข้าระบบคลังองค์กร
          </h4>
          <form onSubmit={handleAddAsset} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">ชื่อเรียกทรัพย์สิน *</label>
                <input
                  type="text"
                  required
                  placeholder="เช่น: MacBook Air 13 M3, FortiGate 200F"
                  value={assetName}
                  onChange={(e) => setAssetName(e.target.value)}
                  className="w-full p-2 text-xs bg-white/70 border border-slate-200 rounded-lg focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">หมวดหมู่ทรัพย์สิน *</label>
                <select
                  value={category}
                  onChange={(e: any) => setCategory(e.target.value)}
                  className="w-full p-2 text-xs bg-white/70 border border-slate-200 rounded-lg focus:outline-none"
                >
                  <option value="Hardware">Hardware - เครื่องคอมพิวเตอร์ อุปกรณ์หลัก</option>
                  <option value="License">License - สัญญาซอฟต์แวร์และลิขสิทธิ์</option>
                  <option value="Network">Network - โครงสร้างความปะปนระบบสื่อสาร / ไฟร์วอลล์</option>
                  <option value="Peripheral">Peripheral - อุปกรณ์เสริมประกอบทีวี แว่นขยาย หรือจอมอนิเตอร์</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">รหัสซีเรียล (Serial Number / S/N) *</label>
                <input
                  type="text"
                  required
                  placeholder="กรอก S/N หรือรหัสอนุสิทธิสัญญา..."
                  value={serialNo}
                  onChange={(e) => setSerialNo(e.target.value)}
                  className="w-full p-2 text-xs bg-white/70 border border-slate-200 rounded-lg focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">สภาพทรัพย์สินปัจจุบัน</label>
                <select
                  value={condition}
                  onChange={(e: any) => setCondition(e.target.value)}
                  className="w-full p-2 text-xs bg-white/70 border border-slate-200 rounded-lg focus:outline-none"
                >
                  <option value="Excellent">Excellent - สภาพเกือบเต็มร้อยเปอร์เซ็นต์ สมบูรณ์แบบ</option>
                  <option value="Good">Good - ผ่านการใช้งานแล้ว ยังคงสมรรถนะดีเยื่ยม</option>
                  <option value="Under Repair">Under Repair - อยู่ในระหว่างส่งซ่อมบำรุง / รอดำเนินการ</option>
                  <option value="Disposed">Disposed - ถูกแทงจำหน่ายชำรุดทรุดโทรม / ไม่คุ้มค่าซ่อม</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-1">ผู้ได้รับจัดสรรให้ถือสิทธิ์ (Assigned User)</label>
              <input
                type="text"
                placeholder="ระบุชื่อพนักงาน หรือแผนกที่รับเครื่องไปใช้ (ถ้าเว้นจะจัดเก็บเป็น คลังส่วนกลาง)"
                value={assignedUser}
                onChange={(e) => setAssignedUser(e.target.value)}
                className="w-full p-2 text-xs bg-white/70 border border-slate-200 rounded-lg focus:outline-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-605 text-slate-600 bg-white border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50"
              >
                ยกเลิก
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg cursor-pointer hover:bg-blue-700"
              >
                บันทึกบันทึกทะเบียนสินทรัพย์
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Control Panel Filter Group */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white/20 p-3 rounded-xl border border-white/50">
        
        {/* Search Input */}
        <div className="relative flex-1 w-full">
          <Search size={15} className="absolute left-3.5 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="ค้นหาตามรหัสเครื่อง, S/N, พนักงานผู้ระบุจดหมาย, หรือประเภทอุปกรณ์..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-white/65 backdrop-blur-md rounded-lg border border-white/60 focus:outline-none"
          />
        </div>

        {/* Category Controls */}
        <div className="flex items-center space-x-1 w-full md:w-auto overflow-x-auto">
          {['All', 'Hardware', 'License', 'Network', 'Peripheral'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-3 py-1.5 text-xs rounded-lg font-bold border transition-all cursor-pointer inline-block shrink-0 ${
                selectedCat === cat
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white/40 text-slate-600 border-white/50 hover:bg-white/80'
              }`}
            >
              {cat === 'All' && 'ทั้งหมด'}
              {cat === 'Hardware' && 'Hardware'}
              {cat === 'License' && 'Licenses'}
              {cat === 'Network' && 'Networks'}
              {cat === 'Peripheral' && 'Peripherals'}
            </button>
          ))}
        </div>

      </div>

      {/* Main Asset Database Table Layout */}
      <div className="bg-white/30 backdrop-blur-md border border-white/50 rounded-xl overflow-x-auto shadow-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/45 border-b border-white/40 text-slate-500 font-bold text-[10.5px] uppercase tracking-wider">
              <th className="p-4">รหัสทะเบียน</th>
              <th className="p-4">หมวดหมู่</th>
              <th className="p-4">รายการทรัพย์สินสินค้า</th>
              <th className="p-4">คีย์ซีเรียล S/N</th>
              <th className="p-4">สภาพปัจจุบัน</th>
              <th className="p-4">ผู้ใช้งานสิทธิ์</th>
              <th className="p-4">วันนำลงตู้</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/20 text-xs">
            {filteredAssets.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-slate-400 font-medium">
                  ไม่พบรายการทรัพย์สินไอทีใดๆ ที่สอดคล้องกับตัวกรองค้นหาที่เลือก
                </td>
              </tr>
            ) : (
              filteredAssets.map((ast) => {
                const badgeStyles = 
                  ast.condition === 'Excellent' ? 'bg-emerald-50 text-emerald-850 border border-emerald-200' :
                  ast.condition === 'Good' ? 'bg-blue-50 text-blue-850 border border-blue-200' :
                  ast.condition === 'Under Repair' ? 'bg-amber-50 text-amber-850 border border-amber-200' :
                  'bg-rose-50 text-rose-850 border border-rose-200';

                return (
                  <tr key={ast.id} className="hover:bg-white/30 transition-colors">
                    <td className="p-4 font-mono font-bold text-blue-800">{ast.id}</td>
                    <td className="p-4">
                      <span className="text-[10px] uppercase font-bold text-slate-500 bg-slate-100 mx-px py-0.5 px-1.5 rounded-md">
                        {ast.category}
                      </span>
                    </td>
                    <td className="p-4 font-bold text-slate-900">{ast.assetName}</td>
                    <td className="p-4 font-mono text-[10px] text-slate-503 text-slate-600">{ast.serialNo}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${badgeStyles}`}>
                        {ast.condition === 'Excellent' && 'สมบูรณ์แบบ'}
                        {ast.condition === 'Good' && 'สมควรใช้การ'}
                        {ast.condition === 'Under Repair' && 'อยู่ระหว่างซ่อม/ล่าช้า'}
                        {ast.condition === 'Disposed' && 'แทงจำหน่ายชำรุด'}
                      </span>
                    </td>
                    <td className="p-4 font-semibold text-slate-700">{ast.assignedUser}</td>
                    <td className="p-4 text-slate-400 font-mono text-[10px]">{ast.purchasedDate}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
