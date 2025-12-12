'use client';

import * as React from 'react';
import { MainLayout } from '@/components/layout';
import { Button } from '@/components/ui/button';
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
  company: string;
  contact: string;
  value: number;
  probability: number;
  daysInStage: number;
  expectedClose?: string;
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
    color: '#6B7280',
    deals: [
      { id: 'd1', title: 'E-commerce de Eletrônicos', company: 'TechMart Brasil', contact: 'Roberto Alves', value: 4500, probability: 20, daysInStage: 3, tags: ['inbound', 'shopify'] },
      { id: 'd2', title: 'Loja de Moda Feminina', company: 'Fashion Store', contact: 'Carla Lima', value: 3000, probability: 15, daysInStage: 5, tags: ['indicação'] },
      { id: 'd9', title: 'Acessórios Automotivos', company: 'AutoParts Pro', contact: 'Marcos Silva', value: 3500, probability: 10, daysInStage: 1, tags: ['outbound'] },
    ],
  },
  {
    id: '2',
    name: 'Qualificados',
    color: '#3B82F6',
    deals: [
      { id: 'd3', title: 'Suplementos Fitness', company: 'VitaFit', contact: 'Pedro Santos', value: 5500, probability: 40, daysInStage: 7, expectedClose: '2024-02-15', tags: ['premium'] },
    ],
  },
  {
    id: '3',
    name: 'Reunião Agendada',
    color: '#8B5CF6',
    deals: [
      { id: 'd4', title: 'Pet Shop Online', company: 'PetLove Store', contact: 'Ana Costa', value: 4000, probability: 60, daysInStage: 2, expectedClose: '2024-02-10', tags: ['pet'] },
      { id: 'd5', title: 'Decoração e Casa', company: 'HomeStyle', contact: 'Lucas Mendes', value: 6000, probability: 55, daysInStage: 4, tags: ['decoração'] },
    ],
  },
  {
    id: '4',
    name: 'Proposta Enviada',
    color: '#F59E0B',
    deals: [
      { id: 'd6', title: 'Games e Consoles', company: 'GameZone', contact: 'Thiago Ramos', value: 7500, probability: 75, daysInStage: 3, expectedClose: '2024-02-05', tags: ['enterprise'] },
    ],
  },
  {
    id: '5',
    name: 'Negociação',
    color: '#06B6D4',
    deals: [
      { id: 'd7', title: 'Farmácia Digital', company: 'FarmaExpress', contact: 'Juliana Ferreira', value: 8000, probability: 85, daysInStage: 5, expectedClose: '2024-01-25', tags: ['premium'] },
    ],
  },
  {
    id: '6',
    name: 'Fechado ✓',
    color: '#10B981',
    deals: [
      { id: 'd8', title: 'Joalheria Premium', company: 'Diamond Store', contact: 'Patricia Oliveira', value: 10000, probability: 100, daysInStage: 0, tags: ['enterprise'] },
    ],
  },
];

export default function PipelinePage() {
  const [stages, setStages] = React.useState(initialStages);
  const [draggedDeal, setDraggedDeal] = React.useState<{ deal: Deal; stageId: string } | null>(null);
  const [dragOverStage, setDragOverStage] = React.useState<string | null>(null);

  const handleDragStart = (deal: Deal, stageId: string) => {
    setDraggedDeal({ deal, stageId });
  };

  const handleDragOver = (e: React.DragEvent, stageId: string) => {
    e.preventDefault();
    setDragOverStage(stageId);
  };

  const handleDragLeave = () => {
    setDragOverStage(null);
  };

  const handleDrop = (targetStageId: string) => {
    if (!draggedDeal || draggedDeal.stageId === targetStageId) {
      setDraggedDeal(null);
      setDragOverStage(null);
      return;
    }

    setStages((prevStages) =>
      prevStages.map((stage) => {
        if (stage.id === draggedDeal.stageId) {
          return { ...stage, deals: stage.deals.filter((d) => d.id !== draggedDeal.deal.id) };
        }
        if (stage.id === targetStageId) {
          return { ...stage, deals: [...stage.deals, { ...draggedDeal.deal, daysInStage: 0 }] };
        }
        return stage;
      })
    );

    setDraggedDeal(null);
    setDragOverStage(null);
  };

  const totalValue = stages.reduce((acc, stage) => acc + stage.deals.reduce((sum, deal) => sum + deal.value, 0), 0);
  const totalDeals = stages.reduce((acc, stage) => acc + stage.deals.length, 0);
  const weightedValue = stages.reduce((acc, stage) => acc + stage.deals.reduce((sum, deal) => sum + (deal.value * deal.probability / 100), 0), 0);

  return (
    <MainLayout>
      <div className="h-[calc(100vh-112px)] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Pipeline de Vendas</h1>
            <p className="text-text-muted mt-1">
              {totalDeals} deals • {formatCurrency(totalValue)} em potencial • {formatCurrency(weightedValue)} ponderado
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary" leftIcon={<Filter className="w-4 h-4" />}>
              Filtros
            </Button>
            <Button leftIcon={<Plus className="w-4 h-4" />}>
              Novo Deal
            </Button>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="flex-1 flex gap-4 overflow-x-auto pb-4">
          {stages.map((stage) => {
            const stageValue = stage.deals.reduce((sum, deal) => sum + deal.value, 0);
            const isOver = dragOverStage === stage.id;

            return (
              <div
                key={stage.id}
                className="flex-shrink-0 w-[300px] flex flex-col"
                onDragOver={(e) => handleDragOver(e, stage.id)}
                onDragLeave={handleDragLeave}
                onDrop={() => handleDrop(stage.id)}
              >
                {/* Stage Header */}
                <div className="flex items-center justify-between mb-3 px-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: stage.color }} />
                    <h3 className="font-semibold text-text-primary text-sm">{stage.name}</h3>
                    <span className="w-5 h-5 rounded-md bg-surface text-[11px] font-medium text-text-muted flex items-center justify-center">
                      {stage.deals.length}
                    </span>
                  </div>
                  <button className="p-1 rounded hover:bg-surface transition-colors">
                    <MoreHorizontal className="w-4 h-4 text-text-muted" />
                  </button>
                </div>

                {/* Stage Value */}
                <div className="mb-3 px-1">
                  <p className="text-xs text-text-muted">{formatCurrency(stageValue)}</p>
                </div>

                {/* Deals Container */}
                <div className={cn(
                  'flex-1 space-y-2 min-h-[200px] p-2 rounded-xl transition-colors',
                  isOver && 'bg-brand-purple/5 ring-2 ring-brand-purple/20 ring-dashed'
                )}>
                  {stage.deals.map((deal) => (
                    <div
                      key={deal.id}
                      draggable
                      onDragStart={() => handleDragStart(deal, stage.id)}
                      className={cn(
                        'group bg-surface rounded-xl p-4 cursor-grab active:cursor-grabbing transition-all border border-transparent hover:border-border-light',
                        draggedDeal?.deal.id === deal.id && 'opacity-40 scale-95'
                      )}
                    >
                      {/* Deal Header */}
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <h4 className="font-medium text-text-primary text-sm leading-tight">
                          {deal.title}
                        </h4>
                        <GripVertical className="w-4 h-4 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                      </div>

                      {/* Company */}
                      <div className="flex items-center gap-1.5 text-xs text-text-muted mb-3">
                        <Building2 className="w-3 h-3" />
                        {deal.company}
                      </div>

                      {/* Contact */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-brand-purple/30 to-brand-cyan/30 flex items-center justify-center text-[10px] font-medium text-text-primary">
                          {deal.contact.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <span className="text-xs text-text-secondary">{deal.contact}</span>
                      </div>

                      {/* Value and Probability */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-semibold" style={{ color: stage.color }}>
                          {formatCurrency(deal.value)}
                        </span>
                        <div className="flex items-center gap-2">
                          <div className="w-12 h-1 bg-background-secondary rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all"
                              style={{ 
                                width: `${deal.probability}%`,
                                backgroundColor: stage.color 
                              }}
                            />
                          </div>
                          <span className="text-[10px] text-text-muted font-medium">
                            {deal.probability}%
                          </span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {deal.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-1.5 py-0.5 text-[10px] font-medium bg-background-secondary text-text-muted rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Days in Stage */}
                      {deal.daysInStage > 0 && (
                        <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
                          <span className="text-[10px] text-text-muted">
                            {deal.daysInStage} {deal.daysInStage === 1 ? 'dia' : 'dias'} nesta etapa
                          </span>
                          {deal.expectedClose && (
                            <span className="text-[10px] text-text-muted flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(deal.expectedClose).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Add Deal Button */}
                  <button className="w-full p-3 rounded-xl border border-dashed border-border text-text-muted hover:text-text-secondary hover:border-border-light hover:bg-surface/50 transition-all flex items-center justify-center gap-2 text-sm">
                    <Plus className="w-4 h-4" />
                    Adicionar
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
