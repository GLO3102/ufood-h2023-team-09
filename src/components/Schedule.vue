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
    <div class="schedule-container">
        <table  v-for="(hour, day) in resto_data.opening_hours" :key="day">
            <tr>{{day}} ----->{{hour}}</tr>   
        </table>
    </div>
</template>
