import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['logo.jpg', 'logo.jpg', 'logo.jpg', 'logo.jpg', 'logo.jpg', 'logo.jpg', 'logo.jpg'],
      manifest: {
        name: 'SPRITUP center',
        short_name: 'SPRITUP',
        description: 'Share, manage, and explore documents efficiently.',
        theme_color: '#3b82f6',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          // SVG icons (modern browsers)
          {
            src: 'logo.jpg',
            sizes: '192x192',
            type: 'image/svg+xml'
          },
          {
            src: 'logo.jpg',
            sizes: '512x512',
            type: 'image/svg+xml'
          },
          {
            src: 'logo.jpg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'maskable'
          },
          // PNG fallbacks (older browsers)
          {
            src: 'logo.jpg',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'logo.jpg',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'logo.jpg',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          },
          // Original logo
          {
            src: 'logo.jpg',
            sizes: '1024x1024',
            type: 'image/jpeg'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,woff,woff2}'],
        // Serve the cached SPA shell for route navigations. Using offline.html
        // here made normal online route changes look like a lost connection.
        navigateFallback: '/index.html',
        navigateFallbackDenylist: [/^\/api/],
        runtimeCaching: [
          // ── Google Fonts (cache first, long-lived) ──────────────────────
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },

          // ── Documents API (network first, short TTL) ────────────────────
          // GET /api/documents — the main document list used everywhere
          {
            urlPattern: /^https?:\/\/[^/]+\/api\/documents(\?.*)?$/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'documents-api-cache',
              networkTimeoutSeconds: 5,
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 // 1 hour
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },

          // ── User profile & categories (network first) ───────────────────
          // GET /api/profile, GET /api/my-categories
          {
            urlPattern: /^https?:\/\/[^/]+\/api\/(profile|my-categories)(\?.*)?$/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'user-api-cache',
              networkTimeoutSeconds: 5,
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 // 1 hour
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },

          // ── Storage / document files (cache first) ──────────────────────
          // GET /storage/* — document PDFs, images, uploads
          {
            urlPattern: /^https?:\/\/[^/]+\/storage\/.*$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'storage-files-cache',
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 60 * 60 * 24 * 7 // 7 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              },
              // Only cache successful responses with content
              backgroundSync: {
                name: 'storage-sync-queue',
                options: {
                  maxRetentionTime: 60 * 24 // 24 minutes
                }
              }
            }
          },

          // ── All other API requests (network first, fallback) ────────────
          {
            urlPattern: /^https?:\/\/[^/]+\/api\/.*$/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              networkTimeoutSeconds: 5,
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 // 1 hour
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    })
  ],
  server: {
    port: 3000,
    host: true,
    proxy: {
      // Proxy /storage requests to Laravel backend to avoid CORS
      '/storage': {
        target: 'http://127.0.0.1:8001',
        changeOrigin: true,
      },
      // Proxy /api requests to Laravel backend
      '/api': {
        target: 'http://127.0.0.1:8001',
        changeOrigin: true,
      },
    },
  }
})
