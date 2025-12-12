'use client';

import * as React from 'react';
import { MainLayout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Input, Textarea } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import {
  Sparkles,
  Mail,
  FileText,
  Calculator,
  BarChart3,
  Copy,
  RefreshCw,
  Wand2,
  ArrowRight,
} from 'lucide-react';

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
}

const tools: Tool[] = [
  {
    id: 'email-subject',
    name: 'Gerador de Assunto',
    description: 'Crie assuntos de email que aumentam taxa de abertura',
    icon: Mail,
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'copy-generator',
    name: 'Gerador de Copy',
    description: 'Crie textos persuasivos para ads e emails',
    icon: Sparkles,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'report-generator',
    name: 'Gerador de Relatório',
    description: 'Gere relatórios automáticos com métricas',
    icon: FileText,
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'roas-calculator',
    name: 'Calculadora ROAS',
    description: 'Calcule retorno sobre investimento em ads',
    icon: Calculator,
    color: 'from-orange-500 to-yellow-500',
  },
  {
    id: 'benchmark',
    name: 'Benchmark',
    description: 'Compare performance com média da carteira',
    icon: BarChart3,
    color: 'from-indigo-500 to-violet-500',
  },
];

export default function HubPage() {
  const [activeTool, setActiveTool] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  
  // Email Subject Generator State
  const [emailContext, setEmailContext] = React.useState('');
  const [generatedSubjects, setGeneratedSubjects] = React.useState<string[]>([]);
  
  // ROAS Calculator State
  const [adSpend, setAdSpend] = React.useState('');
  const [revenue, setRevenue] = React.useState('');
  const [roasResult, setRoasResult] = React.useState<number | null>(null);

  const generateEmailSubjects = () => {
    setLoading(true);
    // Simulação de IA
    setTimeout(() => {
      setGeneratedSubjects([
        `🔥 ${emailContext} - Última chance!`,
        `Você não vai querer perder isso: ${emailContext}`,
        `[EXCLUSIVO] ${emailContext} só para você`,
        `⚡ ${emailContext} - Oferta relâmpago`,
        `${emailContext}? Temos a solução perfeita`,
      ]);
      setLoading(false);
    }, 1500);
  };

  const calculateROAS = () => {
    const spend = parseFloat(adSpend);
    const rev = parseFloat(revenue);
    if (spend > 0 && rev > 0) {
      setRoasResult(rev / spend);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const renderToolContent = () => {
    switch (activeTool) {
      case 'email-subject':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Sobre o que é o email?
              </label>
              <Input
                placeholder="Ex: Promoção de Natal, Lançamento de produto, Black Friday..."
                value={emailContext}
                onChange={(e) => setEmailContext(e.target.value)}
              />
            </div>
            <Button
              onClick={generateEmailSubjects}
              isLoading={loading}
              leftIcon={<Wand2 className="w-4 h-4" />}
            >
              Gerar Assuntos
            </Button>
            
            {generatedSubjects.length > 0 && (
              <div className="space-y-2 mt-4">
                <p className="text-sm font-medium text-text-secondary">Sugestões:</p>
                {generatedSubjects.map((subject, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-background-secondary rounded-lg group"
                  >
                    <span className="text-sm text-text-primary">{subject}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(subject)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      
      case 'roas-calculator':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Investimento em Ads (R$)"
                type="number"
                placeholder="0,00"
                value={adSpend}
                onChange={(e) => setAdSpend(e.target.value)}
              />
              <Input
                label="Faturamento Gerado (R$)"
                type="number"
                placeholder="0,00"
                value={revenue}
                onChange={(e) => setRevenue(e.target.value)}
              />
            </div>
            <Button onClick={calculateROAS} leftIcon={<Calculator className="w-4 h-4" />}>
              Calcular ROAS
            </Button>
            
            {roasResult !== null && (
              <div className="p-6 bg-gradient-to-br from-brand-purple/20 to-brand-cyan/20 rounded-xl text-center">
                <p className="text-sm text-text-secondary mb-2">Seu ROAS é</p>
                <p className="text-4xl font-bold gradient-text">
                  {roasResult.toFixed(2)}x
                </p>
                <p className="text-sm text-text-muted mt-2">
                  Para cada R$ 1 investido, você obteve R$ {roasResult.toFixed(2)} em retorno
                </p>
                
                <div className="mt-4 p-3 bg-background-secondary rounded-lg">
                  <p className="text-sm text-text-secondary">
                    {roasResult >= 4 && '🎉 Excelente! ROAS acima de 4x é considerado muito bom.'}
                    {roasResult >= 2 && roasResult < 4 && '👍 Bom! ROAS acima de 2x indica campanha saudável.'}
                    {roasResult >= 1 && roasResult < 2 && '⚠️ Atenção! ROAS entre 1x e 2x precisa de otimização.'}
                    {roasResult < 1 && '❌ Crítico! ROAS abaixo de 1x significa prejuízo.'}
                  </p>
                </div>
              </div>
            )}
          </div>
        );
      
      case 'copy-generator':
        return (
          <div className="space-y-4">
            <Textarea
              label="Descreva o produto/serviço"
              placeholder="Ex: Curso online de marketing digital para iniciantes que querem começar a vender na internet..."
              rows={4}
            />
            <div className="grid grid-cols-3 gap-2">
              <Button variant="secondary" size="sm">📱 Para Feed</Button>
              <Button variant="secondary" size="sm">📧 Para Email</Button>
              <Button variant="secondary" size="sm">📢 Para Stories</Button>
            </div>
            <Button leftIcon={<Wand2 className="w-4 h-4" />}>
              Gerar Copy
            </Button>
          </div>
        );
      
      case 'report-generator':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Selecione o Cliente
              </label>
              <select className="w-full h-10 px-3 bg-background-secondary border border-border rounded-lg text-text-primary">
                <option>Selecione um cliente...</option>
                <option>Tech Store Brasil</option>
                <option>Fashion Hub</option>
                <option>Suplementos Pro</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Período
              </label>
              <select className="w-full h-10 px-3 bg-background-secondary border border-border rounded-lg text-text-primary">
                <option>Último mês</option>
                <option>Últimos 3 meses</option>
                <option>Último ano</option>
                <option>Personalizado</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="include-meta" className="rounded" defaultChecked />
              <label htmlFor="include-meta" className="text-sm text-text-secondary">Meta Ads</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="include-shopify" className="rounded" defaultChecked />
              <label htmlFor="include-shopify" className="text-sm text-text-secondary">Shopify</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="include-klaviyo" className="rounded" defaultChecked />
              <label htmlFor="include-klaviyo" className="text-sm text-text-secondary">Klaviyo</label>
            </div>
            <Button leftIcon={<FileText className="w-4 h-4" />}>
              Gerar Relatório PDF
            </Button>
          </div>
        );
      
      case 'benchmark':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Selecione o Cliente para Comparar
              </label>
              <select className="w-full h-10 px-3 bg-background-secondary border border-border rounded-lg text-text-primary">
                <option>Selecione um cliente...</option>
                <option>Tech Store Brasil</option>
                <option>Fashion Hub</option>
                <option>Suplementos Pro</option>
              </select>
            </div>
            <Button leftIcon={<BarChart3 className="w-4 h-4" />}>
              Gerar Comparativo
            </Button>
            
            <div className="mt-4 p-4 bg-background-secondary rounded-lg">
              <p className="text-sm text-text-muted text-center">
                Selecione um cliente para ver o comparativo com a média da carteira
              </p>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Hub de Ferramentas</h1>
          <p className="text-text-secondary mt-1">
            Ferramentas para aumentar sua produtividade
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tools List */}
          <div className="lg:col-span-1 space-y-3">
            {tools.map((tool) => {
              const Icon = tool.icon;
              const isActive = activeTool === tool.id;
              
              return (
                <div
                  key={tool.id}
                  onClick={() => setActiveTool(tool.id)}
                  className={cn(
                    'p-4 rounded-xl cursor-pointer transition-all border',
                    isActive
                      ? 'bg-gradient-to-r from-brand-purple/20 to-brand-cyan/20 border-brand-purple/50'
                      : 'bg-surface border-border hover:border-border-light'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      'w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br',
                      tool.color
                    )}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-text-primary">{tool.name}</h3>
                      <p className="text-xs text-text-muted">{tool.description}</p>
                    </div>
                    <ArrowRight className={cn(
                      'w-4 h-4 transition-transform',
                      isActive ? 'text-brand-purple rotate-90' : 'text-text-muted'
                    )} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Tool Content */}
          <div className="lg:col-span-2">
            {activeTool ? (
              <Card className="p-6">
                <CardHeader className="px-0 pt-0">
                  <CardTitle>
                    {tools.find((t) => t.id === activeTool)?.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-0 pb-0">
                  {renderToolContent()}
                </CardContent>
              </Card>
            ) : (
              <div className="h-full flex items-center justify-center bg-surface border border-border rounded-xl p-12">
                <div className="text-center">
                  <Sparkles className="w-12 h-12 text-text-muted mx-auto mb-4" />
                  <p className="text-text-secondary">
                    Selecione uma ferramenta para começar
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
