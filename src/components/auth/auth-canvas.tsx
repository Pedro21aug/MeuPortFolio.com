import * as React from "react";

interface AuthCanvasProps {
  children: React.ReactNode;
}

/** Fundo marrom profundo com grão de couro e brilho bronze. */
const AuthCanvas = ({ children }: AuthCanvasProps) => (
  <div className="relative min-h-screen overflow-hidden bg-canvas bg-gradient-canvas bg-noise">
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 bg-gradient-glow animate-pulse-glow"
    />
    <div
      aria-hidden
      className="pointer-events-none absolute -bottom-48 -left-40 h-[560px] w-[560px] rounded-full bg-gold-500/[0.09] blur-[130px]"
    />
    <div
      aria-hidden
      className="pointer-events-none absolute -right-24 top-1/3 h-[420px] w-[420px] rounded-full bg-brown-500/[0.18] blur-[120px]"
    />

    <div className="relative z-10">{children}</div>
  </div>
);

export default AuthCanvas;
