<template>
  <q-page>
    <div class="q-pa-md">
      <q-list bordered separator>
        <q-slide-item
          v-for="entry in entries"
          :key="entry.id"
          @left="onLeft"
          @right="onEntrySlideRight($event, entry)"
          left-color="positive"
          right-color="negative"
        >
          <template v-slot:left>
            <q-icon name="done" />
          </template>
          <template v-slot:right>
            <q-icon name="delete" />
          </template>
          <q-item>
            <q-item-section class="text-weight-bold" :class="useAmountColorClass(entry.amount)">
              {{ entry.name }}
            </q-item-section>

            <q-item-section
              class="text-weight-bold"
              :class="useAmountColorClass(entry.amount)"
              side
            >
              {{ useCurrencify(entry.amount) }}
            </q-item-section>
          </q-item>
        </q-slide-item>
      </q-list>
    </div>
    <q-footer class="bg-transparent">
      <div class="row q-mb-sm q-px-md q-py-sm shadow-up-3">
        <div class="col text-grey-7 text-h6">Balance:</div>
        <div class="col text-h6 text-right" :class="useAmountColorClass(balance)">
          {{ useCurrencify(balance) }}
        </div>
      </div>
      <q-form @submit="addEntry" class="row q-px-sm q-pb-sm q-pa-sm q-col-gutter-sm bg-primary">
        <div class="col">
          <q-input
            ref="nameRef"
            v-model="addEntryForm.name"
            placeholder="Name"
            bg-color="white"
            outlined
            dense
          />
        </div>
        <div class="col">
          <q-input
            v-model.number="addEntryForm.amount"
            input-class="text-right"
            placeholder="Amount"
            bg-color="white"
            type="number"
            step="0.01"
            outlined
            dense
          />
        </div>
        <div class="col col-auto">
          <q-btn color="primary" icon="add" type="submit" round />
        </div>
      </q-form>
    </q-footer>
  </q-page>
</template>

<script setup>
/*
  imports
*/
import { computed, reactive, ref } from 'vue'
import { useCurrencify } from 'src/composables/useCurrencify'
import { useAmountColorClass } from 'src/composables/useAmountColorClass'
import { uid } from 'quasar'
import { useQuasar } from 'quasar'

/*
  entries
*/
const entries = ref([
  {
    id: 1,
    name: 'Salary',
    amount: 4999.99,
  },
  {
    id: 2,
    name: 'Rent',
    amount: -999,
  },
  {
    id: 3,
    name: 'Groceries',
    amount: -14.99,
  },
  {
    id: 4,
    name: 'Unknown',
    amount: 0,
  },
])

/*
  balance
*/
const balance = computed(() => {
  return entries.value.reduce((acc, entry) => {
    return acc + entry.amount
  }, 0)
})
/*
  add entry
*/

const nameRef = ref(null)

const addEntryFormDefault = {
  name: '',
  amount: null,
}

const addEntryForm = reactive({
  ...addEntryFormDefault,
})

const addEntryReset = () => {
  Object.assign(addEntryForm, addEntryFormDefault)
  nameRef.value.focus()
}

const addEntry = () => {
  entries.value.push({
    id: uid(),
    name: addEntryForm.name,
    amount: addEntryForm.amount,
  })
  addEntryReset()
}

/**
  Slide items
 */
const $q = useQuasar()
const onEntrySlideRight = ({ reset }, entry) => {
  $q.dialog({
    title: 'Delete Entry',
    message: `
    Delete this entry?
    <div class="q-mt-md text-weight-bold ${useAmountColorClass(entry.amount)}">${
      entry.name
    } : ${useCurrencify(entry.amount)}</div>
    `,
    persistent: true,
    html: true,
    ok: {
      label: 'Delete',
      color: 'negative',
      noCaps: true,
    },
    cancel: {
      color: 'primary',
      noCaps: true,
    },
  })
    .onOk(() => {
      deleteEntry(entry.id)
    })
    .onCancel(() => {
      reset()
    })
}

/**
 * delete entry
 */
const deleteEntry = (entryId) => {
  const index = entries.value.findIndex((entry) => entry.id === entryId)
  entries.value.splice(index, 1)
  $q.notify('Entry delete')
}
</script>
