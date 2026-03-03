import Link from "next/link";
import { Shirt, CloudSun, Sparkles } from "lucide-react";

export default function HomePublic() {
  return (
    <main className="min-h-screen bg-brand-background text-brand-accent antialiased overflow-hidden">

      {/* HERO */}
      <section className="relative max-w-7xl mx-auto px-6 py-28 grid md:grid-cols-2 gap-16 items-center">
        
        {/* Glow Background */}
        <div className="absolute inset-0 flex justify-center pointer-events-none">
          <div className="w-162.5 h-162.5 bg-brand-primary/10 blur-[140px] rounded-full" />
        </div>

        {/* Texto */}
        <div className="relative">
          <h1 className="text-6xl md:text-7xl font-bold leading-[1.05] tracking-tight">
            Seu estilo.<br />
            <span className="text-brand-primary">
              Inteligência artificial.
            </span>
          </h1>

          <p className="mt-8 text-lg text-brand-accent/70 max-w-xl">
            Organize seus looks, receba sugestões baseadas no clima
            e descubra combinações perfeitas para qualquer ocasião.
          </p>

          <div className="mt-12 flex flex-wrap gap-4">
            <Link
              href="/login"
              className="px-8 py-3 bg-brand-primary text-white rounded-full 
              hover:scale-105 hover:bg-brand-accent hover:text-brand-background
              transition-all duration-300 shadow-xl shadow-brand-primary/30"
            >
              Começar agora
            </Link>

            <Link
              href="#como-funciona"
              className="px-8 py-3 border border-brand-surface rounded-full 
              hover:bg-brand-surface hover:scale-105
              transition-all duration-300"
            >
              Como funciona
            </Link>
          </div>
        </div>

        {/* Ilustração */}
        <div className="relative flex justify-center">
          <div className="absolute w-80 h-80 bg-brand-accent/10 blur-3xl rounded-full" />
          
          <img
            src="/hero-fashion.svg"
            alt="Ilustração StyloAI"
            className="relative w-full max-w-lg drop-shadow-2xl"
          />
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section
        id="como-funciona"
        className="bg-brand-surface py-28"
      >
        <div className="max-w-7xl mx-auto px-6">
          
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-20">
            Como funciona
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            
            <FeatureCard
              icon={<Shirt size={30} />}
              title="Organize seus looks"
              description="Cadastre combinações, categorize por clima e ocasião de forma simples e visual."
            />

            <FeatureCard
              icon={<CloudSun size={30} />}
              title="Clima em tempo real"
              description="Veja automaticamente a temperatura da sua cidade e adapte seu estilo."
            />

            <FeatureCard
              icon={<Sparkles size={30} />}
              title="Sugestões inteligentes"
              description="Descubra combinações perfeitas com recomendações baseadas em IA."
            />

          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-28 text-center relative">
        <div className="absolute inset-0 flex justify-center pointer-events-none">
          <div className="w-125 h-125 bg-brand-primary/10 blur-[120px] rounded-full" />
        </div>

        <div className="relative">
          <h3 className="text-4xl md:text-5xl font-bold">
            Pronto para elevar seu estilo?
          </h3>

          <p className="mt-6 text-brand-accent/70 text-lg">
            Crie sua conta gratuitamente e comece agora.
          </p>

          <Link
            href="/register"
            className="mt-10 inline-block px-10 py-4 bg-brand-primary text-white 
            rounded-full hover:scale-105 hover:bg-brand-accent 
            hover:text-brand-background transition-all duration-300 
            shadow-xl shadow-brand-primary/40"
          >
            Criar conta
          </Link>
        </div>
      </section>

    </main>
  );
}


function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group bg-brand-background p-10 rounded-3xl 
    border border-brand-primary/20 
    hover:border-brand-primary 
    hover:-translate-y-3 
    transition-all duration-300 
    shadow-lg shadow-black/20">

      <div className="mb-6 text-brand-primary group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>

      <h3 className="text-xl font-semibold text-brand-primary">
        {title}
      </h3>

      <p className="mt-4 text-brand-accent/70 leading-relaxed">
        {description}
      </p>
    </div>
  );
}