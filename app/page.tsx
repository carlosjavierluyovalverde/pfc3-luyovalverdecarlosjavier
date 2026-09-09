'use client'

import { useMemo, useState } from 'react'
import {
  ArrowRight,
  ChevronDown,
  Clock3,
  Heart,
  MapPin,
  Menu,
  Pill,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  X,
} from 'lucide-react'

type Pharmacy = {
  name: string
  distance: string
  price: string
  stock: string
  rating: string
  hours: string
  color: string
}

const pharmacies: Pharmacy[] = [
  { name: 'Farmacia San Pablo', distance: '0.8 km', price: '$128.00', stock: 'Disponible', rating: '4.8', hours: 'Abierto hasta las 22:00', color: 'bg-primary' },
  { name: 'Farmacias del Ahorro', distance: '1.2 km', price: '$135.50', stock: 'Disponible', rating: '4.6', hours: 'Abierto hasta las 21:00', color: 'bg-accent' },
  { name: 'Farmacia Guadalajara', distance: '1.7 km', price: '$142.00', stock: 'Pocas piezas', rating: '4.5', hours: 'Abierto hasta las 23:00', color: 'bg-secondary' },
]

export default function Page() {
  const [query, setQuery] = useState('')
  const [submittedQuery, setSubmittedQuery] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [showAll, setShowAll] = useState(false)
  const [loading, setLoading] = useState(false)

  const visiblePharmacies = useMemo(() => (showAll ? pharmacies : pharmacies.slice(0, 2)), [showAll])
  const search = (value = query) => {
    if (!value.trim()) return
    setLoading(true)
    setSubmittedQuery(value.trim())
    window.setTimeout(() => setLoading(false), 650)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="#inicio" className="flex items-center gap-2" aria-label="MediAhorro inicio">
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground"><Pill className="size-5" /></span>
            <span className="text-xl font-bold tracking-tight">Medi<span className="text-primary">Ahorro</span></span>
          </a>
          <nav className="hidden items-center gap-7 text-sm font-medium text-muted-foreground md:flex" aria-label="Navegación principal">
            <a href="#como-funciona" className="transition-colors hover:text-primary">Cómo funciona</a>
            <a href="#beneficios" className="transition-colors hover:text-primary">Beneficios</a>
            <a href="#preguntas" className="transition-colors hover:text-primary">Preguntas frecuentes</a>
          </nav>
          <button type="button" aria-label="Abrir menú" onClick={() => setMenuOpen(!menuOpen)} className="rounded-lg p-2 text-muted-foreground hover:bg-muted md:hidden">
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
        {menuOpen && <nav className="flex flex-col gap-4 border-t border-border px-5 py-4 text-sm font-medium md:hidden"><a href="#como-funciona">Cómo funciona</a><a href="#beneficios">Beneficios</a><a href="#preguntas">Preguntas frecuentes</a></nav>}
      </header>

      <main id="inicio">
        <section className="bg-muted/35 px-5 pb-14 pt-16 lg:px-8 lg:pb-20 lg:pt-24">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-card px-3 py-1.5 text-xs font-semibold text-primary"><Sparkles className="size-3.5" /> Ahorra en tus medicamentos</div>
            <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">Encuentra tu medicamento al <span className="text-primary">mejor precio</span></h1>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">Comparamos precios en farmacias cercanas para que cuides tu salud sin gastar de más.</p>
            <div className="mx-auto mt-9 flex max-w-2xl flex-col gap-3 sm:flex-row">
              <label className="flex min-h-14 flex-1 items-center gap-3 rounded-xl border border-border bg-card px-4 shadow-sm focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15"><Search className="size-5 shrink-0 text-muted-foreground" /><span className="sr-only">Buscar medicamento</span><input value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !e.nativeEvent.isComposing && e.keyCode !== 229) search() }} placeholder="¿Qué medicamento buscas?" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" /></label>
              <button type="button" onClick={() => search()} className="min-h-14 rounded-xl bg-primary px-7 font-semibold text-primary-foreground transition hover:bg-primary/90">Buscar medicamento</button>
            </div>
            <div className="mt-5 flex flex-wrap justify-center gap-2 text-xs text-muted-foreground"><span>Busquedas populares:</span>{['Paracetamol', 'Ibuprofeno', 'Omeprazol'].map((item) => <button type="button" key={item} onClick={() => { setQuery(item); search(item) }} className="rounded-full bg-card px-3 py-1.5 font-medium text-foreground shadow-sm transition hover:text-primary">{item}</button>)}</div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-12 lg:px-8 lg:py-16">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end"><div><p className="text-sm font-semibold text-primary">Resultados cerca de ti</p><h2 className="mt-1 text-2xl font-bold tracking-tight">{submittedQuery ? `Precios para “${submittedQuery}”` : 'Medicamentos destacados'}</h2></div><div className="flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="size-4 text-primary" /> Ciudad de México <ChevronDown className="size-4" /></div></div>
          {loading ? <div className="mt-7 grid gap-4 md:grid-cols-2"><div className="h-48 animate-pulse rounded-2xl bg-muted" /><div className="h-48 animate-pulse rounded-2xl bg-muted" /></div> : <div className="mt-7 grid gap-4 md:grid-cols-2">{visiblePharmacies.map((pharmacy) => <article key={pharmacy.name} className="rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"><div className="flex items-start justify-between gap-4"><div className="flex gap-3"><div className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${pharmacy.color} text-primary-foreground`}><ShoppingBag className="size-5" /></div><div><h3 className="font-bold">{pharmacy.name}</h3><p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground"><MapPin className="size-3.5" />{pharmacy.distance}</p></div></div><button type="button" aria-label={`Guardar ${pharmacy.name}`} className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-primary"><Heart className="size-5" /></button></div><div className="mt-5 flex items-end justify-between gap-3"><div><p className="text-xs text-muted-foreground">Precio desde</p><p className="mt-1 text-2xl font-bold text-primary">{pharmacy.price}</p></div><span className="rounded-full bg-accent/15 px-2.5 py-1 text-xs font-semibold text-accent-foreground">{pharmacy.stock}</span></div><div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border pt-4 text-xs text-muted-foreground"><span className="flex items-center gap-1"><Star className="size-3.5 fill-current text-primary" /> {pharmacy.rating}</span><span className="flex items-center gap-1"><Clock3 className="size-3.5" /> {pharmacy.hours}</span></div></article>)}</div>}
          <button type="button" onClick={() => setShowAll(!showAll)} className="mx-auto mt-7 flex items-center gap-2 rounded-xl border border-border px-5 py-2.5 text-sm font-semibold transition hover:border-primary hover:text-primary">{showAll ? 'Ver menos' : 'Ver más resultados'} <ArrowRight className="size-4" /></button>
        </section>

        <section id="como-funciona" className="border-y border-border bg-muted/30 px-5 py-14 lg:px-8"><div className="mx-auto max-w-6xl"><div className="text-center"><p className="text-sm font-semibold text-primary">Simple y transparente</p><h2 className="mt-1 text-2xl font-bold">Ahorra en tres pasos</h2></div><div className="mt-9 grid gap-7 md:grid-cols-3">{[['01', Search, 'Busca tu medicamento', 'Escribe el nombre del medicamento que necesitas.'], ['02', MapPin, 'Comparamos por ti', 'Revisamos precios y disponibilidad cerca de tu ubicación.'], ['03', ShieldCheck, 'Elige y ahorra', 'Selecciona la mejor opción y compra con confianza.']].map(([number, Icon, title, text]) => <div key={title as string} className="flex flex-col items-center text-center"><div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-card text-primary shadow-sm"><Icon className="size-5" /></div><span className="text-xs font-bold text-primary">{number}</span><h3 className="mt-2 font-bold">{title as string}</h3><p className="mt-2 max-w-xs text-sm leading-6 text-muted-foreground">{text as string}</p></div>)}</div></div></section>

        <section id="beneficios" className="mx-auto max-w-6xl px-5 py-14 lg:px-8"><div className="grid gap-5 md:grid-cols-3"><div className="rounded-2xl bg-primary p-6 text-primary-foreground md:col-span-2"><ShieldCheck className="size-7" /><h2 className="mt-5 text-2xl font-bold">Información en la que puedes confiar</h2><p className="mt-2 max-w-lg text-sm leading-6 text-primary-foreground/75">Datos claros, precios actualizados y farmacias verificadas para que tomes mejores decisiones de salud.</p></div><div className="rounded-2xl border border-border bg-card p-6"><Star className="size-7 text-primary" /><h3 className="mt-5 font-bold">Decisiones inteligentes</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Compara antes de comprar y aprovecha tu presupuesto.</p></div></div></section>
      </main>

      <footer className="border-t border-border bg-card px-5 py-9 lg:px-8"><div className="mx-auto flex max-w-6xl flex-col gap-7 sm:flex-row sm:items-center sm:justify-between"><div><div className="flex items-center gap-2 font-bold"><span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground"><Pill className="size-4" /></span>Medi<span className="text-primary">Ahorro</span></div><p className="mt-2 text-sm text-muted-foreground">Tu salud, tu ahorro, tu decisión.</p></div><div className="flex items-center gap-3 text-sm text-muted-foreground"><a href="#inicio" className="rounded-full px-3 py-2 hover:bg-muted hover:text-primary">Ayuda</a><a href="#preguntas" className="rounded-full px-3 py-2 hover:bg-muted hover:text-primary">Contacto</a></div></div></footer>
    </div>
  )
}
