import React, { useState, useEffect } from 'react';
import { Menu, X, Star, Download, Phone, Mail, BookOpen, Video, FileText, Users } from 'lucide-react';

// Utils
const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) element.scrollIntoView({ behavior: 'smooth' });
};

// Placeholder data fetchers (replace later with real API)
const fetchLessons = async () => [
  { id: 1, title: 'الدرس الأول: مقدمة في الرياضيات', subject: 'رياضيات', level: 'الثانية باكالوريا', description: 'درس تمهيدي شامل', thumbnail: '📐', videosCount: 3, filesCount: 2 },
  { id: 2, title: 'الدرس الثاني: المعادلات التفاضلية', subject: 'رياضيات', level: 'الثانية باكالوريا', description: 'شرح مفصل للمعادلات', thumbnail: '📊', videosCount: 5, filesCount: 3 },
  { id: 3, title: 'الدرس الثالث: الهندسة الفضائية', subject: 'رياضيات', level: 'الأولى باكالوريا', description: 'الأشكال الهندسية المعقدة', thumbnail: '📏', videosCount: 4, filesCount: 2 },
  { id: 4, title: 'الدرس الرابع: الإحصاء والاحتمالات', subject: 'رياضيات', level: 'الثانية باكالوريا', description: 'مبادئ الإحصاء', thumbnail: '📈', videosCount: 6, filesCount: 4 }
];

const fetchLessonDetails = async (id) => ({
  id,
  title: 'الدرس الأول: مقدمة في الرياضيات',
  description: 'هذا الدرس يقدم مقدمة شاملة في أساسيات الرياضيات للمستوى الثانوي، يشمل شرحاً مفصلاً للمفاهيم الأساسية مع أمثلة تطبيقية وتمارين محلولة.',
  videos: [
    { id: 1, title: 'الجزء الأول', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', platform: 'youtube' },
    { id: 2, title: 'الجزء الثاني', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', platform: 'youtube' }
  ],
  files: [
    { id: 1, name: 'ملخص الدرس.pdf', size: '2.5 MB', url: '#' },
    { id: 2, name: 'تمارين إضافية.pdf', size: '1.8 MB', url: '#' }
  ]
});

const fetchFiles = async () => [
  { id: 1, name: 'ملخص الدروس - السنة الثانية باكالوريا.pdf', category: 'ملخصات', size: '3.2 MB', downloads: 245, url: '#' },
  { id: 2, name: 'تمارين محلولة - الرياضيات.pdf', category: 'تمارين', size: '4.1 MB', downloads: 312, url: '#' },
  { id: 3, name: 'امتحانات وطنية مع التصحيح.pdf', category: 'امتحانات', size: '5.6 MB', downloads: 423, url: '#' }
];

const fetchVideos = async () => [
  { id: 1, title: 'شرح المعادلات من الدرجة الثانية', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', platform: 'youtube', views: '1.2K' },
  { id: 2, title: 'حل تمارين الاحتمالات', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', platform: 'youtube', views: '890' },
  { id: 3, title: 'الهندسة التحليلية - شرح شامل', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', platform: 'youtube', views: '1.5K' }
];

const fetchReviews = async () => [
  { id: 1, student: 'أحمد المنصوري', rating: 5, comment: 'أستاذ ممتاز، شرحه واضح ومبسط. استفدت كثيراً من دروسه.', date: '2024-11-15' },
  { id: 2, student: 'فاطمة الزهراء', rating: 5, comment: 'الدروس منظمة جداً ومفيدة. شكراً أستاذ!', date: '2024-11-10' },
  { id: 3, student: 'يوسف البركاوي', rating: 5, comment: 'أفضل أستاذ رياضيات! ساعدني على فهم الدروس الصعبة.', date: '2024-11-05' }
];

// Small UI components
const Button = ({ children, variant = 'primary', onClick, className = '', icon }) => {
  const variants = {
    primary: 'bg-gradient-to-r from-purple-900 to-indigo-900 text-white hover:opacity-95',
    outline: 'border-2 border-purple-900 text-purple-900 hover:bg-purple-50'
  };
  return (
    <button onClick={onClick} className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${variants[variant]} ${className}`}>
      {icon && <span className="mr-2 inline-flex items-center">{icon}</span>}
      {children}
    </button>
  );
};

const Card = ({ children, className = '', hover = true, onClick }) => (
  <div onClick={onClick} className={`bg-white rounded-xl shadow-lg p-6 transition-all duration-300 ${hover ? 'hover:shadow-2xl hover:-translate-y-1 cursor-pointer' : ''} ${className}`}>
    {children}
  </div>
);

// Layout components
const Navbar = ({ currentPage, setCurrentPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  
  const navItems = [
    { name: 'الرئيسية', page: 'home' },
    { name: 'الدروس', page: 'lessons' },
    { name: 'الملفات', page: 'files' },
    { name: 'الفيديوهات', page: 'videos' },
    { name: 'التقييمات', page: 'reviews' },
    { name: 'من أنا', page: 'about' },
    { name: 'تواصل', page: 'contact' }
  ];
  
  return (
    <nav className={`fixed w-full z-40 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentPage('home')}>
          <div className="w-12 h-12 bg-gradient-to-br from-purple-900 to-indigo-900 rounded-full flex items-center justify-center text-white shadow-lg">
            <BookOpen size={20} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-purple-900">الأستاذ محمد</h1>
            <p className="text-xs text-purple-600">أستاذ الرياضيات</p>
          </div>
        </div>

        <div className="hidden md:flex gap-2">
          {navItems.map(item => (
            <button 
              key={item.page} 
              onClick={() => setCurrentPage(item.page)} 
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${currentPage === item.page ? 'bg-purple-900 text-white shadow-lg' : 'text-purple-900 hover:bg-purple-50'}`}
            >
              {item.name}
            </button>
          ))}
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-purple-900">
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {isOpen && (
          <div className="absolute top-16 right-4 w-56 bg-white shadow-2xl p-2 rounded-lg md:hidden animate-fadeIn">
            {navItems.map(item => (
              <button 
                key={item.page} 
                onClick={() => { setCurrentPage(item.page); setIsOpen(false); }} 
                className="w-full text-right px-4 py-2 hover:bg-purple-50 rounded transition-all duration-200"
              >
                {item.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white py-12 mt-12">
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-3">الأستاذ محمد</h3>
          <p className="text-purple-200">أستاذ الرياضيات للمستوى الثانوي. نساعدك على التفوق والنجاح.</p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-3">روابط سريعة</h3>
          <ul className="text-purple-200 space-y-2">
            <li className="hover:text-white cursor-pointer transition">الدروس</li>
            <li className="hover:text-white cursor-pointer transition">الملفات</li>
            <li className="hover:text-white cursor-pointer transition">الفيديوهات</li>
            <li className="hover:text-white cursor-pointer transition">التقييمات</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-3">تواصل معنا</h3>
          <div className="text-purple-200 space-y-2">
            <div className="flex items-center gap-2 hover:text-white cursor-pointer transition">
              <Phone size={16} /> +212 600 000 000
            </div>
            <div className="flex items-center gap-2 hover:text-white cursor-pointer transition">
              <Mail size={16} /> teacher@example.com
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-8 pt-6 border-t border-purple-700 text-purple-200">
        © 2024 الأستاذ محمد. جميع الحقوق محفوظة.
      </div>
    </div>
  </footer>
);

// Pages
const HomePage = ({ setCurrentPage, setSelectedLesson }) => {
  const [lessons, setLessons] = useState([]);
  useEffect(() => { fetchLessons().then(setLessons); }, []);
  
  return (
    <div>
      <section className="min-h-screen pt-24 bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              مرحباً بكم في 
              <span className="block text-purple-300 mt-2">منصة الأستاذ محمد</span>
            </h1>
            <p className="mt-4 text-xl text-purple-100">
              دروس مبسطة وشاملة لمساعدتك على التفوق في الرياضيات. انضم إلى مئات الطلاب الناجحين!
            </p>
            <div className="mt-8 flex gap-4 flex-wrap">
              <Button onClick={() => setCurrentPage('lessons')} icon={<BookOpen />}>
                استكشف الدروس
              </Button>
              <Button variant="outline" onClick={() => setCurrentPage('contact')} className="bg-white/10 border-white text-white hover:bg-white/20">
                تواصل معنا
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-full h-96 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20">
              <div className="text-center">
                <div className="text-9xl mb-4">📚</div>
                <div className="text-3xl font-semibold">التعليم بشغف</div>
                <div className="text-purple-200 mt-2">نجاحك هو هدفنا</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-purple-50">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-6">
          {[
            { icon: <BookOpen size={40} />, num: '50+', label: 'درس شامل' },
            { icon: <Video size={40} />, num: '100+', label: 'فيديو تعليمي' },
            { icon: <FileText size={40} />, num: '30+', label: 'ملف PDF' },
            { icon: <Users size={40} />, num: '500+', label: 'طالب ناجح' }
          ].map((s, i) => (
            <Card key={i} className="text-center" hover={false}>
              <div className="text-purple-600 mb-4 flex justify-center">{s.icon}</div>
              <div className="text-4xl font-bold text-purple-900 mb-2">{s.num}</div>
              <div className="text-purple-600 font-semibold text-lg">{s.label}</div>
            </Card>
          ))}
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-purple-900">الدروس المميزة</h2>
            <p className="text-purple-600 text-lg mt-2">اكتشف أحدث وأفضل الدروس المتاحة</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {lessons.slice(0,4).map(l => (
              <Card key={l.id} onClick={() => { setSelectedLesson(l.id); setCurrentPage('lesson-details'); }}>
                <div className="text-7xl mb-4 text-center">{l.thumbnail}</div>
                <div className="mb-3">
                  <span className="bg-purple-100 text-purple-900 px-3 py-1 rounded-full text-xs font-semibold">
                    {l.level}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-purple-900 mb-2">{l.title}</h3>
                <p className="text-purple-600 text-sm mb-4">{l.description}</p>
                <div className="flex justify-between mt-4 text-purple-500 text-sm font-semibold">
                  <span>🎥 {l.videosCount} فيديو</span>
                  <span>📄 {l.filesCount} ملف</span>
                </div>
              </Card>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button onClick={() => setCurrentPage('lessons')}>
              عرض جميع الدروس
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

const LessonsPage = ({ setCurrentPage, setSelectedLesson }) => {
  const [lessons, setLessons] = useState([]);
  const [filter, setFilter] = useState('all');
  
  useEffect(() => { fetchLessons().then(setLessons); }, []);
  
  const filtered = filter === 'all' ? lessons : lessons.filter(l => l.level === filter);
  
  return (
    <div className="pt-28 pb-16 bg-purple-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-purple-900">جميع الدروس</h1>
          <p className="text-purple-600 text-lg mt-3">اختر الدرس المناسب لمستواك</p>
        </div>
        
        <div className="flex gap-3 justify-center mb-10 flex-wrap">
          {['all','الثانية باكالوريا','الأولى باكالوريا'].map(l => (
            <button 
              key={l} 
              onClick={() => setFilter(l)} 
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${filter===l ? 'bg-purple-900 text-white shadow-lg' : 'bg-white text-purple-900 hover:bg-purple-100'}`}
            >
              {l==='all' ? 'الكل' : l}
            </button>
          ))}
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {filtered.map(lesson => (
            <Card key={lesson.id} onClick={() => { setSelectedLesson(lesson.id); setCurrentPage('lesson-details'); }}>
              <div className="text-8xl mb-4 text-center">{lesson.thumbnail}</div>
              <div className="mb-3">
                <span className="bg-purple-100 text-purple-900 px-3 py-1 rounded-full text-sm font-semibold">
                  {lesson.level}
                </span>
              </div>
              <h3 className="font-bold text-xl text-purple-900 mb-2">{lesson.title}</h3>
              <p className="text-purple-600 mt-2">{lesson.description}</p>
              <div className="flex justify-between mt-4 text-purple-500 text-sm font-semibold">
                <span>🎥 {lesson.videosCount}</span>
                <span>📄 {lesson.filesCount}</span>
              </div>
            </Card>
          ))}
        </div>
        
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-purple-600 text-lg">لا توجد دروس في هذا المستوى حالياً</p>
          </div>
        )}
      </div>
    </div>
  );
};

const LessonDetailsPage = ({ lessonId, setCurrentPage }) => {
  const [lesson, setLesson] = useState(null);
  
  useEffect(() => { 
    fetchLessonDetails(lessonId).then(setLesson); 
  }, [lessonId]);
  
  if(!lesson) return (
    <div className="pt-32 text-center min-h-screen">
      <div className="text-6xl mb-4">⏳</div>
      <p className="text-purple-600 text-xl">جاري التحميل...</p>
    </div>
  );
  
  return (
    <div className="pt-28 pb-16 min-h-screen bg-purple-50">
      <div className="max-w-7xl mx-auto px-4">
        <button 
          className="mb-6 text-purple-900 hover:text-purple-700 font-semibold flex items-center gap-2 transition" 
          onClick={() => setCurrentPage('lessons')}
        >
          ← العودة للدروس
        </button>
        
        <Card hover={false} className="mb-8">
          <h1 className="text-3xl font-bold text-purple-900 mb-3">{lesson.title}</h1>
          <p className="text-purple-600 text-lg leading-relaxed">{lesson.description}</p>
        </Card>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-purple-900 mb-6 flex items-center gap-2">
              <Video className="text-purple-600" />
              الفيديوهات التعليمية
            </h2>
            <div className="space-y-6">
              {lesson.videos.map(v => (
                <Card key={v.id} hover={false}>
                  <h3 className="font-bold text-purple-900 mb-4 text-lg">{v.title}</h3>
                  <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
                    <iframe 
                      title={v.title} 
                      src={v.url} 
                      allowFullScreen 
                      className="w-full h-full border-0"
                    ></iframe>
                  </div>
                </Card>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-purple-900 mb-6 flex items-center gap-2">
              <FileText className="text-purple-600" />
              الملفات والمراجع
            </h2>
            <div className="space-y-4">
              {lesson.files.map(f => (
                <Card key={f.id} hover={false} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <FileText className="text-purple-600" size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-purple-900">{f.name}</h4>
                      <p className="text-sm text-purple-600">{f.size}</p>
                    </div>
                  </div>
                  <a 
                    href={f.url} 
                    className="text-purple-900 hover:text-purple-700 flex items-center gap-2 font-semibold transition"
                  >
                    <Download size={18} /> تحميل
                  </a>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FilesPage = () => {
  const [files, setFiles] = useState([]);
  useEffect(() => { fetchFiles().then(setFiles); }, []);
  
  return (
    <div className="pt-28 pb-16 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-purple-900">مكتبة الملفات</h1>
          <p className="text-purple-600 text-lg mt-2">ملفات وملخصات جاهزة للتحميل</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {files.map(f => (
            <Card key={f.id}>
              <div className="flex items-start gap-3 mb-4">
                <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="text-purple-600" size={28} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-purple-900 leading-tight">{f.name}</h3>
                  <p className="text-sm text-purple-600 mt-1">{f.category} • {f.size}</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-purple-100 flex justify-between items-center">
                <span className="text-sm text-purple-500 font-semibold">
                  ⬇️ {f.downloads} تحميل
                </span>
                <a 
                  href={f.url} 
                  className="text-purple-900 hover:text-purple-700 flex items-center gap-2 font-semibold transition"
                >
                  <Download size={16} /> تحميل
                </a>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

const VideosPage = () => {
  const [videos, setVideos] = useState([]);
  useEffect(() => { fetchVideos().then(setVideos); }, []);
  
  return (
    <div className="pt-28 pb-16 min-h-screen bg-purple-50">
      <div className="max-w-7xl max-auto px-4">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-purple-900">الفيديوهات</h1>
          <p className="text-purple-600">شروحات ومراجعات مسجلة للمقررات.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {videos.map(v => (
            <Card key={v.id}>
              <h3 className="font-bold text-purple-900 mb-3">{v.title}</h3>
              <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
                <iframe
                  title={v.title}
                  src={v.url}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>
              <div className="mt-3 text-sm text-purple-600 flex justify-between">
                <span>{v.views} مشاهدة</span>
                <span className="capitalize">{v.platform}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => { fetchReviews().then(setReviews); }, []);

  return (
    <div className="pt-28 pb-16 min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-purple-900">آراء الطلاب</h1>
          <p className="text-purple-600 mt-2">بعض مراجعات التلاميذ حول طريقة التدريس.</p>
        </div>

        <div className="space-y-4">
          {reviews.map(r => (
            <Card key={r.id} hover={false}>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-purple-900">{r.student}</h4>
                  <div className="flex items-center gap-1 text-yellow-400">
                    {Array.from({ length: r.rating }).map((_, i) => <Star key={i} size={16} />)}
                  </div>
                </div>
                <div className="text-sm text-purple-500">{r.date}</div>
              </div>
              <p className="text-purple-600 mt-4">{r.comment}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

const AboutPage = () => (
  <div className="pt-28 pb-16 min-h-screen bg-purple-50">
    <div className="max-w-4xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
      <div>
        <h1 className="text-3xl font-bold text-purple-900">من هو الأستاذ محمد؟</h1>
        <p className="text-purple-600 mt-3">أستاذ رياضيات مع خبرة طويلة في تحضير التلاميذ لامتحانات البكالوريا. يعتمد أسلوباً واضحاً ومنظماً مع أمثلة تطبيقية وتمارين محلولة.</p>
        <ul className="list-disc list-inside mt-4 text-purple-600 space-y-2">
          <li>خبرة تدريسية 10 سنوات</li>
          <li>تخصص: التحضير للبكالوريا</li>
          <li>دروس فردية وجماعية</li>
        </ul>
      </div>
      <div className="flex items-center justify-center">
        <div className="w-64 h-64 bg-white rounded-2xl shadow-lg flex items-center justify-center text-7xl">👨‍🏫</div>
      </div>
    </div>
  </div>
);

const ContactPage = ({ onMessageSent }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    // placeholder: استبدل بالاتصال الحقيقي للـ API عند الحاجة
    await new Promise(res => setTimeout(res, 700));
    setSending(false);
    setSuccess(true);
    setName(''); setPhone(''); setMessage('');
    if (onMessageSent) onMessageSent();
  };

  return (
    <div className="pt-28 pb-16 min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-purple-900">تواصل معنا</h1>
          <p className="text-purple-600">أرسل طلبك وسنعاود الاتصال بك في أقرب وقت.</p>
        </div>

        <form onSubmit={submit} className="bg-purple-50 p-6 rounded-lg shadow">
          <div className="mb-3">
            <label className="block text-purple-900 font-semibold">اسم الطالب</label>
            <input value={name} onChange={e => setName(e.target.value)} className="w-full px-3 py-2 border rounded" required />
          </div>
          <div className="mb-3">
            <label className="block text-purple-900 font-semibold">رقم الهاتف</label>
            <input value={phone} onChange={e => setPhone(e.target.value)} className="w-full px-3 py-2 border rounded" required />
          </div>
          <div className="mb-3">
            <label className="block text-purple-900 font-semibold">الرسالة</label>
            <textarea value={message} onChange={e => setMessage(e.target.value)} rows="5" className="w-full px-3 py-2 border rounded" required />
          </div>
          <div className="text-right">
            <Button type="submit" onClick={() => {}} icon={<Mail size={14} />}>{sending ? 'جاري الإرسال...' : 'أرسل'}</Button>
          </div>
          {success && <p className="mt-3 text-green-600">تم إرسال رسالتك بنجاح — سنرد عليك قريبًا.</p>}
        </form>
      </div>
    </div>
  );
};

// ============== APP ROOT ==============
const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedLesson, setSelectedLesson] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  return (
    <div className="min-h-screen font-sans antialiased">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      <main>
        {currentPage === 'home' && <HomePage setCurrentPage={setCurrentPage} setSelectedLesson={setSelectedLesson} />}
        {currentPage === 'lessons' && <LessonsPage setCurrentPage={setCurrentPage} setSelectedLesson={setSelectedLesson} />}
        {currentPage === 'lesson-details' && selectedLesson && <LessonDetailsPage lessonId={selectedLesson} setCurrentPage={setCurrentPage} />}
        {currentPage === 'files' && <FilesPage />}
        {currentPage === 'videos' && <VideosPage />}
        {currentPage === 'reviews' && <ReviewsPage />}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'contact' && <ContactPage onMessageSent={() => setCurrentPage('contact')} />}
      </main>

      <Footer />
    </div>
  );
};

export default App;
```0
