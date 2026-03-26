import { useState } from 'react';
import { ArrowRight, CheckCircle2, Hammer, Home, Sparkles, Truck, Wrench, Zap } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const heroImageSrc = new URL('../../../pexels-pic-1.jpg', import.meta.url).href;
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

type SignupRole = 'client' | 'pro';

function getInitialLanguage(): 'de' | 'en' {
  if (typeof window === 'undefined') return 'de';
  return new URLSearchParams(window.location.search).get('lang') === 'en' ? 'en' : 'de';
}

export default function LandingPage() {
  const [language, setLanguage] = useState<'de' | 'en'>(getInitialLanguage);
  const [email, setEmail] = useState('');
  const [emailBottom, setEmailBottom] = useState('');
  const [modalEmail, setModalEmail] = useState('');
  const [modalRole, setModalRole] = useState<SignupRole | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmittedBottom, setIsSubmittedBottom] = useState(false);
  const [isModalSubmitted, setIsModalSubmitted] = useState(false);
  const [isSubmittingTop, setIsSubmittingTop] = useState(false);
  const [isSubmittingBottom, setIsSubmittingBottom] = useState(false);
  const [isSubmittingModal, setIsSubmittingModal] = useState(false);
  const [topError, setTopError] = useState<string | null>(null);
  const [bottomError, setBottomError] = useState<string | null>(null);
  const [modalError, setModalError] = useState<string | null>(null);

  const t = {
    de: {
      hero: { headline1: 'Aufgaben im Haushalt?', headline2: 'Erledigt.', subheadline: 'Beschreibe dein Problem in einfachen Worten. Wir erledigen den Rest.', emailPlaceholder: 'deine.email@beispiel.de', cta: 'Frühzugang sichern', noSpam: 'Kein Spam. Nur eine Info, wenn wir starten.' },
      aiSection: { eyebrow: 'Beschreibe. KI plant. Match.', headline1: 'Wir sprechen menschlich.', headline2: 'Die KI übernimmt die technischen Details.', userInput: '„Wand (15 m²) blau streichen und Sofa verschieben. Bis Samstag! Dringend!“', resultTask: 'Aufgabe: Wand streichen mit Möbel umstellen', resultTime: 'Benötigte Zeit: 2.5 Stunden', resultMaterial: 'Material: 2.5L Blaue Farbe', resultDeadline: 'Frist: Samstag, 10:00 Uhr', resultPrice: 'Geschätzter Preis: €145', caption: 'Keine Formulare. Keine Kategorien. Sag uns einfach, was los ist.', resultLabel: 'Was Helfer sehen' },
      local: { headline: 'Pilot in Stuttgart', subheadline: "Wir bauen gerade unsere verifizierte 'Talent'-Datenbank in Stuttgart auf." },
      services: { headline: 'Verifizierte Fähigkeiten', service1: 'Möbelmontage', service2: 'Umzugshilfe', service3: 'Kleine Reparaturen', service4: 'Haushaltshilfe' },
      standard: { headline: 'Für Vertrauen gebaut', item1Title: 'Schnell vermittelt', item1Text: 'Überspringe die wochenlange Wartezeit klassischer Agenturen.', item2Title: 'Geprüftes Talent', item2Text: 'Jede Fachkraft wird geprüft und von der Community bewertet.', item3Title: 'Faire Preise', item3Text: 'Keine versteckten Gebühren und keine überraschenden Rückrufe.' },
      community: { headline: 'Zwei Hände. Eine Community.', subheadline: '', clientEyebrow: 'Brauchst du Hilfe?', clientTitle: 'Jetzt zur Warteliste anmelden', clientText: 'Sei unter den Ersten, die Hilfe für Aufgaben zuhause bekommen, wenn wir in deiner Gegend starten. Kein endloses Scrollen mehr durch Profile oder Angebotsvergleiche.', clientCta: 'Ich brauche Hilfe', proEyebrow: 'Hast du Talent?', proTitle: 'Als Helfer vorregistrieren', proText: 'Hast du einen Akkuschrauber? Bist du gut in Montage? Oder einfach talentiert im Reparieren? Hilf deinen Nachbarn und verdiene lokal. Volle Kontrolle über deinen Zeitplan.', proCta: 'Ich kann helfen' },
      modal: { title: 'Zur GILDE-Warteliste', clientRole: 'Hilfesuchend', proRole: 'Helfer', roleLabel: 'Ausgewählte Rolle', emailLabel: 'E-Mail-Adresse', emailPlaceholder: 'deine.email@beispiel.de', submit: 'Zur Warteliste', submitted: 'Danke. Deine Rolle wurde erfasst und du stehst jetzt auf der Warteliste.', close: 'Schließen' },
      errors: { signupFailed: 'Anmeldung fehlgeschlagen. Bitte versuche es noch einmal.' },
      footer: { tagline: 'GILDE - Nachbarschaftshilfe.', submitted: 'Du bist auf der Liste! Wir melden uns bald.' }
    },
    en: {
      hero: { headline1: 'Home tasks?', headline2: 'Consider them done.', subheadline: 'Describe your problem in plain words. We handle everything else.', emailPlaceholder: 'your.email@example.com', cta: 'Get Early Access', noSpam: 'No spam. Just a heads-up when we launch.' },
      aiSection: { eyebrow: 'Describe. AI Plans. Matched.', headline1: 'We speak human.', headline2: 'AI handles the technical details.', userInput: '“Paint a wall (15 m²) blue and move a sofa. By Saturday! Urgent!”', resultTask: 'Task: Wall Painting with Furniture Relocation', resultTime: 'Time Needed: 2.5 hours', resultMaterial: 'Material: 2.5L Blue Paint', resultDeadline: 'Deadline: Saturday, 10:00 AM', resultPrice: 'Estimated Price: €145', caption: "No forms. No categories. Just tell us what's wrong.", resultLabel: 'What Helpers See' },
      local: { headline: 'Piloting in Stuttgart', subheadline: "We are currently building our verified 'Talent' database in Stuttgart." },
      services: { headline: 'Verified Skills', service1: 'Furniture Assembly', service2: 'Moving Support', service3: 'Minor Repairs', service4: 'Home Help' },
      standard: { headline: 'Built for Confidence', item1Title: 'Matched fast', item1Text: 'Skip the weeks-long wait for agencies.', item2Title: 'Verified Talent', item2Text: 'Every specialist is background-checked and rated by the community.', item3Title: 'Fair Pricing', item3Text: 'No hidden fees or surprise calls.' },
      community: { headline: 'Two hands. One community.', subheadline: '', clientEyebrow: 'Need help?', clientTitle: 'Join our waitlist', clientText: 'Be the first to get your home tasks handled when we launch in your area. No more scrolling through endless profiles or comparing quotes.', clientCta: 'I need help', proEyebrow: 'Have talent?', proTitle: 'Pre-register as a helper', proText: 'Got a drill? Skilled at assembly? Or just have a talent for fixing things? Help your neighbors and earn locally. Full control over your schedule.', proCta: 'I can help' },
      modal: { title: 'Join the GILDE waitlist', clientRole: 'Client', proRole: 'Pro', roleLabel: 'Selected role', emailLabel: 'Email address', emailPlaceholder: 'your.email@example.com', submit: 'Join waitlist', submitted: 'Thanks. Your role has been captured and you are on the waitlist.', close: 'Close' },
      errors: { signupFailed: 'Signup failed. Please try again.' },
      footer: { tagline: "GILDE - Neighborhood help.", submitted: "You're on the list! We'll be in touch soon." }
    }
  };

  const content = t[language];
  const selectedRoleLabel = modalRole === 'pro' ? content.modal.proRole : content.modal.clientRole;
  const openSignupModal = (role: SignupRole) => { setModalRole(role); setModalEmail(''); setIsModalSubmitted(false); setModalError(null); };
  const closeSignupModal = () => { setModalRole(null); setModalEmail(''); setIsModalSubmitted(false); setModalError(null); };
  const submitWaitlistSignup = async (signupEmail: string, role: SignupRole) => {
    if (!supabaseUrl || !supabasePublishableKey) {
      throw new Error('Missing Supabase environment variables');
    }

    const response = await fetch(`${supabaseUrl}/rest/v1/waitlist_signups?on_conflict=email,role`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: supabasePublishableKey,
        Prefer: 'resolution=merge-duplicates,return=minimal'
      },
      body: JSON.stringify({
        email: signupEmail.trim().toLowerCase(),
        role,
        language,
        source: 'landingpage_gilde'
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Waitlist signup failed with status ${response.status}: ${errorText}`);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTopError(null);
    setIsSubmittingTop(true);

    try {
      await submitWaitlistSignup(email, 'client');
      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
      setTopError(content.errors.signupFailed);
    } finally {
      setIsSubmittingTop(false);
    }
  };
  const handleSubmitBottom = async (e: React.FormEvent) => {
    e.preventDefault();
    setBottomError(null);
    setIsSubmittingBottom(true);

    try {
      await submitWaitlistSignup(emailBottom, 'client');
      setIsSubmittedBottom(true);
    } catch (error) {
      console.error(error);
      setBottomError(content.errors.signupFailed);
    } finally {
      setIsSubmittingBottom(false);
    }
  };
  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalRole) return;

    setModalError(null);
    setIsSubmittingModal(true);

    try {
      await submitWaitlistSignup(modalEmail, modalRole);
      setIsModalSubmitted(true);
    } catch (error) {
      console.error(error);
      setModalError(content.errors.signupFailed);
    } finally {
      setIsSubmittingModal(false);
    }
  };
  const renderResultValue = (text: string) => {
    const separatorIndex = text.indexOf(': ');
    if (separatorIndex === -1) return text;

    const label = text.slice(0, separatorIndex + 2);
    const value = text.slice(separatorIndex + 2);

    return (
      <>
        {label}
        <span className="font-semibold">{value}</span>
      </>
    );
  };
  const renderResultRow = (text: string) => (
    <div className="flex items-start gap-3">
      <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0 text-white/95" strokeWidth={2.4} />
      <p className="leading-relaxed" style={{ fontFamily: "'Inter', sans-serif", fontSize: '17px' }}>{renderResultValue(text)}</p>
    </div>
  );

  const services = [
    { title: content.services.service1, icon: Hammer },
    { title: content.services.service2, icon: Truck },
    { title: content.services.service3, icon: Wrench },
    { title: content.services.service4, icon: Home }
  ];

  const standards = [
    { number: '01', title: content.standard.item1Title, text: content.standard.item1Text },
    { number: '02', title: content.standard.item2Title, text: content.standard.item2Text },
    { number: '03', title: content.standard.item3Title, text: content.standard.item3Text }
  ];

  return (
    <div className="min-h-screen bg-[#151538]">
      <header className="sticky top-0 z-50 py-6 border-b border-white/10 bg-[#151538]/80 backdrop-blur">
        <div className="max-w-[1400px] mx-auto px-8 flex justify-between items-center">
          <div className="text-2xl font-extrabold text-white" style={{ fontFamily: "'Outfit', sans-serif", letterSpacing: '-0.5px' }}>GILDE</div>
          <div className="flex items-center gap-2">
            <button onClick={() => setLanguage('de')} className={`px-3 py-1.5 text-sm font-semibold transition ${language === 'de' ? 'text-[#2FA4A9]' : 'text-white/40 hover:text-white/70'}`} style={{ fontFamily: "'Inter', sans-serif" }}>DE</button>
            <span className="text-white/20">|</span>
            <button onClick={() => setLanguage('en')} className={`px-3 py-1.5 text-sm font-semibold transition ${language === 'en' ? 'text-[#2FA4A9]' : 'text-white/40 hover:text-white/70'}`} style={{ fontFamily: "'Inter', sans-serif" }}>EN</button>
          </div>
        </div>
      </header>

      <section className="py-24 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-8 grid lg:grid-cols-[1.3fr_0.7fr] gap-20 items-center">
          <div className="max-w-2xl">
            <h1 className="text-white mb-8" style={{ fontFamily: "'Outfit', sans-serif", fontSize: '84px', fontWeight: 700, lineHeight: '0.9', letterSpacing: '-3px' }}>{content.hero.headline1}<br /><span className="text-[#2FA4A9]">{content.hero.headline2}</span></h1>
            <p className="text-white/70 mb-12 text-xl" style={{ fontFamily: "'Inter', sans-serif", lineHeight: '1.6' }}>{content.hero.subheadline}</p>
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="mb-4">
                <div className="flex gap-3">
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={content.hero.emailPlaceholder} required disabled={isSubmittingTop} className="flex-1 px-6 bg-white/5 backdrop-blur border border-white/20 text-white placeholder:text-white/30 focus:border-[#2FA4A9] focus:outline-none focus:ring-2 focus:ring-[#2FA4A9]/50 transition disabled:opacity-70" style={{ fontFamily: "'Inter', sans-serif", height: '64px', borderRadius: '4px', fontSize: '16px' }} />
                  <button type="submit" disabled={isSubmittingTop} className="bg-[#2FA4A9] text-white font-semibold hover:bg-[#27939A] transition-all flex items-center justify-center gap-3 px-10 group disabled:opacity-70" style={{ fontFamily: "'Inter', sans-serif", height: '64px', borderRadius: '4px', boxShadow: '0 4px 20px rgba(47,164,169,0.4)' }}>{content.hero.cta}<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} /></button>
                </div>
                {topError ? <p className="text-[#ffb4b4] text-sm mt-3" style={{ fontFamily: "'Inter', sans-serif" }}>{topError}</p> : null}
              </form>
            ) : <div className="bg-[#2FA4A9]/10 border border-[#2FA4A9] text-[#2FA4A9] px-6 py-5 inline-flex items-center gap-3 font-semibold mb-4" style={{ fontFamily: "'Inter', sans-serif", borderRadius: '4px' }}><CheckCircle2 className="w-6 h-6" strokeWidth={2.5} />{content.footer.submitted}</div>}
            <p className="text-white/40 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>{content.hero.noSpam}</p>
          </div>
          <div className="relative"><div className="relative overflow-hidden bg-white/5" style={{ borderRadius: '4px', boxShadow: '0 30px 80px rgba(0,0,0,0.5)' }}><ImageWithFallback src={heroImageSrc} alt="GILDE hero visual" className="w-full h-auto" /><div className="absolute inset-0 bg-[#151538]/28" /></div></div>
        </div>
      </section>

      <section className="py-24 border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-[#2FA4A9] uppercase tracking-[0.24em] text-sm font-semibold mb-5" style={{ fontFamily: "'Inter', sans-serif" }}>{content.aiSection.eyebrow}</p>
            <div className="text-white mb-6 flex flex-col items-center">
              <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '56px', fontWeight: 700, lineHeight: '1', letterSpacing: '-2px' }}>{content.aiSection.headline1}</h2>
              <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '56px', fontWeight: 700, lineHeight: '1', letterSpacing: '-2px', whiteSpace: 'nowrap', width: 'fit-content' }}>{content.aiSection.headline2}</h2>
            </div>
            <p className="text-white/60 text-lg max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>{content.aiSection.caption}</p>
          </div>
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-[1.15fr_auto_1.15fr] gap-8 items-center">
              <div className="bg-white/5 backdrop-blur border-2 border-dashed border-white/20 p-10 relative" style={{ borderRadius: '4px', minHeight: '240px' }}>
                <div className="absolute -top-3.5 left-6 bg-[#151538] px-4 py-1.5 text-xs font-bold text-white/50 uppercase tracking-wider" style={{ fontFamily: "'Inter', sans-serif" }}>User's Chaos</div>
                <p className="text-white/85 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif", fontSize: '28px', lineHeight: '1.45' }}>{content.aiSection.userInput}</p>
              </div>
              <div className="flex justify-center lg:block">
                <div className="relative flex items-center justify-center w-28 h-28">
                  <div className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 bg-gradient-to-r from-[#2FA4A9]/10 via-[#2FA4A9] to-[#2FA4A9]/10" />
                  <Sparkles className="absolute left-2 top-7 w-4 h-4 text-[#2FA4A9] animate-pulse" strokeWidth={2.5} />
                  <Sparkles className="absolute right-2 bottom-7 w-4 h-4 text-[#2FA4A9] animate-pulse" strokeWidth={2.5} />
                  <div className="relative rounded-full border border-[#2FA4A9]/30 bg-[#151538] p-4 shadow-[0_0_30px_rgba(47,164,169,0.35)]">
                    <Zap className="w-10 h-10 text-[#2FA4A9]" strokeWidth={2.5} fill="#2FA4A9" />
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-[#2FA4A9] to-[#238D92] p-10 text-white relative" style={{ borderRadius: '4px', boxShadow: '0 20px 50px rgba(47,164,169,0.5)', minHeight: '240px' }}>
                <div className="absolute -top-3.5 left-6 bg-[#151538] px-4 py-1.5 text-xs font-bold text-white uppercase tracking-wider" style={{ fontFamily: "'Inter', sans-serif" }}>{content.aiSection.resultLabel}</div>
                <div className="space-y-2.5">
                  {renderResultRow(content.aiSection.resultTask)}
                  {renderResultRow(content.aiSection.resultTime)}
                  {renderResultRow(content.aiSection.resultMaterial)}
                  {renderResultRow(content.aiSection.resultDeadline)}
                  {renderResultRow(content.aiSection.resultPrice)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-28 border-t border-white/10 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-white mb-6" style={{ fontFamily: "'Outfit', sans-serif", fontSize: '52px', fontWeight: 700, lineHeight: '1', letterSpacing: '-1.8px' }}>{content.standard.headline}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {standards.map((item) => <div key={item.number} className="border border-white/10 bg-[#1e1e4a] p-10" style={{ borderRadius: '4px' }}><div className="text-[#2FA4A9] font-bold mb-6" style={{ fontFamily: "'Inter', sans-serif", fontSize: '34px', lineHeight: '1' }}>{item.number}</div><h3 className="text-white mb-4" style={{ fontFamily: "'Outfit', sans-serif", fontSize: '28px', fontWeight: 600, lineHeight: '1.1' }}>{item.title}</h3><p className="text-white/70" style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', lineHeight: '1.7' }}>{item.text}</p></div>)}
          </div>
        </div>
      </section>

      <section className="py-32 border-t border-white/10 bg-[#151538]">
        <div className="max-w-[1500px] mx-auto px-8">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="text-white mb-6" style={{ fontFamily: "'Outfit', sans-serif", fontSize: '60px', fontWeight: 700, lineHeight: '1.02', letterSpacing: '-2.2px' }}>{content.community.headline}</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-10">
            <div className="border border-white/10 bg-[#2FA4A9] px-11 pt-9 pb-8 flex flex-col" style={{ borderRadius: '16px', minHeight: '290px' }}>
              <p className="text-[#1e1e4a] uppercase tracking-[0.18em] text-sm font-semibold mb-5" style={{ fontFamily: "'Inter', sans-serif" }}>{content.community.clientEyebrow}</p>
              <h3 className="text-white mb-5" style={{ fontFamily: "'Outfit', sans-serif", fontSize: '38px', fontWeight: 700, lineHeight: '1.02' }}>{content.community.clientTitle}</h3>
              <p className="text-white/70 mb-12 max-w-[470px] flex-1" style={{ fontFamily: "'Inter', sans-serif", fontSize: '17px', lineHeight: '1.75' }}>{content.community.clientText}</p>
              <button type="button" onClick={() => openSignupModal('client')} className="w-full mt-auto bg-[#1e1e4a] text-white font-semibold hover:bg-[#151538] transition-all px-8 inline-flex items-center justify-center gap-3 group" style={{ fontFamily: "'Inter', sans-serif", height: '58px', borderRadius: '6px', boxShadow: '0 4px 20px rgba(21,21,56,0.28)', fontSize: '18px' }}>{content.community.clientCta}<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} /></button>
            </div>
            <div className="border border-white/10 bg-[#1e1e4a] px-11 pt-9 pb-8 flex flex-col" style={{ borderRadius: '16px', minHeight: '290px' }}>
              <p className="text-[#2FA4A9] uppercase tracking-[0.18em] text-sm font-semibold mb-5" style={{ fontFamily: "'Inter', sans-serif" }}>{content.community.proEyebrow}</p>
              <h3 className="text-white mb-5" style={{ fontFamily: "'Outfit', sans-serif", fontSize: '38px', fontWeight: 700, lineHeight: '1.02' }}>{content.community.proTitle}</h3>
              <p className="text-white/70 mb-12 max-w-[490px] flex-1" style={{ fontFamily: "'Inter', sans-serif", fontSize: '17px', lineHeight: '1.75' }}>{content.community.proText}</p>
              <button type="button" onClick={() => openSignupModal('pro')} className="w-full mt-auto bg-[#2FA4A9] text-white font-semibold hover:bg-[#27939A] transition-all px-8 inline-flex items-center justify-center gap-3 group" style={{ fontFamily: "'Inter', sans-serif", height: '58px', borderRadius: '6px', boxShadow: '0 4px 20px rgba(47,164,169,0.35)', fontSize: '18px' }}>{content.community.proCta}<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} /></button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-28 border-t border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#151538]/58 z-10" />
        <div className="absolute inset-0 z-0"><ImageWithFallback src="https://images.unsplash.com/photo-1476385822777-70eabacbd41f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxTdHV0dGdhcnQlMjBHZXJtYW55JTIwY2l0eXNjYXBlJTIwbWFwfGVufDF8fHx8MTc3NDQ4Mzc1N3ww&ixlib=rb-4.1.0&q=80&w=1080" alt="Stuttgart Fernsehturm" className="w-full h-full object-cover opacity-50" /></div>
        <div className="max-w-[1400px] mx-auto px-8 relative z-20"><div className="max-w-3xl mx-auto text-center"><h2 className="text-white mb-8" style={{ fontFamily: "'Outfit', sans-serif", fontSize: '56px', fontWeight: 700, lineHeight: '1.1', letterSpacing: '-2px' }}>{content.local.headline}</h2><p className="text-white/70 text-xl leading-relaxed" style={{ fontFamily: "'Inter', sans-serif", lineHeight: '1.7' }}>{content.local.subheadline}</p></div></div>
      </section>

      <section className="py-24 border-t border-white/10">
        <div className="max-w-[1100px] mx-auto px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, idx) => { const Icon = service.icon; return <div key={idx} className="bg-white/5 backdrop-blur border border-white/10 p-12 hover:border-[#2FA4A9]/40 hover:bg-white/10 transition-all group text-center" style={{ borderRadius: '4px' }}><Icon className="w-12 h-12 text-[#2FA4A9] mx-auto mb-6 group-hover:scale-110 transition-transform" strokeWidth={2} /><p className="text-white font-semibold text-lg" style={{ fontFamily: "'Inter', sans-serif" }}>{service.title}</p></div>; })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0D0D24] border-t border-white/10">
        <div className="max-w-[800px] mx-auto px-8 text-center">
          <h3 className="text-white mb-8" style={{ fontFamily: "'Outfit', sans-serif", fontSize: '42px', fontWeight: 700, lineHeight: '1.1', letterSpacing: '-1px' }}>{content.hero.headline1}<br /><span className="text-[#2FA4A9]">{content.hero.headline2}</span></h3>
          {!isSubmittedBottom ? (
            <form onSubmit={handleSubmitBottom} className="mb-4">
              <div className="flex gap-3 max-w-xl mx-auto">
                <input type="email" value={emailBottom} onChange={(e) => setEmailBottom(e.target.value)} placeholder={content.hero.emailPlaceholder} required disabled={isSubmittingBottom} className="flex-1 px-6 bg-white/5 backdrop-blur border border-white/20 text-white placeholder:text-white/30 focus:border-[#2FA4A9] focus:outline-none focus:ring-2 focus:ring-[#2FA4A9]/50 transition disabled:opacity-70" style={{ fontFamily: "'Inter', sans-serif", height: '64px', borderRadius: '4px', fontSize: '16px' }} />
                <button type="submit" disabled={isSubmittingBottom} className="bg-[#2FA4A9] text-white font-semibold hover:bg-[#27939A] transition-all flex items-center justify-center gap-3 px-10 group disabled:opacity-70" style={{ fontFamily: "'Inter', sans-serif", height: '64px', borderRadius: '4px', boxShadow: '0 4px 20px rgba(47,164,169,0.4)' }}>{content.hero.cta}<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} /></button>
              </div>
              {bottomError ? <p className="text-[#ffb4b4] text-sm mt-3" style={{ fontFamily: "'Inter', sans-serif" }}>{bottomError}</p> : null}
            </form>
          ) : <div className="bg-[#2FA4A9]/10 border border-[#2FA4A9] text-[#2FA4A9] px-6 py-5 inline-flex items-center gap-3 font-semibold" style={{ fontFamily: "'Inter', sans-serif", borderRadius: '4px' }}><CheckCircle2 className="w-6 h-6" strokeWidth={2.5} />{content.footer.submitted}</div>}
          <p className="text-white/40 text-sm mt-4" style={{ fontFamily: "'Inter', sans-serif" }}>{content.hero.noSpam}</p>
        </div>
      </section>

      <footer className="py-16 bg-[#0D0D24] border-t border-white/10"><div className="max-w-[1400px] mx-auto px-8"><div className="text-center"><div className="text-3xl font-extrabold text-white mb-6" style={{ fontFamily: "'Outfit', sans-serif" }}>GILDE</div><p className="text-white/50 text-base" style={{ fontFamily: "'Inter', sans-serif" }}>{content.footer.tagline}</p></div></div></footer>

      {modalRole && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
          <button type="button" aria-label={content.modal.close} onClick={closeSignupModal} className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div className="relative w-full max-w-[560px] border border-white/10 bg-[#151538] p-8" style={{ borderRadius: '6px', boxShadow: '0 24px 80px rgba(0,0,0,0.45)' }}>
            <div className="flex items-start justify-between gap-6 mb-8">
              <div>
                <h3 className="text-white mb-3" style={{ fontFamily: "'Outfit', sans-serif", fontSize: '38px', fontWeight: 700, lineHeight: '1' }}>{content.modal.title}</h3>
                <p className="text-white/60" style={{ fontFamily: "'Inter', sans-serif" }}>{content.modal.roleLabel}: <span className="text-[#2FA4A9] font-semibold">{selectedRoleLabel}</span></p>
              </div>
              <button type="button" onClick={closeSignupModal} className="text-white/50 hover:text-white transition" style={{ fontFamily: "'Inter', sans-serif" }}>{content.modal.close}</button>
            </div>
            {!isModalSubmitted ? (
              <form onSubmit={handleModalSubmit}>
                <input type="hidden" name="role" value={modalRole} />
                <label className="block text-white/70 mb-3" style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px' }}>{content.modal.emailLabel}</label>
                <input type="email" value={modalEmail} onChange={(e) => setModalEmail(e.target.value)} placeholder={content.modal.emailPlaceholder} required disabled={isSubmittingModal} className="w-full px-6 bg-white/5 border border-white/20 text-white placeholder:text-white/30 focus:border-[#2FA4A9] focus:outline-none focus:ring-2 focus:ring-[#2FA4A9]/50 transition mb-6 disabled:opacity-70" style={{ fontFamily: "'Inter', sans-serif", height: '60px', borderRadius: '4px', fontSize: '16px' }} />
                <button type="submit" disabled={isSubmittingModal} className="w-full bg-[#2FA4A9] text-white font-semibold hover:bg-[#27939A] transition-all disabled:opacity-70" style={{ fontFamily: "'Inter', sans-serif", height: '56px', borderRadius: '4px', boxShadow: '0 4px 20px rgba(47,164,169,0.35)' }}>{content.modal.submit}</button>
                {modalError ? <p className="text-[#ffb4b4] text-sm mt-4" style={{ fontFamily: "'Inter', sans-serif" }}>{modalError}</p> : null}
              </form>
            ) : <div className="bg-[#2FA4A9]/10 border border-[#2FA4A9] text-[#2FA4A9] px-6 py-5" style={{ fontFamily: "'Inter', sans-serif", borderRadius: '4px' }}>{content.modal.submitted}</div>}
          </div>
        </div>
      )}
    </div>
  );
}
