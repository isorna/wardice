import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: 'wardice.local'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => [
            'dc:format',
            'dc:type',
            'dc:title',
            'cc:Work',
            'rdf:RDF',
            'inkscape:grid',
            'sodipodi:namedview'
          ].includes(tag)
        }
      }
    }),
    // TODO: CHECK cache configurations needed: https://vite-pwa-org.netlify.app/deployment/
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        '/icons/favicon.ico',
        '/icons/apple-touch-icon-180x180.png',
        '/icons/safari-pinned-tab.svg',
        '/logo.v3.svg',
        '/logo.animated.svg'
      ],
      manifest: {
        display_override: ['window-controls-overlay'],
        protocol_handlers: [{ protocol: 'mailto', url: '/newEmail?to=%s' }],
        name: 'War Dice',
        short_name: 'War Dice',
        start_url: '/?source=pwa',
        display: 'standalone',
        description: 'Online tools for wargames',
        lang: 'en-US',
        dir: 'auto',
        theme_color: '#000000',
        background_color: '#000000',
        orientation: 'any',
        clipboard_write: 'true',
        icons: [
          {
            src: '/icons/manifest-icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icons/manifest-icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/icons/manifest-icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/icons/manifest-icon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable'
          }
        ],
        screenshots: [
          {
            src: '/icons/screen1.png',
            sizes: '1094x1844',
            type: 'image/png',
            description: 'A screenshot of the home page'
          }
        ],
        prefer_related_applications: false,
        shortcuts: [
          {
            name: '40k 10th edition',
            short_name: 'WH40k',
            url: '/40k',
            description: 'Warhammer 40k 10th edition',
            icons: [{ src: '/icons/manifest-icon-192.png', sizes: '192x192' }]
          }
        ]
      }
    })
  ],
  build: {
    rollupOptions: {
      // https://rollupjs.org/guide/en/#outputmanualchunks
      output: {
        manualChunks: {
          'group-app': [
            './src/components/PageFooter.vue',
            './src/components/SiteHeader.vue',
            './src/components/SponsorMe.vue',
            './src/views/GamesPage.vue',
            './src/views/IndexPage.vue',
            './src/views/NotFoundPage.vue'
          ],
          'group-40k': [
            './src/components/40k/DetachmentRulesCard.vue',
            './src/components/40k/EnhancementCard.vue',
            './src/components/40k/EnhancementsList.vue',
            './src/components/40k/FactionMenu.vue',
            './src/components/40k/FactionRulesList.vue',
            './src/components/40k/FilterForm.vue',
            './src/components/40k/ProfileCard.vue',
            './src/components/40k/ProfilesList.vue',
            './src/components/40k/SavedList.vue',
            './src/components/40k/StratagemCard.vue',
            './src/components/40k/StratagemsList.vue',
            './src/components/40k/TauDroneCard.vue',
            './src/components/40k/TauDrones.vue',
            './src/views/40k/FactionPage.vue',
            './src/views/40k/HomePage.vue'
          ]
        }
      }
    }
  }
})
