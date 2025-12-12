'use client';

import * as React from 'react';
import { MainLayout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { cn, formatCurrency } from '@/lib/utils';
import {
  Plus,
  MoreHorizontal,
  GripVertical,
  Calendar,
  Building2,
  Filter,
} from 'lucide-react';

interface Deal {
  id: string;
  title: string;
  company_name: string;
  contact_name: string;
  value: number;
  probability: number;
  expected_close_date?: string;
  tags: string[];
}

interface Stage {
  id: string;
  name: string;
  color: string;
  deals: Deal[];
}

const initialStages: Stage[] = [
  {
    id: '1',
    name: 'Leads',
    color: '#71717A',
    deals: [
      {
        id: 'd1',
        title: 'Loja de Eletrônicos SP',
        company_name: 'TechMart Brasil',
        contact_name: 'Roberto Alves',
        value: 4500,
        probability: 20,
        tags: ['inbound', 'shopify'],
      },
      {
        id: 'd2',
        title: 'E-commerce de Moda',
        company_name: 'Fashion Store',
        contact_name: 'Carla Lima',
        value: 3000,
        probability: 15,
        tags: ['indicação'],
      },
    ],
  },
  {
    id: '2',
    name: 'Qualificados',
    color: '#3B82F6',
    deals: [
      {
        id: 'd3',
        title: 'Suplementos Online',
        company_name: 'VitaFit',
        contact_name: 'Pedro Santos',
        value: 5500,
        probability: 40,
        expected_close_date: '2024-02-15',
        tags: ['suplementos', 'premium'],
      },
    ],
  },
  {
    id: '3',
    name: 'Reunião Agendada',
    color: '#8B5CF6',
    deals: [
      {
        id: 'd4',
        title: 'Pet Shop Premium',
        company_name: 'PetLove Store',
        contact_name: 'Ana Costa',
        value: 4000,
        probability: 60,
        expected_close_date: '2024-02-10',
        tags: ['pet', 'ecommerce'],
      },
      {
        id: 'd5',
        title: 'Decoração Casa',
        company_name: 'HomeStyle',
        contact_name: 'Lucas Mendes',
        value: 6000,
        probability: 55,
        tags: ['decoração'],
      },
    ],
  },
  {
    id: '4',
    name: 'Proposta Enviada',
    color: '#F59E0B',
    deals: [
      {
        id: 'd6',
        title: 'Loja de Games',
        company_name: 'GameZone',
        contact_name: 'Thiago Ramos',
        value: 7500,
        probability: 75,
        expected_close_date: '2024-02-05',
        tags: ['games', 'enterprise'],
      },
    ],
  },
  {
    id: '5',
    name: 'Negociação',
    color: '#06B6D4',
    deals: [
      {
        id: 'd7',
        title: 'Farmácia Online',
        company_name: 'FarmaExpress',
        contact_name: 'Juliana Ferreira',
        value: 8000,
        probability: 85,
        expected_close_date: '2024-01-25',
        tags: ['farmácia', 'premium'],
      },
    ],
  },
  {
    id: '6',
    name: 'Fechado',
    color: '#22C55E',
    deals: [
      {
        id: 'd8',
        title: 'Joalheria Luxo',
        company_name: 'Diamond Store',
        contact_name: 'Patricia Oliveira',
        value: 10000,
        probability: 100,
        tags: ['joalheria', 'enterprise'],
      },
    ],
  },
];

export default function PipelinePage() {
  const [stages, setStages] = React.useState(initialStages);
  const [draggedDeal, setDraggedDeal] = React.useState<{ deal: Deal; stageId: string } | null>(null);

  const handleDragStart = (deal: Deal, stageId: string) => {
    setDraggedDeal({ deal, stageId });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (targetStageId: string) => {
    if (!draggedDeal || draggedDeal.stageId === targetStageId) {
      setDraggedDeal(null);
      return;
    }

    setStages((prevStages) =>
      prevStages.map((stage) => {
        if (stage.id === draggedDeal.stageId) {
          return {
            ...stage,
            deals: stage.deals.filter((d) => d.id !== draggedDeal.deal.id),
          };
        }
        if (stage.id === targetStageId) {
          return {
            ...stage,
            deals: [...stage.deals, draggedDeal.deal],
          };
        }
        return stage;
      })
    );

    setDraggedDeal(null);
  };

  const totalValue = stages.reduce(
    (acc, stage) => acc + stage.deals.reduce((sum, deal) => sum + deal.value, 0),
    0
  );

  const totalDeals = stages.reduce((acc, stage) => acc + stage.deals.length, 0);

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Pipeline de Vendas</h1>
            <p className="text-text-secondary mt-1">
              {totalDeals} deals • {formatCurrency(totalValue)} em potencial
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary" leftIcon={<Filter className="w-4 h-4" />}>
              Filtros
            </Button>
            <Button leftIcon={<Plus className="w-4 h-4" />}>Novo Deal</Button>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="flex gap-4 overflow-x-auto pb-4">
          {stages.map((stage) => {
            const stageValue = stage.deals.reduce((sum, deal) => sum + deal.value, 0);

            return (
              <div
                key={stage.id}
                className="flex-shrink-0 w-[320px]"
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(stage.id)}
              >
                {/* Stage Header */}
                <div className="flex items-center justify-between mb-3 px-1">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: stage.color }}
                    />
                    <h3 className="font-semibold text-text-primary">{stage.name}</h3>
                    <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-surface text-text-muted">
                      {stage.deals.length}
                    </span>
                  </div>
                  <button className="p-1 rounded hover:bg-surface transition-colors">
                    <MoreHorizontal className="w-4 h-4 text-text-muted" />
                  </button>
                </div>

                {/* Stage Value */}
                <div className="mb-3 px-1">
                  <p className="text-sm text-text-muted">
                    {formatCurrency(stageValue)}
                  </p>
                </div>

                {/* Deals */}
                <div className="space-y-3 min-h-[200px]">
                  {stage.deals.map((deal) => (
                    <div
                      key={deal.id}
                      draggable
                      onDragStart={() => handleDragStart(deal, stage.id)}
                      className={cn(
                        'bg-surface border border-border rounded-xl p-4 cursor-grab active:cursor-grabbing transition-all hover:border-border-light',
                        draggedDeal?.deal.id === deal.id && 'opacity-50'
                      )}
                    >
                      {/* Deal Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-medium text-text-primary text-sm">
                            {deal.title}
                          </h4>
                          <p className="text-xs text-text-muted flex items-center gap-1 mt-1">
                            <Building2 className="w-3 h-3" />
                            {deal.company_name}
                          </p>
                        </div>
                        <GripVertical className="w-4 h-4 text-text-muted flex-shrink-0" />
                      </div>

                      {/* Contact */}
                      <div className="flex items-center gap-2 mb-3">
                        <Avatar name={deal.contact_name} size="sm" />
                        <span className="text-sm text-text-secondary">
                          {deal.contact_name}
                        </span>
                      </div>

                      {/* Value and Probability */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-semibold text-brand-purple">
                          {formatCurrency(deal.value)}
                        </span>
                        <div className="flex items-center gap-1">
                          <div className="w-16 h-1.5 bg-surface-hover rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-brand-purple to-brand-cyan rounded-full"
                              style={{ width: `${deal.probability}%` }}
                            />
                          </div>
                          <span className="text-xs text-text-muted">
                            {deal.probability}%
                          </span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {deal.tags.map((tag) => (
                          <Badge key={tag} variant="default" size="sm">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Footer */}
                      {deal.expected_close_date && (
                        <div className="flex items-center gap-1 mt-3 pt-3 border-t border-border text-xs text-text-muted">
                          <Calendar className="w-3 h-3" />
                          Previsão: {new Date(deal.expected_close_date).toLocaleDateString('pt-BR')}
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Add Deal Button */}
                  <button className="w-full p-3 border border-dashed border-border rounded-xl text-text-muted hover:text-text-secondary hover:border-border-light transition-colors flex items-center justify-center gap-2">
                    <Plus className="w-4 h-4" />
                    <span className="text-sm">Adicionar deal</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
}
