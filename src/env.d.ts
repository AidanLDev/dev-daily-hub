/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

// Preline ships no types for its "non-auto" plugin builds; they match the auto builds.
declare module 'preline/plugins/collapse-non-auto' {
  export { default } from 'preline/plugins/collapse'
}
declare module 'preline/plugins/theme-switch-non-auto' {
  export { default } from 'preline/plugins/theme-switch'
}
