import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Icon from "@/components/ui/icon";

const PriceCalculator = () => {
  const [materialType, setMaterialType] = useState("");
  const [density, setDensity] = useState("");
  const [quantity, setQuantity] = useState("");
  const [region, setRegion] = useState("");
  const { toast } = useToast();

  const materials = {
    geotextile: {
      name: "Геотекстиль",
      densities: {
        "100": { price: 28, unit: "м²" },
        "150": { price: 35, unit: "м²" },
        "200": { price: 42, unit: "м²" },
        "250": { price: 52, unit: "м²" },
        "300": { price: 62, unit: "м²" },
        "350": { price: 72, unit: "м²" },
      }
    },
    geomembrane: {
      name: "Геомембрана",
      densities: {
        "1.0": { price: 180, unit: "м²" },
        "1.5": { price: 240, unit: "м²" },
        "2.0": { price: 320, unit: "м²" },
      }
    },
    geogrid: {
      name: "Георешётка",
      densities: {
        "20x20": { price: 85, unit: "м²" },
        "30x30": { price: 95, unit: "м²" },
        "40x40": { price: 110, unit: "м²" },
      }
    },
    geodrain: {
      name: "Геодренаж",
      densities: {
        "standard": { price: 145, unit: "м²" },
        "reinforced": { price: 195, unit: "м²" },
      }
    }
  };

  const regions = {
    moscow: { name: "Москва и область", delivery: 2000, days: "1-2 дня" },
    spb: { name: "Санкт-Петербург и ЛО", delivery: 3500, days: "2-3 дня" },
    volga: { name: "Поволжье", delivery: 4500, days: "3-4 дня" },
    ural: { name: "Урал", delivery: 6000, days: "4-5 дней" },
    siberia: { name: "Сибирь", delivery: 8000, days: "5-7 дней" },
    south: { name: "Юг России", delivery: 5000, days: "3-5 дней" },
    northwest: { name: "Северо-Запад", delivery: 4000, days: "3-4 дня" },
    fareast: { name: "Дальний Восток", delivery: 12000, days: "7-10 дней" },
  };

  const calculateTotal = () => {
    if (!materialType || !density || !quantity || !region) {
      return null;
    }

    const material = materials[materialType as keyof typeof materials];
    const densityData = material.densities[density as keyof typeof material.densities];
    const regionData = regions[region as keyof typeof regions];
    
    const materialCost = densityData.price * parseFloat(quantity);
    const deliveryCost = regionData.delivery;
    const discount = materialCost >= 50000 ? materialCost * 0.1 : 0;
    const total = materialCost + deliveryCost - discount;

    return {
      materialCost,
      deliveryCost,
      discount,
      total,
      unit: densityData.unit,
      deliveryDays: regionData.days,
    };
  };

  const result = calculateTotal();

  const handleSendCalculation = () => {
    if (!result) {
      toast({
        title: "Заполните все поля",
        description: "Пожалуйста, выберите материал, плотность, количество и регион",
        variant: "destructive",
      });
      return;
    }

    const material = materials[materialType as keyof typeof materials];
    const message = `Расчет заказа:%0A${material.name} ${density}%0AКоличество: ${quantity} ${result.unit}%0AРегион: ${regions[region as keyof typeof regions].name}%0AИтого: ${result.total.toFixed(0)} ₽`;
    
    window.open(`https://wa.me/79991416580?text=${message}`, "_blank");
  };

  return (
    <section id="calculator" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Калькулятор стоимости
          </h2>
          <p className="text-muted-foreground text-lg">
            Рассчитайте примерную стоимость вашего заказа
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Calculator" size={24} className="text-accent" />
                Параметры заказа
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Тип материала</Label>
                  <Select value={materialType} onValueChange={setMaterialType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите материал" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="geotextile">Геотекстиль</SelectItem>
                      <SelectItem value="geomembrane">Геомембрана</SelectItem>
                      <SelectItem value="geogrid">Георешётка</SelectItem>
                      <SelectItem value="geodrain">Геодренаж</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Плотность / Тип</Label>
                  <Select 
                    value={density} 
                    onValueChange={setDensity}
                    disabled={!materialType}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите характеристику" />
                    </SelectTrigger>
                    <SelectContent>
                      {materialType && Object.keys(materials[materialType as keyof typeof materials].densities).map((key) => (
                        <SelectItem key={key} value={key}>
                          {materialType === "geotextile" ? `${key} г/м²` : 
                           materialType === "geomembrane" ? `${key} мм` :
                           materialType === "geogrid" ? `${key} см` : key}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Количество (м²)</Label>
                  <Input
                    type="number"
                    placeholder="Введите количество"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    min="1"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Регион доставки</Label>
                  <Select value={region} onValueChange={setRegion}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите регион" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(regions).map(([key, value]) => (
                        <SelectItem key={key} value={key}>
                          {value.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {result && (
                <Card className="bg-accent/5 border-accent">
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      <div className="flex justify-between text-lg">
                        <span>Стоимость материала:</span>
                        <span className="font-semibold">{result.materialCost.toFixed(0)} ₽</span>
                      </div>
                      <div className="flex justify-between text-lg">
                        <span>Доставка ({result.deliveryDays}):</span>
                        <span className="font-semibold">{result.deliveryCost.toFixed(0)} ₽</span>
                      </div>
                      {result.discount > 0 && (
                        <div className="flex justify-between text-lg text-green-600">
                          <span>Скидка 10% (заказ от 50 000 ₽):</span>
                          <span className="font-semibold">-{result.discount.toFixed(0)} ₽</span>
                        </div>
                      )}
                      <div className="border-t pt-3 flex justify-between text-2xl font-bold">
                        <span>Итого:</span>
                        <span className="text-accent">{result.total.toFixed(0)} ₽</span>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-background rounded-lg">
                      <div className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Icon name="Info" size={18} className="flex-shrink-0 mt-0.5" />
                        <p>
                          Это предварительный расчет. Точная стоимость зависит от дополнительных параметров.
                          Скидка 10% применяется автоматически при заказе от 50 000 ₽.
                        </p>
                      </div>
                    </div>

                    <Button 
                      size="lg" 
                      className="w-full mt-6 text-lg"
                      onClick={handleSendCalculation}
                    >
                      <Icon name="MessageCircle" size={20} className="mr-2" />
                      Отправить расчет в WhatsApp
                    </Button>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-4 mt-8">
            <Card className="border-2">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Icon name="Truck" size={24} className="text-accent flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Бесплатная доставка</h3>
                    <p className="text-sm text-muted-foreground">
                      При заказе от 100 000 ₽ доставка по России бесплатно
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Icon name="Gift" size={24} className="text-accent flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Скидки постоянным клиентам</h3>
                    <p className="text-sm text-muted-foreground">
                      Специальные условия для регулярных заказов
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PriceCalculator;
