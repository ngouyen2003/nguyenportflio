// HPI 1.7-G
import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { Profile, Showreels } from '@/entities';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Play, Pause, Maximize2, ArrowDown, Film, Aperture, MonitorPlay } from 'lucide-react';

// --- Utility Components ---

const SectionLabel = ({ number, title }: { number: string; title: string }) => (
  <div className="flex items-center gap-4 mb-8 opacity-70">
    <span className="font-paragraph text-accent-teal text-sm tracking-widest">[{number}]</span>
    <div className="h-[1px] w-12 bg-accent-teal/50" />
    <span className="font-heading text-sm uppercase tracking-widest text-foreground/80">{title}</span>
  </div>
);

const TechDecoration = ({ className }: { className?: string }) => (
  <div className={`pointer-events-none absolute ${className}`}>
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" className="opacity-20">
      <path d="M0 0H20V2H2V20H0V0Z" fill="currentColor" />
      <path d="M100 100H80V98H98V80H100V100Z" fill="currentColor" />
    </svg>
  </div>
);

const NoiseOverlay = () => (
  <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.03] mix-blend-overlay">
    <svg className="w-full h-full">
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
  </div>
);

// --- Main Component ---

export default function HomePage() {
  // --- 1. Data Fidelity Protocol ---
  // Canonical Data Sources
  const [profile, setProfile] = useState<Profile | null>(null);
  const [showreels, setShowreels] = useState<Showreels[]>([]);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [isLoadingShowreels, setIsLoadingShowreels] = useState(true);
  
  // UI State
  const [introComplete, setIntroComplete] = useState(false);
  const [hoveredVideoId, setHoveredVideoId] = useState<string | null>(null);

  // Scroll Hooks
  const { scrollYProgress } = useScroll();
  const smoothScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  
  // Preserve Original Data Fetching Logic
  useEffect(() => {
    loadProfile();
    loadShowreels();
    
    // Intro Timer (Galaxy Effect)
    const timer = setTimeout(() => {
      setIntroComplete(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const loadProfile = async () => {
    try {
      const { items } = await BaseCrudService.getAll<Profile>('profile');
      if (items.length > 0) {
        setProfile(items[0]);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setIsLoadingProfile(false);
    }
  };

  const loadShowreels = async () => {
    try {
      const { items } = await BaseCrudService.getAll<Showreels>('showreels');
      setShowreels(items);
    } catch (error) {
      console.error('Error loading showreels:', error);
    } finally {
      setIsLoadingShowreels(false);
    }
  };

  // --- Render Helpers ---
  
  // Fallback text content from prompt if API data is missing
  const defaultBio = ` Hầu hết mọi người nghĩ video editor chỉ là người đến sau cùng — khi mọi thứ đã quay xong, khi câu chuyện đã có sẵn. Nhưng thật ra, rất nhiều video chỉ thật sự bắt đầu… khi timeline được mở ra.

Tôi là Cao Văn Nguyên, một video editor làm việc chủ yếu với các nội dung mạng xã hội. Công việc của tôi không chỉ là cắt ghép, mà là tìm ra khoảnh khắc đủ mạnh để khiến người xem dừng lại thêm vài giây giữa hàng trăm video họ đang lướt qua. Một nhịp cắt đúng lúc, một dòng caption đúng chỗ, hay một đoạn hook đủ tò mò — đôi khi chỉ cần vậy là một video đã có thể sống lâu hơn trên màn hình của ai đó.

Tôi thích cảm giác khi những đoạn footage tưởng như bình thường bắt đầu có nhịp, có cảm xúc, và cuối cùng trở thành một câu chuyện hoàn chỉnh. Không phải video nào cũng cần phức tạp, nhưng một video tốt luôn cần được hiểu đúng: hiểu người xem, hiểu nền tảng, và hiểu mục tiêu của nội dung.

Giữa một thế giới mà ai cũng có thể quay video, tôi chọn làm người khiến video đó đáng xem hơn một chút — và đôi khi, đáng nhớ hơn một chút.`;

  const bioText = profile?.biography || defaultBio;
  const bioParagraphs = bioText.split('\n\n');

  return (
    <div className="min-h-screen bg-background text-foreground font-paragraph selection:bg-accent-teal selection:text-background overflow-x-clip">
      <NoiseOverlay />
      <Header />

      {/* --- HERO SECTION: The Galaxy Portal --- */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        {/* Dynamic Background (Galaxy) */}
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ scale: 1, opacity: 1 }}
          animate={{ 
            scale: introComplete ? 20 : 1, 
            opacity: introComplete ? 0 : 1 
          }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent-teal/20 via-background to-background" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-accent-purple/10 rounded-full blur-[100px] animate-pulse" />
          {/* Stars / Particles */}
          <div className="absolute inset-0 opacity-50" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
        </motion.div>

        {/* Post-Intro Background (Subtle Tech Grid) */}
        <motion.div 
          className="absolute inset-0 z-0 opacity-0"
          animate={{ opacity: introComplete ? 1 : 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
           <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
           <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background"></div>
        </motion.div>

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-[120rem] mx-auto px-4 md:px-8 flex flex-col items-center justify-center h-full">
          <AnimatePresence>
            {introComplete && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="text-center space-y-8"
              >
                {/* Decorative Top Line */}
                <motion.div 
                  initial={{ width: 0 }} 
                  animate={{ width: "200px" }} 
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="h-[1px] bg-accent-teal mx-auto mb-8"
                />

                <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 relative z-20">
                  Cao Văn Nguyên
                </h1>

                <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-lg md:text-xl font-paragraph text-accent-teal/80">
                  <span className="px-4 py-1 border border-accent-teal/30 rounded-full bg-accent-teal/5 backdrop-blur-sm">
                    {profile?.educationYear || '2003'}
                  </span>
                  <span className="hidden md:block w-2 h-2 bg-accent-purple rounded-full animate-pulse" />
                  <span className="uppercase tracking-widest">
                    {profile?.role || 'Video Editor'}
                  </span>
                </div>

                <p className="text-foreground/60 max-w-2xl mx-auto text-sm md:text-base font-light tracking-wide">
                  {profile?.university || 'Đại học Văn Hóa'} <span className="text-accent-purple mx-2">//</span> {profile?.major || 'Chuyên ngành Truyền thông Văn hóa'}
                </p>

                {/* Scroll Indicator */}
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5, duration: 1, repeat: Infinity, repeatType: "reverse" }}
                  className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                  <span className="text-[10px] uppercase tracking-[0.3em] text-foreground/40">Scroll to Explore</span>
                  <ArrowDown className="w-5 h-5 text-accent-teal" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* --- SHOWREELS SECTION: The Timeline --- */}
      <section id="showreels" className="relative py-32 w-full bg-background overflow-hidden">
        {/* Sticky Title */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
           <div className="sticky top-32 left-8 md:left-16 z-10 opacity-10 mix-blend-difference">
              <h2 className="font-heading text-[12vw] leading-none font-bold text-foreground rotate-90 origin-top-left translate-x-full">
                SHOWREELS
              </h2>
           </div>
        </div>

        <div className="relative z-20 max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-white/10 pb-8">
            <div>
              <SectionLabel number="01" title="Selected Works" />
              <h2 className="font-heading text-4xl md:text-6xl font-bold text-white">
                Visual <span className="text-accent-teal">Timeline</span>
              </h2>
            </div>
            <div className="mt-8 md:mt-0 text-right">
              <p className="font-paragraph text-sm text-foreground/60 max-w-md">
                A curated collection of motion, rhythm, and narrative. <br/>
                Hover to preview the edit.
              </p>
            </div>
          </div>

          {/* Video Grid - Masonry Style */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-y-24">
            {isLoadingShowreels ? (
              <div className="col-span-12 text-center py-20 text-accent-teal animate-pulse">
                Loading Timeline Data...
              </div>
            ) : showreels.length > 0 ? (
              showreels.map((video, index) => {
                // Calculate grid positioning for "broken grid" feel
                const colSpan = index % 3 === 0 ? "md:col-span-8" : index % 3 === 1 ? "md:col-span-4" : "md:col-span-6 md:col-start-4";
                const yOffset = index % 2 === 0 ? 0 : 100; // Parallax offset simulation via margin

                return (
                  <motion.div
                    key={video._id}
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className={`${colSpan} relative group`}
                    style={{ marginTop: `${index === 0 ? 0 : 0}px` }} // Simplified margin for stability
                    onMouseEnter={() => setHoveredVideoId(video._id)}
                    onMouseLeave={() => setHoveredVideoId(null)}
                  >
                    {/* Card Container */}
                    <div className="relative">
                      {/* Tech Markers */}
                      <div className="absolute -left-4 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-accent-teal/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute -top-4 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent-teal/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Image/Video Container */}
                      <div 
                        className={`relative aspect-video overflow-hidden bg-secondary/10 border border-white/5 transition-all duration-500 ease-out ${
                          hoveredVideoId === video._id ? 'border-accent-teal shadow-[0_0_30px_rgba(0,255,255,0.2)] scale-[1.02]' : ''
                        }`}
                      >
                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-60 z-10" />
                        
                        {/* Thumbnail */}
                        <Image
                          src={video.thumbnailImage || "https://static.wixstatic.com/media/89fa79_9cf094e629c84407ad1018137ca6e13c~mv2.png?originWidth=1152&originHeight=640"}
                          alt={video.title || 'Showreel Thumbnail'}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          width={1200}
                        />

                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-16 h-16 rounded-full bg-accent-teal/90 text-background flex items-center justify-center backdrop-blur-md shadow-[0_0_20px_rgba(0,255,255,0.5)]">
                            <Play className="w-6 h-6 fill-current" />
                          </div>
                        </div>

                        {/* Category Tag */}
                        <div className="absolute top-4 right-4 z-20">
                          <span className="px-3 py-1 text-xs font-paragraph uppercase tracking-wider bg-background/80 backdrop-blur-md border border-white/10 text-white rounded-sm">
                            {video.category || 'Edit'}
                          </span>
                        </div>
                      </div>

                      {/* Meta Data */}
                      <div className="mt-6 flex justify-between items-start">
                        <div>
                          <h3 className="font-heading text-2xl md:text-3xl font-bold text-white group-hover:text-accent-teal transition-colors duration-300">
                            {video.title}
                          </h3>
                          <p className="mt-2 text-sm text-foreground/60 font-paragraph max-w-md line-clamp-2">
                            {video.description}
                          </p>
                        </div>
                        <div className="hidden md:block text-right">
                           <span className="block text-xs text-accent-purple font-mono">REC_00{index + 1}</span>
                           <span className="block text-xs text-foreground/30 font-mono mt-1">1920x1080</span>
                        </div>
                      </div>
                      
                      {/* Click Area */}
                      {video.videoUrl && (
                        <a 
                          href={video.videoUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="absolute inset-0 z-30"
                          aria-label={`Watch ${video.title}`}
                        />
                      )}
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="col-span-12 text-center py-20 text-foreground/40">
                No showreels available in the timeline.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* --- ABOUT SECTION: The Narrative --- */}
      <section id="about" className="relative py-32 w-full bg-background overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-accent-teal/5 rounded-full blur-[120px] pointer-events-none" />
        <TechDecoration className="top-10 left-10 text-accent-purple" />
        <TechDecoration className="bottom-10 right-10 rotate-180 text-accent-teal" />

        <div className="max-w-[100rem] mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left Column: Sticky Title & Stats */}
            <div className="lg:col-span-4 lg:sticky lg:top-32">
              <SectionLabel number="02" title="Profile" />
              <motion.h2 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="font-heading text-5xl md:text-7xl font-bold text-white mb-8"
              >
                About <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-teal">Me</span>
              </motion.h2>
              
              <div className="space-y-6 font-paragraph text-sm text-foreground/60 border-l border-white/10 pl-6">
                <div>
                  <span className="block text-xs uppercase tracking-widest text-accent-teal mb-1">Location</span>
                  <span className="text-white">Vietnam</span>
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-widest text-accent-teal mb-1">Specialty</span>
                  <span className="text-white">Social Media, Visual Storytelling</span>
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-widest text-accent-teal mb-1">Tools</span>
                  <span className="text-white">Premiere Pro, After Effects</span>
                </div>
              </div>
            </div>

            {/* Right Column: The Narrative Text */}
            <div className="lg:col-span-8">
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 p-8 md:p-16 rounded-2xl overflow-hidden">
                {/* Decorative Scanline */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-teal via-accent-purple to-accent-teal opacity-50" />
                
                <div className="space-y-8">
                  {bioParagraphs.map((paragraph, index) => (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className={`text-lg md:text-xl leading-relaxed ${
                        index === 0 ? 'text-white font-medium' : 'text-foreground/80'
                      } ${index === bioParagraphs.length - 1 ? 'italic text-accent-teal/90 border-l-4 border-accent-teal pl-4' : ''}`}
                    >
                      {paragraph}
                    </motion.p>
                  ))}
                </div>

                {/* Signature / Footer of Card */}
                <div className="mt-12 pt-8 border-t border-white/10 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-xs font-mono text-foreground/50 uppercase">Available for freelance</span>
                  </div>
                  <Aperture className="w-6 h-6 text-accent-purple opacity-50" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- CTA / FOOTER PRE-SECTION --- */}
      <section className="py-32 border-t border-white/5 bg-background relative overflow-hidden">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-accent-purple/10 via-transparent to-transparent" />
         <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
            <motion.h3 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="font-heading text-4xl md:text-6xl font-bold mb-8"
            >
              Ready to start your <span className="text-accent-teal">timeline?</span>
            </motion.h3>
            <a 
              href="mailto:contact@example.com" 
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-accent-teal transition-colors duration-300"
            >
              <MonitorPlay className="w-5 h-5" />
              <span>Book a Session</span>
            </a>
         </div>
      </section>

      <Footer />
    </div>
  );
}