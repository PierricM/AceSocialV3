import { computed, ref } from 'vue';

export const usePagination = (perPage, prefetchCb, pageCb) => {
    perPage = ref(perPage);
    const allPublicKeys = ref([]);
    const prefetchLoading = ref(true);
    const pageLoading = ref(false);
    const loading = computed(() => prefetchLoading.value || pageLoading.value);

    let prefetchPromise = null

    const prefetch = () => {
        prefetchPromise = (async () => {
            try {
                prefetchLoading.value = true
                allPublicKeys.value = await prefetchCb("score")
                console.log("enfin0000");
                console.log(allPublicKeys.value);
            } finally {
                prefetchLoading.value = false
            }
        })()

        return prefetchPromise
    }

    const prefetch2 = () => {
        prefetchPromise = (async () => {
            try {
                prefetchLoading.value = true
                allPublicKeys.value = await prefetchCb("datecreated")
                console.log("enfin");
                console.log(allPublicKeys.value);
            } finally {
                prefetchLoading.value = false
            }
        })()

        return prefetchPromise
    }

    const prefetch3 = () => {
        prefetchPromise = (async () => {
            try {
                prefetchLoading.value = true
                allPublicKeys.value = await prefetchCb("score__")
                console.log("enfin");
                console.log(allPublicKeys.value);
            } finally {
                prefetchLoading.value = false
            }
        })()

        return prefetchPromise
    }

    const prefetch4 = () => {
        prefetchPromise = (async () => {
            try {
                prefetchLoading.value = true
                allPublicKeys.value = await prefetchCb("datecreated__")
                console.log("enfin");
                console.log(allPublicKeys.value);
            } finally {
                prefetchLoading.value = false
            }
        })()

        return prefetchPromise
    }

    const getPagePublicKeys = (page) => {

        const loc_ret_value = allPublicKeys.value.slice(
            (page - 1) * perPage.value,
            page * perPage.value,
        )

        return loc_ret_value;
    }

    const hasPage = (page) => {
        return getPagePublicKeys(page).length > 0;
    }

    const getPage = async (page) => {
        await prefetchPromise;
        if (!hasPage(page)) return [];
        try {
            pageLoading.value = true;
            console.log("onestall");
            console.log(getPagePublicKeys(page));
            const monres = await pageCb(page, getPagePublicKeys(page));
            console.log(monres);
            return monres
        } finally {
            pageLoading.value = false;
        }
    }


    return {
        perPage,
        allPublicKeys,
        prefetchLoading,
        pageLoading,
        loading,
        getPagePublicKeys,
        hasPage,
        getPage,
        prefetch,
        prefetch2,
        prefetch3,
        prefetch4,
    };
}