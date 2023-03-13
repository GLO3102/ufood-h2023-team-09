<script>
import { defineComponent} from "vue"
import FavoriteListItem from "./FavoriteListItem.vue"
import { getFavoriteListById, removeFavoriteListItem, modifyFavoriteList, addFavoriteListItem } from "../api/favoriteListsApi"

export default defineComponent({
    name: "FavoriteList",
    data : () => {
        return {
            list: [Object],
            isInputReady: false,
        }
    },
    components: {
        FavoriteListItem,
    },
    props: {
        listId: String
    },
    emits: [
        'deleteList',
        'moveUp',
        'moveDown',
    ],
    methods: {
        async removeItem(restaurantId) {
            const response = await removeFavoriteListItem(restaurantId, this.listId)
            this.list = await getFavoriteListById(this.listId)
        },
        async modifyName(event){
            if(this.isInputReady){
                const response = await modifyFavoriteList(this.list.name, this.list.owner.email, this.list.id)
                this.list = await getFavoriteListById(this.listId)
                this.isInputReady = false
            }else{
                this.isInputReady = true
                if (event) {
                    this.$nextTick(() => {
                        this.$refs.rename.focus();
                    });
                }
            }
        },
        async moveUp(restaurantId) {
            if (restaurantId !== this.list.restaurants[0].id) {
                let temp = []
                for (let i = this.list.restaurants.length - 1; i >= 0; i--) {
                    if (this.list.restaurants[i].id !== restaurantId) {
                        temp.push(this.list.restaurants[i].id)
                        await removeFavoriteListItem(this.list.restaurants[i].id, this.list.id)
                    } else {
                        const upper = this.list.restaurants[i - 1].id
                        await removeFavoriteListItem(upper, this.list.id)
                        await addFavoriteListItem(upper, this.list.id)
                        for (let j = temp.length - 1; j >= 0; j--) {
                            await addFavoriteListItem(temp.pop(), this.list.id)
                        }
                        break
                    }
                }
                this.list = await getFavoriteListById(this.listId)
            }
        },
        async moveDown(restaurantId) {
            if (restaurantId !== this.list.restaurants[this.list.restaurants.length - 1].id) {
                let temp = []
                for (let i = this.list.restaurants.length - 1; i >= 0; i--) {
                    if (this.list.restaurants[i].id !== restaurantId) {
                        temp.push(this.list.restaurants[i].id)
                        await removeFavoriteListItem(this.list.restaurants[i].id, this.list.id)
                    } else {
                        await removeFavoriteListItem(restaurantId, this.list.id)
                        await addFavoriteListItem(temp.pop(), this.list.id)
                        await addFavoriteListItem(restaurantId, this.list.id)
                        for (let j = temp.length - 1; j >= 0; j--) {
                            await addFavoriteListItem(temp.pop(), this.list.id)
                        }
                        break
                    }
                }
                this.list = await getFavoriteListById(this.listId)
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
            <span v-if="!isInputReady">{{ list.name }}</span>
            <input
                    ref="rename"
                    @focus="$event.target.select()"
                    :id="list.id" @keyup.enter="modifyName(null)"
                    v-if="isInputReady" type="text"
                    v-model="list.name"
                    class="tag is-small"
                />
            <div class="tags has-addons">
                
                <a v-if="!isInputReady" class="tag is-small has-background-grey-lighter" @click="$emit('moveUp', listId)">&#8593;</a>
                <a v-if="!isInputReady" class="tag is-small has-background-grey-lighter" @click="$emit('moveDown', listId)">&#8595;</a>
                <a @click="modifyName($event)" class="tag is-small has-background-grey-lighter">Rename</a>
                <a @click="$emit('deleteList', listId)" v-if="!isInputReady" class="tag is-small is-danger">Delete</a>
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
span{
    max-width: 50%;
    overflow-wrap: break-word;
}
.card{
    width: 480px;
    margin-inline: 1vw;
    margin-bottom: 2vw;
    flex-shrink: 1;
}
</style>