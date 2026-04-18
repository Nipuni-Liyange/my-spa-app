<template>
  <header class="border-b border-stone-200 bg-[#ece8d8]">
    <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
      <div class="flex items-center gap-3">
        <button class="text-lg text-stone-600">☰</button>
        <input
          type="text"
          placeholder="Search products..."
          class="rounded-full border border-stone-300 bg-white px-4 py-2 text-sm outline-none"
        />
      </div>

      <h1 class="text-2xl font-semibold tracking-wide text-[#7b4f4a]">
        MiraFashion
      </h1>

      <nav class="flex items-center gap-6 text-sm text-stone-700">
        <a href="/" class="text-blue-500">HOME</a>
        <a href="/">SHOP</a>
        <a href="/cart">CART</a>
        <span>👤</span>
      </nav>
    </div>
  </header>
</template>
