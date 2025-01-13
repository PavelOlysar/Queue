<template>
  <section class="w-full h-full flex flex-col items-center gap-4 p-6">
    <h2 class="text-4xl font-bold p-4">Locations</h2>
    <ul class="w-full self-start flex flex-col gap-16">
      <li>
        <h3 class="text-2xl font-bold p-3">Prague</h3>
        <ol class="w-full flex justify-between">
          <section class="w-1/3 flex flex-col gap-4">
            <h4 class="text-lg font-bold">Ordered</h4>
            <ol class="flex flex-col gap-4">
              <li>
                <OrderMain />
              </li>
              <li>
                <OrderMain />
              </li>
            </ol>
          </section>
          <section class="w-1/3 flex flex-col gap-4">
            <h4 class="text-lg font-bold">Prepared</h4>
            <ol class="flex flex-col gap-4">
              <li>
                <OrderMain />
              </li>
              <li>
                <OrderMain />
              </li>
            </ol>
          </section>
          <section class="w-1/3 flex flex-col gap-4">
            <h4 class="text-lg font-bold">Finished</h4>
            <ol class="flex flex-col gap-4">
              <li>
                <OrderMain />
              </li>
              <li>
                <OrderMain />
              </li>
            </ol>
          </section>
        </ol>
      </li>

      <li>
        <h3 class="text-2xl font-bold p-3">Prague</h3>
        <ol class="w-full flex justify-between">
          <section class="w-1/3 flex flex-col gap-4">
            <h4 class="text-lg font-bold">Ordered</h4>
            <ol class="flex flex-col gap-4">
              <li>
                <OrderMain />
              </li>
              <li>
                <OrderMain />
              </li>
            </ol>
          </section>
          <section class="w-1/3 flex flex-col gap-4">
            <h4 class="text-lg font-bold">Prepared</h4>
            <ol class="flex flex-col gap-4">
              <li>
                <OrderMain />
              </li>
              <li>
                <OrderMain />
              </li>
            </ol>
          </section>
          <section class="w-1/3 flex flex-col gap-4">
            <h4 class="text-lg font-bold">Finished</h4>
            <ol class="flex flex-col gap-4">
              <li>
                <OrderMain />
              </li>
              <li>
                <OrderMain />
              </li>
            </ol>
          </section>
        </ol>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import OrderMain from '@/components/OrderMain.vue'
</script>
