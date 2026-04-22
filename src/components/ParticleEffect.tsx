import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export function ParticleEffect() {
  const [particles, setParticles] = useState<{ id: number; color: string; x: number; y: number }[]>([]);

  useEffect(() => {
    const colors = ['#fb923c', '#facc15', '#f472b6', '#38bdf8', '#818cf8'];
    const newParticles = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      color: colors[Math.floor(Math.random() * colors.length)],
      x: (Math.random() - 0.5) * 400,
      y: (Math.random() - 0.5) * 400,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
          animate={{ 
            scale: Math.random() * 1.5 + 0.5, 
            x: p.x, 
            y: p.y, 
            opacity: 0,
            rotate: Math.random() * 360
          }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{
            width: 12,
            height: 12,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            backgroundColor: p.color,
            position: 'absolute'
          }}
        />
      ))}
    </div>
  );
}
