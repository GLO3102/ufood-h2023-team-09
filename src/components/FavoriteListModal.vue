<script>
import { defineComponent} from "vue"
import FavoriteList from './FavoriteList.vue'
import FavoriteListItem from "./FavoriteListItem.vue"
import { getFavoriteListById, removeFavoriteListItem, modifyFavoriteList, addFavoriteListItem } from "../api/favoriteListsApi"
import { getRestaurantByID } from "../api/restaurantApi"

export default defineComponent({
    name: "FavoriteList",
    data : () => {
        return {
            list: [Object],
            isInputReady: false,
            isOptionsReady: false
        }
    },
    extends: FavoriteList,
    components: {
        FavoriteListItem,
    },
    props: {
        listId: String,
        restoId: String,
    },
    emits: [
        'deleteList',
        'moveUp',
        'moveDown',
    ],
    methods: {
        toggleOptions(){
            this.isOptionsReady = !this.isOptionsReady
        },
        async addRestaurantToList(listId) {
            try {
                const restaurantId = this.restoId;
                const restaurant = await getRestaurantByID(restaurantId);
                const existingRestaurant = this.list.restaurants.find(r => r.id === restaurant.id);
                if (existingRestaurant) {
                    console.log(`Restaurant ${restaurantId} is already in the list`);
                    return;
                }
                await addFavoriteListItem(restaurantId, listId);
                this.list.restaurants.push(restaurant);
            } catch (error) {
                console.error(error);
            }
        },
    },
    async created () {
        this.list = await getFavoriteListById(this.listId)
    },
})

</script>

<template>
    <div class="card">
        <div class="card-header">
            <a @click="addRestaurantToList(list.id)" class="button is-primary">+ Add</a>
            <div class="list-name" v-if="!isInputReady">{{ list.name }}</div>
            <input
                    ref="rename"
                    @focus="$event.target.select()"
                    :id="list.id" @keyup.enter="modifyName(null)"
                    v-if="isInputReady" type="text"
                    v-model="list.name"
                    class="tag is-small"
                />
            <div class="tags has-addons">
                
                <a v-if="!isInputReady && isOptionsReady" class="tag is-small has-background-grey-lighter" @click="$emit('moveUp', listId)">&#8593;</a>
                <a v-if="!isInputReady && isOptionsReady" class="tag is-small has-background-grey-lighter" @click="$emit('moveDown', listId)">&#8595;</a>
                <a v-if="isOptionsReady" @click="modifyName($event)" class="tag is-small has-background-grey-lighter">Rename</a>
                <a v-if="!isInputReady && isOptionsReady" @click="$emit('deleteList', listId)" class="tag is-small is-danger">Delete</a>
                <a @click="toggleOptions" class="tag is-small has-background-grey-lighter">&#8226;&#8226;&#8226;</a>
                
            </div>
        </div> 
        <div class="card-content">
            <FavoriteListItem
                @remove-item="removeItem"
                @move-up="moveUp"
                @move-down="moveDown"
                v-for="item in list.restaurants"
                :key="item.id"
                :restaurant-id="item.id"
            />
        </div>
    </div>    
</template>

<style scoped>
.card-header{
    padding: 0.5rem;
    justify-content: space-between;
    flex-wrap: wrap;
}
.list-name{
    max-width: 100%;
    overflow-wrap: break-word;
}
.card{
    width: 480px;
    margin-inline: 1vw;
    margin-bottom: 2vw;
    flex-shrink: 1;
}
</style>