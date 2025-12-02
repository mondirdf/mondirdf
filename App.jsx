import React, { useEffect, useState } from "react";

export default function App() {
  // reveal-on-scroll hook (simple)
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("reveal");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll("[data-animate]").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Inline styles for animations (scoped in DOM) */}
      <style>{`
        .reveal { opacity: 1 !important; transform: translateY(0) !important; transition: all 700ms cubic-bezier(.2,.9,.3,1); }
        [data-animate] { opacity: 0; transform: translateY(24px); }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0px); }
        }
        .float-soft { animation: float 4s ease-in-out infinite; }
        .hero-gradient {
          background: linear-gradient(135deg, rgba(58,12,163,0.95), rgba(99,102,241,0.95) 45%, rgba(139,92,246,0.9));
          background-size: 200% 200%;
          animation: bgShift 8s ease infinite;
        }
        @keyframes bgShift {
          0%{ background-position:0% 50% }
          50%{ background-position:100% 50% }
          100%{ background-position:0% 50% }
        }
        .card-hover {
          transition: transform 300ms ease, box-shadow 300ms ease;
        }
        .card-hover:hover { transform: translateY(-8px) scale(1.02); box-shadow: 0 20px 40px rgba(15,15,15,0.12); }
        .glass {
          background: rgba(255,255,255,0.06);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
        }
      `}</style>

      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-sm fixed w-full z-40">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="w-11 h-11 rounded-full hero-gradient flex items-center justify-center text-white shadow-lg">
              📚
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">الأستاذ محمد</h1>
              <p className="text-xs text-gray-600">أستاذ الرياضيات</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <button className="text-sm font-medium text-gray-700 hover:text-purple-700">الرئيسية</button>
            <button className="text-sm font-medium text-gray-700 hover:text-purple-700">الدروس</button>
            <button className="text-sm font-medium text-gray-700 hover:text-purple-700">الملفات</button>
            <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow hover:from-purple-700">تواصل</button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="pt-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div data-animate>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">تعلم بوضوح — ونجح بثقة</h2>
              <p className="mt-4 text-gray-600 text-lg">دروس مُرتبة، ملفات جاهزة للتحميل، وفيديوهات مبسطة لتحضير البكالوريا.</p>
              <div className="mt-6 flex gap-3">
                <button className="px-5 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg hover:scale-105 transition">ابدأ الآن</button>
                <button className="px-5 py-3 rounded-lg border border-gray-200 text-gray-700 bg-white hover:shadow">عرض الدروس</button>
              </div>
            </div>
            <div className="relative" data-animate>
              <div className="glass rounded-2xl p-6 shadow-xl card-hover float-soft">
                <div className="text-6xl mb-3">📘</div>
                <h3 className="text-xl font-bold text-purple-700 mb-2">دروس مُنظّمة</h3>
                <p className="text-gray-600">خريطة دروس واضحة وتقدم تدريجي يساعدك تتبع تقدمك.</p>
                <div className="mt-4 flex gap-3">
                  <span className="px-3 py-1 bg-white/10 rounded-full text-sm text-white">مباشر</span>
                  <span className="px-3 py-1 bg-white/10 rounded-full text-sm text-white">محاضرات</span>
                </div>
              </div>

              <div className="absolute -right-6 -bottom-6 w-56 h-56 rounded-2xl hero-gradient opacity-80 blur-[36px]"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Features */}
      <section className="mt-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 card-hover" data-animate>
              <h4 className="font-bold text-purple-700 mb-2">ملفات جاهزة</h4>
              <p className="text-gray-600">ملخصات وامتحانات سابقة قابلة للتحميل.</p>
            </div>
            <div className="bg-white rounded-xl p-6 card-hover" data-animate>
              <h4 className="font-bold text-purple-700 mb-2">فيديوهات قصيرة</h4>
              <p className="text-gray-600">شروحات مركزة من 5–15 دقيقة لكل فكرة.</p>
            </div>
            <div className="bg-white rounded-xl p-6 card-hover" data-animate>
              <h4 className="font-bold text-purple-700 mb-2">تقييمات دورية</h4>
              <p className="text-gray-600">تمارين تقييمية مع حلول لتتأكد من فهمك.</p>
            </div>
          </div>
        </div>
      </section>
      {/* Lessons Grid */}
      <section className="px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold text-purple-700 mb-6" data-animate>الدروس المميزة</h3>

          <div className="grid md:grid-cols-3 gap-6">
            {/* lesson card */}
            <article className="bg-white rounded-xl p-5 shadow card-hover" data-animate>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-lg bg-purple-50 flex items-center justify-center text-2xl">📐</div>
                <div>
                  <h4 className="font-semibold">الدرس الأول: الأساسيات</h4>
                  <p className="text-sm text-gray-500">مقدمة وتمارين تطبيقية</p>
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-500">3 فيديوهات</span>
                <button className="text-sm bg-purple-600 text-white px-3 py-1 rounded hover:opacity-90">عرض</button>
              </div>
            </article>

            <article className="bg-white rounded-xl p-5 shadow card-hover" data-animate>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-lg bg-purple-50 flex items-center justify-center text-2xl">📊</div>
                <div>
                  <h4 className="font-semibold">الدرس الثاني: المعادلات</h4>
                  <p className="text-sm text-gray-500">شرح وتمارين محلولة</p>
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-500">5 فيديوهات</span>
                <button className="text-sm bg-purple-600 text-white px-3 py-1 rounded hover:opacity-90">عرض</button>
              </div>
            </article>

            <article className="bg-white rounded-xl p-5 shadow card-hover" data-animate>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-lg bg-purple-50 flex items-center justify-center text-2xl">📈</div>
                <div>
                  <h4 className="font-semibold">الدرس الثالث: الإحصاء</h4>
                  <p className="text-sm text-gray-500">مفاهيم أساسية وتطبيقات</p>
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-500">4 فيديوهات</span>
                <button className="text-sm bg-purple-600 text-white px-3 py-1 rounded hover:opacity-90">عرض</button>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Embedded Video */}
      <section className="px-6 pb-12">
        <div className="max-w-5xl mx-auto" data-animate>
          <h4 className="text-xl font-bold text-center mb-4 text-purple-700">عرض سريع</h4>
          <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="مثال فيديو"
              className="w-full h-full border-0"
              allowFullScreen
            />
          </div>
        </div>
      </section>
      {/* Reviews */}
      <section className="px-6 py-12 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h4 className="text-2xl font-bold text-center mb-6" data-animate>آراء الطلاب</h4>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-xl shadow" data-animate>
              <p className="text-gray-600">"شرح واضح ومباشر، استفدت كثيراً."</p>
              <div className="mt-3 text-sm text-gray-500">— أحمد</div>
            </div>
            <div className="bg-white p-5 rounded-xl shadow" data-animate>
              <p className="text-gray-600">"الملخصات كانت مفيدة لامتحان الباك."</p>
              <div className="mt-3 text-sm text-gray-500">— فاطمة</div>
            </div>
            <div className="bg-white p-5 rounded-xl shadow" data-animate>
              <p className="text-gray-600">"الفيديوهات مركزة وتختصر الوقت."</p>
              <div className="mt-3 text-sm text-gray-500">— يوسف</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-12">
        <div className="max-w-4xl mx-auto text-center" data-animate>
          <h4 className="text-2xl font-bold mb-3">هل تريد درساً خاصاً؟</h4>
          <p className="text-gray-600 mb-6">احجز ساعة واستفد من شرح شخصي مُكيّف مع احتياجاتك.</p>
          <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow">احجز الآن</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-purple-700 to-indigo-700 text-white py-6 mt-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="mb-2">© {new Date().getFullYear()} منصة الأستاذ — كل الحقوق محفوظة</div>
          <div className="text-sm text-white/80">تواصل: teacher@example.com • +212 000 000 000</div>
        </div>
      </footer>
    </div>
  );
}
