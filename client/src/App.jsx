import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import AboutSection from './AboutSection.jsx'
import WhatIBring from './WhatIBring.jsx'
import Cta from './Cta.jsx'
import Testimonials from './Testimonials.jsx'
import BrandHeading from './BrandHeading.jsx'
import FaqSection from './FaqSection.jsx'

gsap.registerPlugin(ScrollTrigger, SplitText)

const Icon = ({ d, className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d={d} />
  </svg>
)

const ReactIcon = ({ className = "w-9 h-9" }) => (
  <svg viewBox="-11.5 -10.232 23 20.463" fill="none" className={className}>
    <circle r="2.05" fill="#00A876" />
    <g stroke="#00A876" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </g>
  </svg>
)

const StatCard = ({ number, label, icon }) => (
  <div className="rounded-2xl bg-[#E5E3DF]/60 border border-white/60 backdrop-blur-md px-5 py-4 shadow-lg shadow-black/20">
    {icon ? (
      <div className="flex items-center gap-4 text-left">
        <ReactIcon />
        <div>
          <div className="text-3xl font-black text-[#00A876] leading-none" style={{ fontFamily: "Archivo Black, Poppins, sans-serif" }}>{number}</div>
          <div className="mt-1 font-bold text-gray-900 text-sm">{label}</div>
        </div>
      </div>
    ) : (
      <div className="text-center">
        <div className="text-5xl sm:text-3xl font-black text-[#00A876] leading-none tracking-tight" style={{ fontFamily: '"Poppins", "Segoe UI", Arial, sans-serif', fontWeight: 900 }}>{number}</div>
        <div className="mt-1 font-bold text-gray-900 text-sm">{label}</div>
      </div>
    )}
  </div>
)

const Tag = ({ sym, label }) => (
  <div className="flex items-center gap-2 sm:gap-2.5 text-white font-bold text-sm sm:text-base">
    <span className="w-4 shrink-0 text-center text-base leading-none text-[#34d399] sm:w-5 sm:text-xl">{sym}</span>
    {label}
  </div>
)

const TAGS = [
  { sym: '✦', label: 'Full-Stack Development' },
  { sym: '◇', label: 'MERN Stack' },
  { sym: '◇', label: 'React & Node.js' },
  { sym: '◇', label: 'Shopify & E-commerce' },
  { sym: '⚡', label: 'Problem Solving' },
]


const NAV_ITEMS = [
  { label: 'Home', target: '#home', icon: 'M12 3l8 3v6c0 5-3.4 8.5-8 10-4.6-1.5-8-5-8-10V6l8-3z' },
  { label: 'About me', target: '#about', icon: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M4 21c0-4 4-6 8-6s8 2 8 6' },
  { label: 'Projects', target: '#crafted', icon: 'M3 7v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-7l-2-2H5a2 2 0 0 0-2 2z' },
  { label: 'What I Bring', target: '#overview', icon: 'M12 2l2.3 6.5 6.9.5-5.3 4.5 1.7 6.7-5.6-3.9-5.6 3.9 1.7-6.7L2.8 9l6.9-.5z' },
  { label: 'Services', target: '#services', icon: 'M13 2L4 14h7l-1 8 9-12h-7l1-8z' },
  { label: 'Testimonials', target: '#testimonials', icon: 'M7.5 4C6 4 4.8 5.2 4.8 6.7c0 1.5 1.2 2.7 2.7 2.7H9c0 1.8-1.2 3.2-3 3.6l.8 1.9c3.1-.8 5.1-3.6 5.1-6.9V4H7.5zm10 0c-1.5 0-2.7 1.2-2.7 2.7 0 1.5 1.2 2.7 2.7 2.7h1.5c0 1.8-1.2 3.2-3 3.6l.8 1.9c3.1-.8 5.1-3.6 5.1-6.9V4H17.5z' },
  { label: 'FAQ', target: '#faq', icon: 'M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3 M12 17h.01' },
]

const useScrollY = () => {
  const [y, setY] = useState(0)
  useEffect(() => {
    const onScroll = () => setY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return y
}

const PROJECTS = [
  {
    num: '01',
    tag: 'Web App',
    title: 'Nova Drive',
    description: 'A cloud storage web app with upload, folder navigation, and shareable links built on a React and Node.js stack.',
    url: 'https://nova-drive-three.vercel.app/',
    image: '/projects/nova-drive.png',
  },
  {
    num: '02',
    tag: 'Fitness App',
    title: 'FitPulse',
    description: 'A fitness tracking web app with secure login, user dashboards, and progress data stored on a live backend.',
    url: 'https://fitness-nu-ebon.vercel.app/login',
    image: '/projects/fitpulse.png',
  },
  {
    num: '03',
    tag: 'E-commerce',
    title: 'Max Me Beauty',
    description: 'A beauty brand storefront with product pages, cart and checkout flow, tuned to stay fast on mobile.',
    url: 'https://maxmebeauty.com/',
    image: '/projects/max-me-beauty.png',
  },
  {
    num: '04',
    tag: 'Business Site',
    title: 'Welcom Optical',
    description: 'A clean storefront-style site for an optical brand, built around product browsing and a smooth contact flow.',
    url: 'https://welcom-optical.vercel.app/',
    image: '/projects/welcom-optical.png',
  },
  {
    num: '05',
    tag: 'Business Site',
    title: 'Miral Co',
    description: 'A corporate site with clear service pages and a structured enquiry path for new leads.',
    url: 'https://miral-co.com/',
    image: '/projects/miral-co.png',
  },
  {
    num: '06',
    tag: 'E-commerce',
    title: 'Modila',
    description: 'An online store with category-based browsing, product detail pages, and a simplified ordering flow.',
    url: 'https://modila.pk/',
    image: '/projects/modila.png',
  },
  {
    num: '07',
    tag: 'Web App',
    title: 'Blyncc',
    description: 'A platform-style site with dynamic sections and responsive layouts built to scale with content.',
    url: 'https://blyncc.com/',
    image: '/projects/blyncc.png',
  },
  {
    num: '08',
    tag: 'Business Site',
    title: 'Sajadah',
    description: 'A brand site built with a lightweight stack, fast load times, and a mobile-first layout.',
    url: 'https://sajadaah.com/',
    image: '/projects/sajadaah.png',
  },
]

const ProjectCard = ({ p }) => (
  <article className="group relative h-[58vh] lg:h-[64vh] w-[82vw] sm:w-[70vw] lg:w-[620px] shrink-0 overflow-hidden rounded-3xl border border-white/10">
    <img
      src={p.image}
      alt={`${p.title} website preview`}
      loading="lazy"
      className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
    />

    <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

    <div className="relative z-10 flex h-full flex-col justify-between p-7 sm:p-10">
      <div className="flex items-start justify-between">
        <span className="rounded-full bg-[#00a896] px-3 py-1 text-[11px] font-extrabold uppercase tracking-widest text-black">
          {p.tag}
        </span>
        <span className="text-sm font-black tracking-widest text-white/70" style={{ fontFamily: '"Tr 3 A", Arial, sans-serif' }}>{p.num}</span>
      </div>

      <div>
        <h3 className="text-3xl sm:text-4xl font-black tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">{p.title}</h3>
        <p className="mt-3 max-w-md text-sm font-semibold leading-relaxed text-white/80 drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)]">{p.description}</p>

        <a
          href={p.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#00a896] px-5 py-2.5 text-sm font-extrabold text-black transition hover:bg-[#00c4ae]"
        >
          Visit Website
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
            <path d="M4 2h8v8M12 2 2.5 11.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </div>
  </article>
)

function CraftSection({ ref }) {
  const pinRef = useRef(null)
  const trackRef = useRef(null)
  const counterRef = useRef(null)

  useLayoutEffect(() => {
    const section = ref.current
    const pin = pinRef.current
    const track = trackRef.current
    const counter = counterRef.current
    if (!section || !pin || !track) return

    const getAmount = () => Math.max(0, track.scrollWidth - window.innerWidth)

    const ctx = gsap.context(() => {
      // the work section fades in while it scrolls up from the bottom,
      // instead of popping in once its top reaches the top of the viewport
      gsap.set(section, { autoAlpha: 0 })
      gsap.to(section, {
        autoAlpha: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'top top',
          scrub: true,
          invalidateOnRefresh: true,
        },
      })

      gsap.to(track, {
        x: () => -getAmount(),
        ease: 'none',
        scrollTrigger: {
          trigger: pin,
          start: 'top top',
          end: () => '+=' + getAmount(),
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate(self) {
            if (counter) {
              const i = Math.min(PROJECTS.length - 1, Math.round(self.progress * (PROJECTS.length - 1)))
              counter.textContent = `${String(i + 1).padStart(2, '0')} / ${String(PROJECTS.length).padStart(2, '0')}`
            }
          },
        },
      })

      ScrollTrigger.refresh()
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section id="crafted" ref={ref} className="relative bg-[#161616]">
      <div ref={pinRef} className="relative flex h-dvh flex-col justify-end lg:justify-center overflow-hidden bg-[#161616] py-10 sm:py-12">
        <div className="absolute top-6 right-6 sm:right-10 flex items-center gap-4">
          <span className="rounded-full bg-[#00a896] px-4 py-2 text-xs font-extrabold uppercase tracking-widest text-black">MERN Stack</span>
          <span className="text-xs font-bold uppercase tracking-widest text-white/40">Projects</span>
        </div>

        <div className="px-6 sm:px-10 lg:pl-[380px] lg:pr-16">
          <h2 className="text-4xl sm:text-6xl font-black leading-tight tracking-tight text-white" style={{ fontFamily: '"Tr 3 A", Arial, sans-serif' }}>
            Built to Work.
            <br />
            Built to Last.

          </h2>
        </div>

        <div ref={trackRef} className="mt-8 flex w-max items-stretch gap-6 px-6 sm:px-10 lg:pl-[380px] lg:pr-16 will-change-transform">
          {PROJECTS.map((p) => (
            <ProjectCard key={p.title} p={p} />
          ))}
        </div>

        <div className="mt-8 flex items-center gap-6 px-6 sm:px-10 lg:pl-[380px] lg:pr-16">
          <span ref={counterRef} className="text-sm font-black tracking-widest text-white/40" style={{ fontFamily: '"Tr 3 A", Arial, sans-serif' }}>
            01 / 08
          </span>
          <span className="h-px w-16 bg-white/20" />
          <span className="text-xs font-bold uppercase tracking-widest text-white/40">Scroll to explore</span>
        </div>
      </div>
    </section>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeNav, setActiveNav] = useState('Home')
  const [dark, setDark] = useState(false)
  const [light, setLight] = useState(false)
  const aboutRef = useRef(null)
  const craftRef = useRef(null)
  const y = useScrollY()
  const vh = typeof window !== 'undefined' ? window.innerHeight : 800
  const p = Math.min(y / (Math.max(vh, 1) * 1.1), 1)
  // below lg the hero is a single screen, so the scroll animation is frozen —
  // nothing slides left and nothing fades, everything stays where it is
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 1024 : false
  const pa = isMobile ? 0 : p
  const done = pa >= 0.99
  const seg = (s) => Math.min(Math.max((pa - s) / (1 - s), 0), 1)

  const panelDark = dark && !light

  useEffect(() => {
    const mark = vh * 0.4
    const sections = [
      { ref: aboutRef, label: 'About me' },
      { ref: craftRef, label: 'Projects' },
      { id: 'overview', label: 'What I Bring' },
      { id: 'cta', label: 'CTA' },
      { id: 'testimonials', label: 'Testimonials' },
      { id: 'faq', label: 'FAQ' },
    ]
    let active = 'Home'
    for (const { ref, id, label } of sections) {
      const el = ref ? ref.current : document.getElementById(id)
      if (!el) continue
      if (el.getBoundingClientRect().top <= mark) active = label
    }
    setActiveNav((prev) => (prev === active ? prev : active))
  }, [y, vh])

  useEffect(() => {
    const top = craftRef.current ? craftRef.current.offsetTop : 0
    setDark(y >= top)
  }, [y, vh])

  useEffect(() => {
    // every section with a light background — the panel must stay dark-on-light
    // testimonials is a dark band now, so it is not in this list
    const lightIds = ['overview', 'cta', 'brand-heading', 'faq']
    const visible = lightIds.some((id) => {
      const el = document.getElementById(id)
      if (!el) return false
      const rect = el.getBoundingClientRect()
      return rect.top < vh * 0.5 && rect.bottom > 0
    })
    setLight(visible)
  }, [y, vh])

  useEffect(() => {
    if (!document.fonts?.ready) return
    let cancelled = false
    document.fonts.ready.then(() => {
      if (!cancelled) ScrollTrigger.refresh()
    })
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    const onResize = () => {
      if (window.innerWidth >= 640) setMenuOpen(false)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [menuOpen])


  return (
    <div className="min-h-screen bg-white overflow-x-clip">

      <div id="home" className="h-dvh lg:h-[240vh]">
        <div className="sticky top-0 h-dvh overflow-hidden">
<div
            className="absolute inset-0"
            style={{ opacity: Math.max(0, 1 - pa * 1.4), zIndex: 55, display: done ? 'none' : 'block' }}

          >
            <div className="absolute inset-0 flex items-center justify-center rise-up pointer-events-none" style={{ animationDelay: '1s' }}>
              <img
                src="/mahadlast.png"
                alt="mahadlast"
                className="hidden sm:block h-full max-w-full object-contain"
              />
              <img
                src="/mhd-mobile.png"
                alt="mahadlast mobile"
                className="block sm:hidden h-full max-w-full object-contain mt-[18vh]"
              />
            </div>
          </div>

          <div
            className="absolute inset-0 z-50 pointer-events-none"
            style={{ transformOrigin: '0 0', transform: `translate(${24 * pa}px, ${20 * pa}px) scale(${1 - 0.92 * pa})` }}

          >
            <div className="absolute inset-0 -mt-[20vh] sm:mt-0 flex flex-col items-center justify-center title-up pointer-events-none">
              <h1 className="text-[26vw] leading-none font-black text-[#00a896] text-center tracking-tight whitespace-nowrap select-none slide-right">
                <span className="grow-up" style={{ animationDelay: '1s' }}>M</span>
                <span className="grow-up" style={{ animationDelay: '1s' }}>A</span>
                <span className="grow-up" style={{ animationDelay: '1.1s' }}>H</span>
                <span className="grow-up" style={{ animationDelay: '1.2s' }}>A</span>
                <span className="grow-up" style={{ animationDelay: '1.3s' }}>D</span>
              </h1>
            </div>
          </div>

          <div className="absolute inset-0" style={{ opacity: 1 - pa, zIndex: 58, display: done ? 'none' : 'block', visibility: done ? 'hidden' : 'visible', pointerEvents: done ? 'none' : 'auto' }}>

            <div className="absolute inset-0 z-20 flex flex-col justify-end p-3 sm:p-8 rise-up" style={{ animationDelay: '1s' }}>
              <div className="flex items-end gap-8">
                <div className="max-w-xl">
                  <div className="hidden sm:block w-max min-w-[200px] rounded-2xl bg-black/25 backdrop-blur-md border border-white/30 p-5 shadow-lg shadow-black/20" style={{ opacity: 1 - pa, transform: `translateX(${-60 * pa}vw)`, visibility: done ? 'hidden' : 'visible', pointerEvents: done ? 'none' : 'auto' }}>

                    <div className="flex flex-col gap-2 sm:gap-4">
                    {TAGS.map((t) => (
                      <Tag key={t.label} sym={t.sym} label={t.label} />
                    ))}
                    </div>

                  </div>

                  <p
                    className="mt-4 text-xs sm:text-sm text-black"
                    style={{ fontFamily: '"Tr 3 A", Arial, sans-serif', fontWeight: 950, opacity: 1 - pa, visibility: done ? 'hidden' : 'visible' }}

                  >
                    Your Web &amp; Software Expert. Mahad.
                  </p>

                  <div
                    className="mt-5 hidden sm:flex flex-wrap gap-4"
                    style={{ opacity: done ? 0 : 1 - pa * 0.4, transform: `translateX(${-30 * pa}vw)`, visibility: done ? 'hidden' : 'visible' }}

                  >
                    <a href="#overview" className="rounded-full bg-[#00a896] px-7 py-3 text-sm font-bold text-white shadow-lg shadow-[#00a896]/40 transition hover:bg-[#008f80]">
                      Book a Call
                    </a>
                    <a href="#about" className="rounded-full bg-[#00a896] px-7 py-3 text-sm font-bold text-white shadow-lg shadow-[#00a896]/40 transition hover:bg-[#008f80]">
                      About Me
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="sm:hidden absolute top-[42%] left-4 z-[65] rounded-2xl bg-black/25 backdrop-blur-md border border-white/30 p-3 shadow-lg shadow-black/20 rise-up" style={{ animationDelay: '1s' }}>

            <div className="flex flex-col gap-2">
              {TAGS.map((t) => (
                <Tag key={t.label} sym={t.sym} label={t.label} />
              ))}
            </div>

          </div>

          <div
            className="absolute inset-0 z-[70] pointer-events-none"
            style={{ transform: `translateY(${-90 * pa}vh)`, display: done ? 'none' : 'block', visibility: done ? 'hidden' : 'visible' }}

          >
            <div className="absolute z-30 bottom-[6%] left-4 right-4 pt-6 text-left sm:bottom-[15%] sm:left-[27%] sm:right-auto sm:pt-0 sm:w-[85%] rise-up" style={{ animationDelay: '1s' }}>

              <h2
                className="uppercase text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]"
                style={{ fontFamily: '"Tr 3 A", Arial, sans-serif', fontSize: 'clamp(20px, 6.2vw, 60px)', lineHeight: 'clamp(22px, 6.6vw, 62px)', fontWeight: 950 }}
              >
                FULL-STACK WEB &amp;<br />SOFTWARE DEVELOPER
              </h2>

            </div>
          </div>

          <div
            className="absolute inset-0 pointer-events-none"
            style={{ transform: `translateX(${-70 * pa}vw) translateY(${-50 * pa}vh) scale(${1 - 0.6 * pa})`, transformOrigin: 'bottom right', zIndex: 70, display: done ? 'none' : 'block', visibility: done ? 'hidden' : 'visible', pointerEvents: 'none' }}

          >
            <div className="absolute z-30 bottom-[20%] right-[3%] sm:bottom-[18%] sm:right-[22%] flex flex-col gap-3 origin-bottom-right scale-[0.85] sm:scale-100 rise-up" style={{ animationDelay: '1s' }}>
              <div className="hidden sm:block">
                <StatCard number="10+" label="10+ Projects" icon />
              </div>
              <StatCard number="3+" label="Years of Experience" />

            </div>
          </div>

          <div className="absolute inset-0 pointer-events-none" style={{ opacity: 1 - pa, zIndex: 30, display: done ? 'none' : 'block', visibility: done ? 'hidden' : 'visible', pointerEvents: done ? 'none' : 'auto' }}>

            <p className="absolute z-30 bottom-[4%] right-[1%] hidden xl:block w-72 min-h-[150px] rounded-2xl bg-gray-400/30 backdrop-blur-md border border-white/30 p-5 text-xs sm:text-sm font-bold text-black shadow-lg shadow-black/30 text-left leading-relaxed rise-up" style={{ animationDelay: '1s' }}>
              I’m a Web &amp; Software Developer with 3+ years of experience building modern websites, web applications, e-commerce solutions, and software products.
            </p>

          </div>
        </div>
      </div>

      <div
        className="fixed top-0 left-0 z-50 flex items-center justify-center gap-14 bg-[#00a896] pointer-events-none"

        style={{ width: 1500, height: 620, borderRadius: 96, opacity: seg(0.88), transformOrigin: '0 0', transform: `translate(${24 * pa}px, ${20 * pa}px) scale(${1 - 0.92 * pa})` }}

      >
        <span className="font-black text-black tracking-tight" style={{ fontFamily: '"Tr 3 A", Arial, sans-serif', fontSize: 190, lineHeight: 1 }}>
          MAHAD
        </span>
        <span className="flex h-[120px] w-[120px] items-center justify-center rounded-full border-[6px] border-black font-black text-black" style={{ fontSize: 72 }}>
          ®
        </span>
      </div>

      <div
        className="hidden lg:flex fixed top-0 left-0 z-40 h-dvh w-[300px] flex-col gap-2 overflow-hidden p-5 transition-all duration-700 ease-out"
        style={{ opacity: done ? 1 : 0, transform: done ? 'translateX(0)' : 'translateX(-30px)', pointerEvents: done ? 'auto' : 'none' }}
      >
        <div className={`shrink-0 rounded-2xl p-4 pt-20 ${panelDark ? 'bg-white/10' : 'bg-gray-200'}`} style={{ opacity: seg(0.15) }}>
          <p className={`text-[13px] font-semibold leading-snug ${panelDark ? 'text-white/60' : 'text-gray-700'}`}>
            I’m a Web &amp; Software Developer with 3+ years of experience building modern websites, web applications, e-commerce solutions, and software products.
          </p>

        </div>

        <div className={`shrink-0 rounded-2xl p-3.5 ${panelDark ? 'bg-white/10' : 'bg-gray-200'}`} style={{ opacity: seg(0.3) }}>
          <div className="grid grid-cols-2">
            <div className={`flex flex-col items-start gap-2 border-r pr-3 ${panelDark ? 'border-white/20' : 'border-gray-400'}`}>
              <div className="flex items-center gap-2">
                <ReactIcon className="w-5 h-5" />
                <span className="rounded-md bg-[#00a896] px-2 py-0.5 text-[10px] font-bold uppercase text-white">10+ Projects</span>
              </div>
            </div>
            <div className="flex flex-col items-start gap-2 pl-3">
              <span className="text-2xl font-black leading-none text-[#00A876]" style={{ fontFamily: '"Tr 3 A", Arial, sans-serif' }}>3+</span>

              <span className="rounded-md bg-[#00a896] px-2 py-0.5 text-[10px] font-bold uppercase text-white">Years of experience</span>
            </div>
          </div>
        </div>

        <nav className={`flex shrink-0 flex-col gap-0.5 rounded-2xl p-1.5 ${panelDark ? 'bg-white/10' : 'bg-gray-200'}`} style={{ opacity: seg(0.45) }}>
          {NAV_ITEMS.map(({ label, icon, target }) => {
            const isActive = activeNav === label
            return (
              <a
                key={label}
                href={target}
                onClick={() => setActiveNav(label)}
                className={`flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-1 text-[13px] transition ${
                  isActive
                    ? 'bg-[#00a896] font-black text-black shadow-md shadow-[#00a896]/30'
                      : panelDark
                        ? 'font-bold text-white hover:bg-white/10'
                        : 'font-bold text-gray-800 hover:bg-gray-300/60'
                }`}
              >
                <span className={`flex items-center justify-center ${isActive ? 'text-black' : 'text-[#00a896]'}`}>
                  <Icon d={icon} className="w-4 h-4" />
                </span>
                {label}
              </a>
            )
          })}
        </nav>

        <div className={`flex shrink-0 flex-col gap-3 rounded-2xl p-4 ${panelDark ? 'bg-white/10' : 'bg-gray-200'}`} style={{ opacity: seg(0.6) }}>
          <div className="flex flex-wrap items-center gap-2">
            <span className={`text-[10px] font-extrabold tracking-widest ${panelDark ? 'text-white/40' : 'text-gray-500'}`}>MERN</span>
            <span className={`text-[10px] font-extrabold tracking-widest ${panelDark ? 'text-white/40' : 'text-gray-500'}`}>ZERO FRAME</span>
            <span className={`text-[10px] font-extrabold tracking-widest ${panelDark ? 'text-white/40' : 'text-gray-500'}`}>GSAP</span>
          </div>

          <div className={`flex items-center justify-between rounded-full py-1.5 pl-3.5 pr-1.5 ${panelDark ? 'bg-white/15' : 'border border-gray-300 bg-white'}`}>
            <span className={`text-[13px] font-bold ${panelDark ? 'text-white' : 'text-gray-800'}`}>mahad</span>
            <button
              type="button"
              className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-black text-white transition hover:bg-gray-800 active:scale-95"
              aria-label="Copy username"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                <rect x="9" y="9" width="13" height="13" rx="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            </button>
          </div>

          <a href="#home" className="w-full shrink-0 rounded-full bg-[#00a896] py-2 text-center text-sm font-black tracking-wide text-black transition hover:bg-[#008f80]">
            Book a Call
          </a>
        </div>
      </div>

      <AboutSection ref={aboutRef} />
      <CraftSection ref={craftRef} />
      <WhatIBring />
      <Cta />
      <BrandHeading />
      <Testimonials />
      <FaqSection />

      <div className="sm:hidden fixed top-3 left-3 right-3 z-[999] flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 rounded-sm bg-[#00a896] px-3 py-2 shadow-lg shadow-black/30">
          <span className="font-black text-black text-sm tracking-tight">MAHAD</span>
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-black font-black text-[9px] leading-none text-black">K</span>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
          aria-expanded={menuOpen}
          className="relative z-[1001] flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg bg-black shadow-lg shadow-black/30 active:scale-95"
        >
          <span className="grid grid-cols-2 gap-1.5">
            {["top-left", "top-right", "bottom-left", "bottom-right"].map((pos) => (
              <span
                key={pos}
                className={`h-1.5 w-1.5 rounded-full bg-white transition-all duration-300 ${
                  menuOpen
                    ? pos === "top-left"
                      ? "scale-0"
                      : pos === "bottom-right"
                        ? "scale-0"
                        : "translate-x-[7.5px] -translate-y-[7.5px]"
                    : ""
                }`}
              />
            ))}
          </span>
        </button>
      </div>

      {menuOpen && (
        <>
          <div className="fixed inset-0 z-[1000] bg-black/50 backdrop-blur-[3px]" onClick={() => setMenuOpen(false)} />
          <div className="sm:hidden menu-in fixed top-[4.25rem] left-3 right-3 z-[1010] flex max-h-[72vh] flex-col overflow-hidden rounded-3xl border border-white/15 bg-white/10 backdrop-blur-xl">
            <div className="flex shrink-0 items-center justify-between px-5 py-4">
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/50">Menu</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">{NAV_ITEMS.length} Links</span>
            </div>

            <nav className="flex min-h-0 flex-col gap-0.5 overflow-y-auto px-2">
              {NAV_ITEMS.map(({ label, icon, target }) => {
                const isActive = activeNav === label
                return (
                  <a
                    key={label}
                    href={target}
                    onClick={() => {
                      setActiveNav(label)
                      setMenuOpen(false)
                    }}
                    className={`flex items-center gap-3 rounded-xl px-3 py-3.5 transition duration-200 active:scale-[0.99] ${
                      isActive ? 'bg-[#00a896] text-black' : 'text-white/80 hover:bg-white/5'
                    }`}
                  >
                    <span className={isActive ? 'text-black' : 'text-[#00a896]'}>
                      <Icon d={icon} className="h-[18px] w-[18px]" />
                    </span>
                    <span className="text-[15px] font-bold">{label}</span>
                  </a>
                )
              })}
            </nav>

            <a
              href="#home"
              onClick={() => setMenuOpen(false)}
              className="mx-2 mb-[max(0.625rem,env(safe-area-inset-bottom))] mt-1 shrink-0 rounded-xl border border-white/15 py-3 text-center text-[13px] font-bold text-white/80 transition active:scale-[0.99]"
            >
              Book a Call
            </a>
          </div>
        </>
      )}
    </div>

  )
}

export default App
