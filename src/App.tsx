/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Check, 
  ChevronRight, 
  MessageSquare, 
  Loader2, 
  CheckCircle2, 
  User,
  Phone,
  ShieldCheck,
  Settings
} from 'lucide-react';
import AdminDashboard from './components/AdminDashboard';

interface NamingOption {
  id: number;
  name: string;
  nameEn: string;
  tagline: string;
  description: string;
}

const namingOptions: NamingOption[] = [
  {
    id: 1,
    name: "세일즈윈",
    nameEn: "SalesWin",
    tagline: "결국, 이기는 영업",
    description: "'이기는 영업' 메시지 동기 자극"
  },
  {
    id: 2,
    name: "한화생명 Solution+",
    nameEn: "솔루션 플러스",
    tagline: "영업의 해답을 하나의 플랫폼에",
    description: "영업을 통합적으로 지원하는 종합솔루션 플랫폼"
  },
  {
    id: 3,
    name: "한화생명 AI링크",
    nameEn: "AI Link",
    tagline: "영업의 모든점을 하나로 잇다",
    description: "AI기반 최적의 연결을 실현하는 플랫폼"
  },
  {
    id: 4,
    name: "한화생명 에이슈어",
    nameEn: "AI-sure",
    tagline: "AI + Insure + Sure",
    description: "AI가 당신의 영업을 확실하게 만들어준다는 답변"
  },
  {
    id: 5,
    name: "한화생명 아이온",
    nameEn: "AI-ON",
    tagline: "AI + ON",
    description: "24시간 언제나 ON되어 있는 스마트한 시스템을 의미"
  }
];

export default function App() {
  const [view, setView] = useState<'survey' | 'admin'>('survey');
  const [isAdminAuthModalOpen, setIsAdminAuthModalOpen] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [additionalNaming, setAdditionalNaming] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const canSubmit = selectedId !== null && employeeId.trim() !== "";

  const handleAdminAccess = () => {
    // Simple demo password: admin1234
    if (adminPassword === "admin1234") {
      setView('admin');
      setIsAdminAuthModalOpen(false);
      setAdminPassword("");
      setPasswordError(false);
    } else {
      setPasswordError(true);
      setAdminPassword("");
    }
  };

  const handleSubmit = async () => {
    if (!canSubmit) return;
    
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (view === 'admin') {
    return <AdminDashboard onBack={() => setView('survey')} />;
  }

  if (isSubmitted) {
    return (
      <div id="thank-you-page" className="min-h-screen bg-white flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md w-full"
        >
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-orange-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">참여해 주셔서 감사합니다!</h2>
          <p className="text-gray-600 mb-8">
            소중한 의견은 영업지원시스템 통합 네이밍 선정과정에 <br/>소중하게 활용될 예정입니다.
          </p>
          <button 
            id="close-button"
            onClick={() => {
              setIsSubmitted(false);
              setSelectedId(null);
              setAdditionalNaming("");
              setEmployeeId("");
            }}
            className="w-full py-4 bg-orange-600 text-white rounded-2xl font-bold hover:bg-orange-700 transition-colors shadow-lg shadow-orange-200"
          >
            홈으로 돌아가기
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div id="survey-page" className="min-h-screen bg-gray-50 flex flex-col items-center">
      {/* Admin Authentication Modal */}
      <AnimatePresence>
        {isAdminAuthModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl relative"
            >
              <button 
                onClick={() => setIsAdminAuthModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-2"
              >
                <Check className="w-5 h-5 rotate-45" />
              </button>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6">
                  <ShieldCheck className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-2">관리자 인증</h3>
                <p className="text-sm text-gray-500 font-medium mb-6">대시보드 접속을 위해 비밀번호를 입력해 주세요.</p>
                
                <div className="w-full space-y-4">
                  <div className="relative group">
                    <input
                      type="password"
                      autoFocus
                      value={adminPassword}
                      onChange={(e) => {
                        setAdminPassword(e.target.value);
                        setPasswordError(false);
                      }}
                      onKeyDown={(e) => e.key === 'Enter' && handleAdminAccess()}
                      placeholder="비밀번호 입력"
                      className={`w-full h-14 px-5 bg-gray-50 border-2 rounded-2xl text-lg font-black tracking-widest text-center transition-all outline-none
                        ${passwordError ? 'border-red-500 bg-red-50' : 'border-gray-100 focus:border-orange-500 focus:bg-white'}
                      `}
                    />
                    {passwordError && (
                      <p className="text-xs text-red-500 mt-2 font-bold">비밀번호가 올바르지 않습니다.</p>
                    )}
                  </div>
                  
                  <button 
                    onClick={handleAdminAccess}
                    className="w-full h-14 bg-orange-600 text-white rounded-2xl font-black text-lg hover:bg-orange-700 transition-transform active:scale-95 shadow-lg shadow-orange-200"
                  >
                    확인
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Header Section */}
      <header id="header" className="w-full bg-[#f54600] text-white pt-12 pb-10 px-6 overflow-hidden relative">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-orange-500 rounded-full blur-3xl opacity-50 pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-orange-400 rounded-full blur-3xl opacity-30 pointer-events-none" />
        
        <div className="max-w-lg mx-auto relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-bold tracking-[0.2em] mb-4 border border-white/30"
          >
            NAMING SURVEY
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl md:text-3xl font-black leading-tight mb-2"
          >
            영업지원시스템 통합 네이밍 <br className="hidden sm:block" /> 선호도 조사
          </motion.h1>
          <p className="text-white/80 text-sm md:text-base font-medium">
            미래를 향해 달려가는 우리 영업지원시스템의 명칭을 설계사님들이 지어주세요.
          </p>
        </div>
      </header>

      {/* Survey Body */}
      <main id="main-content" className="w-full max-w-lg flex-1 px-4 pt-8 pb-32">
        {/* Q1: Selection */}
        <section id="section-q1" className="mb-10">
          <div className="flex items-center gap-3 mb-4">
             <div className="w-6 h-6 bg-orange-600 text-white rounded-lg flex items-center justify-center text-xs font-bold">1</div>
             <h2 className="text-lg font-black text-gray-900">가장 적합한 이름을 선택해주세요</h2>
          </div>
          <div className="space-y-3">
            {namingOptions.map((option) => (
              <motion.div
                key={option.id}
                id={`option-card-${option.id}`}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setSelectedId(option.id)}
                className={`
                  relative p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer group overflow-hidden
                  ${selectedId === option.id 
                    ? 'bg-orange-50 border-orange-600 shadow-lg shadow-orange-100' 
                    : 'bg-white border-transparent hover:border-orange-200 shadow-sm'}
                `}
              >
                <AnimatePresence>
                  {selectedId === option.id && (
                    <motion.div 
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute -top-6 -right-6 w-16 h-16 bg-orange-600 rounded-full flex items-end justify-start p-3"
                    >
                      <Check className="text-white w-5 h-5 mb-0.5 ml-0.5" strokeWidth={3} />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex gap-4 items-start">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center font-black text-lg transition-colors shrink-0
                    ${selectedId === option.id ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-400'}
                  `}>
                    {option.id}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-baseline gap-2 mb-1">
                      <h3 className={`text-lg font-black transition-colors ${selectedId === option.id ? 'text-orange-600' : 'text-gray-900 group-hover:text-orange-600'}`}>
                        {option.name}
                      </h3>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        {option.nameEn}
                      </span>
                    </div>
                    
                    <div className={`text-xs font-black uppercase tracking-tight mb-2 transition-colors ${selectedId === option.id ? 'text-orange-500' : 'text-gray-400'}`}>
                      {option.tagline}
                    </div>
                    
                    <p className="text-xs text-gray-600 leading-relaxed font-medium">
                      {option.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Q2: Opinion Section */}
        <section id="section-q2" className="mb-10">
          <div className="flex items-center gap-3 mb-4">
             <div className="w-6 h-6 bg-orange-600 text-white rounded-lg flex items-center justify-center text-xs font-bold">2</div>
             <h2 className="text-lg font-black text-gray-900">추가 의견</h2>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare className="w-4 h-4 text-orange-500" />
              <h4 className="text-sm font-bold text-gray-700">추가로 추천하시고 싶은 네이밍을 작성해주세요</h4>
            </div>
            <textarea
              id="additional-naming-textarea"
              value={additionalNaming}
              onChange={(e) => setAdditionalNaming(e.target.value)}
              placeholder="자유롭게 입력해 주세요 (선택사항)"
              maxLength={100}
              className="w-full h-24 bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm font-medium focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all resize-none placeholder:text-gray-300"
            />
            <div className="text-right mt-1 text-[10px] font-bold text-gray-400 tracking-wider">
              {additionalNaming.length}/100
            </div>
          </div>
        </section>

        {/* Q3: Identification */}
        <section id="section-identity" className="max-w-md">
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-1">
               <div className="w-6 h-6 bg-orange-600 text-white rounded-lg flex items-center justify-center text-xs font-bold">3</div>
               <h2 className="text-lg font-black text-gray-900">사번</h2>
            </div>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors">
                <User className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                placeholder="사번을 입력하세요 (필수)"
                className="w-full bg-white border border-gray-100 shadow-sm h-14 pl-12 pr-4 rounded-xl text-sm font-bold focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all"
              />
            </div>
            <p className="text-[11px] text-gray-500 font-bold px-1 leading-tight flex items-center gap-1.5 bg-orange-50/50 p-3 rounded-lg border border-orange-100">
               <div className="w-1.5 h-1.5 bg-orange-500 rounded-full shrink-0" />
               회사에 등록된 휴대폰번호로 상품권이 발송될 예정입니다.
            </p>
          </div>
        </section>

        {/* Footer Info */}
        <div id="footer-actions" className="mt-12 mb-4 py-4 flex flex-col items-center gap-4">
          <div className="flex gap-4">
            <button className="text-[11px] font-bold text-gray-300 hover:text-gray-500 transition-colors uppercase flex items-center gap-1.5 underline underline-offset-4">
              <ShieldCheck className="w-3.5 h-3.5" /> 개인정보처리방침 및 활용동의
            </button>
            <button 
              onClick={() => setIsAdminAuthModalOpen(true)}
              className="text-[11px] font-bold text-gray-300 hover:text-gray-500 transition-colors uppercase flex items-center gap-1.5 underline underline-offset-4"
            >
              <Settings className="w-3.5 h-3.5" /> 관리자 모드
            </button>
          </div>
        </div>
      </main>

      {/* Floating Bottom Action Bar */}
      <footer id="bottom-bar" className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-100 z-50 p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <div className="max-w-lg mx-auto">
          <button
            id="submit-button"
            disabled={!canSubmit || isSubmitting}
            onClick={handleSubmit}
            className={`
              w-full h-14 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 relative overflow-hidden
              ${!canSubmit 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-orange-600 text-white shadow-xl shadow-orange-200 active:scale-[0.98]'}
            `}
          >
            {isSubmitting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <span className="font-black text-lg uppercase tracking-tight">
                  설문 참여하기
                </span>
                {canSubmit && <ChevronRight className="w-6 h-6" strokeWidth={3} />}
              </>
            )}
          </button>
        </div>
      </footer>
    </div>
  );
}
