import { useEffect, useMemo, useState } from 'react'
import {
  SiCss3,
  SiFigma,
  SiGithub,
  SiGit,
  SiHtml5,
  SiLinkedin,
  SiMysql,
  SiNodedotjs,
  SiReact,
  SiSpringboot,
  SiTailwindcss,
  SiTensorflow,
} from 'react-icons/si'
import { FaBrain, FaJava } from 'react-icons/fa6'
import { HiMoon, HiSun } from 'react-icons/hi2'
import {
  HiCheckBadge,
  HiClock,
  HiLifebuoy,
  HiSparkles,
  HiDocumentText,
  HiCodeBracket,
  HiChatBubbleLeftRight,
  HiEnvelope,
  HiPhone,
} from 'react-icons/hi2'
import profileImage from './assets/profile.png'

function App() {
  const navItems = useMemo(() => ['Home', 'About', 'Skills', 'Services', 'Contact'], [])
  const [activeSection, setActiveSection] = useState('Home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [theme, setTheme] = useState<'dark' | 'light'>('light')
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const sectionElements = navItems
      .map((item) => document.getElementById(item.toLowerCase()))
      .filter((el): el is HTMLElement => Boolean(el))

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({ ...prev, [entry.target.id]: true }))
          }
        })
      },
      {
        threshold: 0.2,
      },
    )

    const updateActiveSection = () => {
      const viewportReference = window.scrollY + 140
      let current = 'Home'

      for (const section of sectionElements) {
        if (section.offsetTop <= viewportReference) {
          current = section.id.charAt(0).toUpperCase() + section.id.slice(1)
        }
      }

      setActiveSection(current)
    }

    sectionElements.forEach((el) => {
      revealObserver.observe(el)
    })

    updateActiveSection()
    window.addEventListener('scroll', updateActiveSection, { passive: true })

    return () => {
      sectionElements.forEach((el) => {
        revealObserver.unobserve(el)
      })
      window.removeEventListener('scroll', updateActiveSection)
    }
  }, [navItems])

  const goToSection = (sectionName: string) => {
    const section = document.getElementById(sectionName.toLowerCase())
    if (!section) return
    section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setMenuOpen(false)
  }

  const revealClass = (id: string) =>
    `transition-all duration-1000 ease-out ${visibleSections[id] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`

  const isDark = theme === 'dark'

  const skills = [
    { name: 'Figma', icon: SiFigma, iconColor: 'text-pink-500' },
    { name: 'Java', icon: FaJava, iconColor: 'text-orange-500' },
    { name: 'Node.js', icon: SiNodedotjs, iconColor: 'text-green-500' },
    { name: 'MySQL', icon: SiMysql, iconColor: 'text-sky-500' },
    { name: 'HTML', icon: SiHtml5, iconColor: 'text-orange-600' },
    { name: 'CSS', icon: SiCss3, iconColor: 'text-blue-500' },
    { name: 'React', icon: SiReact, iconColor: 'text-cyan-400' },
    { name: 'Spring Boot', icon: SiSpringboot, iconColor: 'text-green-500' },
    { name: 'Git', icon: SiGit, iconColor: 'text-red-500' },
    { name: 'Machine Learning', icon: SiTensorflow, iconColor: 'text-amber-500' },
    { name: 'Tailwind CSS', icon: SiTailwindcss, iconColor: 'text-cyan-500' },
    { name: 'AI', icon: FaBrain, iconColor: 'text-violet-500' },
  ]

  const serviceCards = [
    {
      title: 'Expert Development',
      description:
        'High-quality solutions designed to meet exact requirements with precision and professionalism.',
      icon: HiCheckBadge,
    },
    {
      title: 'On-Time Delivery',
      description: 'Timely project completion without compromising performance or quality.',
      icon: HiClock,
    },
    {
      title: 'Dedicated Support',
      description: 'Continuous assistance to ensure smooth execution and client satisfaction.',
      icon: HiLifebuoy,
    },
    {
      title: 'Innovative Approach',
      description: 'Creative and modern solutions tailored to solve challenges efficiently.',
      icon: HiSparkles,
    },
  ]

  const highlightedFeatures = [
    { title: 'Complete Documentation', icon: HiDocumentText },
    { title: 'Clean Source Code', icon: HiCodeBracket },
    { title: 'Post-Delivery Support', icon: HiChatBubbleLeftRight },
  ]

  const servicesVisible = Boolean(visibleSections.services)
  const homeVisible = Boolean(visibleSections.home)
  const aboutVisible = Boolean(visibleSections.about)
  const cardReveal = (delayClass: string) =>
    `transition-all duration-700 ${delayClass} ${servicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        isDark
          ? 'bg-gradient-to-b from-slate-950 via-slate-900 to-purple-950 text-slate-100'
          : 'bg-gradient-to-b from-slate-50 via-indigo-50 to-purple-100 text-slate-800'
      }`}
    >
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md transition-colors duration-500 ${
          isDark
            ? 'border-slate-700/50 bg-slate-950/80'
            : 'border-white/20 bg-gradient-to-r from-indigo-500/85 via-violet-500/85 to-purple-600/85'
        }`}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
          <button
            onClick={() => goToSection('Home')}
            className={`text-lg font-bold tracking-wide ${
              isDark ? 'text-purple-300' : 'text-white'
            }`}
          >
            Pradeep Tech Hub
          </button>

          <ul className="hidden items-center gap-2 md:flex">
            {navItems.map((item) => {
              const isActive = activeSection === item
              return (
                <li key={item}>
                  <button
                    onClick={() => goToSection(item)}
                    className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? isDark
                          ? 'bg-purple-600/30 text-purple-200'
                          : 'bg-white/25 text-white'
                        : isDark
                          ? 'text-slate-300 hover:text-white'
                          : 'text-indigo-50/95 hover:text-white'
                    }`}
                  >
                    {item}
                  </button>
                </li>
              )
            })}
          </ul>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
              aria-label="Toggle theme"
              className={`rounded-md p-1.5 transition sm:p-2 ${
                isDark
                  ? 'bg-slate-800 text-yellow-300 hover:bg-slate-700'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              {isDark ? <HiSun className="h-4 w-4 sm:h-5 sm:w-5" /> : <HiMoon className="h-4 w-4 sm:h-5 sm:w-5" />}
            </button>

          <button
            className={`rounded-md p-1.5 md:hidden sm:p-2 ${isDark ? 'text-slate-200' : 'text-white'}`}
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle mobile menu"
          >
            <span className={`block h-0.5 w-6 ${isDark ? 'bg-slate-200' : 'bg-white'}`} />
            <span className={`mt-1.5 block h-0.5 w-6 ${isDark ? 'bg-slate-200' : 'bg-white'}`} />
            <span className={`mt-1.5 block h-0.5 w-6 ${isDark ? 'bg-slate-200' : 'bg-white'}`} />
          </button>
          </div>
        </nav>

        {menuOpen && (
          <div
            className={`border-t px-4 py-3 md:hidden ${
              isDark
                ? 'border-slate-700/60 bg-slate-900/95'
                : 'border-white/30 bg-gradient-to-r from-indigo-500/95 via-violet-500/95 to-purple-600/95'
            }`}
          >
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item}>
                  <button
                    onClick={() => goToSection(item)}
                    className={`w-full rounded-md px-3 py-2 text-left text-sm font-medium transition ${
                      isDark
                        ? 'text-slate-200 hover:bg-slate-800'
                        : 'text-indigo-50 hover:bg-white/20'
                    }`}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      <main className="pb-24">
        <section
          id="home"
          className={`relative isolate overflow-hidden pb-8 pt-20 sm:pb-12 sm:pt-28 lg:pb-14 lg:pt-32 ${revealClass('home')}`}
        >
          <div
            className={`hero-gradient-flow absolute inset-0 -z-10 ${
              isDark ? 'hero-gradient-dark' : 'hero-gradient-light'
            }`}
          />
          <div className={`absolute inset-0 -z-10 ${isDark ? 'bg-slate-950/25' : 'bg-transparent'}`} />
          <div className={`absolute -left-16 bottom-0 h-56 w-56 rounded-full blur-3xl ${isDark ? 'bg-purple-500/10' : 'bg-fuchsia-300/20'}`} />
          <div className={`absolute -right-14 top-10 h-56 w-56 rounded-full blur-3xl ${isDark ? 'bg-blue-400/10' : 'bg-sky-300/20'}`} />
          <div className={`absolute left-1/2 top-12 h-72 w-72 -translate-x-1/2 rounded-full blur-3xl ${isDark ? 'bg-indigo-300/10' : 'bg-indigo-200/10'}`} />

          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
            <span
              className={`hero-code-float hero-code-delay-1 absolute left-[8%] top-[18%] select-none text-2xl font-semibold tracking-tight opacity-[0.05] blur-[0.5px] sm:text-3xl lg:text-4xl ${
                isDark ? 'text-violet-100' : 'text-white'
              }`}
            >
              {'{ code: clean }'}
            </span>
            <span
              className={`hero-code-float hero-code-delay-2 absolute right-[10%] top-[24%] hidden select-none text-3xl font-bold opacity-[0.04] blur-[0.5px] sm:block sm:text-4xl lg:text-5xl ${
                isDark ? 'text-indigo-100' : 'text-white'
              }`}
            >
              build();
            </span>
            <span
              className={`hero-code-float hero-code-delay-3 absolute left-[16%] bottom-[19%] select-none text-2xl font-semibold opacity-[0.05] blur-[0.5px] sm:text-3xl lg:text-4xl ${
                isDark ? 'text-purple-100' : 'text-white'
              }`}
            >
              deploy();
            </span>
            <span
              className={`hero-code-float hero-code-delay-4 absolute right-[18%] bottom-[17%] hidden select-none text-3xl font-semibold opacity-[0.04] blur-[0.5px] md:block md:text-4xl lg:text-5xl ${
                isDark ? 'text-violet-100' : 'text-white'
              }`}
            >
              render();
            </span>
            <span
              className={`hero-code-float hero-code-delay-5 absolute left-1/2 top-[48%] hidden -translate-x-1/2 select-none text-3xl font-bold opacity-[0.04] blur-[0.5px] lg:block lg:text-5xl ${
                isDark ? 'text-slate-100' : 'text-white'
              }`}
            >
              optimize();
            </span>
          </div>

          <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <p
              className={`mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-white/80 transition-all duration-900 ease-out ${
                homeVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
              }`}
            >
              Full Stack Developer
            </p>
            <h1
              className={`max-w-4xl text-3xl font-extrabold leading-[1.1] text-white transition-all duration-900 delay-100 ease-out sm:text-5xl lg:text-6xl ${
                homeVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
              }`}
            >
              Pradeep Tech Hub
            </h1>
            <p
              className={`mt-3 text-sm italic tracking-wide transition-all duration-900 delay-125 ease-out sm:mt-4 sm:text-lg ${
                isDark ? 'text-slate-200/95' : 'text-indigo-50/95'
              } ${homeVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}
            >
              “Where Ideas Become Reliable Solutions”
            </p>
            <p
              className={`mt-4 text-lg transition-all duration-900 delay-150 ease-out sm:text-xl ${
                isDark ? 'text-slate-200' : 'text-indigo-50'
              } ${homeVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}
            >
              Full Stack Developer
            </p>
            <p
              className={`mt-4 max-w-xl text-base leading-7 transition-all duration-900 delay-200 ease-out sm:mt-5 sm:max-w-2xl sm:text-[17px] sm:leading-relaxed ${
                isDark ? 'text-slate-300' : 'text-indigo-100'
              } ${homeVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}
            >
              I build clean, scalable web applications that turn student and client ideas into
              reliable, professionally delivered solutions.
            </p>

            <div
              className={`mt-4 flex flex-wrap gap-2 text-xs font-medium text-white/90 transition-all duration-900 delay-300 ease-out sm:mt-5 sm:gap-3 sm:text-sm ${
                homeVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
              }`}
            >
              <span className="rounded-full border border-white/30 bg-white/10 px-3 py-1.5 transition-transform duration-300 hover:-translate-y-0.5 hover:bg-white/15 sm:px-4 sm:py-2">15+ Projects Delivered</span>
              <span className="rounded-full border border-white/30 bg-white/10 px-3 py-1.5 transition-transform duration-300 hover:-translate-y-0.5 hover:bg-white/15 sm:px-4 sm:py-2">Student & Client Focused Solutions</span>
              <span className="rounded-full border border-white/30 bg-white/10 px-3 py-1.5 transition-transform duration-300 hover:-translate-y-0.5 hover:bg-white/15 sm:px-4 sm:py-2">Clean Architecture Approach</span>
            </div>

            <button
              onClick={() => goToSection('Contact')}
              className={`mt-6 inline-flex w-full items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-indigo-600 shadow-lg shadow-black/10 transition-all duration-900 delay-500 ease-out hover:-translate-y-1 hover:bg-indigo-50 hover:shadow-xl hover:shadow-black/15 sm:mt-7 sm:w-auto sm:px-8 sm:text-base ${
                homeVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
              }`}
            >
              Contact Me
            </button>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <section id="about" className={`py-20 ${revealClass('about')}`}>
          <div className="grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
            <div className="mx-auto flex w-full max-w-sm flex-col items-center text-center">
              <div
                className={`group relative rounded-[1.9rem] p-[2px] transition-all duration-700 ease-out ${
                  isDark
                    ? 'bg-gradient-to-br from-violet-400/35 via-fuchsia-400/20 to-cyan-400/35 shadow-[0_10px_35px_-14px_rgba(56,189,248,0.45)]'
                    : 'bg-gradient-to-br from-violet-300/70 via-fuchsia-200/60 to-cyan-300/70 shadow-[0_10px_30px_-14px_rgba(99,102,241,0.35)]'
                } ${
                  aboutVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                }`}
              >
                <div className="overflow-hidden rounded-[1.8rem]">
                  <img
                    src={profileImage}
                    alt="Pradeep M"
                    className={`w-full rounded-[1.8rem] object-cover shadow-lg transition-all duration-300 group-hover:shadow-xl ${
                      isDark
                        ? 'shadow-black/35 group-hover:shadow-black/50'
                        : 'shadow-slate-400/30 group-hover:shadow-slate-500/35'
                    }`}
                  />
                </div>
              </div>

              <div
                className={`mt-6 transition-all duration-700 delay-150 ease-out ${
                  aboutVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                }`}
              >
                <p className={`text-2xl font-bold tracking-tight sm:text-3xl ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                  Pradeep M
                </p>
                <p className={`mt-2 text-sm sm:text-base ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  Full Stack Developer
                </p>
                <div className="mt-5 flex items-start justify-center gap-6 sm:gap-8">
                  <a
                    href="https://github.com/PradeepTech-hub"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub"
                    className={`flex flex-col items-center gap-1 rounded-lg p-2 transition-all duration-300 hover:scale-105 ${
                      isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <SiGithub className="h-6 w-6" />
                    <span className="text-xs font-medium sm:text-sm">GitHub</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/pradeep-mlink"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    className={`flex flex-col items-center gap-1 rounded-lg p-2 transition-all duration-300 hover:scale-105 ${
                      isDark ? 'text-slate-300 hover:text-sky-400' : 'text-slate-600 hover:text-blue-600'
                    }`}
                  >
                    <SiLinkedin className="h-6 w-6" />
                    <span className="text-xs font-medium sm:text-sm">LinkedIn</span>
                  </a>
                  <a
                    href="mailto:pradeepshetty.m003@gmail.com"
                    aria-label="Email"
                    className={`flex flex-col items-center gap-1 rounded-lg p-2 transition-all duration-300 hover:scale-105 ${
                      isDark ? 'text-slate-300 hover:text-purple-200' : 'text-slate-600 hover:text-violet-600'
                    }`}
                  >
                    <HiEnvelope className="h-6 w-6" />
                    <span className="text-xs font-medium sm:text-sm">Email</span>
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h2 className={`text-3xl font-bold tracking-tight sm:text-4xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
                About
              </h2>
              <p className={`mt-6 text-base leading-relaxed sm:text-lg ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Hello! My name is <strong>Pradeep M</strong>, a passionate Full Stack Developer and MCA student with a
                strong foundation in computer science and application development. I completed my 
                <strong> Bachelor of Computer Applications (BCA)</strong> from JSS Science and Technology University,
                Mysuru and am currently pursuing my <strong>Master of Computer Applications (MCA)</strong> at RV
                College of Engineering, Bengaluru, where I continue to enhance my technical expertise
                and problem-solving skills.
              </p>
              <p className={`mt-4 text-base leading-relaxed sm:text-lg ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Over the course of my academic and freelancing journey, I have successfully built and
                delivered 15+ projects, helping students and clients transform their ideas into
                efficient, user-friendly, and requirement-based applications. I focus on clearly
                understanding project needs and developing customized solutions that meet both academic
                standards and practical expectations.
              </p>
              <p className={`mt-4 text-base leading-relaxed sm:text-lg ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Through my freelancing work, I have guided students in designing and implementing
                projects tailored to their specific requirements, ensuring proper documentation,
                structured development, and smooth deployment. My goal is to provide dependable
                development support while continuously growing as a professional software developer.
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-3 sm:gap-6">
                <div
                  className={`group relative overflow-hidden rounded-2xl border px-6 py-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                    isDark
                      ? 'border-slate-700/80 bg-slate-900/70 hover:border-purple-500/40 hover:shadow-purple-900/30'
                      : 'border-slate-200 bg-white/95 hover:border-indigo-300 hover:shadow-indigo-200/80'
                  }`}
                >
                  <span className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-indigo-500 to-violet-500" />
                  <p className={`text-4xl font-bold tracking-tight ${isDark ? 'text-indigo-200' : 'text-indigo-500'}`}>
                    15+
                  </p>
                  <p className={`mt-2 text-base font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Projects Delivered
                  </p>
                </div>

                <div
                  className={`group relative overflow-hidden rounded-2xl border px-6 py-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                    isDark
                      ? 'border-slate-700/80 bg-slate-900/70 hover:border-purple-500/40 hover:shadow-purple-900/30'
                      : 'border-slate-200 bg-white/95 hover:border-indigo-300 hover:shadow-indigo-200/80'
                  }`}
                >
                  <span className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-indigo-500 to-violet-500" />
                  <p className={`text-2xl font-bold tracking-tight ${isDark ? 'text-indigo-200' : 'text-indigo-500'}`}>
                    Student & Client
                  </p>
                  <p className={`mt-2 text-base font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Focused Solutions
                  </p>
                </div>

                <div
                  className={`group relative overflow-hidden rounded-2xl border px-6 py-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                    isDark
                      ? 'border-slate-700/80 bg-slate-900/70 hover:border-purple-500/40 hover:shadow-purple-900/30'
                      : 'border-slate-200 bg-white/95 hover:border-indigo-300 hover:shadow-indigo-200/80'
                  }`}
                >
                  <span className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-indigo-500 to-violet-500" />
                  <p className={`text-2xl font-bold tracking-tight ${isDark ? 'text-indigo-200' : 'text-indigo-500'}`}>
                    Complete
                  </p>
                  <p className={`mt-2 text-base font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    End-to-End Delivery
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className={`py-20 ${revealClass('skills')}`}>
          <h2 className={`text-3xl font-bold tracking-tight sm:text-4xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Technologies & Tools I Work With
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-6 sm:grid-cols-3 lg:grid-cols-4">
            {skills.map((skill) => (
              <div
                key={skill.name}
                className={`rounded-2xl border p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-purple-500 ${
                  isDark
                    ? 'border-slate-700 bg-slate-900/70 text-slate-200 hover:shadow-lg hover:shadow-purple-900/30'
                    : 'border-slate-300 bg-white/85 text-slate-800 hover:shadow-lg hover:shadow-purple-300/40'
                }`}
              >
                <skill.icon className={`mx-auto h-10 w-10 ${skill.iconColor}`} />
                <p className="mt-3 text-sm font-semibold sm:text-base">{skill.name}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="services" className={`py-20 ${revealClass('services')}`}>
          <div
            className={`relative overflow-hidden rounded-3xl border p-7 sm:p-10 lg:p-12 ${
              isDark
                ? 'border-slate-700/60 bg-slate-900/45'
                : 'border-slate-200 bg-gradient-to-br from-white via-indigo-50/70 to-purple-50/70'
            }`}
          >
            {!isDark && (
              <>
                <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-indigo-200/40 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-24 left-12 h-56 w-56 rounded-full bg-purple-200/40 blur-3xl" />
              </>
            )}

            <h2 className={`relative text-3xl font-bold tracking-tight sm:text-4xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Why Us?
            </h2>
            <p className={`relative mt-3 max-w-2xl text-base ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Reliable, efficient, and requirement-focused development services.
            </p>

            <div className="relative mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
              {serviceCards.map((card, index) => (
                <div
                  key={card.title}
                  className={`${cardReveal(
                    index === 0
                      ? 'delay-0'
                      : index === 1
                        ? 'delay-100'
                        : index === 2
                          ? 'delay-200'
                          : 'delay-300',
                    )} group rounded-2xl border p-7 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 ${
                      isDark
                        ? 'border-slate-700/70 bg-slate-900/70 shadow-sm hover:border-purple-500/50 hover:shadow-lg'
                        : 'border-slate-200 bg-white/95 shadow-sm shadow-indigo-200/60 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-200/70'
                    }`}
                >
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-xl border shadow-sm ${
                      isDark
                        ? 'border-slate-700/70 bg-slate-900/75 text-purple-200 shadow-black/15 group-hover:border-purple-500/50 group-hover:text-purple-100'
                        : 'border-indigo-100 bg-white text-indigo-700 shadow-indigo-100/70 group-hover:border-indigo-300 group-hover:text-indigo-800'
                    }`}
                  >
                    <card.icon className="h-7 w-7" />
                  </div>
                  <h3 className={`mt-5 text-lg font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {card.title}
                  </h3>
                  <p className={`mt-3 text-[15px] leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    {card.description}
                  </p>
                  <div
                    className={`mt-5 h-px w-full transition-colors ${
                      isDark
                        ? 'bg-slate-700/60 group-hover:bg-purple-500/50'
                        : 'bg-slate-200 group-hover:bg-indigo-300'
                    }`}
                  />
                </div>
              ))}
            </div>

            <div className="relative mt-12 grid gap-6 sm:grid-cols-3">
              {highlightedFeatures.map((feature, index) => (
                <div
                  key={feature.title}
                  className={`${cardReveal(index === 0 ? 'delay-200' : index === 1 ? 'delay-300' : 'delay-500')} rounded-2xl border px-5 py-5 backdrop-blur-sm transition duration-300 hover:-translate-y-1 ${
                    isDark
                      ? 'border-slate-700/70 bg-slate-900/60 hover:border-purple-500/40'
                      : 'border-slate-200 bg-white/95 shadow-sm shadow-indigo-200/60 hover:border-indigo-300 hover:shadow-md hover:shadow-indigo-200/70'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl border ${
                        isDark
                          ? 'border-slate-700/70 bg-slate-900/70 text-purple-200'
                          : 'border-indigo-100 bg-white text-indigo-700'
                      }`}
                    >
                      <feature.icon className="h-5 w-5" />
                    </div>
                    <p className={`text-[15px] font-semibold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                      {feature.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className={`py-20 ${revealClass('contact')}`}>
          <div className="mx-auto max-w-xl text-center">
            <h2 className={`text-3xl font-bold tracking-tight sm:text-4xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Let’s Work Together
            </h2>
            <p className={`mt-3 text-base sm:text-lg ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Have a project in mind? Send me a message and I’ll get back to you.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm sm:text-base">
              <a
                href="mailto:pradeepshetty.m003@gmail.com"
                className={`inline-flex items-center gap-2 transition-colors ${
                  isDark ? 'text-slate-200 hover:text-purple-200' : 'text-slate-700 hover:text-violet-700'
                }`}
              >
                <HiEnvelope className="h-5 w-5" />
                <span>pradeepshetty.m003@gmail.com</span>
              </a>
              <p className={`inline-flex items-center gap-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                <HiPhone className="h-5 w-5" />
                <span>808850339</span>
              </p>
            </div>
            <form className="mt-8 space-y-5 text-left">
            <input
              type="text"
              placeholder="Name"
              className={`w-full rounded-xl border px-4 py-3 outline-none transition-all duration-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 ${
                isDark
                  ? 'border-slate-700 bg-slate-900/70 text-slate-100 placeholder-slate-400'
                  : 'border-slate-300 bg-white/90 text-slate-800 placeholder-slate-500'
              }`}
            />
            <input
              type="email"
              placeholder="Email"
              className={`w-full rounded-xl border px-4 py-3 outline-none transition-all duration-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 ${
                isDark
                  ? 'border-slate-700 bg-slate-900/70 text-slate-100 placeholder-slate-400'
                  : 'border-slate-300 bg-white/90 text-slate-800 placeholder-slate-500'
              }`}
            />
            <textarea
              placeholder="Message"
              rows={5}
              className={`w-full rounded-xl border px-4 py-3 outline-none transition-all duration-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 ${
                isDark
                  ? 'border-slate-700 bg-slate-900/70 text-slate-100 placeholder-slate-400'
                  : 'border-slate-300 bg-white/90 text-slate-800 placeholder-slate-500'
              }`}
            />
            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.01]"
            >
              Send Message
            </button>
            </form>

            <div className="mt-8 flex items-center justify-center gap-4">
              <a
                href="https://github.com/PradeepTech-hub"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className={`rounded-full border p-3 transition hover:border-purple-500 ${
                  isDark ? 'border-slate-700 text-slate-200 hover:text-white' : 'border-slate-300 text-slate-700 hover:text-slate-900'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M12 2a10 10 0 0 0-3.162 19.489c.5.092.683-.217.683-.482 0-.237-.009-.867-.014-1.701-2.782.605-3.37-1.342-3.37-1.342-.455-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.004.071 1.532 1.031 1.532 1.031.892 1.53 2.341 1.088 2.91.832.091-.646.349-1.088.635-1.338-2.22-.252-4.555-1.11-4.555-4.943 0-1.092.39-1.986 1.03-2.686-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.026A9.56 9.56 0 0 1 12 6.845a9.55 9.55 0 0 1 2.504.337c1.91-1.295 2.748-1.026 2.748-1.026.546 1.377.202 2.394.1 2.647.641.7 1.029 1.594 1.029 2.686 0 3.842-2.339 4.688-4.566 4.935.359.309.679.92.679 1.855 0 1.338-.012 2.419-.012 2.748 0 .268.18.58.688.481A10.001 10.001 0 0 0 12 2Z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/pradeep-mlink"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className={`rounded-full border p-3 transition hover:border-purple-500 ${
                  isDark ? 'border-slate-700 text-slate-200 hover:text-white' : 'border-slate-300 text-slate-700 hover:text-slate-900'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M6.94 6.5a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0ZM3.75 8.25h3.5v12h-3.5v-12Zm6 0h3.35v1.64h.05c.47-.89 1.62-1.83 3.33-1.83 3.56 0 4.22 2.35 4.22 5.4v6.79h-3.5v-6.02c0-1.44-.03-3.3-2.01-3.3-2.02 0-2.33 1.58-2.33 3.2v6.12h-3.5v-12Z" />
                </svg>
              </a>
            </div>
          </div>
        </section>
        </div>
      </main>
    </div>
  )
}

export default App
