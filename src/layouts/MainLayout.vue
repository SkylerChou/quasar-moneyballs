<template>
  <q-layout view="hhh lpR lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <div class="absolute-center"><q-icon name="savings" /> Moneyballs</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      class="bg-primary"
      :width="250"
      breakpoint="767"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label header class="text-white"> Navigation </q-item-label>

        <EssentialLink v-for="link in navLinks" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import EssentialLink from 'src/components/Nav/NavLink.vue'

const navLinks = [
  {
    title: 'Entries',
    icon: 'savings',
    link: '/',
  },
  {
    title: 'Settings',
    icon: 'settings',
    link: '/settings',
  },
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
