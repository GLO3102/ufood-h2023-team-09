<script setup>
    import json from "./hardcoded_resto.json";
    import Schedule from "./Schedule.vue";
</script>

<template>
        <div class=" card is-horizontal columns" style="margin-right:0px;">
            <div class="card-content column is-two-fifths">
                <label class="label">Enter your adress here</label>
                <div class="field has-addons">
                    <div class="control is-expanded">
                        <input class="input" type="email" placeholder="8 rue Saint-Jean">
                    </div>
                    <div class="control">
                        <a class="button is-info">
                            Find direction
                        </a>
                    </div>
                </div>
                <label class="label">Destination Adress</label>
                <div class="content">
                    <p>{{json.address}}</p>
                </div>
                
            </div>
            <div class="card-image column is-three-fifths">
                <figure class="image is-4by3">
                    <img 
                    src="https://media.wired.com/photos/59269cd37034dc5f91bec0f1/191:100/w_1280,c_limit/GoogleMapTA.jpg"
                    alt="this used to be photo">             
                </figure>
            </div>
       

        </div>
</template>



