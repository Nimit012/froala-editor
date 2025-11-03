import { createApp, type Component } from 'vue'
import type { App } from 'vue'

interface ModalResult<T> {
  confirmed: boolean
  data?: T
}

export const useFroalaModals = () => {
  let modalApp: App | null = null
  let modalContainer: HTMLDivElement | null = null

  const openModal = <T>(
    component: Component,
    props?: Record<string, any>
  ): Promise<ModalResult<T>> => {
    return new Promise((resolve) => {
      // Create container
      modalContainer = document.createElement('div')
      document.body.appendChild(modalContainer)

      // Create app instance
      modalApp = createApp(component, {
        ...props,
        onSubmit: (data: T) => {
          cleanup()
          resolve({ confirmed: true, data })
        },
        onCancel: () => {
          cleanup()
          resolve({ confirmed: false })
        }
      })

      // Mount the modal
      modalApp.mount(modalContainer)
    })
  }

  const cleanup = () => {
    if (modalApp) {
      modalApp.unmount()
      modalApp = null
    }
    if (modalContainer) {
      document.body.removeChild(modalContainer)
      modalContainer = null
    }
  }

  return {
    openModal
  }
}