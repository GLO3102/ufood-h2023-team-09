<script>
import { defineComponent } from "vue";
import { getRestaurantByID } from "../api/restaurantApi";

export default defineComponent({
    name: "FavoriteListItem",
    data : () => {
        return {
            restaurant: Object,
        }
    },
    props: {
        restaurantId: String
    },
    emits: [
        'removeItem',
        'moveUp',
        'moveDown',
    ],
    async created () {
        this.restaurant = await getRestaurantByID(this.restaurantId)
    },
})

</script>

<template>
    <div class="tags has-addons">
        <a class="tag is-small" @click="$emit('moveUp', restaurant.id)">Up</a>
        <a class="tag is-small" @click="$emit('moveDown', restaurant.id)">Down</a>
        <span class="tag is-info is-small">{{ restaurant.name }}</span>
        <a @click="$emit('removeItem', restaurant.id)" class="tag is-delete is-small"></a>
    </div>
</template>