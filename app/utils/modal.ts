import { createApp, type Component, h } from 'vue'

interface ModalResult<T> {
  confirmed: boolean
  data?: T
}

export function openModal<T>(
  contentComponent: Component,
  props?: Record<string, any>
): Promise<ModalResult<T>> {
  return new Promise((resolve) => {
    const container = document.createElement('div')
    document.body.appendChild(container)

    const ModalWrapper = {
      setup() {
        const handleSubmit = (data: T) => {
          cleanup()
          resolve({ confirmed: true, data })
        }
        
        const handleCancel = () => {
          cleanup()
          resolve({ confirmed: false })
        }

        return () => 
          h('div', {
            class: 'fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4',
            onClick: (e: MouseEvent) => {
              if (e.target === e.currentTarget) handleCancel()
            }
          }, [
            h('div', {
              class: 'bg-white rounded-xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl'
            }, [
              h(contentComponent, {
                ...props,
                onSubmit: handleSubmit,
                onCancel: handleCancel
              })
            ])
          ])
      }
    }

    const app = createApp(ModalWrapper)
    app.mount(container)

    function cleanup() {
      app.unmount()
      document.body.removeChild(container)
    }
  })
}