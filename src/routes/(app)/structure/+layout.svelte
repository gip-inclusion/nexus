<script lang="ts">
import {
    page
} from '$app/state';

const pathname = $derived(() => (page).url.pathname);

let {
    children
} = $props();
</script>

<header class="p-8">
    <h1 class="text-3xl font-bold">Structure</h1>

    <nav class="mt-4 flex space-x-4 text-sm font-medium">
        <a href="/structure"
            class="pb-1 border-b-2 transition-colors duration-200
            {pathname() === '/structure' ? 'text-blue-600 border-blue-600' : 'text-gray-500 border-transparent hover:text-gray-700'}">
            Vue d’ensemble
        </a>

        <a href="/structure/offres"
            class="pb-1 border-b-2 transition-colors duration-200
            {pathname().startsWith('/structure/offres') ? 'text-blue-600 border-blue-600' : 'text-gray-500 border-transparent hover:text-gray-700'}">
            Offres d’emplois <span class="ml-1 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">4</span>
        </a>

        <a href="/structure/services"
            class="pb-1 border-b-2 transition-colors duration-200
            {pathname().startsWith('/structure/services') ? 'text-blue-600 border-blue-600' : 'text-gray-500 border-transparent hover:text-gray-700'}">
            Services d’insertion <span class="ml-1 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">3</span>
        </a>

        <a href="/structure/opportunites"
            class="pb-1 border-b-2 transition-colors duration-200
            {pathname().startsWith('/structure/opportunites') ? 'text-blue-600 border-blue-600' : 'text-gray-500 border-transparent hover:text-gray-700'}">
            Opportunités commerciales <span class="ml-1 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">3</span>
        </a>
    </nav>
</header>

<div class="p-8">
    {@render children()}
</div>
