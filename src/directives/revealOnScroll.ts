import type { DirectiveBinding, ObjectDirective } from 'vue'

const observers = new WeakMap<Element, IntersectionObserver>()

const revealOnScroll: ObjectDirective = {
  mounted(el: Element, _binding: DirectiveBinding) {
    el.classList.add('reveal')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.15,
      },
    )

    observers.set(el, observer)
    observer.observe(el)
  },
  unmounted(el: Element) {
    const observer = observers.get(el)
    if (observer) {
      observer.disconnect()
      observers.delete(el)
    }
  },
}

export default revealOnScroll
