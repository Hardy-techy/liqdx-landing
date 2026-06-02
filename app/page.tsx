'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import { useRef, MouseEvent, useState, useEffect } from 'react';
import LiquidBackground from './LiquidBackground';
import { Wallet, Network, Coins, Rocket } from 'lucide-react';

import {
  NetworkEthereum, NetworkBase, NetworkArbitrumOne,
  NetworkAvalanche, NetworkOptimism, NetworkArc
} from '@web3icons/react';

const ease = [0.76, 0, 0.24, 1];
const titleVariants = {
  hidden: { y: "110%", opacity: 0, rotateZ: 3 },
  visible: { y: "0%", opacity: 1, rotateZ: 0, transition: { duration: 1.2, ease } }
};
const fadeVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1.2, ease, delay: 0.1 } }
};

const TOKEN_LOGOS: Record<string, string> = {
  USDC: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png",
  EURC: "https://s2.coinmarketcap.com/static/img/coins/64x64/20641.png",
  USDT: "https://cryptologos.cc/logos/tether-usdt-logo.png",
};

function HeroSequence() {
  const [step, setStep] = useState(0);
  const [flow, setFlow] = useState<'bridge' | 'swap'>('bridge');

  useEffect(() => {
    let isMounted = true;
    const runSequence = async () => {
      let currentFlow: 'bridge' | 'swap' = 'bridge';
      while (isMounted) {
        setFlow(currentFlow);
        setStep(0); // empty
        await new Promise(r => setTimeout(r, 1000));
        if(!isMounted) break;
        setStep(1); // User bubble
        await new Promise(r => setTimeout(r, 1200));
        if(!isMounted) break;
        setStep(2); // Typing
        await new Promise(r => setTimeout(r, 1500));
        if(!isMounted) break;
        setStep(3); // Agent bubble
        await new Promise(r => setTimeout(r, 800));
        if(!isMounted) break;
        setStep(4); // UI drop
        await new Promise(r => setTimeout(r, 6000)); // Hold for 6 seconds
        
        currentFlow = currentFlow === 'bridge' ? 'swap' : 'bridge';
      }
    };
    runSequence();
    return () => { isMounted = false; };
  }, []);

  return (
    <>
      
      {step >= 1 && (
        <motion.div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end', alignSelf: 'flex-end' }} initial={{opacity:0, y:10}} animate={{opacity:1, y:0}}>
          <div className="chat-bubble user-bubble" style={{ margin: 0 }}>
            {flow === 'bridge' ? 'Bridge 500 USDC to Base' : 'swap 2 USDC to EURC'}
          </div>
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=User123" alt="User" style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#eee', flexShrink: 0 }} />
        </motion.div>
      )}

      {step === 2 && (
        <motion.div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', alignSelf: 'flex-start' }} initial={{opacity:0, scale:0.9}} animate={{opacity:1, scale:1}}>
          <div style={{ marginTop: '2px' }}>
            <svg style={{ width: '28px', height: '28px', color: 'var(--accent)' }} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 3v18m9-9H3m14.121-6.364L6.879 17.121M17.121 17.121L6.879 6.879"></path>
            </svg>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ fontSize: '0.95rem', color: 'var(--muted)', fontWeight: 600 }}>Liqdx AI</div>
            <div className="typing-bubble" style={{ margin: 0, padding: 0 }}>
              <span className="dot">.</span><span className="dot">.</span><span className="dot">.</span>
            </div>
          </div>
        </motion.div>
      )}

      {step >= 3 && (
        <motion.div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', alignSelf: 'flex-start', width: '100%' }} initial={{opacity:0, y:10}} animate={{opacity:1, y:0}}>
          <div style={{ marginTop: '2px' }}>
            <svg style={{ width: '28px', height: '28px', color: 'var(--accent)' }} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 3v18m9-9H3m14.121-6.364L6.879 17.121M17.121 17.121L6.879 6.879"></path>
            </svg>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
            <div style={{ fontSize: '0.95rem', color: 'var(--muted)', fontWeight: 600 }}>Liqdx AI</div>
            <div style={{ fontSize: '1.1rem', lineHeight: '1.5', color: 'var(--text)', maxWidth: '90%' }}>
              {flow === 'bridge'
                ? 'Routing via Circle CCTP. Zero gas fees applied. Initiating transfer directly...'
                : 'Finding optimal route on Arc Testnet. 0.1% fee applied. Executing swap directly...'}
            </div>
            
            {step >= 4 && flow === 'bridge' && (
              <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration: 0.4}} style={{ marginTop: '16px', background: 'var(--terminal-bg)', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.5rem', width: '100%', maxWidth: '420px' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--muted)', letterSpacing: '0.05em', marginBottom: '20px', textTransform: 'uppercase' }}>Bridge Summary</div>
                <div className="bridge-row" style={{ marginBottom: '24px' }}>
                  <div className="bridge-chain"><NetworkArc size={24}/> <span>Arc</span></div>
                  <div className="bridge-arrow">→</div>
                  <div className="bridge-chain"><NetworkBase size={24}/> <span>Base</span></div>
                </div>
                <div className="bridge-details">
                  <div className="detail-row"><span>Action</span> <span>Transfer</span></div>
                  <div className="detail-row"><span>Amount</span> <span>500.00 USDC</span></div>
                  <div className="detail-row"><span>Network Fee</span> <span className="highlight">Sponsored</span></div>
                  <div className="detail-row"><span>Route</span> <span>Circle CCTP</span></div>
                  <div className="detail-row"><span>Est. Time</span> <span>~12 seconds</span></div>
                </div>
              </motion.div>
            )}

            {step >= 4 && flow === 'swap' && (
              <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration: 0.4}} style={{ marginTop: '16px', background: 'var(--terminal-bg)', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.5rem', width: '100%', maxWidth: '420px' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--muted)', letterSpacing: '0.05em', marginBottom: '20px', textTransform: 'uppercase' }}>Swap Summary</div>
                
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', padding: '0 20px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <div style={{ background: '#fff', borderRadius: '50%', padding: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 0 1px rgba(0,0,0,0.05)' }}>
                      <img src={TOKEN_LOGOS.USDC} alt="USDC" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                    </div>
                    <span style={{ fontSize: '1.25rem', fontWeight: 600 }}>2</span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--muted)', fontWeight: 600 }}>USDC</span>
                  </div>
                  
                  <div style={{ color: 'var(--muted)' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <div style={{ background: '#fff', borderRadius: '50%', padding: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 0 1px rgba(0,0,0,0.05)' }}>
                      <img src={TOKEN_LOGOS.EURC} alt="EURC" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                    </div>
                    <span style={{ fontSize: '1.25rem', fontWeight: 600 }}>1.884867</span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--muted)', fontWeight: 600 }}>EURC</span>
                  </div>
                </div>

                <div className="bridge-details">
                  <div className="detail-row"><span>Rate</span> <span>1 USDC = 0.9424 EURC</span></div>
                  <div className="detail-row"><span>Fee</span> <span>0.1%</span></div>
                </div>
                
                <div style={{ marginTop: '20px', paddingTop: '16px', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10b981', fontWeight: 600 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
                    <span>Execution successful</span>
                  </div>
                  <span style={{ color: 'var(--muted)', fontWeight: 400, fontFamily: 'monospace' }}>0xf9c587fb... ↗</span>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </>
  );
}


function AwwwardsCard({ card, i }: { card: any, i: number }) {
  return (
    <motion.div 
      className="aww-spotlight-card"
      initial="inactive"
      whileInView="active"
      viewport={{ margin: "-45% 0px -45% 0px" }}
      variants={{
        inactive: { opacity: 0.3, scale: 0.95, filter: 'blur(3px)' },
        active: { opacity: 1, scale: 1, filter: 'blur(0px)' }
      }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="aww-content">
        <span className="aww-card-num aww-serif">{card.num}</span>
        <h3 className="aww-card-title">{card.title}</h3>
        <p className="aww-card-desc">{card.desc}</p>
      </div>
      
      <motion.div 
        className="aww-spotlight-glow"
        variants={{
          inactive: { opacity: 0 },
          active: { opacity: 1 }
        }}
        transition={{ duration: 0.8 }}
      />
    </motion.div>
  );
}

function AwwwardsCoreEngine() {
  const cards = [
    { num: '01', title: 'Intent Engine', desc: 'Skip the complex interfaces. Simply tell the AI your intent—like "Swap 10 USDC to EURC"—and our conversational agent securely prepares and executes the transaction for you.' },
    { num: '02', title: 'Unified Liquidity', desc: 'Operate effortlessly across Ethereum, Base, Arbitrum, and Optimism. Bridge and swap assets instantly using robust infrastructure powered by Circle CCTP.' },
    { num: '03', title: 'Zero Friction', desc: 'You do not need to hold native gas tokens like ETH, AVAX, or SOL. Liqdx fully sponsors transaction fees via Circle Gas Station, creating a truly Web2-like experience for Web3.' },
    { num: '04', title: 'Instantly Social', desc: 'Sending funds is as easy as tagging a friend. Type "Send 15 USDC to @username" and Liqdx automatically resolves the Twitter handle to their wallet and executes securely.' },
  ];

  return (
    <section className="aww-engine-section spotlight-layout">
      <div className="aww-engine-header">
         <motion.h2 className="aww-engine-title" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
           CORE <br/><span className="aww-serif">engine</span>
         </motion.h2>
      </div>

      <div className="aww-spotlight-stack">
        {cards.map((card, i) => (
          <AwwwardsCard key={i} card={card} i={i} />
        ))}
      </div>
    </section>
  );
}

function FeatureList() {
  const features = [
    { 
      num: "01",
      title1: "PASSIVE",
      title2: "portfolio",
      desc: "Track your net worth, assets, and balances across multiple chains seamlessly in real-time." 
    },
    { 
      num: "02",
      title1: "ACTIVE",
      title2: "agent",
      desc: "Unlike a passive tracker, Liqdx actively executes swaps and bridges across networks based on your natural language commands." 
    },
    { 
      num: "03",
      title1: "COMPLETE",
      title2: "package",
      desc: "The ultimate unified platform. We combine deep portfolio tracking with autonomous AI execution into a single, flawless interface." 
    }
  ];

  return (
    <section className="capability-awwwards section" style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
      <div className="cap-list" style={{ gap: '0' }}>
        {features.map((f, i) => {
          const isRight = i % 2 !== 0;
          return (
            <motion.div 
              key={i}
              className={`asym-grid ${isRight ? 'reverse' : ''}`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ 
                paddingBottom: i < features.length - 1 ? '10vh' : 0, 
                borderBottom: i < features.length - 1 ? '1px solid var(--border)' : 'none', 
                paddingTop: i > 0 ? '10vh' : 0,
                alignItems: 'center'
              }}
            >
              <motion.div className="asym-left" initial={{ opacity: 0, x: isRight ? 100 : -100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
                <h2 className="cap-huge-title liquid-hover" style={{ fontWeight: 800 }}>
                  <span className="text-gradient-dark">{f.title1}</span> <br/>
                  <span className="aww-serif" style={{ color: 'var(--text)' }}>{f.title2}</span>
                </h2>
              </motion.div>
              <motion.div className="asym-right" initial={{ opacity: 0, x: isRight ? -100 : 100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}>
                <div className="cap-num" style={{ color: 'var(--accent)', fontSize: '1rem', padding: '6px 14px', background: 'rgba(0, 97, 240, 0.08)', borderRadius: '100px', width: 'fit-content', marginBottom: '20px', border: '1px solid rgba(0, 97, 240, 0.2)' }}>
                  {f.num}
                </div>
                <p className="cap-desc" style={{ fontSize: '1.35rem', color: 'var(--muted)', marginTop: 0, maxWidth: '400px' }}>
                  {f.desc}
                </p>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function VaultAndCredits() {
  return (
    <section className="section" style={{ padding: '15vh 4vw', maxWidth: '1400px', margin: '0 auto' }}>
      <div className="asym-grid">
        <div className="asym-left">
          <motion.h2 
            className="cap-huge-title liquid-hover" 
            style={{ fontWeight: 800, paddingBottom: '0.2em' }}
            initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: "-30%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-gradient-dark">SMART</span> <br/>
            <span className="aww-serif" style={{ color: 'var(--text)' }}>wallets</span>
          </motion.h2>
          <motion.p 
            className="cap-desc" 
            style={{ marginTop: '2rem' }}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-30%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            Powered by Circle's Programmable Wallets. Deposit your funds once into a highly secure smart wallet. From there, execute endless cross-chain intents instantly by burning seamless AI Credits. No more signing 14 popups for a single swap.
          </motion.p>
        </div>
        <div className="asym-right" style={{ display: 'flex', justifyContent: 'center' }}>
          <motion.div 
            className="glass-card" 
            initial={{ opacity: 0, rotateY: 30, x: 100, transformPerspective: 1000 }}
            whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{ minHeight: 'auto', padding: '3rem', width: '100%', maxWidth: '500px', boxShadow: '0 40px 100px -20px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.7)' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
               <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Wallet Balance</div>
               <div style={{ background: 'var(--accent)', color: '#fff', padding: '6px 14px', borderRadius: '100px', fontSize: '0.85rem', fontWeight: 700 }}>+ 5,000 Credits</div>
            </div>
            <div style={{ fontSize: '4rem', fontWeight: 800, letterSpacing: '-0.04em', color: 'var(--text)', marginBottom: '1rem', lineHeight: 1 }}>$42,500<span style={{ color: 'var(--muted)', fontSize: '2rem' }}>.00</span></div>
            
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem', marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
               <div style={{ flex: 1, background: 'rgba(255,255,255,0.4)', padding: '1.25rem', borderRadius: '16px', border: '1px solid var(--border)' }}>
                  <div style={{ color: 'var(--muted)', fontSize: '0.85rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Wallet Type</div>
                  <div style={{ fontWeight: 800, fontSize: '1.25rem' }}>Smart Account</div>
               </div>
               <div style={{ flex: 1, background: 'rgba(255,255,255,0.4)', padding: '1.25rem', borderRadius: '16px', border: '1px solid var(--border)' }}>
                  <div style={{ color: 'var(--muted)', fontSize: '0.85rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Execution</div>
                  <div style={{ fontWeight: 800, fontSize: '1.25rem', color: '#00D182' }}>Autonomous</div>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function IdentityAndLedger() {
  return (
    <section className="section" style={{ padding: '15vh 4vw', maxWidth: '1400px', margin: '0 auto' }}>
      <div className="asym-grid">
        <div className="asym-left" style={{ display: 'flex', justifyContent: 'center' }}>
          <motion.div 
            className="glass-card" 
            initial={{ opacity: 0, rotateX: 45, y: 100, transformPerspective: 1200 }}
            whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{ minHeight: 'auto', padding: '0', width: '100%', maxWidth: '500px', boxShadow: '0 40px 100px -20px rgba(0,0,0,0.05)' }}
          >
            {/* Header: Twitter Profile */}
            <div style={{ padding: '2.5rem', borderBottom: '1px solid var(--border)', background: 'rgba(255,255,255,0.3)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent), #A1C4FD)' }} />
                <div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text)' }}>@arc_builder</div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--muted)', fontFamily: 'monospace' }}>0x7F2a...98Bc</div>
                </div>
                <div style={{ marginLeft: 'auto', background: 'rgba(0, 97, 240, 0.1)', color: 'var(--accent)', padding: '6px 16px', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>Verified</div>
              </div>
            </div>
            
            {/* Body: Ledger / History */}
            <div style={{ padding: '2.5rem' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.5rem' }}>Transparent Ledger</div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'rgba(255,255,255,0.5)', borderRadius: '12px', border: '1px solid var(--border)' }}>
                  <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>"Swap 500 USDC to SOL"</span>
                  <span style={{ color: '#00D182', fontWeight: 700, fontSize: '0.9rem' }}>Executed</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'rgba(255,255,255,0.5)', borderRadius: '12px', border: '1px solid var(--border)' }}>
                  <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>"Bridge 1 ETH to Base"</span>
                  <span style={{ color: '#00D182', fontWeight: 700, fontSize: '0.9rem' }}>Executed</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'rgba(255,255,255,0.5)', borderRadius: '12px', border: '1px solid var(--border)', opacity: 0.6 }}>
                  <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>"Buy 100 ARC"</span>
                  <span style={{ color: 'var(--muted)', fontWeight: 700, fontSize: '0.9rem' }}>Pending</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        <div className="asym-right">
          <motion.h2 
            className="cap-huge-title liquid-hover" 
            style={{ fontWeight: 800, paddingBottom: '0.2em' }}
            initial={{ opacity: 0, x: 50, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: "-30%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-gradient-dark">VERIFIED</span> <br/>
            <span className="aww-serif" style={{ color: 'var(--text)' }}>identity</span>
          </motion.h2>
          <motion.p 
            className="cap-desc" 
            style={{ marginTop: '2rem' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            Link your Twitter profile via OAuth to create a seamless, recognizable Web3 identity. Every intent, swap, and bridge is immutably recorded in your personal chat ledger, providing complete transparency and a flawless audit trail for all your automated actions.
          </motion.p>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  const containerRef = useRef(null);
  // 3D Mouse effect
  const mouseX = useSpring(0, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 50, damping: 20 });

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left - width / 2) / 25;
    const y = (clientY - top - height / 2) / 25;
    mouseX.set(x);
    mouseY.set(-y);
  }

  return (
    <>
      <LiquidBackground />
      <motion.nav 
        className="aww-nav"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      >
        <div className="nav-left">
          <a href="#" className="nav-logo" style={{ display: 'flex', alignItems: 'center', transform: 'translateX(-40px)' }}>
            <Image src="/light-lidx.png" alt="Liqdx Logo" width={190} height={50} className="logo" style={{ objectFit: 'contain', color: 'transparent' }} priority />
          </a>
        </div>
        
        <div className="nav-center">
          <a href="#capabilities" className="nav-link"><span className="link-text">Capabilities</span></a>
          <a href="#agent" className="nav-link"><span className="link-text">Agent</span></a>
        </div>

        <div className="nav-right">
          <button className="nav-cta">Launch App</button>
        </div>
      </motion.nav>

      <main className="main-content" ref={containerRef}>
        <div style={{ position: 'relative', width: '100%', zIndex: 10 }}>
          
          <section className="split-hero" onMouseMove={handleMouseMove}>
            <div className="hero-left">
              <motion.div className="hero-badge" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
                ✦ Intent-Powered Agent
              </motion.div>
              <div className="title-mask">
                <motion.h1 className="awwwards-title" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1], delay: 0.1 }}>THE SMART</motion.h1>
              </div>
              <div className="title-mask">
                <motion.h1 className="awwwards-title" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1], delay: 0.15 }}>PORTFOLIO &</motion.h1>
              </div>
              <div className="title-mask">
                <motion.h1 className="awwwards-title" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1], delay: 0.2 }}><span className="aww-serif">cross-chain</span> AGENT.</motion.h1>
              </div>
              
              <motion.div className="hero-cta-box" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.19, 1, 0.22, 1], delay: 0.4 }}>
                <p className="hero-desc">Track your net worth and execute cross-chain operations with natural language. Manage, swap, and bridge with autonomous AI precision.</p>
                <a href="#terminal" className="cta-clean"><span className="cta-text">Enter the Agent</span><span className="cta-arrow">→</span></a>
              </motion.div>
            </div>
            
            <div className="hero-right">
              <motion.div 
                className="mockup-3d" 
                initial="hidden" animate="visible" variants={fadeVariants}
              >
                <HeroSequence />
              </motion.div>
            </div>
          </section>

          <section className="diagonal-marquee-container">
            <div className="diagonal-marquee">
              <motion.div className="marquee-track solid-blue" animate={{ x: ["0%", "-50%"] }} transition={{ ease: "linear", duration: 25, repeat: Infinity }}>
                {[...Array(2)].map((_, i) => (
                  <div className="marquee-inner" key={i}>
                    <div className="network-item"><NetworkEthereum size={50} /> <span>Ethereum</span></div>
                    <div className="network-item"><NetworkBase size={50} /> <span>Base</span></div>
                    <div className="network-item"><NetworkArbitrumOne size={50} /> <span>Arbitrum</span></div>
                    <div className="network-item"><NetworkAvalanche size={50} /> <span>Avalanche</span></div>
                    <div className="network-item"><NetworkOptimism size={50} /> <span>Optimism</span></div>
                    <div className="network-item"><NetworkArc size={50} /> <span>Arc</span></div>
                  </div>
                ))}
              </motion.div>
            </div>
          </section>

        </div>
      </main>

      {/* AWWWARDS TYPOGRAPHY SECTION */}
      <AwwwardsCoreEngine />

      <main className="main-content">
        <div style={{ position: 'relative', width: '100%', zIndex: 10 }}>
          <VaultAndCredits />
          <IdentityAndLedger />
          <FeatureList />
        </div>
      </main>

      <footer className="modern-footer" style={{ padding: '8vh 4vw 4vh', borderTop: '1px solid var(--border)', background: 'rgba(255,255,255,0.2)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '4rem', paddingBottom: '4rem' }}>
          
          <div className="footer-brand" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', minWidth: '300px' }}>
            <Image src="/light-lidx.png" alt="Liqdx Logo" width={140} height={40} style={{ objectFit: 'contain' }} />
            <p style={{ color: 'var(--muted)', fontSize: '1.05rem', lineHeight: 1.6, maxWidth: '300px' }}>
              The smart portfolio & cross-chain agent. Manage, swap, and bridge with autonomous AI precision.
            </p>
          </div>

          <div className="footer-col" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>Community</h4>
            <a href="#" className="footer-modern-link"><span>Twitter / X</span></a>
            <a href="#" className="footer-modern-link"><span>Discord</span></a>
            <a href="#" className="footer-modern-link"><span>Github</span></a>
          </div>

          <div className="footer-col" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>Resources</h4>
            <a href="#" className="footer-modern-link"><span>Documentation</span></a>
            <a href="#" className="footer-modern-link"><span>Help Center</span></a>
            <a href="#" className="footer-modern-link"><span>Brand Assets</span></a>
          </div>

          <div className="footer-col" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>Legal</h4>
            <a href="#" className="footer-modern-link"><span>Terms of Service</span></a>
            <a href="#" className="footer-modern-link"><span>Privacy Policy</span></a>
          </div>
        </div>

        <div className="footer-bottom" style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', paddingTop: '2rem', borderTop: '1px solid var(--border)', color: 'var(--muted)', fontSize: '0.9rem', gap: '1rem' }}>
          <span>© 2026 Liqdx Network. All rights reserved.</span>
        </div>
      </footer>
    </>
  );
}
