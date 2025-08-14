import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { AdminPanel } from '@/components/admin/admin-panel'

export default async function AdminPage() {
  const session = await getServerSession()

  if (!session?.user || session.user.role !== 'ADMIN') {
    redirect('/')
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Admin Panel
          </h1>
          <p className="text-muted-foreground text-lg">
            Manage products and monitor your e-commerce platform
          </p>
        </div>
        
        <AdminPanel />
      </main>
    </div>
  )
}
