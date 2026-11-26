import { useCallback, useEffect, useState } from 'react'
import { resourceService } from '../services/resourceService.js'
import type { Resource, ResourcePayload } from '../types/resource.js'

export function useResources() {
    const [resources, setResources] = useState<Resource[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const load = useCallback(async () => {
        try {
            setError('')
            setResources(await resourceService.getAll())
        } catch {
            setError('Could not load resources.')
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => { void load() }, [load])

    // Guardar y borrar lanzan el error: el diálogo que los llama lo muestra junto al formulario.
    async function saveResource(id: number | null, payload: ResourcePayload) {
        if (id === null) await resourceService.create(payload)
        else await resourceService.update(id, payload)
        await load()
    }

    async function deleteResource(id: number) {
        await resourceService.remove(id)
        await load()
    }

    return { resources, loading, error, reload: load, saveResource, deleteResource }
}
