import { watch, onUnmounted, ref } from 'vue'

export function useSeo() {
  const jsonLdScript = ref(null)

  function setTitle(title) {
    document.title = title
  }

  function setMeta(name, content) {
    let tag = document.head.querySelector(`meta[name="${CSS.escape(name)}"]`)
    if (!tag) {
      tag = document.createElement('meta')
      tag.setAttribute('name', name)
      document.head.appendChild(tag)
    }
    tag.setAttribute('content', content)
  }

  function setProperty(property, content) {
    let tag = document.head.querySelector(`meta[property="${CSS.escape(property)}"]`)
    if (!tag) {
      tag = document.createElement('meta')
      tag.setAttribute('property', property)
      document.head.appendChild(tag)
    }
    tag.setAttribute('content', content)
  }

  function setLink(rel, href) {
    let tag = document.head.querySelector(`link[rel="${CSS.escape(rel)}"]`)
    if (!tag) {
      tag = document.createElement('link')
      tag.setAttribute('rel', rel)
      document.head.appendChild(tag)
    }
    tag.setAttribute('href', href)
  }

  function setJsonLd(data) {
    if (jsonLdScript.value && document.head.contains(jsonLdScript.value)) {
      document.head.removeChild(jsonLdScript.value)
    }
    jsonLdScript.value = document.createElement('script')
    jsonLdScript.value.type = 'application/ld+json'
    jsonLdScript.value.text = JSON.stringify(data)
    document.head.appendChild(jsonLdScript.value)
  }

  onUnmounted(() => {
    if (jsonLdScript.value && document.head.contains(jsonLdScript.value)) {
      document.head.removeChild(jsonLdScript.value)
    }
  })

  return {
    setTitle,
    setMeta,
    setProperty,
    setLink,
    setJsonLd,
  }
}
