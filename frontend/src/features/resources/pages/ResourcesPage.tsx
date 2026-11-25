import { useState } from 'react'
import Button from '../../../components/ui/Button'
import ResourceList from '../components/ResourceList.js'
import ResourceFormDialog from '../components/ResourceFormDialog.js'
import ResourceDeleteDialog from '../components/ResourceDeleteDialog.js'
import { useResources } from '../hooks/useResources.js'
import type { Resource } from '../types/resource.js'

function ResourcesPage() {
    const { resources, loading, error, reload, saveResource, deleteResource } = useResources()
    const [formOpen, setFormOpen] = useState(false)
    const [selectedResource, setSelectedResource] = useState<Resource | null>(null)
    const [resourceToDelete, setResourceToDelete] = useState<Resource | null>(null)

    function openForm(resource: Resource | null) {
        setSelectedResource(resource)
        setFormOpen(true)
    }

    return (
        <main className="mx-auto max-w-6xl p-4 sm:p-6">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h1 className="text-3xl font-bold">Resource list</h1>
                <Button onClick={() => openForm(null)} disabled={loading}
                    className="rounded px-4 py-2 disabled:opacity-50">New resource</Button>
            </div>

            {error && (
                <div className="mb-4">
                    <p role="alert" className="text-red-600">{error}</p>
                    <Button variant="secondary" disabled={loading}
                        onClick={() => void reload()} className="mt-2 rounded px-4 py-2">
                        Reload
                    </Button>
                </div>
            )}

            {loading ? (
                <p role="status">Loading resources...</p>
            ) : resources.length === 0 ? (
                !error && <p>No resources available.</p>
            ) : (
                <ResourceList resources={resources} onEdit={openForm} onDelete={setResourceToDelete} />
            )}
            {formOpen && <ResourceFormDialog resource={selectedResource}
                onSave={payload => saveResource(selectedResource?.id ?? null, payload)}
                onClose={() => setFormOpen(false)} />}
            {resourceToDelete && <ResourceDeleteDialog resource={resourceToDelete}
                onConfirm={() => deleteResource(resourceToDelete.id)}
                onClose={() => setResourceToDelete(null)} />}
        </main>
    )
}

export default ResourcesPage
