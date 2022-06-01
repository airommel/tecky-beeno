export function qTemplate<E extends HTMLElement>(
  selector: string,
  target?: HTMLElement,
): HTMLElement {
  let element = q<E>(selector, target)
  element.remove()
  return element
}

export function q<E extends HTMLElement>(
  selector: string,
  target = document.body,
): E {
  let element = target.querySelector<E>(selector)
  if (!element) {
    console.error('querySelector not found:', { selector, target })
    throw new Error(`querySelector '${selector}' not found`)
  }
  return element
}
