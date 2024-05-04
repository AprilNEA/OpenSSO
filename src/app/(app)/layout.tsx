export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className="mx-auto h-screen">{children}</div>
}
