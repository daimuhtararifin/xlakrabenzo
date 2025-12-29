import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Search, MapPin, Database, Cpu, Globe, CheckCircle2 } from 'lucide-react';
import { AreaResult } from '../App';

// Dummy Data
const areaData = [
  // Area 1
  ...["kab. kulon progo", "kota yogyakarta", "kab. sleman", "kab. bantul", "kab. gunungkidul", "kab. bandung", "kab. kuningan", "kab. purwakarta", "kota bandung", "kab. jembrana", "kab. buleleng", "kab. maluku tenggara barat", "kab. kepulauan aru", "kota tual", "kab. seram bagian barat", "kab. maluku tengah", "kab. seram bagian timur", "kota ambon", "kab. maluku tenggara", "kab. maluku barat daya", "kab. buru selatan", "kab. buru", "kab. halmahera barat", "kab. halmahera utara", "kab. kepulauan sula", "kab. halmahera timur", "kab. pulau taliabu", "kab. halmahera selatan", "kota tidore kepulauan", "kota ternate", "kab. halmahera tengah", "kab. pulau morotai", "kab. asmat", "kab. jayapura", "kab. mimika", "kab. keerom", "kab. biak numfor", "kota jayapura", "kab. kepulauan yapen", "kab. boven digoel", "kab. merauke", "kab. deiyai", "kab. dogiyai", "kab. intan jaya", "kab. jayawijaya", "kab. lanny jaya", "kab. mamberamo raya", "kab. mamberamo tengah", "kab. mappi", "kab. nabire", "kab. nduga", "kab. paniai", "kab. pegunungan bintang", "kab. puncak", "kab. puncak jaya", "kab. sarmi", "kab. supiori", "kab. tolikara", "kab. waropen", "kab. yahukimo", "kab. yalimo", "kab. teluk bintuni", "kab. sorong selatan", "kab. sorong", "kab. teluk wondama", "kota sorong", "kab. manokwari", "kab. fak fak", "kab. kaimana", "kab. manokwari selatan", "kab. maybrat", "kab. pegunungan arfak", "kab. raja ampat", "kab. tambrauw"].map(city => ({ city: city.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '), area: 1, bonusXXL: 0, bonusXL: 0 })),

  // Area 2
  ...["kota tangerang selatan", "kota tangerang", "kab. tangerang", "kab. pandeglang", "kab. lebak", "kab. serang", "kota serang", "kota cilegon", "kota jakarta pusat", "kota jakarta selatan", "kota jakarta barat", "kota jakarta timur", "kota jakarta utara", "kab. bandung barat", "kota cimahi", "kab. cirebon", "kota cirebon", "kab. indramayu", "kab. subang", "kab. tegal", "kota surakarta", "kota tegal", "kab. brebes", "kab. kebumen", "kab. pemalang", "kota semarang", "kota probolinggo", "kab. bangkalan", "kab. sidoarjo", "kab. banyuwangi", "kota surabaya", "kab. sampang", "kab. pamekasan", "kab. sumenep", "kab. pacitan", "kab. bangka selatan", "kota pangkal pinang", "kab. belitung", "kab. belitung timur", "kota batam", "kab. aceh barat daya", "kab. aceh besar", "kota sabang", "kab. gayo lues", "kota pekanbaru", "kab. kepulauan mentawai", "kab. karo", "kota medan", "kab. dairi", "kab. hulu sungai tengah", "kab. tapin", "kab. hulu sungai utara", "kab. tabalong", "kota banjarmasin", "kab. banjar", "kab. tanah bumbu", "kota banjarbaru", "kab. hulu sungai selatan", "kab. mamuju tengah", "kab. barru", "kota pare pare", "kab. pinrang", "kab. konawe kepulauan", "kab. konawe utara", "kab. buton utara", "kab. wakatobi", "kab. badung", "kab. karangasem", "kab. tabanan", "kab. bangli", "kab. gianyar", "kab. klungkung", "kota denpasar", "kab. lombok barat", "kab. lombok timur", "kota mataram", "kab. lombok tengah", "kab. lombok utara", "kab. sumbawa barat", "kab. sumbawa", "kota bima", "kab. dompu"].map(city => ({ city: city.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '), area: 2, bonusXXL: 4.5, bonusXL: 3 })),

  // Area 3
  ...["kab. kepulauan seribu", "kab. bogor", "kota bogor", "kota depok", "kota bekasi", "kota banjar", "kab. ciamis", "kota tasikmalaya", "kab. majalengka", "kab. sumedang", "kab. bekasi", "kab. tasikmalaya", "kab. garut", "kab. boyolali", "kota salatiga", "kab. semarang", "kab. cilacap", "kab. grobogan", "kab. kendal", "kab. rembang", "kab. lumajang", "kab. probolinggo", "kab. seluma", "kab. batanghari", "kota jambi", "kab. tanjung jabung barat", "kab. muaro jambi", "kab. sarolangun", "kab. bangka", "kab. bangka tengah", "kab. bangka barat", "kab. karimun", "kab. bintan", "kota tanjung pinang", "kab. lampung tengah", "kab. pringsewu", "kota metro", "kab. pesawaran", "kab. lampung selatan", "kota bandar lampung", "kab. aceh jaya", "kab. aceh selatan", "kab. aceh tenggara", "kab. nagan raya", "kota banda aceh", "kab. kuantan singingi", "kab. pelalawan", "kab. kampar", "kab. siak", "kota dumai", "kab. rokan hilir", "kab. indragiri hulu", "kab. kepulauan meranti", "kab. bengkalis", "kota payakumbuh", "kota padang panjang", "kab. sijunjung", "kab. padang pariaman", "kota padang", "kab. solok selatan", "kab. ogan komering ilir", "kab. penukal abab lematang ilir", "kab. banyuasin", "kota palembang", "kab. ogan ilir", "kota binjai", "kota tebing tinggi", "kab. serdang bedagai", "kab. langkat", "kab. deli serdang", "kab. batu bara", "kota tanjung balai", "kab. asahan", "kota gunungsitoli", "kab. nias barat", "kab. nias selatan", "kab. nias utara", "kab. balangan", "kab. barito kuala", "kab. tanah laut", "kab. kotabaru", "kab. kapuas", "kab. pulang pisau", "kota palangkaraya", "kab. majene", "kab. polewali mandar", "kab. mamuju utara", "kab. sinjai", "kab. enrekang", "kab. sidenreng rappang", "kab. luwu timur", "kab. soppeng", "kab. tana toraja", "kab. banggai kepulauan", "kab. banggai laut", "kota palu", "kab. toli toli", "kab. tojo una una", "kab. morowali", "kab. morowali utara", "kota bau bau", "kab. muna", "kab. buton selatan", "kab. buton tengah", "kab. muna barat"].map(city => ({ city: city.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '), area: 3, bonusXXL: 17.5, bonusXL: 12 })),

  // Area 4
  ...["kab. cianjur", "kab. pangandaran", "kab. karawang", "kota sukabumi", "kab. sukabumi", "kota pekalongan", "kab. pekalongan", "kab. batang", "kab. purbalingga", "kab. kudus", "kab. sukoharjo", "kab. klaten", "kota magelang", "kab. banyumas", "kab. magelang", "kab. temanggung", "kab. sragen", "kab. banjarnegara", "kab. karanganyar", "kab. wonosobo", "kab. jepara", "kab. demak", "kab. purworejo", "kab. blora", "kab. wonogiri", "kab. pati", "kab. jombang", "kota blitar", "kab. blitar", "kota kediri", "kab. lamongan", "kab. kediri", "kab. ngawi", "kab. mojokerto", "kota mojokerto", "kab. magetan", "kab. gresik", "kab. tulungagung", "kab. nganjuk", "kab. pasuruan", "kota pasuruan", "kab. bojonegoro", "kab. madiun", "kab. bondowoso", "kab. tuban", "kota madiun", "kab. situbondo", "kab. jember", "kota malang", "kab. malang", "kab. ponorogo", "kota batu", "kab. trenggalek", "kab. bengkulu selatan", "kab. kaur", "kab. lebong", "kab. rejang lebong", "kab. bengkulu tengah", "kota bengkulu", "kab. bengkulu utara", "kab. kepahiang", "kab. muko muko", "kab. tanjung jabung timur", "kab. kerinci", "kab. bungo", "kab. tebo", "kab. merangin", "kota sungai penuh", "kab. lingga", "kab. kepulauan anambas", "kab. natuna", "kab. lampung barat", "kab. lampung timur", "kab. tulang bawang barat", "kab. way kanan", "kab. tulang bawang", "kab. tanggamus", "kab. pesisir barat", "kab. lampung utara", "kab. mesuji", "kab. aceh barat", "kab. aceh singkil", "kab. aceh tamiang", "kab. aceh tengah", "kota subulussalam", "kab. bener meriah", "kab. aceh utara", "kota lhokseumawe", "kab. pidie", "kab. aceh timur", "kab. simeulue", "kota langsa", "kab. bireuen", "kab. pidie jaya", "kab. rokan hulu", "kab. indragiri hilir", "kab. pasaman barat", "kab. pasaman", "kab. lima puluh kota", "kab. tanah datar", "kab. dharmasraya", "kota solok", "kab. agam", "kab. solok", "kota bukittinggi", "kota pariaman", "kota sawahlunto", "kab. pesisir selatan", "kab. ogan komering ulu timur", "kab. ogan komering ulu selatan", "kab. ogan komering ulu", "kab. musi rawas", "kab. musi rawas utara", "kab. empat lawang", "kota pagar alam", "kota lubuk linggau", "kab. musi banyuasin", "kab. muara enim", "kab. lahat", "kota prabumulih", "kab. pakpak bharat", "kab. mandailing natal", "kab. padang lawas", "kab. labuhanbatu utara", "kota padangsidimpuan", "kab. tapanuli selatan", "kab. labuhanbatu selatan", "kab. labuhanbatu", "kab. tapanuli utara", "kab. padang lawas utara", "kab. humbang hasundutan", "kab. simalungun", "kab. toba samosir", "kota pematangsiantar", "kab. tapanuli tengah", "kab. samosir", "kota sibolga", "kab. nias", "kab. sekadau", "kab. kapuas hulu", "kab. sintang", "kab. bengkayang", "kab. melawi", "kab. sambas", "kab. sanggau", "kab. kubu raya", "kota pontianak", "kab. kayong utara", "kab. landak", "kab. mempawah", "kota singkawang", "kab. ketapang", "kab. seruyan", "kab. kotawaringin barat", "kab. katingan", "kab. kotawaringin timur", "kab. sukamara", "kab. lamandau", "kab. murung raya", "kab. barito timur", "kab. barito utara", "kab. barito selatan", "kab. gunung mas", "kab. penajam paser utara", "kota balikpapan", "kab. paser", "kab. kutai kartanegara", "kota samarinda", "kota bontang", "kab. berau", "kab. kutai timur", "kab. kutai barat", "kab. mahakam ulu", "kab. tana tidung", "kab. malinau", "kab. bulungan", "kota tarakan", "kab. nunukan", "kab. pahuwato", "kab. boalemo", "kab. gorontalo", "kota gorontalo", "kab. gorontalo utara", "kab. bone bolango", "kab. mamuju", "kab. mamasa", "kab. kepulauan selayar", "kab. takalar", "kab. jeneponto", "kab. bulukumba", "kab. pangkajene kepulauan", "kota makassar", "kab. gowa", "kab. maros", "kab. bone", "kab. wajo", "kab. luwu", "kab. luwu utara", "kota palopo", "kab. toraja utara", "kab. banggai", "kab. parigi moutong", "kab. donggala", "kab. sigi", "kab. poso", "kab. buol", "kab. kolaka", "kab. kolaka utara", "kab. konawe", "kab. konawe selatan", "kota kendari", "kab. kolaka timur", "kab. buton", "kab. bombana", "kab. bolaang mongondow", "kab. bolaang mongondow selatan", "kota kotamobagu", "kab. minahasa selatan", "kab. bolaang mongondow timur", "kab. minahasa tenggara", "kab. bolaang mongondow utara", "kota tomohon", "kab. minahasa", "kota manado", "kab. minahasa utara", "kota bitung", "kab. kepulauan sangihe", "kab. kepulauan talaud", "kab. siau tagulandang biaro", "kab. bima", "kab. alor", "kota kupang", "kab. kupang", "kab. malaka", "kab. manggarai barat", "kab. timor tengah selatan", "kab. belu", "kab. sikka", "kab. timor tengah utara", "kab. lembata", "kab. manggarai timur", "kab. ende", "kab. sumba barat daya", "kab. rote ndao", "kab. nagekeo", "kab. flores timur", "kab. ngada", "kab. sumba tengah", "kab. manggarai", "kab. sumba barat", "kab. sumba timur", "kab. sabu raijua"].map(city => ({ city: city.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '), area: 4, bonusXXL: 57.5, bonusXL: 36 }))
];

interface AreaCheckProps {
  onScanComplete?: (result: AreaResult) => void;
}

export const AreaCheck: React.FC<AreaCheckProps> = ({ onScanComplete }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<typeof areaData>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<AreaResult | null>(null);

  const scanLineRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const xxlCounterRef = useRef<HTMLSpanElement>(null);
  const xlCounterRef = useRef<HTMLSpanElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null); // For click outside

  // Function to format city name (capitalize first letter of each word)
  // Used for manual inputs that don't match list exactly
  const formatCityName = (str: string) => {
    return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);

    if (val.trim().length > 0) {
      const filtered = areaData.filter(item =>
        item.city.toLowerCase().includes(val.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 10)); // Limit to 10 suggestions
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (selectedCity: typeof areaData[0]) => {
    setQuery(selectedCity.city);
    setShowSuggestions(false);
    // Optional: Auto-trigger search or just fill? 
    // Let's just fill and let user click Check, or trigger?
    // User flow: typed -> clicked suggestion -> should probably fill and maybe focus submit.
    // For now, just fill.
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setShowSuggestions(false);

    // Blur input on mobile to hide keyboard and see results
    const activeElement = document.activeElement as HTMLElement;
    if (activeElement) {
      activeElement.blur();
    }

    // Reset previous result locally
    if (result) {
      gsap.to(resultRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        onComplete: () => setResult(null)
      });
    }

    setIsScanning(true);

    // 1. Scanning Animation
    if (scanLineRef.current) {
      gsap.timeline()
        .set(scanLineRef.current, { opacity: 1, top: 0 })
        .to(scanLineRef.current, {
          top: "100%",
          duration: 0.75,
          ease: "power2.inOut",
          yoyo: true,
          repeat: 1
        })
        .set(scanLineRef.current, { opacity: 0 });
    }

    // Simulate Processing Time
    setTimeout(() => {
      const formattedQuery = formatCityName(query);
      const foundData = areaData.find(item => item.city.toLowerCase() === query.toLowerCase());

      const finalResult = foundData
        ? { ...foundData, found: true }
        : { city: formattedQuery, area: 1, bonusXXL: 0, bonusXL: 0, found: false };

      setIsScanning(false);
      setResult(finalResult);

      // Pass data up to App -> PricingGrid
      if (onScanComplete) {
        onScanComplete(finalResult);
      }
    }, 1500);
  };

  // Animate Result Entrance & Counters
  useEffect(() => {
    if (result && resultRef.current) {
      // 2. Reveal Card
      gsap.fromTo(resultRef.current,
        { y: 50, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "elastic.out(1, 0.6)",
          stagger: 0.1
        }
      );

      // 3. Counter Animation
      const counters = [
        { ref: xxlCounterRef, val: result.bonusXXL },
        { ref: xlCounterRef, val: result.bonusXL }
      ];

      counters.forEach(({ ref, val }) => {
        if (ref.current) {
          const obj = { value: 0 };
          gsap.to(obj, {
            value: val,
            duration: 1.5,
            ease: "power2.out",
            onUpdate: () => {
              if (ref.current) {
                ref.current.innerText = obj.value.toFixed(1) + " GB";
              }
            }
          });
        }
      });
    }
  }, [result]);

  return (
    <section id="area-check" className="relative py-20 md:py-24 w-full z-10">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] bg-royal/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative">
        <div ref={containerRef} className="max-w-4xl mx-auto bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[24px] md:rounded-[32px] p-6 md:p-12 shadow-2xl relative overflow-hidden group">

          {/* Decorative Grid inside card */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

          <div className="relative z-10 text-center mb-8 md:mb-10">
            <h2 className="font-clash font-bold text-3xl md:text-5xl mb-4">
              Cek Jatah <span className="text-cyan">Kuotamu</span> di Sini.
            </h2>
            <p className="font-inter text-gray-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
              Cukup masukkan nama Kota/Kabupatenmu untuk melihat total bonus kuota yang akan kamu dapatkan secara transparan.
            </p>
          </div>

          {/* Search Bar Section */}
          <div ref={wrapperRef} className="relative max-w-xl mx-auto mb-10 md:mb-12">
            <form onSubmit={handleSearch} className="relative group/input">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className={`w-5 h-5 transition-colors duration-300 ${isScanning ? 'text-cyan' : 'text-gray-500'}`} />
              </div>

              <input
                type="text"
                value={query}
                onChange={handleInputChange}
                onFocus={() => {
                  if (query.trim().length > 0) setShowSuggestions(true);
                }}
                placeholder="Contoh: Surabaya, Sleman..."
                className={`w-full bg-black/40 border transition-all duration-300 rounded-2xl py-4 pl-12 pr-28 md:pr-32 text-white font-inter text-base placeholder-gray-600 focus:outline-none focus:ring-1 
                  ${isScanning
                    ? 'border-cyan/50 shadow-[0_0_20px_rgba(34,211,238,0.2)]'
                    : 'border-white/10 focus:border-royal focus:shadow-[0_0_20px_rgba(0,85,184,0.3)]'
                  }`}
                style={{ fontSize: '16px' }} // Prevent iOS zoom on focus
              />

              <button
                type="submit"
                disabled={isScanning || !query}
                className="absolute right-2 top-2 bottom-2 px-4 md:px-6 bg-white text-black active:scale-95 hover:bg-gray-100 font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
              >
                {isScanning ? 'Scan..' : 'Check'}
              </button>

              {/* Laser Scan Line */}
              <div
                ref={scanLineRef}
                className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan to-transparent shadow-[0_0_15px_#22D3EE] opacity-0 pointer-events-none z-20"
                style={{ top: 0 }}
              />
            </form>

            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50">
                <ul className="max-h-60 overflow-y-auto custom-scrollbar">
                  {suggestions.map((item, index) => (
                    <li
                      key={index}
                      onClick={() => handleSuggestionClick(item)}
                      className="px-4 py-3 hover:bg-white/10 cursor-pointer text-white/90 text-sm border-b border-white/5 last:border-0 flex justify-between items-center transition-colors"
                    >
                      <span className="font-medium">{item.city}</span>
                      <span className="text-xs text-cyan/70 bg-cyan/10 px-2 py-1 rounded">Area {item.area}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Scanning Status Text */}
            {isScanning && (
              <p className="mt-3 text-center text-cyan/80 text-xs font-mono animate-pulse tracking-widest uppercase">
                Analyzing Location Data...
              </p>
            )}
          </div>

          {/* Results Card */}
          {result && (
            <div ref={resultRef} className="bg-gradient-to-b from-white/10 to-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden">
              {/* Result Status Badge */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-royal/20 flex items-center justify-center border border-royal/30 text-royal shrink-0">
                    <MapPin size={20} className="md:w-6 md:h-6" />
                  </div>
                  <div>
                    <h3 className="font-clash font-semibold text-xl md:text-2xl text-white">{result.city}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`inline-block w-2 h-2 rounded-full ${result.found ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
                      <span className="text-[10px] md:text-xs text-gray-400 font-mono uppercase tracking-wide">
                        {result.found ? 'Area Verified' : 'Standard Area'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-auto flex md:block justify-between items-center bg-white/5 md:bg-transparent p-2 md:p-0 rounded-lg">
                  <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wider mb-0 md:mb-1">Zone Area</p>
                  <p className="font-syne font-bold text-2xl md:text-3xl text-white/90">#{result.area}</p>
                </div>
              </div>

              {/* Data Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                {/* XL Variant */}
                <div className="bg-black/20 rounded-xl p-4 border border-white/5 hover:border-white/10 transition-colors group">
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Database size={14} />
                      <span className="text-xs font-medium">Paket Akrab XL</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-white/60">Popular</span>
                  </div>
                  <div className="flex items-end gap-2">
                    <span ref={xlCounterRef} className="font-clash font-bold text-2xl md:text-3xl text-white">0 GB</span>
                    <span className="text-xs md:text-sm text-cyan mb-1.5">+ Bonus Lokal</span>
                  </div>
                </div>

                {/* XXL Variant */}
                <div className="bg-gradient-to-br from-royal/20 to-transparent rounded-xl p-4 border border-royal/30 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-royal/30 blur-2xl -mr-5 -mt-5"></div>
                  <div className="flex justify-between mb-2 relative z-10">
                    <div className="flex items-center gap-2 text-cyan">
                      <Cpu size={14} />
                      <span className="text-xs font-bold">Paket Akrab XXL</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-royal text-white font-bold">Best Value</span>
                  </div>
                  <div className="flex items-end gap-2 relative z-10">
                    <span ref={xxlCounterRef} className="font-clash font-bold text-3xl md:text-4xl text-white text-shadow-glow">0 GB</span>
                    <span className="text-xs md:text-sm text-cyan mb-1.5">+ Bonus Lokal</span>
                  </div>
                </div>
              </div>

              {/* Default Notice */}
              {!result.found && (
                <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg flex items-start gap-3">
                  <Globe className="text-amber-500 mt-0.5 shrink-0" size={16} />
                  <p className="text-xs text-amber-200/80 leading-relaxed">
                    Kota tidak ditemukan di database prioritas kami. Secara default, lokasi ini masuk ke kategori <strong>Area 1</strong> dengan bonus kuota standar (0 GB).
                  </p>
                </div>
              )}

              {result.found && (
                <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-start gap-3">
                  <CheckCircle2 className="text-emerald-500 mt-0.5 shrink-0" size={16} />
                  <p className="text-xs text-emerald-200/80 leading-relaxed">
                    Lokasi terverifikasi! Kamu berhak mendapatkan bonus kuota lokal yang besar di area ini.
                  </p>
                </div>
              )}

            </div>
          )}

        </div>
      </div>

      <style>{`
        .text-shadow-glow {
            text-shadow: 0 0 20px rgba(0, 85, 184, 0.5);
        }
      `}</style>
    </section>
  );
};