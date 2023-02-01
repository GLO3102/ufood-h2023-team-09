<script>
    import json from "./hardcoded_resto.json";
    
    export default{
        name: "Schedule",
        data: () => ({
            currentSlide: 0,
            resto_data : json,
            week_day : [ "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]

            })
    }
</script>

<template>
    <div>
        <div class="schedule-container" style="width: 200px; float: left;">
            <table  v-for="(hour, day) in resto_data.opening_hours" :key="day">
                <tr  >{{day}} :{{hour}}</tr>   
            </table>
        </div>
        <div class="card" style="margin-left: 300px;">
            <figure >
                <img
                    src="https://media.wired.com/photos/59269cd37034dc5f91bec0f1/191:100/w_1280,c_limit/GoogleMapTA.jpg"
                  alt=""
                  style="width:auto;height:auto;"
                />
            </figure>
        </div>
    </div>
</template>
