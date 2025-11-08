import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(https://cdn.poehali.dev/projects/bafd65ba-226c-4c1a-bb60-cb4c832d8f51/files/3e6b5e2d-7288-4a49-b42a-c8c3147be8a9.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-primary/80"></div>
      </div>
      
      <div className="container mx-auto px-4 z-10 relative">
        <div className="max-w-3xl animate-fade-in">
          <Badge className="mb-4 text-base px-4 py-2 bg-accent/20 text-accent-foreground border-accent">
            ⚡ Скидка 10% новым клиентам
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6">
            Поставки геосинтетики по всей России
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-4">
            Качественные материалы, конкурентные цены и быстрая отгрузка в любую точку РФ
          </p>
          <div className="flex items-center gap-6 text-primary-foreground/80 mb-8 text-lg">
            <div>✓ 500+ довольных клиентов</div>
            <div>✓ Доставка за 24 часа</div>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-lg px-8" asChild>
              <a href="tel:+79991416580">Получить консультацию</a>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 bg-white/10 hover:bg-white/20 text-white border-white" asChild>
              <a href="#prices">Узнать цены</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;