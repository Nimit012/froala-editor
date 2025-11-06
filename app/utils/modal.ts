import { createApp, type Component, h } from 'vue'
import ModalWrapper from '@/components/ModalWrapper.vue'

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

    const Root = {
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
          h(ModalWrapper, { onCancel: handleCancel }, () => [
            h(contentComponent, {
              ...props,
              inModal: true,
              onSubmit: handleSubmit,
              onCancel: handleCancel
            })
          ])
      }
    }

    const app = createApp(Root)
    app.mount(container)

    function cleanup() {
      app.unmount()
      document.body.removeChild(container)
    }
  })
}