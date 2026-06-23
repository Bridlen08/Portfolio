import { useEffect, useRef } from "react";

declare global {
  interface Window {
    VANTA: any;
    THREE: any;
  }
}

export function VantaBackground() {
  const vantaRef = useRef<HTMLDivElement>(null);
  const effectRef = useRef<any>(null);

  useEffect(() => {
    let cancelled = false;

    const loadVanta = async () => {
      // Dynamically import three + vanta to avoid SSR issues
      const THREE = await import("three");
      (window as any).THREE = THREE;

      // @ts-ignore
      const VANTA = await import("vanta/dist/vanta.net.min");

      if (cancelled || !vantaRef.current) return;

      const isDark = document.documentElement.classList.contains("dark");

      effectRef.current = VANTA.default({
        el: vantaRef.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: isDark ? 0x7c3aed : 0x7c3aed,
        backgroundColor: isDark ? 0x0d0d1a : 0xf0f0fa,
        points: 12.0,
        maxDistance: 22.0,
        spacing: 18.0,
        showDots: true,
      });
    };

    loadVanta();

    return () => {
      cancelled = true;
      if (effectRef.current) {
        effectRef.current.destroy();
        effectRef.current = null;
      }
    };
  }, []);

  // Re-init when theme changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      if (effectRef.current) {
        const isDark = document.documentElement.classList.contains("dark");
        effectRef.current.setOptions({
          color: isDark ? 0x7c3aed : 0x6d28d9,
          backgroundColor: isDark ? 0x0d0d1a : 0xf8f7ff,
        });
      }
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={vantaRef}
      className="fixed inset-0 w-full h-full"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
