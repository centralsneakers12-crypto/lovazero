import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { MessageCircle, Wrench } from "lucide-react";
import Particles from "@/components/Particles";
import logoImage from "@/assets/lovazero-logo.png";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background">
      <Particles />
      
      <div className="relative z-10 flex flex-col items-center gap-6 px-4 text-center">
        <img 
          src={logoImage} 
          alt="LovableX Logo" 
          className="h-[120px] w-auto object-contain"
        />

        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-card">
          <Wrench className="h-8 w-8 text-primary" />
        </div>

        <div>
          <h1 className="font-heading text-4xl font-bold text-foreground md:text-5xl">
            Página <span className="text-gradient-purple">não encontrada</span>
          </h1>
          <p className="mx-auto mt-4 max-w-md text-muted-foreground">
            A página que você procura não existe. <strong className="text-foreground">Nosso método está 100% funcional</strong>! 
            Vem fazer um teste agora — clique no WhatsApp abaixo.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://wa.me/5511999999991"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-6 py-3 font-semibold text-white transition-transform hover:scale-105"
          >
            <MessageCircle className="h-5 w-5" />
            WhatsApp 1
          </a>
          <a
            href="https://wa.me/5511999999992"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-6 py-3 font-semibold text-white transition-transform hover:scale-105"
          >
            <MessageCircle className="h-5 w-5" />
            WhatsApp 2
          </a>
        </div>

        <p className="mt-8 text-sm text-muted-foreground">
          © 2026 LovableX — Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
