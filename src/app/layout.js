import "./globals.css";

export const metadata = {
  title: "Valet Monitoring System",
  description: "Monitoring valet sky parking",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}
