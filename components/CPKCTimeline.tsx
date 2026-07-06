'use client';

import React from 'react';
import { motion } from 'framer-motion';

const nodes = [
  {
    label: "01 — METHODOLOGY",
    title: "Design Thinking Framework",
    image: "/projects/cpkc/Phase1.svg",
    prose: "CPKC had no shared methodology for problem framing. The framework gave the organization a structured approach to moving from \"we have a problem\" to \"here is the right problem to solve\", adapted to CPKC's existing project lifecycle so it could be adopted without displacing existing processes. Adopted by the CIO and integrated as standard practice."
  },
  {
    label: "02 — TOOLKIT",
    title: "AI Cards Toolkit",
    image: "/projects/cpkc/Phase2.svg",
    prose: "AI concepts don't translate easily across technical and non-technical teams. The AI Cards were designed as a facilitation tool: a set of cards that made model behaviour, edge cases, and human oversight legible to stakeholders who don't think in systems terms. Built for workshops and decision-making sessions, not documentation."
  },
  {
    label: "03 — PRODUCT",
    title: "Market Intelligence Chatbot",
    image: "/projects/cpkc/Phase3.svg",
    prose: "CPKC's first AI-native internal product. I co-owned the UX across the full build, from initial problem definition through interface design and handoff. The challenge wasn't the AI component. It was designing an interface that made the model's outputs legible and trustworthy to the people who would rely on it daily."
  },
  {
    label: "04 — COMMUNITY",
    title: "Community of Practice",
    image: "/projects/cpkc/Phase4.svg",
    prose: "Design thinking doesn't persist through documentation. The Community of Practice built the internal social infrastructure: 105+ members across departments, regular programming, a shared language that continued after the engagement. The goal was to make the methodology self-sustaining."
  }
] as const;

export default function CPKCTimeline() {
  return (
    <div
      style={{
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-card)',
        padding: '32px 32px 32px 24px',
        background: 'var(--color-surface)',
        marginTop: '32px',
        marginBottom: '32px',
      }}
    >
      <div style={{ position: 'relative' }}>
        {/* Continuous Spine Line */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: '8px', // Centered vertically relative to the first 12px dot (which is at top: 2px)
            bottom: '8px', // Centered vertically relative to the last 12px dot
            width: '2px',
            backgroundColor: 'var(--color-accent-cpkc)',
            transform: 'translateX(-50%)',
            zIndex: 1,
          }}
        />

        {/* Timeline Nodes */}
        {nodes.map((node, index) => (
          <div
            key={index}
            style={{
              position: 'relative',
              paddingLeft: '24px', // Offset from spine to content
              marginBottom: index === nodes.length - 1 ? 0 : '48px', // Node-to-node gap
            }}
          >
            {/* Circle Node Dot */}
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: '2px', // Centered with node label line height
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-accent-cpkc)',
                border: '2px solid var(--color-surface)',
                boxShadow: '0 0 0 2px var(--color-accent-cpkc)',
                transform: 'translateX(-50%)',
                zIndex: 2,
              }}
            />

            {/* Node Content */}
            <div>
              {/* Node Label */}
              <div
                style={{
                  fontFamily: 'var(--font-fragment-mono), monospace',
                  fontSize: 'var(--text-xs)',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-muted)',
                  letterSpacing: '0.12em',
                  marginBottom: '6px',
                  lineHeight: '1.2',
                }}
              >
                {node.label}
              </div>

              {/* Node Title */}
              <h3
                style={{
                  fontFamily: 'var(--font-helvetica-neue), sans-serif',
                  fontSize: 'var(--text-md)',
                  color: 'var(--color-text-primary)',
                  fontWeight: 500,
                  margin: 0,
                  marginBottom: '8px',
                  lineHeight: '1.4',
                }}
              >
                {node.title}
              </h3>

              {/* Node Prose */}
              <p
                style={{
                  fontFamily: 'var(--font-helvetica-neue), sans-serif',
                  fontSize: 'var(--text-base)',
                  color: 'var(--color-text-secondary)',
                  lineHeight: '1.65',
                  maxWidth: '560px',
                  margin: 0,
                }}
              >
                {node.prose}
              </p>

              {/* Phase Image */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <img
                  src={node.image}
                  alt={node.title}
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    borderRadius: '8px',
                    marginTop: '24px',
                    objectFit: 'contain'
                  }}
                />
              </motion.div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
