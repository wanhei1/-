import { Language } from '../constants';

interface ShareCardProps {
  typeName: string;
  subTitle: string;
  traits: string[];
  description: string;
  id: string;
  portraitUrl?: string | null;
  language: Language;
}

export function ShareCard({ typeName, subTitle, traits, description, id, portraitUrl, language }: ShareCardProps) {
  // Truncate description to 30 chars
  const shortDesc = description.length > 50 ? description.substring(0, 50) + '...' : description;

  const colors = {
    orange: {
      100: '#ffedd5',
      200: '#fed7aa',
      400: '#fb923c',
      500: '#f97316',
      600: '#ea580c',
    },
    gray: {
      50: '#f9fafb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
    }
  };

  return (
    <div 
      id="share-card"
      style={{
        width: '375px',
        height: '500px',
        background: 'linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 50%, #FFCFD5 100%)',
        position: 'fixed',
        left: '-3000px', // Adjusted to be clearly out of view but not too far
        top: '0',
        padding: '32px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: '0',
        color: '#1A1A1A',
        fontFamily: 'sans-serif',
        zIndex: -1
      }}
    >
      <div className="text-center" style={{ gap: '4px', display: 'flex', flexDirection: 'column' }}>
        <p style={{ 
          fontSize: '12px', 
          fontWeight: 900, 
          letterSpacing: '0.1em', 
          color: colors.orange[400], 
          textTransform: 'uppercase',
          margin: 0
        }}>{language === 'en' ? 'CATI TEST' : '喵格测试 CATI'}</p>
        <div style={{ width: '32px', height: '4px', backgroundColor: colors.orange[200], margin: '0 auto', borderRadius: '9999px' }} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <div style={{ 
          width: '120px', 
          height: '120px', 
          backgroundColor: 'white', 
          borderRadius: '24px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          border: '4px solid white', 
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
          position: 'relative'
        }}>
           {portraitUrl ? (
             <img src={portraitUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
           ) : (
             <span style={{ fontSize: '48px', fontWeight: 900, color: colors.orange[500] }}>{id}</span>
           )}
           <div style={{ position: 'absolute', bottom: 0, right: 0, backgroundColor: colors.orange[500], color: 'white', padding: '2px 8px', fontSize: '10px', fontWeight: 900, borderTopLeftRadius: '12px' }}>{id}</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '30px', fontWeight: 900, letterSpacing: '-0.025em', marginBottom: '4px', margin: 0 }}>{typeName}</h1>
          <p style={{ fontSize: '14px', fontWeight: 700, color: colors.gray[500], margin: 0 }}>{subTitle}</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {traits.slice(0, 3).map((trait, i) => (
          <span key={i} style={{ 
            padding: '4px 12px', 
            backgroundColor: 'white', 
            border: `1px solid ${colors.orange[100]}`, 
            borderRadius: '9999px', 
            fontSize: '12px', 
            fontWeight: 700, 
            color: colors.orange[600],
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
          }}>
            # {trait}
          </span>
        ))}
      </div>

      <div style={{ 
        width: '100%', 
        backgroundColor: 'rgba(255, 255, 255, 0.4)', 
        padding: '16px', 
        borderRadius: '16px', 
        border: '1px solid rgba(255, 255, 255, 0.6)',
        backdropFilter: 'blur(4px)'
      }}>
        <p style={{ 
          fontSize: '14px', 
          fontStyle: 'italic', 
          color: colors.gray[600], 
          lineHeight: 1.6, 
          textAlign: 'center',
          margin: 0
        }}>
          “ {shortDesc} ”
        </p>
      </div>

      <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <p style={{ fontSize: '10px', fontFamily: 'monospace', color: colors.gray[300], margin: 0 }}>cati.meow.test</p>
        <p style={{ fontSize: '10px', color: colors.gray[400], margin: 0 }}>
          {language === 'en' ? "Scan or search 'CATI' to find your true self" : "扫码或搜索「喵格测试」发现真实的你"}
        </p>
      </div>
    </div>
  );
}
