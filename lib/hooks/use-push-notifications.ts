"use client"

import { useState, useEffect, useCallback } from "react"

export function usePushNotifications() {
  const [permission, setPermission] = useState<NotificationPermission>("default")
  const [isSupported, setIsSupported] = useState(false)

  useEffect(() => {
    setIsSupported("Notification" in window)
    if ("Notification" in window) {
      setPermission(Notification.permission)
    }
  }, [])

  const requestPermission = useCallback(async () => {
    if (!isSupported) return false

    const result = await Notification.requestPermission()
    setPermission(result)
    return result === "granted"
  }, [isSupported])

  const sendNotification = useCallback(
    (title: string, options?: NotificationOptions) => {
      if (!isSupported || permission !== "granted") return

      new Notification(title, {
        icon: "/icon-192.png",
        badge: "/badge-72.png",
        ...options,
      })
    },
    [isSupported, permission],
  )

  return {
    isSupported,
    permission,
    requestPermission,
    sendNotification,
  }
}
