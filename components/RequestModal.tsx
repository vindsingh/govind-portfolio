'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectName: string;   // e.g. "CPKC"
  context: string;       // one sentence of project context
  email: string;         // mailto target
}

export default function RequestModal({
  isOpen,
  onClose,
  projectName,
  context,
  email,
}: RequestModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isCloseHovered, setIsCloseHovered] = useState(false);
  const [isCtaHovered, setIsCtaHovered] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    // Track previously active element to restore focus on close
    const previousFocus = document.activeElement as HTMLElement | null;

    // Initially focus the first interactive element inside the modal
    if (modalRef.current) {
      const focusable = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length > 0) {
        (focusable[0] as HTMLElement).focus();
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'Tab') {
        if (!modalRef.current) return;
        const focusable = Array.from(
          modalRef.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          )
        ) as HTMLElement[];

        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            last.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === last) {
            first.focus();
            e.preventDefault();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (previousFocus) {
        previousFocus.focus();
      }
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(26, 26, 26, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: '20px',
            backdropFilter: 'blur(4px)',
          }}
        >
          {/* Card Container */}
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-heading"
            style={{
              position: 'relative',
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-card)',
              padding: '32px',
              maxWidth: '480px',
              width: '100%',
              boxShadow: 'var(--shadow-card-hover)',
              boxSizing: 'border-box',
            }}
          >
            {/* Top Label */}
            <div
              style={{
                fontFamily: 'var(--font-fragment-mono), monospace',
                fontSize: 'var(--text-xs)',
                textTransform: 'uppercase',
                color: 'var(--color-accent-cpkc)',
                letterSpacing: '0.06em',
                fontWeight: 600,
              }}
            >
              CONFIDENTIAL PROJECT
            </div>

            {/* Heading */}
            <h2
              id="modal-heading"
              style={{
                fontFamily: 'var(--font-helvetica-neue), sans-serif',
                fontSize: 'var(--text-md)',
                color: 'var(--color-text-primary)',
                fontWeight: 500,
                marginTop: '8px',
                marginBottom: 0,
              }}
            >
              {projectName}
            </h2>

            {/* Context Paragraph */}
            <p
              style={{
                fontFamily: 'var(--font-helvetica-neue), sans-serif',
                fontSize: 'var(--text-base)',
                color: 'var(--color-text-secondary)',
                marginTop: '12px',
                marginBottom: 0,
                lineHeight: 1.6,
              }}
            >
              {context}
            </p>

            {/* Divider */}
            <div
              style={{
                height: '1px',
                backgroundColor: 'var(--color-border)',
                margin: '24px 0',
              }}
            />

            {/* CTA Button */}
            <a
              href={`mailto:${email}`}
              onMouseEnter={() => setIsCtaHovered(true)}
              onMouseLeave={() => setIsCtaHovered(false)}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'center',
                textDecoration: 'none',
                backgroundColor: 'var(--color-text-primary)',
                color: 'var(--color-surface)',
                padding: '12px 20px',
                borderRadius: 'var(--radius-sm)',
                fontFamily: 'var(--font-helvetica-neue), sans-serif',
                fontSize: 'var(--text-sm)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                fontWeight: 600,
                boxSizing: 'border-box',
                opacity: isCtaHovered ? 0.9 : 1,
                transition: 'opacity 150ms ease',
              }}
            >
              Get in touch
            </a>

            {/* Close Button */}
            <button
              onClick={onClose}
              onMouseEnter={() => setIsCloseHovered(true)}
              onMouseLeave={() => setIsCloseHovered(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                fontSize: '20px',
                color: isCloseHovered ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                transition: 'color 150ms ease',
                lineHeight: 1,
                padding: '4px',
              }}
              aria-label="Close modal"
            >
              ×
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
