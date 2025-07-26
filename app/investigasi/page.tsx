// app/investigasi/page.tsx
'use client';

import React, { useState, useCallback } from 'react';
import Sidebar from '../../components/layout/sidebar';
import { 
  Search, 
  Copy, 
  RotateCcw, 
  Maximize2, 
  Eye, 
  EyeOff,
  DollarSign,
  Hash,
  Calendar
} from 'lucide-react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  BackgroundVariant,
  Node,
  MarkerType
} from 'reactflow';

import 'reactflow/dist/style.css';

// Interface untuk data entitas
interface EntityData {
  id: string;
  name: string;
  riskScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  labels: string[];
  totalBalance: string;
  transactionCount: number;
  detectedDate: string;
  relatedAddresses: string[];
}

// Interface untuk node data
interface NodeData {
  label: string;
  type: 'entity' | 'address';
  riskScore?: number;
  riskLevel?: 'low' | 'medium' | 'high';
  balance?: string;
}

// Komponen Card
const Card: React.FC<{ children: React.ReactNode; className?: string; title?: string }> = ({ 
  children, 
  className = '', 
  title 
}) => {
  return (
    <div className={`bg-slate-800 rounded-xl p-6 border border-slate-700 ${className}`}>
      {title && <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>}
      {children}
    </div>
  );
};

// Komponen Badge Status
const Badge: React.FC<{ 
  status: 'low' | 'medium' | 'high'; 
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}> = ({ status, children, size = 'md' }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'low':
        return 'bg-green-500/20 text-green-400 border border-green-500/30';
      case 'medium':
        return 'bg-amber-500/20 text-amber-400 border border-amber-500/30';
      case 'high':
        return 'bg-red-500/20 text-red-400 border border-red-500/30';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'px-2 py-1 text-xs';
      case 'md':
        return 'px-3 py-1 text-sm';
      case 'lg':
        return 'px-4 py-2 text-base';
    }
  };

  return (
    <span className={`inline-flex items-center rounded-full font-medium ${getStatusStyles()} ${getSizeStyles()}`}>
      {children}
    </span>
  );
};

// Data mock untuk entitas
const mockEntityData: EntityData = {
  id: 'Entity-XYZ-123',
  name: 'Darknet Cluster Alpha',
  riskScore: 89,
  riskLevel: 'high',
  labels: ['Judi Online', 'Pencucian Uang', 'Darknet Market'],
  totalBalance: '$2,847,291.50',
  transactionCount: 15749,
  detectedDate: '2025-01-15',
  relatedAddresses: [
    '0x742d35Cc6634C0532925a3b8D2B9b5d2a053612A',
    '0x1234567890abcdef1234567890abcdef12345678',
    '0x9876543210fedcba9876543210fedcba98765432',
    '0xabcdef1234567890abcdef1234567890abcdef12',
    '0x555666777888999aaabbbcccdddeeefff0001111',
    '0x2222333344445555666677778888999900001111',
    '0xaaabbbcccdddeeefff00011112222333344445555'
  ]
};

// Data mock untuk graf nodes
const initialNodes: Node<NodeData>[] = [
  {
    id: '1',
    type: 'default',
    position: { x: 250, y: 100 },
    data: { 
      label: 'Entity-XYZ-123', 
      type: 'entity', 
      riskScore: 89, 
      riskLevel: 'high' 
    },
    style: { 
      background: '#ef4444', 
      color: 'white', 
      border: '2px solid #dc2626',
      borderRadius: '10px',
      fontSize: '14px',
      fontWeight: 'bold',
      width: '150px',
      height: '60px'
    }
  },
  {
    id: '2',
    type: 'default',
    position: { x: 100, y: 250 },
    data: { 
      label: '0x742d35...612A', 
      type: 'address', 
      riskScore: 75, 
      riskLevel: 'high',
      balance: '$487K'
    },
    style: { 
      background: '#ef4444', 
      color: 'white', 
      border: '1px solid #dc2626',
      borderRadius: '8px',
      fontSize: '12px',
      width: '120px',
      height: '40px'
    }
  },
  {
    id: '3',
    type: 'default',
    position: { x: 400, y: 250 },
    data: { 
      label: '0x123456...5678', 
      type: 'address', 
      riskScore: 92, 
      riskLevel: 'high',
      balance: '$1.2M'
    },
    style: { 
      background: '#dc2626', 
      color: 'white', 
      border: '1px solid #991b1b',
      borderRadius: '8px',
      fontSize: '12px',
      width: '120px',
      height: '40px'
    }
  },
  {
    id: '4',
    type: 'default',
    position: { x: 50, y: 400 },
    data: { 
      label: '0x987654...5432', 
      type: 'address', 
      riskScore: 45, 
      riskLevel: 'medium',
      balance: '$89K'
    },
    style: { 
      background: '#f59e0b', 
      color: 'white', 
      border: '1px solid #d97706',
      borderRadius: '8px',
      fontSize: '12px',
      width: '120px',
      height: '40px'
    }
  },
  {
    id: '5',
    type: 'default',
    position: { x: 450, y: 400 },
    data: { 
      label: '0xabcdef...ef12', 
      type: 'address', 
      riskScore: 23, 
      riskLevel: 'low',
      balance: '$12K'
    },
    style: { 
      background: '#10b981', 
      color: 'white', 
      border: '1px solid #059669',
      borderRadius: '8px',
      fontSize: '12px',
      width: '120px',
      height: '40px'
    }
  },
  {
    id: '6',
    type: 'default',
    position: { x: 600, y: 150 },
    data: { 
      label: 'Entity-ABC-456', 
      type: 'entity', 
      riskScore: 67, 
      riskLevel: 'medium' 
    },
    style: { 
      background: '#f59e0b', 
      color: 'white', 
      border: '2px solid #d97706',
      borderRadius: '10px',
      fontSize: '14px',
      fontWeight: 'bold',
      width: '150px',
      height: '60px'
    }
  }
];

// Data mock untuk edges
const initialEdges: Edge[] = [
  { 
    id: 'e1-2', 
    source: '1', 
    target: '2', 
    animated: true,
    style: { stroke: '#ef4444', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#ef4444' }
  },
  { 
    id: 'e1-3', 
    source: '1', 
    target: '3', 
    animated: true,
    style: { stroke: '#ef4444', strokeWidth: 3 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#ef4444' }
  },
  { 
    id: 'e2-4', 
    source: '2', 
    target: '4',
    style: { stroke: '#f59e0b', strokeWidth: 1 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#f59e0b' }
  },
  { 
    id: 'e3-5', 
    source: '3', 
    target: '5',
    style: { stroke: '#10b981', strokeWidth: 1 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#10b981' }
  },
  { 
    id: 'e3-6', 
    source: '3', 
    target: '6',
    style: { stroke: '#f59e0b', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#f59e0b' }
  }
];

// Komponen utama halaman Investigasi
export default function InvestigasiPage() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedEntity] = useState<EntityData>(mockEntityData);
  const [selectedNode, setSelectedNode] = useState<Node<NodeData> | null>(null);
  const [showLabels, setShowLabels] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // Handler untuk klik node
  const onNodeClick = useCallback((event: React.MouseEvent, node: Node<NodeData>) => {
    setSelectedNode(node);
    setShowPopup(true);
    console.log('Node clicked:', node);
  }, []);

  // Copy alamat ke clipboard
  const copyToClipboard = (address: string) => {
    navigator.clipboard.writeText(address);
    // Bisa tambahkan toast notification di sini
  };

  // Reset graf ke posisi awal
  const resetView = () => {
    // React Flow reset view function
    console.log('Reset view');
  };

  // Fit graf ke viewport
  const fitView = () => {
    // React Flow fit view function
    console.log('Fit to view');
  };

  const getRiskText = (level: string) => {
    switch (level) {
      case 'low': return 'Risiko Rendah';
      case 'medium': return 'Risiko Sedang';
      case 'high': return 'Risiko Tinggi';
      default: return 'Tidak Diketahui';
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white font-inter">
      <div className="flex">
        {/* Sidebar Navigasi */}
        <Sidebar className="fixed h-screen" />
        
        {/* Area Konten Utama */}
        <div className="ml-64 flex-1 p-6">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center space-x-3 mb-2">
              <Search className="w-8 h-8 text-amber-400" />
              <h1 className="text-4xl font-bold text-white">Investigasi Digital</h1>
            </div>
            <p className="text-slate-400 text-lg">
              Entity Clustering & Graph Visualization - Analisis Jaringan Blockchain
            </p>
          </div>

          {/* Layout Dua Kolom */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
            
            {/* Kolom Kiri - Profil Entitas (1/3) */}
            <div className="lg:col-span-1 space-y-6 overflow-y-auto">
              
              {/* Profil Entitas Utama */}
              <Card title="Profil Entitas">
                <div className="space-y-4">
                  {/* ID Entitas */}
                  <div>
                    <label className="text-slate-400 text-sm font-medium">ID Entitas</label>
                    <p className="text-white font-mono text-lg">{selectedEntity.id}</p>
                  </div>

                  {/* Nama Entitas */}
                  <div>
                    <label className="text-slate-400 text-sm font-medium">Nama Cluster</label>
                    <p className="text-white font-semibold">{selectedEntity.name}</p>
                  </div>

                  {/* Skor Risiko */}
                  <div className="text-center py-4 bg-slate-700 rounded-lg">
                    <div className="text-4xl font-bold text-white mb-2">
                      {selectedEntity.riskScore}
                      <span className="text-xl text-slate-400">/100</span>
                    </div>
                    <Badge status={selectedEntity.riskLevel} size="lg">
                      {getRiskText(selectedEntity.riskLevel)}
                    </Badge>
                  </div>

                  {/* Label Risiko */}
                  <div>
                    <label className="text-slate-400 text-sm font-medium mb-2 block">Label Risiko</label>
                    <div className="flex flex-wrap gap-2">
                      {selectedEntity.labels.map((label, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-red-500/20 text-red-400 border border-red-500/30 rounded-full text-xs"
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Statistik Kunci */}
              <Card title="Statistik Kunci">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-4 h-4 text-amber-400" />
                      <span className="text-slate-400">Total Saldo</span>
                    </div>
                    <span className="text-white font-semibold">{selectedEntity.totalBalance}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Hash className="w-4 h-4 text-amber-400" />
                      <span className="text-slate-400">Jumlah Transaksi</span>
                    </div>
                    <span className="text-white font-semibold">{selectedEntity.transactionCount.toLocaleString()}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-amber-400" />
                      <span className="text-slate-400">Tanggal Terdeteksi</span>
                    </div>
                    <span className="text-white font-semibold">
                      {new Date(selectedEntity.detectedDate).toLocaleDateString('id-ID')}
                    </span>
                  </div>
                </div>
              </Card>

              {/* Alamat Terkait */}
              <Card title="Alamat Terkait">
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {selectedEntity.relatedAddresses.map((address, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors duration-200"
                    >
                      <span className="text-white font-mono text-sm truncate flex-1">
                        {address}
                      </span>
                      <button
                        onClick={() => copyToClipboard(address)}
                        className="ml-2 p-1 text-slate-400 hover:text-amber-400 transition-colors duration-200"
                        title="Copy alamat"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-xs text-slate-500 text-center">
                  {selectedEntity.relatedAddresses.length} alamat dalam cluster
                </div>
              </Card>
            </div>

            {/* Kolom Kanan - Visualisasi Graf (2/3) */}
            <div className="lg:col-span-2">
              <Card title="Visualisasi Graf Jaringan" className="h-full">
                
                {/* Kontrol Graf */}
                <div className="flex items-center justify-between mb-4 p-3 bg-slate-700 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={resetView}
                      className="flex items-center space-x-2 px-3 py-2 bg-slate-600 hover:bg-slate-500 rounded-lg transition-colors duration-200"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span className="text-sm">Reset Zoom</span>
                    </button>
                    
                    <button
                      onClick={fitView}
                      className="flex items-center space-x-2 px-3 py-2 bg-slate-600 hover:bg-slate-500 rounded-lg transition-colors duration-200"
                    >
                      <Maximize2 className="w-4 h-4" />
                      <span className="text-sm">Fit to View</span>
                    </button>
                    
                    <button
                      onClick={() => setShowLabels(!showLabels)}
                      className="flex items-center space-x-2 px-3 py-2 bg-slate-600 hover:bg-slate-500 rounded-lg transition-colors duration-200"
                    >
                      {showLabels ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      <span className="text-sm">{showLabels ? 'Hide' : 'Show'} Labels</span>
                    </button>
                  </div>

                  <div className="text-xs text-slate-400">
                    {nodes.length} nodes • {edges.length} connections
                  </div>
                </div>

                {/* Area Graf */}
                <div className="h-96 lg:h-[500px] bg-slate-900 rounded-lg border border-slate-600 relative">
                  <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onNodeClick={onNodeClick}
                    fitView
                    attributionPosition="bottom-left"
                  >
                    <Controls className="bg-slate-800 border-slate-600" />
                    <MiniMap 
                      className="bg-slate-800 border-slate-600"
                      nodeColor={(node) => {
                        if (node.data?.riskLevel === 'high') return '#ef4444';
                        if (node.data?.riskLevel === 'medium') return '#f59e0b';
                        return '#10b981';
                      }}
                    />
                    <Background 
                      variant={BackgroundVariant.Dots} 
                      gap={12} 
                      size={1} 
                      color="#374151"
                    />
                  </ReactFlow>
                </div>

                {/* Legend */}
                <div className="mt-4 p-3 bg-slate-700 rounded-lg">
                  <h4 className="text-white font-medium mb-2">Legend</h4>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-red-500 rounded"></div>
                      <span className="text-slate-300">Risiko Tinggi</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-amber-500 rounded"></div>
                      <span className="text-slate-300">Risiko Sedang</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-green-500 rounded"></div>
                      <span className="text-slate-300">Risiko Rendah</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-4 border-2 border-amber-400 rounded bg-amber-500"></div>
                      <span className="text-slate-300">Entitas</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-4 border border-slate-400 rounded bg-slate-600"></div>
                      <span className="text-slate-300">Alamat</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-1 bg-slate-400"></div>
                      <span className="text-slate-300">Transaksi</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Popup untuk node yang diklik */}
      {showPopup && selectedNode && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 max-w-md w-full m-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">Node Information</h3>
              <button
                onClick={() => setShowPopup(false)}
                className="text-slate-400 hover:text-white"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="text-slate-400 text-sm">ID</label>
                <p className="text-white font-mono">{selectedNode.data?.label}</p>
              </div>
              
              <div>
                <label className="text-slate-400 text-sm">Type</label>
                <p className="text-white capitalize">{selectedNode.data?.type}</p>
              </div>
              
              {selectedNode.data?.riskScore && (
                <div>
                  <label className="text-slate-400 text-sm">Risk Score</label>
                  <div className="flex items-center space-x-2">
                    <p className="text-white font-semibold">{selectedNode.data.riskScore}/100</p>
                    {selectedNode.data?.riskLevel && (
                      <Badge status={selectedNode.data.riskLevel} size="sm">
                        {getRiskText(selectedNode.data.riskLevel)}
                      </Badge>
                    )}
                  </div>
                </div>
              )}
              
              {selectedNode.data?.balance && (
                <div>
                  <label className="text-slate-400 text-sm">Balance</label>
                  <p className="text-white font-semibold">{selectedNode.data.balance}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}