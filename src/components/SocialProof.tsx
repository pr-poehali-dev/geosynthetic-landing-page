import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const SocialProof = () => {
  const reviews = [
    {
      name: "Александр М.",
      company: "СтройТехИнвест",
      text: "Отличное качество геотекстиля, быстрая доставка. Заказываем уже третий раз!",
      rating: 5,
    },
    {
      name: "Елена С.",
      company: "ЛандшафтПроект",
      text: "Профессиональная консультация помогла выбрать оптимальный материал для нашего проекта.",
      rating: 5,
    },
    {
      name: "Дмитрий К.",
      company: "ДорСтрой",
      text: "Конкурентные цены и всегда в наличии. Рекомендуем как надежного поставщика.",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Отзывы клиентов
        </h2>
        <p className="text-center text-muted-foreground mb-12 text-lg">
          Более 500 компаний доверяют нам поставки геосинтетики
        </p>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {reviews.map((review, index) => (
            <Card key={index} className="border-2 hover:shadow-lg transition-all">
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Icon key={i} name="Star" size={20} className="text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">"{review.text}"</p>
                <div className="border-t pt-4">
                  <p className="font-semibold">{review.name}</p>
                  <p className="text-sm text-muted-foreground">{review.company}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-accent/10 px-6 py-3 rounded-full">
            <Icon name="TrendingUp" size={24} className="text-accent" />
            <span className="font-semibold">
              Присоединяйтесь к 500+ довольным клиентам
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
