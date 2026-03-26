import { Loader2 } from 'lucide-react';

export default function LoadingOverlay() {
  return (
    <div className="loading-overlay">
      <div className="glass-panel loading-content">
        <Loader2 className="spinner" size={32} />
        <p>Synchronizing with Backend...</p>
      </div>
    </div>
  );
}
