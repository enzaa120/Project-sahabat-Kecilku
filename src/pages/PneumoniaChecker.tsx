import { useState } from 'react';
import { AlertCircle, ArrowRight, CheckCircle2, Info, Stethoscope, Timer, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export default function PneumoniaChecker() {
  const [step, setStep] = useState(1);
  const [age, setAge] = useState('');
  const [breaths, setBreaths] = useState('');
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { trackCheckerUse } = useAppContext();

  const handleSymptomToggle = (symptom: string) => {
    setSymptoms(prev => 
      prev.includes(symptom) ? prev.filter(s => s !== symptom) : [...prev, symptom]
    );
  };

  const handleCheck = async () => {
    setLoading(true);
    
    // Simulasi loading agar terasa seperti sedang memproses data
    setTimeout(() => {
      try {
        const ageNum = parseInt(age);
        const breathsNum = parseInt(breaths);

        // 1. Cek Napas Cepat berdasarkan pedoman MTBS WHO/Kemenkes
        let isNapasCepat = false;
        if (ageNum < 2 && breathsNum >= 60) {
          isNapasCepat = true;
        } else if (ageNum >= 2 && ageNum < 12 && breathsNum >= 50) {
          isNapasCepat = true;
        } else if (ageNum >= 12 && ageNum <= 60 && breathsNum >= 40) {
          isNapasCepat = true;
        } else if (ageNum > 60 && breathsNum >= 30) {
          isNapasCepat = true; // Fallback untuk anak di atas 5 tahun
        }

        // 2. Cek Tanda Bahaya Umum
        const dangerSymptoms = [
          'Tarikan dinding dada ke dalam', 
          'Napas berbunyi (mengi/stridor)', 
          'Tidak mau menyusu/minum', 
          'Tampak biru pada bibir/lidah',
          'Kejang',
          'Gelisah atau letargi'
        ];
        
        const hasDangerSigns = symptoms.some(s => dangerSymptoms.includes(s));

        // 3. Tentukan Status, Diagnosis, dan Rekomendasi
        let status = "Aman";
        let diagnosis = "";
        let recommendation: string[] = [];

        if (hasDangerSigns) {
          status = "Bahaya";
          diagnosis = "Terdapat tanda bahaya umum atau tarikan dinding dada ke dalam yang mengindikasikan PNEUMONIA BERAT.";
          recommendation = [
            "SEGERA bawa anak ke Rumah Sakit atau IGD terdekat!",
            "Jaga anak tetap hangat selama perjalanan.",
            "Jika anak masih bisa menyusu/minum, terus berikan sedikit-sedikit tapi sering untuk mencegah dehidrasi.",
            "Jangan berikan obat apa pun tanpa instruksi dokter."
          ];
        } else if (isNapasCepat) {
          status = "Waspada";
          diagnosis = "Napas anak tergolong cepat untuk usianya, yang mengindikasikan PNEUMONIA.";
          recommendation = [
            "Bawa anak ke Puskesmas atau dokter anak hari ini juga untuk mendapatkan antibiotik yang tepat.",
            "Tetap berikan ASI atau cairan yang cukup agar anak tidak dehidrasi.",
            "Redakan demam (jika ada) dengan paracetamol sesuai dosis anjuran.",
            "Terus amati napas anak. Jika muncul tarikan dinding dada ke dalam, segera bawa ke IGD."
          ];
        } else {
          status = "Aman";
          diagnosis = "Napas anak normal dan tidak ada tanda bahaya. Kemungkinan besar BATUK BUKAN PNEUMONIA.";
          recommendation = [
            "Rawat anak di rumah. Berikan ASI atau cairan lebih banyak dari biasanya.",
            "Jika anak batuk, berikan pelega tenggorokan yang aman (seperti air hangat atau madu untuk anak di atas 1 tahun).",
            "Pastikan anak mendapat istirahat yang cukup dan pantau suhu tubuhnya.",
            "Amati anak. Jika napas menjadi cepat atau anak sulit bernapas, segera bawa ke fasilitas kesehatan."
          ];
        }

        const data = {
          status,
          diagnosis,
          isNapasCepat,
          recommendation
        };

        setResult(data);
        setStep(4);
        trackCheckerUse();
      } catch (error) {
        console.error("Error checking:", error);
        alert("Terjadi kesalahan saat menganalisis data. Silakan coba lagi.");
      } finally {
        setLoading(false);
      }
    }, 1500); // Delay 1.5 detik
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full max-w-[1200px] mx-auto">
      {/* Sidebar Info */}
      <aside className="w-full lg:w-80 flex flex-col gap-6 shrink-0">
        <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
          <div className="flex items-center gap-3 text-blue-700 mb-4">
            <Info size={24} />
            <h3 className="font-bold text-lg">Panduan Penggunaan</h3>
          </div>
          <ul className="space-y-4 text-sm text-blue-900/80">
            <li className="flex gap-3">
              <span className="flex items-center justify-center size-6 rounded-full bg-blue-200 text-blue-700 font-bold shrink-0">1</span>
              <span>Pastikan anak dalam keadaan tenang, tidak menangis, dan tidak sedang menyusu.</span>
            </li>
            <li className="flex gap-3">
              <span className="flex items-center justify-center size-6 rounded-full bg-blue-200 text-blue-700 font-bold shrink-0">2</span>
              <span>Hitung tarikan napas anak selama tepat 1 menit menggunakan timer.</span>
            </li>
            <li className="flex gap-3">
              <span className="flex items-center justify-center size-6 rounded-full bg-blue-200 text-blue-700 font-bold shrink-0">3</span>
              <span>Satu tarikan napas dihitung saat dada mengembang dan mengempis kembali.</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
          <div className="flex items-center gap-3 text-amber-700 mb-4">
            <AlertCircle size={24} />
            <h3 className="font-bold text-lg">Perhatian</h3>
          </div>
          <p className="text-sm text-amber-900/80 leading-relaxed">
            Alat ini hanya untuk skrining awal dan <strong>bukan pengganti diagnosis medis</strong>. Jika anak tampak sangat sesak, kebiruan, atau kejang, segera bawa ke IGD terdekat tanpa menunggu hasil skrining.
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden flex flex-col">
        {/* Header & Progress Bar */}
        <div className="flex flex-col border-b border-slate-100 bg-slate-50/50">
          <div className="px-8 py-4 border-b border-slate-100 flex items-center">
            <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-blue-500 transition-colors font-medium text-sm">
              <ArrowLeft size={16} />
              Kembali ke Beranda
            </Link>
          </div>
          <div className="flex items-center px-8 py-6">
            <div className="flex items-center gap-2 flex-1">
              <div className={`size-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 1 ? 'bg-blue-500 text-white' : 'bg-slate-200 text-slate-500'}`}>1</div>
              <div className={`h-1 flex-1 rounded-full ${step >= 2 ? 'bg-blue-500' : 'bg-slate-200'}`}></div>
              <div className={`size-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 2 ? 'bg-blue-500 text-white' : 'bg-slate-200 text-slate-500'}`}>2</div>
              <div className={`h-1 flex-1 rounded-full ${step >= 3 ? 'bg-blue-500' : 'bg-slate-200'}`}></div>
              <div className={`size-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 3 ? 'bg-blue-500 text-white' : 'bg-slate-200 text-slate-500'}`}>3</div>
            </div>
          </div>
        </div>

        {/* Step Content */}
        <div className="p-8 md:p-12 flex-1 flex flex-col">
          {step === 1 && (
            <div className="flex flex-col gap-8 max-w-md mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Data Anak</h2>
                <p className="text-slate-500">Masukkan usia anak untuk menentukan batas napas normal.</p>
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-sm font-bold text-slate-700">Usia Anak (Bulan)</label>
                <input 
                  type="number" 
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Contoh: 14" 
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-lg"
                />
              </div>
              <button 
                onClick={() => setStep(2)}
                disabled={!age}
                className="w-full py-4 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 mt-4"
              >
                Lanjut <ArrowRight size={20} />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col gap-8 max-w-md mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Hitung Napas</h2>
                <p className="text-slate-500">Hitung tarikan napas anak selama 1 menit penuh.</p>
              </div>
              
              <div className="bg-slate-50 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 border border-slate-200">
                <Timer size={48} className="text-blue-500" />
                <p className="text-center text-sm text-slate-600">Gunakan timer di HP Anda atau jam tangan untuk menghitung tepat 60 detik.</p>
              </div>

              <div className="flex flex-col gap-3">
                <label className="text-sm font-bold text-slate-700">Jumlah Tarikan Napas (per menit)</label>
                <input 
                  type="number" 
                  value={breaths}
                  onChange={(e) => setBreaths(e.target.value)}
                  placeholder="Contoh: 45" 
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-lg"
                />
              </div>
              
              <div className="flex gap-4 mt-4">
                <button 
                  onClick={() => setStep(1)}
                  className="px-6 py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors"
                >
                  Kembali
                </button>
                <button 
                  onClick={() => setStep(3)}
                  disabled={!breaths}
                  className="flex-1 py-4 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  Lanjut <ArrowRight size={20} />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col gap-8 max-w-lg mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Gejala Tambahan</h2>
                <p className="text-slate-500">Pilih gejala lain yang sedang dialami anak (bisa lebih dari satu).</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  'Demam tinggi', 
                  'Batuk berdahak', 
                  'Tarikan dinding dada ke dalam', 
                  'Napas berbunyi (mengi/stridor)', 
                  'Tidak mau menyusu/minum', 
                  'Tampak biru pada bibir/lidah',
                  'Kejang',
                  'Gelisah atau letargi'
                ].map((symptom) => (
                  <button
                    key={symptom}
                    onClick={() => handleSymptomToggle(symptom)}
                    className={`p-4 rounded-xl border text-left text-sm font-medium transition-all ${
                      symptoms.includes(symptom) 
                        ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-sm' 
                        : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300'
                    }`}
                  >
                    {symptom}
                  </button>
                ))}
              </div>
              
              <div className="flex gap-4 mt-4">
                <button 
                  onClick={() => setStep(2)}
                  className="px-6 py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors"
                >
                  Kembali
                </button>
                <button 
                  onClick={handleCheck}
                  disabled={loading}
                  className="flex-1 py-4 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-400 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30"
                >
                  {loading ? 'Menganalisis...' : 'Cek Hasil'}
                  {!loading && <Stethoscope size={20} />}
                </button>
              </div>
            </div>
          )}

          {step === 4 && result && (
            <div className="flex flex-col gap-8 max-w-2xl mx-auto w-full animate-in fade-in zoom-in-95 duration-500">
              <div className={`p-8 rounded-2xl flex flex-col items-center text-center gap-4 ${
                result.status === 'Bahaya' ? 'bg-red-50 border border-red-200 text-red-900' :
                result.status === 'Waspada' ? 'bg-amber-50 border border-amber-200 text-amber-900' :
                'bg-emerald-50 border border-emerald-200 text-emerald-900'
              }`}>
                {result.status === 'Bahaya' ? <AlertCircle size={64} className="text-red-500" /> :
                 result.status === 'Waspada' ? <AlertCircle size={64} className="text-amber-500" /> :
                 <CheckCircle2 size={64} className="text-emerald-500" />}
                
                <div>
                  <h2 className="text-3xl font-black mb-2">{result.status}</h2>
                  <p className="text-lg opacity-90">{result.diagnosis}</p>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Stethoscope className="text-blue-500" /> Rekomendasi Tindakan
                </h3>
                <ul className="space-y-4">
                  {result.recommendation.map((rec: string, i: number) => (
                    <li key={i} className="flex gap-4">
                      <div className="size-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">{i + 1}</div>
                      <p className="text-slate-700 leading-relaxed">{rec}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <button 
                onClick={() => {
                  setStep(1);
                  setAge('');
                  setBreaths('');
                  setSymptoms([]);
                  setResult(null);
                }}
                className="py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors w-full max-w-md mx-auto"
              >
                Cek Ulang
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
