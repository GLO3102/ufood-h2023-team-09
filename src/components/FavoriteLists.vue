<script>
import { defineComponent } from 'vue'
import FavoriteList from './FavoriteList.vue';
import { getFavoriteListsByUserId, deleteFavoriteListById, createFavoriteList } from "../api/favoriteListsApi"

export default defineComponent({
    data: () => {
        return {
            userLists: {},
            isInputReady: false
        }
    },
    components: {
        FavoriteList,
    },
    props: {
        userId: String,
    },
    methods: {
        async deleteList(listId) {
            const response = await deleteFavoriteListById(listId)
            this.userLists = await getFavoriteListsByUserId(this.userId)
        },
        async createNewList() {
            if(this.isInputReady){
                this.isInputReady = false
                let email = this.userLists.items[0].owner.email
                email = email.replace('/',  '')
                let name = this.$refs.inputName.value
                const response = await createFavoriteList(name, email)
                this.userLists = await getFavoriteListsByUserId(this.userId)
            }else{
                this.isInputReady = true
                this.$nextTick(() => {
                        this.$refs.inputName.focus();
                    });
            }
            
        }
    },
    async created() {
        this.userLists = await getFavoriteListsByUserId(this.userId)
    },
})
</script>


<template>
    <div class="box">
        <div class="title is-4">Favorite Lists</div>
        <div class="tags has-addons">
            <a @click="createNewList" class="tag">Create a new list</a>
            <input v-if="isInputReady" ref="inputName" @focus="$event.target.select()" @keyup.enter="createNewList"
                type="text" class="tag" />
            <a v-if="isInputReady" @click="createNewList" class="tag">Ok</a>
        </div>
        <div class="list">
            <div class="card" v-for="list in userLists.items" :key="list.id">
                <FavoriteList @delete-list="deleteList" :listId="list.id" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.list{
    display: block;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;    
}
.title.is-4{
    text-align: center;
}
.tags.has-addons{
    justify-content: center;
}
.card{
    width: 480px;
    margin-inline: 1vw;
    margin-bottom: 2vw;
    flex-shrink: 1;
}
</style>