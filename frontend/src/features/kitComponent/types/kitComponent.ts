export interface KitComponent {
    kitId : number
    componentId: number
    quantity: number
    createdAt?: string
    updatedAt?: string
}

export interface KitComponentPayload {
    kitId: number
    componentId: number
    quantity: number
}