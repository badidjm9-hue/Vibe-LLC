// Device fingerprinting for security

export async function generateDeviceFingerprint(): Promise<string> {
  const components: string[] = []

  // Screen info
  components.push(`${screen.width}x${screen.height}x${screen.colorDepth}`)

  // Timezone
  components.push(Intl.DateTimeFormat().resolvedOptions().timeZone)

  // Language
  components.push(navigator.language)

  // Platform
  components.push(navigator.platform)

  // User agent
  components.push(navigator.userAgent)

  // Canvas fingerprint
  try {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    if (ctx) {
      ctx.textBaseline = "top"
      ctx.font = "14px Arial"
      ctx.fillText("Vibe fingerprint", 2, 2)
      components.push(canvas.toDataURL())
    }
  } catch (e) {
    components.push("canvas-error")
  }

  // WebGL info
  try {
    const canvas = document.createElement("canvas")
    const gl = canvas.getContext("webgl")
    if (gl) {
      const debugInfo = gl.getExtension("WEBGL_debug_renderer_info")
      if (debugInfo) {
        components.push(gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL))
        components.push(gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL))
      }
    }
  } catch (e) {
    components.push("webgl-error")
  }

  // Generate hash
  const fingerprint = components.join("|")
  const encoder = new TextEncoder()
  const data = encoder.encode(fingerprint)
  const hashBuffer = await crypto.subtle.digest("SHA-256", data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
}

export function detectSuspiciousActivity(fingerprint: string, knownFingerprints: string[]): boolean {
  // Check if this is a new device
  const isNewDevice = !knownFingerprints.includes(fingerprint)

  // Additional checks could include:
  // - Multiple accounts from same fingerprint
  // - Rapid fingerprint changes
  // - Known bot fingerprints

  return isNewDevice
}
